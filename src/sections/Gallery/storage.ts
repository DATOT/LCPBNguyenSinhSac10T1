import { GalleryItem } from "./types";

const KEY = "gallery_posts";

export function loadPosts(): GalleryItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePosts(posts: GalleryItem[]) {
  localStorage.setItem(KEY, JSON.stringify(posts));
}

export function createPost(data: Omit<GalleryItem, "id">): GalleryItem {
  return {
    ...data,
    id: Date.now(),
  };
}
