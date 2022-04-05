#!/bin/bash

# only allow rebuilding if something in _posts or source code was changed
if git diff HEAD^ HEAD --quiet ./src; then
  echo "Difference found in ./src folder"
  exit 1;
fi

if git diff HEAD^ HEAD --quiet ./_posts; then
  echo "Difference found in ./_posts folder"
  exit 1;
fi

if git diff HEAD^ HEAD --quiet ./public; then
  echo "Difference found in ./public folder"
  exit 1;
fi

echo "No changes detected. Aborting build."
exit 0;
