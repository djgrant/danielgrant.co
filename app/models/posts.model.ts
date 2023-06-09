import { getPageBySlug, getPages } from "../services/notion";
import { postsDatabaseId } from "~/config";

export const getPosts = () => getPages(postsDatabaseId);
export const getPost = (slug: string) => getPageBySlug(slug, postsDatabaseId);
