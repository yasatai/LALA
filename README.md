# LALA ウェブサイト

画像は `public/images` に保存しています。写真はWebPへ軽量化し、透明ロゴなど必要な素材だけPNGで保持しています。

## 技術構成

- React 19 + TypeScript
- Vite
- CSS Modules（ページ・コンポーネント）+ `src/styles/global.css`（共通トークン）
- Netlify

現行ページで使用するコンポーネントは、機能単位で `src/components/<Feature>/` にまとめています。下層ページと宮城県エリア演出は遅延読み込みし、トップページの初期JavaScriptと画像読込を抑えています。

Netlifyの既知ルートは `netlify.toml` で管理し、存在しないURLには `public/404.html` を返します。リダイレクト設定を二重管理しないため、`public/_redirects` は使用しません。

## 開発

```sh
npm install
npm run dev
```

## 本番用ファイルの生成

```sh
npm run build
```

生成された `dist` フォルダーが公開用ファイルです。

## ローカル表示

本番用ファイルを生成した後、`start-local.cmd` を実行します。既知ページは直接URLでも表示され、存在しないURLは404になります。
