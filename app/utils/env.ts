export const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`process.env.${key} is not defined`);
  return value;
};
