export type Category =
  | "running"
  | "trail"
  | "track"
  | "court"
  | "lifestyle";

export type Gender = "mens" | "womens" | "unisex";

export type Colorway = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
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
