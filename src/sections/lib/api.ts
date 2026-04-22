import { GalleryItem } from "../Gallery/types";

const API = "https://lcpb-backend-s83m.vercel.app";

export async function fetchPosts(): Promise<GalleryItem[]> {
  const res = await fetch(`${API}/posts`);
  return res.json();
}

export async function createPost(form: {
  title: string;
  description?: string;
  author?: string;
  file: File;
}): Promise<GalleryItem> {
  const formData = new FormData();

  formData.append("title", form.title);

  if (form.description && form.description !== "")
    formData.append("description", form.description);

  if (form.author && form.author !== "") formData.append("author", form.author);

  formData.append("file", form.file);

  const res = await fetch(`${API}/posts`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}
