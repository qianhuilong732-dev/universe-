# 禹宙星海寄願所｜GitHub + Cloudflare Pages 完整整合包

此版本包含前端、Three.js 3D 模型，以及 Cloudflare Pages Functions 後端 API。沒有要求改用其他網站平台；資料庫使用 Cloudflare D1，仍在 Cloudflare 內。

## 目前包含
- 帳號註冊、登入、登出（密碼 PBKDF2 雜湊；HttpOnly session cookie）
- 個人暱稱、簡介、頭像上傳（限制 600 KB）
- 限時動態文字/照片，24 小時過期
- 私訊（輸入對方帳號開始對話）
- 共享天燈資料與星海展示
- 檢舉 API
- 五種 Three.js 立體幾何造型，可拖曳旋轉
- 本機畫布繪圖上傳保存

## 重要：需要一次性設定 Cloudflare D1
GitHub + Pages 可以部署前端與 Functions，但多帳號資料需要資料庫。D1 是 Cloudflare 自家的資料庫，不是換平台。

1. 在 Cloudflare 控制台建立 D1 database，名稱 `yu-universe-db`。
2. 打開 D1 的 Console，執行本資料夾 `schema.sql` 全部內容。
3. 進入 Cloudflare Pages 專案 → Settings → Functions → D1 database bindings。
4. 新增 binding：Variable name 填 `DB`，Database 選 `yu-universe-db`，儲存並重新部署。
5. GitHub 專案根目錄必須包含 `index.html`、`style.css`、`app.js`、`functions/` 資料夾及 `schema.sql`。

## 部署方式
將 ZIP 解壓縮，把裡面所有檔案與 `functions` 資料夾上傳到原本連接 Cloudflare Pages 的 GitHub repository。Pages 需使用 static site / framework preset None，Build command 留空，Build output directory 設為 `/` 或 `.`。

## 目前原型的明確限制
- 3D 模型是真正 Three.js 幾何體；五種造型是厚度倒角模型，並非氣囊式充氣布膜的物理模擬。
- 繪畫目前存成 2D 畫布圖，尚未 UV 貼圖到 3D 曲面。
- 私訊為定時刷新，不是 WebSocket 推播。
- 限動照片與頭像暫存 D1，適合小規模測試；正式大量使用應改用 Cloudflare R2。
- 限動自動從查詢結果排除過期內容；D1 中的舊列可之後定期清理。
- 有檢舉紀錄功能，但尚未有管理員審核後台；上線給公眾前應建立管理員流程、封鎖 UI、濫用防護及年齡適用政策。
- 目前不應公開宣稱是已完成的大型社群服務；先用少數可信任測試者驗證。
