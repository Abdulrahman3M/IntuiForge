#!/usr/bin/env python3
"""Read-only SHA-256 inventory and upstream-to-installed path comparison."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import sys


def inventory(root: Path) -> dict[str, str]:
    result: dict[str, str] = {}
    for path in sorted(root.rglob("*")):
        if path.is_dir() or any(part.startswith(".") or part in {"node_modules", "__pycache__"} for part in path.relative_to(root).parts):
            continue
        relative = path.relative_to(root).as_posix()
        if path.is_symlink():
            result[relative] = "symlink:" + str(path.readlink())
            continue
        digest = hashlib.sha256()
        with path.open("rb") as handle:
            for chunk in iter(lambda: handle.read(1024 * 1024), b""):
                digest.update(chunk)
        result[relative] = digest.hexdigest()
    return result


def valid_relative(value: str) -> bool:
    path = PurePosixPath(value.replace("\\", "/"))
    return bool(value) and not path.is_absolute() and ".." not in path.parts and not (len(path.parts) == 1 and ":" in path.parts[0])


def compare(upstream_root: Path, installed_root: Path, mapping: dict[str, str] | None = None) -> dict[str, object]:
    upstream, installed = inventory(upstream_root), inventory(installed_root)
    mapping = mapping or {path: path for path in upstream}
    invalid = {source: target for source, target in mapping.items() if not valid_relative(source) or not valid_relative(target)}
    destinations = list(mapping.values())
    if invalid:
        raise ValueError(f"Unsafe relative path mapping: {invalid}")
    if len(destinations) != len(set(destinations)):
        raise ValueError("Two upstream paths map to the same installed path.")
    rows = []
    mapped_targets = set()
    for source in sorted(upstream):
        target = mapping.get(source, source)
        mapped_targets.add(target)
        if target not in installed:
            status = "missing-installed"
        elif upstream[source] == installed[target]:
            status = "identical"
        else:
            status = "changed"
        rows.append({"status": status, "upstream": source, "installed": target, "upstream_sha256": upstream[source], "installed_sha256": installed.get(target)})
    for target in sorted(set(installed) - mapped_targets):
        rows.append({"status": "installed-only", "upstream": None, "installed": target, "upstream_sha256": None, "installed_sha256": installed[target]})
    counts = {key: sum(1 for row in rows if row["status"] == key) for key in ("identical", "changed", "missing-installed", "installed-only")}
    return {"mode": "read-only", "upstream_root": str(upstream_root), "installed_root": str(installed_root), "counts": counts, "files": rows}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--upstream", required=True, type=Path)
    parser.add_argument("--installed", required=True, type=Path)
    parser.add_argument("--mapping", type=Path, help="JSON object mapping upstream relative paths to installed relative paths")
    args = parser.parse_args()
    try:
        mapping = json.loads(args.mapping.read_text(encoding="utf-8")) if args.mapping else None
        if mapping is not None and (not isinstance(mapping, dict) or not all(isinstance(k, str) and isinstance(v, str) for k, v in mapping.items())):
            raise ValueError("Mapping file must contain a JSON object of string paths.")
        if not args.upstream.is_dir() or not args.installed.is_dir():
            raise ValueError("Both --upstream and --installed must be existing directories.")
        print(json.dumps(compare(args.upstream.resolve(), args.installed.resolve(), mapping), ensure_ascii=False, indent=2))
        return 0
    except (OSError, json.JSONDecodeError, ValueError) as error:
        print(f"Comparison failed: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
