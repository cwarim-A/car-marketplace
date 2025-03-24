import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_KfsaEQ0gDz4L@ep-frosty-voice-a8yc62fw-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
  },
});
