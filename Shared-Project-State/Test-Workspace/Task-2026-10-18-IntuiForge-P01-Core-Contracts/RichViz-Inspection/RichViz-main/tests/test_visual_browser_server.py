import importlib.util
import json
from pathlib import Path
from http.server import ThreadingHTTPServer
from threading import Thread
from urllib.request import urlopen
from urllib.error import HTTPError
import unittest


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("richviz_server", ROOT / "server.py")
server = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(server)


class VisualBrowserServerTests(unittest.TestCase):
    def test_discovers_every_authored_raster_and_svg_file_and_keeps_catalog_provenance(self):
        catalog = server.discover_visual_assets()
        paths = {item["path"] for item in catalog["assets"]}
        self.assertEqual(len(paths), 258)
        self.assertEqual(len(paths), len(catalog["assets"]))
        self.assertEqual(next(item for item in catalog["assets"] if item["path"].endswith("sample-checks.svg"))["license"], "Apache-2.0")
        app_icons = [item for item in catalog["assets"] if item.get("kind") == "application-icon"]
        self.assertEqual(len(app_icons), 231)
        self.assertEqual(len({item["sha256"] for item in app_icons}), len(app_icons))
        self.assertTrue(all((ROOT / item["path"]).read_bytes().startswith(b"\x89PNG\r\n\x1a\n") for item in app_icons))
        self.assertTrue(all(item["license"] == "GPL-3.0+" for item in app_icons))
        self.assertEqual(len([item for item in catalog["assets"] if item.get("kind") == "sticker"]), 11)
        self.assertTrue(any(item["format"] == "PNG" for item in catalog["assets"]))

    def test_root_routes_to_browser_and_source_files_are_allowed(self):
        self.assertEqual(server.resolve_requested_file("/").relative_to(ROOT).as_posix(), "visual-browser/index.html")
        self.assertEqual(server.resolve_requested_file("/visual-browser/").relative_to(ROOT).as_posix(), "visual-browser/index.html")
        self.assertEqual(server.resolve_requested_file("/src/RichVisualization.js").name, "RichVisualization.js")
        self.assertEqual(server.resolve_requested_file("/Assets/catalog.json").name, "catalog.json")
        self.assertEqual(server.resolve_requested_file("/visual-browser/app-icons.html").name, "app-icons.html")
        self.assertEqual(server.resolve_requested_file("/Assets/Application-Icons/Captiva/LICENSE").name, "LICENSE")

    def test_blocks_traversal_hidden_files_directory_listing_and_unlisted_root_files(self):
        for path in ("/../../AGENTS.md", "/.git/config", "/server.py", "/node_modules/example.js", "/src/../../AGENTS.md"):
            with self.subTest(path=path):
                self.assertIsNone(server.resolve_requested_file(path))

    def test_blocks_encoded_traversal_and_allows_spaced_project_roots(self):
        self.assertIsNone(server.resolve_requested_file("/%2e%2e/AGENTS.md"))
        self.assertTrue((ROOT / "Start Website.bat").exists())

    def test_live_http_redirect_assets_and_sensitive_path_denial(self):
        httpd = ThreadingHTTPServer(("127.0.0.1", 0), server.BrowserHandler)
        thread = Thread(target=httpd.serve_forever, daemon=True)
        thread.start()
        base = f"http://127.0.0.1:{httpd.server_port}"
        try:
            with urlopen(base + "/", timeout=3) as response:
                self.assertEqual(response.status, 200)
                self.assertIn("Explore Library", response.read().decode("utf-8"))
                self.assertTrue(response.url.endswith("/visual-browser/"))
            for path in ("/visual-browser/browser.js", "/visual-browser/browser.css", "/visual-browser/app-icons.html", "/Assets/catalog.json", "/Assets/richviz-visual-browser.png", "/Assets/Application-Icons/Captiva/LICENSE", "/VERSION", "/src/RichVisualization.js"):
                with self.subTest(path=path), urlopen(base + path, timeout=3) as response:
                    self.assertEqual(response.status, 200)
                    self.assertIn("nosniff", response.headers["X-Content-Type-Options"])
            with urlopen(base + "/visual-browser/catalog.json", timeout=3) as response:
                discovered = json.loads(response.read().decode("utf-8"))
                self.assertEqual(len(discovered["assets"]), 258)
                self.assertTrue(any(item["path"] == "Assets/richviz-visual-browser.png" for item in discovered["assets"]))
                self.assertEqual(sum(item.get("kind") == "application-icon" for item in discovered["assets"]), 231)
            with urlopen(base + "/VERSION", timeout=3) as response:
                self.assertEqual(response.read().decode("utf-8").strip(), (ROOT / "VERSION").read_text(encoding="utf-8").strip())
            with urlopen(base + "/Assets/richviz-hero.svg", timeout=3) as response:
                self.assertEqual(response.headers["Content-Type"].split(";")[0], "image/svg+xml")
            with urlopen(base + "/Assets/Icons/home-page.png", timeout=3) as response:
                self.assertEqual(response.headers["Content-Type"].split(";")[0], "image/png")
            with urlopen(base + "/Assets/richviz-visual-browser.png", timeout=3) as response:
                self.assertEqual(response.headers["Content-Type"].split(";")[0], "image/png")
            with self.assertRaises(HTTPError) as denied:
                urlopen(base + "/AGENTS.md", timeout=3)
            self.assertEqual(denied.exception.code, 404)
        finally:
            httpd.shutdown()
            httpd.server_close()
            thread.join(timeout=3)


if __name__ == "__main__":
    unittest.main()
