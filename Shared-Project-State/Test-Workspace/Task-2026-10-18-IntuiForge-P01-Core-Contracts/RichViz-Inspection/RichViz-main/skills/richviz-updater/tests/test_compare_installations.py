import importlib.util
from pathlib import Path
import tempfile
import unittest


SCRIPT = Path(__file__).resolve().parents[1] / "Scripts" / "compare_installations.py"
SPEC = importlib.util.spec_from_file_location("compare_installations", SCRIPT)
compare_module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(compare_module)


class ReadOnlyCompareTests(unittest.TestCase):
    def test_classifies_added_changed_identical_and_host_only_under_renamed_paths(self):
        with tempfile.TemporaryDirectory() as temp:
            base = Path(temp)
            upstream, installed = base / "upstream", base / "host"
            upstream.mkdir(); installed.mkdir()
            (upstream / "same.js").write_text("same", encoding="utf-8")
            (upstream / "new.js").write_text("new", encoding="utf-8")
            (upstream / "renamed.js").write_text("upstream-v2", encoding="utf-8")
            (installed / "same.js").write_text("same", encoding="utf-8")
            (installed / "host-renamed.js").write_text("local-v1", encoding="utf-8")
            (installed / "local.json").write_text("local", encoding="utf-8")
            result = compare_module.compare(upstream, installed, {"same.js": "same.js", "new.js": "new.js", "renamed.js": "host-renamed.js"})
            statuses = {row["upstream"] or row["installed"]: row["status"] for row in result["files"]}
            self.assertEqual(statuses["same.js"], "identical")
            self.assertEqual(statuses["new.js"], "missing-installed")
            self.assertEqual(statuses["renamed.js"], "changed")
            self.assertEqual(statuses["local.json"], "installed-only")
            self.assertEqual((installed / "host-renamed.js").read_text(encoding="utf-8"), "local-v1")
            self.assertEqual((upstream / "renamed.js").read_text(encoding="utf-8"), "upstream-v2")

    def test_rejects_unsafe_paths_and_destination_collisions(self):
        with tempfile.TemporaryDirectory() as temp:
            base = Path(temp); upstream = base / "up"; installed = base / "installed"
            upstream.mkdir(); installed.mkdir()
            (upstream / "a.js").write_text("a", encoding="utf-8")
            (upstream / "b.js").write_text("b", encoding="utf-8")
            with self.assertRaises(ValueError):
                compare_module.compare(upstream, installed, {"a.js": "../outside.js"})
            with self.assertRaises(ValueError):
                compare_module.compare(upstream, installed, {"a.js": "same.js", "b.js": "same.js"})


if __name__ == "__main__":
    unittest.main()
