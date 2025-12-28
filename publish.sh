#!/bin/bash
set -e

echo "Publishing tibetan-sanskrit-transliteration-data..."

# Clean old build artifacts
echo "Cleaning old build artifacts..."
rm -rf dist/ build/ *.egg-info tibetan_sanskrit_transliteration_data.egg-info

# Build and publish to PyPI
echo "Building Python package..."
python3 -m build

echo "Publishing to PyPI..."
python3 -m twine upload dist/*

# Publish to npm
echo "Publishing to npm..."
npm publish

echo "✓ Published successfully to PyPI and npm!"
