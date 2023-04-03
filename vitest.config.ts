import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { transformAssetUrls } from '@quasar/vite-plugin'
import viteConfig from './vite.config'

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			environment: 'jsdom',
			exclude: [...configDefaults.exclude, 'e2e/*'],
			root: fileURLToPath(new URL('./', import.meta.url)),
			coverage: {
				all: true,
				src: ['src'],
				exclude: [
					'src/main.ts',
					'src/**/*.{test,spec}.ts',
					'src/__tests__',
					'src/router/index.ts',
					'src/types',
				],
			},
		},
		plugins: [vue({ template: { transformAssetUrls } })],
	})
)
