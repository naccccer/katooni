export type Category =
  | "running"
  | "trail"
  | "track"
  | "court"
  | "lifestyle";

export type Gender = "mens" | "womens" | "unisex";

export type Brand =
  | "katooni"
  | "nike"
  | "adidas"
  | "on"
  | "asics"
  | "newbalance"
  | "hoka";

export const BRAND_LABELS: Record<Brand, string> = {
  katooni: "Katooni",
  nike: "Nike",
  adidas: "Adidas",
  on: "On",
  asics: "Asics",
  newbalance: "New Balance",
  hoka: "Hoka",
};

export type Colorway = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  category: Category;
  gender: Gender;
  price: number;
  currency: "USD";
  colorways: Colorway[];
  primaryHex: string;
  image: string;
  imageAlt: string;
  badge?: "new-drop" | "restock" | "last-pairs" | null;
  popularity: number; // 0-100
  releasedAt: string; // ISO date
  sizes: number[]; // EU
  short: string; // one-line product description
  weightGrams: number;
  drop: number; // mm
};
