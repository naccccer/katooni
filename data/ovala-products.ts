export type OvalaProduct = {
  id: string;
  brandEn: string;
  brandFa: string;
  nameEn: string;
  nameFa: string;
  cardImage: string;
  heroImage: string;
  video: string;
};

export const ovalaProducts: OvalaProduct[] = [
  {
    id: "nike-pegasus-trail-4",
    brandEn: "Nike",
    brandFa: "نایکی",
    nameEn: "Pegasus Trail 4",
    nameFa: "پگاسوس تریل ۴",
    cardImage: "/hero-shoe-01.png",
    heroImage: "/hero-shoe-01.png",
    video: "/hero-shoe-01.mp4",
  },
  {
    id: "new-balance-9060-volt",
    brandEn: "New Balance",
    brandFa: "نیو بالانس",
    nameEn: "9060 Volt",
    nameFa: "۹۰۶۰ ولت",
    cardImage: "/hero-shoe-02.png",
    heroImage: "/hero-shoe-02.png",
    video: "/hero-shoe-02.mp4",
  },
  {
    id: "salomon-xt-6",
    brandEn: "Salomon",
    brandFa: "سالومون",
    nameEn: "XT-6",
    nameFa: "اکس‌تی ۶",
    cardImage: "/hero-shoe-03.png",
    heroImage: "/hero-shoe-03.png",
    video: "/hero-shoe-03.mp4",
  },
];
