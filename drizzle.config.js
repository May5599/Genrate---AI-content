const config = {
    dialect: "postgresql",
    schema: "./utils/db/schema.ts",
    out: "./drizzle",
  
    dbCredentials: {
      url: "postgresql://neondb_owner:npg_TknvLb5zw9VD@ep-divine-mouse-a4q6j6jn-pooler.us-east-1.aws.neon.tech/generate-con?sslmode=require",
      connectionString: "postgresql://neondb_owner:npg_TknvLb5zw9VD@ep-divine-mouse-a4q6j6jn-pooler.us-east-1.aws.neon.tech/generate-con?sslmode=require",
    },
  };

export default config;