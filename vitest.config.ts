import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      DATABASE_URL: "postgres://user:pass@host:5432/dbname",
      AUTH_SECRET: "this-is-a-very-secret-test-key-32-chars",
      PORT: "5000",
      NODE_ENV: "test"
    }
  }
})
