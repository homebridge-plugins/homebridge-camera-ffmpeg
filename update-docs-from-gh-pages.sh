#!/bin/zsh

# Save current branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Stash any local changes
git stash

# Switch to gh-pages branch
git checkout gh-pages

# Copy docs folder to a temp location
cp -R docs /tmp/docs-gh-pages

# Switch back to your working branch
git checkout "$current_branch"

# Remove current docs folder and replace with gh-pages version
rm -rf docs
cp -R /tmp/docs-gh-pages docs

# Clean up temp folder
rm -rf /tmp/docs-gh-pages

# Restore stashed changes if needed
git stash pop

echo "Docs folder updated from gh-pages branch."