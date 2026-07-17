#!/usr/bin/env bash
set -euo pipefail

upstream_repo="${UPSTREAM_REPO:-1c7/chinese-independent-developer}"
upstream_ref="${UPSTREAM_REF:-master}"
raw_base="https://raw.githubusercontent.com/${upstream_repo}/${upstream_ref}"
temp_dir="$(mktemp -d)"
trap 'rm -rf "$temp_dir"' EXIT

sources=(
  "README.md"
  "pages/README-Programmer-Edition.md"
  "pages/README-Game.md"
  "pages/README-2018-2020.md"
)

targets=(
  "data/README.md"
  "pages/README-Programmer-Edition.md"
  "pages/README-Game.md"
  "pages/README-2018-2020.md"
)

for index in "${!sources[@]}"; do
  source_path="${sources[$index]}"
  target_path="${targets[$index]}"
  downloaded_file="${temp_dir}/${index}.md"

  echo "正在检查 ${source_path}"
  curl --fail --location --silent --show-error \
    --retry 3 --retry-delay 2 \
    "${raw_base}/${source_path}" \
    --output "${downloaded_file}"

  if [[ ! -s "${downloaded_file}" ]]; then
    echo "错误：${source_path} 下载后为空。" >&2
    exit 1
  fi

  if ! grep -Eq '^\* :((white_check_mark)|(clock[0-9]*)|x):' "${downloaded_file}"; then
    echo "错误：${source_path} 中没有识别到项目条目，拒绝覆盖现有数据。" >&2
    exit 1
  fi

  mkdir -p "$(dirname "${target_path}")"
  cp "${downloaded_file}" "${target_path}"
done

echo "上游数据下载及格式检查完成。"
