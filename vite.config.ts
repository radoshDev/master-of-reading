import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			workbox: {
				cleanupOutdatedCaches: true,
				globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
			},
			manifest: {
				name: 'Master of reading',
				short_name: 'Reading',
				description: 'Learn to read in Ukrainian',
				theme_color: '#84fab0',
				display: 'standalone',
				icons: [
					{
						src: 'icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icon-256x256.png',
						sizes: '256x256',
						type: 'image/png',
					},
					{
						src: 'icon-384x384.png',
						sizes: '384x384',
						type: 'image/png',
					},
					{
						src: 'icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
