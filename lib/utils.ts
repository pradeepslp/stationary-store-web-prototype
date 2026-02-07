export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Format price in INR (Indian Rupees). */
export function formatPrice(price: number): string {
  return `₹${price.toFixed(2)}`;
}

export const PRODUCTS_PER_PAGE = 12;
