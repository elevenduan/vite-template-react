#!/usr/bin/env bash

set -e

TARGET_DIR="zip/webapp/name"
TARGET_ROOT="zip"

rm -rf "$TARGET_ROOT"

mkdir -p "$TARGET_DIR"

cp -rf dist/* "$TARGET_DIR/"

cd "$TARGET_ROOT"

zip -q -r -m dist.zip *