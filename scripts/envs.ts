import "dotenv/config";

const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`process.env.${key} is not defined`);
  return value;
};

export const notionSecret = getEnv("NOTION_SECRET");
export const postsDatabaseId = getEnv("NOTION_POSTS_DATABASE_ID");
