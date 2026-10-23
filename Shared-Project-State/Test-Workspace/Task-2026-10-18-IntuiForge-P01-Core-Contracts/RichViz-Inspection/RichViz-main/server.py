#!/usr/bin/env python3
"""Serve the Rich Viz Visual Reference Browser on loopback, using only the stdlib."""
from __future__ import annotations

import argparse
import json
import mimetypes
from pathlib import Path
import posixpath
import re
import socket
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
ALLOWED_DIRS = {"visual-browser", "src", "Examples", "Assets", "docs", "skills", "External-Libraries"}
ALLOWED_ROOT_FILES = {"README.md", "VERSION", "LICENSE", "NOTICE", "THIRD_PARTY_NOTICES.md", "CHANGELOG.md"}
ASSET_ROOTS = ("Assets", "src/gallery/media")
VISUAL_EXTENSIONS = {".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".apng", ".ico", ".bmp", ".tif", ".tiff", ".tgs", ".lottie"}
MIME_OVERRIDES = {".svg": "image/svg+xml", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".webp": "image/webp", ".avif": "image/avif", ".tgs": "application/x-tgsticker", ".lottie": "application/zip"}


def slug(value: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", value.lower())).strip("-")


def discover_visual_assets() -> dict:
    """Merge maintained provenance with every distributable image/sticker under owned asset roots."""
    catalog_path = ROOT / "Assets/catalog.json"
    metadata = json.loads(catalog_path.read_text(encoding="utf-8")) if catalog_path.is_file() else {"assets": []}
    records: dict[str, dict] = {}
    for item in metadata.get("assets", []):
        # Catalog paths are relative to Assets/catalog.json; normalize without losing spaces.
        normalized = posixpath.normpath((Path("Assets") / item["path"]).as_posix())
        item_path = (ROOT / Path(*normalized.split("/"))).resolve()
        if item_path.is_relative_to(ROOT.resolve()) and item_path.is_file():
            records[normalized.casefold()] = {**item, "path": normalized, "format": item.get("format", item_path.suffix.lstrip(".").upper())}

    for root_name in ASSET_ROOTS:
        asset_root = ROOT / Path(*root_name.split("/"))
        if not asset_root.is_dir():
            continue
        for path in asset_root.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in VISUAL_EXTENSIONS or any(part.startswith(".") for part in path.relative_to(ROOT).parts):
                continue
            relative = path.relative_to(ROOT).as_posix()
            key = relative.casefold()
            if key in records:
                continue
            folder = path.parent.name if path.parent != ROOT else ("Brand" if "hero" in path.stem.casefold() or "logo" in path.stem.casefold() else "Visual assets")
            category = folder.replace("_", " ").replace("-", " ").title()
            if path.suffix.lower() in {".tgs", ".lottie"} or "sticker" in relative.casefold():
                kind = "sticker"
            elif path.suffix.lower() == ".svg":
                kind = "illustration"
            else:
                kind = "image"
            records[key] = {
                "id": None, "name": path.stem.replace("-", " ").replace("_", " ").title(), "kind": kind,
                "category": category, "tags": [path.stem, category], "path": relative,
                "format": path.suffix.lstrip(".").upper(), "dimensions": "",
                "author": "See library asset provenance", "source": "Discovered in the local library asset tree",
                "license": "See the applicable library/third-party notices", "redistribution": "Follow the source component license",
                "commercialUse": "Follow the source component license", "attribution": "Retain source notices",
            }
    return {"assets": sorted(records.values(), key=lambda item: item["path"].casefold())}


def resolve_requested_file(url_path: str) -> Path | None:
    """Resolve a URL only if its real target is an allowed existing file."""
    try:
        relative = unquote(urlsplit(url_path).path).lstrip("/")
        if relative in {"", "/"}:
            relative = "visual-browser/index.html"
        elif relative in {"visual-browser", "visual-browser/"}:
            relative = "visual-browser/index.html"
        candidate = (ROOT / relative).resolve(strict=True)
        if not candidate.is_file() or not candidate.is_relative_to(ROOT):
            return None
        parts = Path(relative).parts
        if not parts or any(part.startswith(".") or part in {"node_modules", "__pycache__"} for part in parts):
            return None
        if len(parts) == 1 and parts[0] not in ALLOWED_ROOT_FILES:
            return None
        if len(parts) > 1 and parts[0] not in ALLOWED_DIRS:
            return None
        return candidate
    except (OSError, RuntimeError, ValueError):
        return None


class BrowserHandler(SimpleHTTPRequestHandler):
    server_version = "RichVizBrowser/1.0"

    def do_GET(self) -> None:
        if urlsplit(self.path).path == "/visual-browser/catalog.json":
            data = json.dumps(discover_visual_assets(), ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(data)
            return
        if urlsplit(self.path).path == "/":
            self.send_response(302)
            self.send_header("Location", "/visual-browser/")
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        file_path = resolve_requested_file(self.path)
        if file_path is None:
            self.send_error(404, "Resource is not part of the visual browser allowlist")
            return
        try:
            data = file_path.read_bytes()
        except OSError:
            self.send_error(404, "File not found")
            return
        mime, _ = mimetypes.guess_type(file_path.name)
        mime = MIME_OVERRIDES.get(file_path.suffix.lower(), mime)
        self.send_response(200)
        self.send_header("Content-Type", (mime or "application/octet-stream") + ("; charset=utf-8" if mime and mime.startswith(("text/", "application/json")) else ""))
        self.send_header("Content-Length", str(len(data)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Cache-Control", "public, max-age=300")
        self.send_header("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'")
        self.end_headers()
        self.wfile.write(data)

    def do_HEAD(self) -> None:
        file_path = resolve_requested_file(self.path)
        if file_path is None:
            self.send_error(404, "Resource is not part of the visual browser allowlist")
            return
        mime, _ = mimetypes.guess_type(file_path.name)
        mime = MIME_OVERRIDES.get(file_path.suffix.lower(), mime)
        self.send_response(200)
        self.send_header("Content-Type", mime or "application/octet-stream")
        self.send_header("Content-Length", str(file_path.stat().st_size))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Cache-Control", "public, max-age=300")
        self.end_headers()

    def log_message(self, format: str, *args: object) -> None:
        print(f"[Rich Viz] {self.address_string()} - {format % args}", file=sys.stderr)


class LoopbackServer(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def find_port(start: int, attempts: int = 20) -> int:
    for port in range(start, start + attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe:
            try:
                probe.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    raise OSError(f"No free port found between {start} and {start + attempts - 1}.")


def main() -> int:
    if sys.version_info < (3, 9):
        print("Python 3.9 or newer is required to run the visual browser.", file=sys.stderr)
        return 1
    parser = argparse.ArgumentParser(description="Run the Rich Visualization Library visual browser locally.")
    parser.add_argument("--port", type=int, default=8765, help="preferred local port (default: 8765; tries the next 19 ports if busy)")
    parser.add_argument("--open", action="store_true", help="open the default browser after the local server is ready")
    args = parser.parse_args()
    if not 1024 <= args.port <= 65535:
        parser.error("--port must be between 1024 and 65535")
    try:
        port = find_port(args.port)
        server = LoopbackServer(("127.0.0.1", port), BrowserHandler)
    except OSError as error:
        print(f"Could not start the local visual browser: {error}", file=sys.stderr)
        return 1
    url = f"http://127.0.0.1:{port}/"
    print(f"Rich Visualization Library — Rich Viz Visual Reference Browser\n{url}\nOnly allowlisted library files are served. Press Ctrl+C to stop.")
    if port != args.port:
        print(f"Port {args.port} is occupied; using {port} instead.")
    if args.open:
        # The HTTPServer constructor has bound/listened on the loopback port; confirm acceptability before launching a browser.
        with socket.create_connection(("127.0.0.1", port), timeout=2):
            pass
        import webbrowser
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping the local visual browser.")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
