import { getPageBySlug, getPages } from "../services/notion";
import { postsDatabaseId } from "~/config";
import TTLCache from "@isaacs/ttlcache";

const cache = new TTLCache({ max: 10000, ttl: 120000 });

export const getPosts = async () => {
  if (cache.has(postsDatabaseId)) return cache.get(postsDatabaseId);
  return getPages(postsDatabaseId);
};

export const getPost = async (slug: string) => {
  const cacheKey = postsDatabaseId + slug;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  return getPageBySlug(slug, postsDatabaseId);
};
