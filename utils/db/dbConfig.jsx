import { neon } from "@neondatabase/serverless";

import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const sql = neon("postgresql://neondb_owner:npg_TknvLb5zw9VD@ep-divine-mouse-a4q6j6jn-pooler.us-east-1.aws.neon.tech/generate-con?sslmode=require");

export const db = drizzle(sql, { schema });