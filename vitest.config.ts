import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        coverage: {
            reporter: ['cobertura', 'text'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/')
        }
    }
})