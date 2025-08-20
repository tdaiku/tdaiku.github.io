import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'

// site.jsonから設定を読み込み
const siteConfig = JSON.parse(readFileSync('./config/site.json', 'utf8'))

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  const isStaging = mode === 'staging'
  
  let publicPath = '/'
  if (isStaging && process.env.PUBLIC_PATH) {
    publicPath = process.env.PUBLIC_PATH
  }

  return {
    root: 'www',
    base: publicPath,
    
    build: {
      outDir: '../docs',
      assetsDir: 'resources',
      rollupOptions: {
        input: {
          // HTMLファイルをメインエントリーポイントとして追加
          index: resolve(__dirname, 'www/index.html'),
          // JavaScriptファイルも追加
          ...Object.fromEntries(
            Object.entries(siteConfig.scripts).map(([name, path]) => [
              name,
              resolve(__dirname, 'www', path.replace('./', ''))
            ])
          )
        },
        output: {
          entryFileNames: 'resources/js/[name].[hash].js',
          chunkFileNames: 'resources/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.')
            const ext = info[info.length - 1]
            if (/\.(css)$/.test(assetInfo.name)) {
              return `resources/css/[name].[hash].${ext}`
            }
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
              return `resources/img/[name].[hash].${ext}`
            }
            return `resources/[ext]/[name].[hash].[ext]`
          }
        }
      },
      sourcemap: !isProd
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, 'www'),
        'slick': resolve(__dirname, 'node_modules/slick-carousel/slick/')
      }
    },

    css: {
      postcss: './config/postcss.config.js'
    },

    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true
    },

    plugins: []
  }
})
