#! /bin/bash
#
# Insert links to the relevant data structure pages within the API docs. Run from the root `juice-docs` directory.

for STRUCT in $(find docs/dev/api/data-structures -type f -name "*.md" ! -name "README.md")
do
  NAME=$(awk '{print $2; exit}' $STRUCT)
  grep -rl "\|\`$NAME" docs/dev/api/ | xargs sed -i "s#|\`\\(${NAME}\\)\\(\\[\\?\\]\\?\\)\`#|[\`\1\`](${STRUCT})\2#g"
done
