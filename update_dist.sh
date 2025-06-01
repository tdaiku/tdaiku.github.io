#!/bin/bash

# dist配下のファイルを上書きするスクリプト
# 使用方法: ./update_dist.sh

# プロジェクトのルートディレクトリ
PROJECT_ROOT="/Users/daikutomohiro/workspace/tdaiku"

# 既存のファイルを削除（コピー先のファイルのみ）
rm -rf "${PROJECT_ROOT}/resources" "${PROJECT_ROOT}/pdf" "${PROJECT_ROOT}/index.html"

# dist配下のファイルをコピー
cp -r "${PROJECT_ROOT}/source/dist/"* "${PROJECT_ROOT}/"

# コピー元のdistディレクトリを削除
rm -rf "${PROJECT_ROOT}/source/dist"

echo "✅ dist配下のファイルを上書きしました" 