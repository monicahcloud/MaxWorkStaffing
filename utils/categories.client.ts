// utils/categories.client.ts
export type Category = { label: string; slug: string };

export async function loadCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories", { next: { revalidate: 600 } });
  if (!res.ok) return [];
  return (await res.json()) as Category[];
}
