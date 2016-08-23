#!/usr/bin/env bash
set -e # halt script on error

echo "Deploying to gh-pages"
cd dist
git init
git config user.name "Travis-CI"
git config user.email "travis@example.com"
git add .
git commit -m "CI deploy to gh-pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:gh-pages
