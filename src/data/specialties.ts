import type { Locale } from "@/i18n/routing";

export type SpecialtyId =
  | "general_practice"
  | "cardiology"
  | "dermatology"
  | "pediatrics"
  | "gynecology"
  | "neurology"
  | "orthopedics"
  | "ent"
  | "ophthalmology"
  | "endocrinology"
  | "urology"
  | "psychiatry";

// Mirrors medalize_be/apps/users/i18n/specializations.json (subset shown on the landing page).
export const specialties: Record<SpecialtyId, Record<Locale, string>> = {
  general_practice: {
    en: "General Practice",
    ru: "Терапия",
    az: "Ümumi təbabət",
    tr: "Genel Pratisyenlik",
    fr: "Médecine générale",
    zh: "全科医学",
  },
  cardiology: {
    en: "Cardiology",
    ru: "Кардиология",
    az: "Kardiologiya",
    tr: "Kardiyoloji",
    fr: "Cardiologie",
    zh: "心脏病学",
  },
  dermatology: {
    en: "Dermatology",
    ru: "Дерматология",
    az: "Dermatologiya",
    tr: "Dermatoloji",
    fr: "Dermatologie",
    zh: "皮肤病学",
  },
  pediatrics: {
    en: "Pediatrics",
    ru: "Педиатрия",
    az: "Pediatriya",
    tr: "Pediatri (Çocuk Sağlığı)",
    fr: "Pédiatrie",
    zh: "儿科",
  },
  gynecology: {
    en: "Gynecology",
    ru: "Гинекология",
    az: "Ginekologiya",
    tr: "Kadın Hastalıkları ve Doğum",
    fr: "Gynécologie",
    zh: "妇科",
  },
  neurology: {
    en: "Neurology",
    ru: "Неврология",
    az: "Nevrologiya",
    tr: "Nöroloji",
    fr: "Neurologie",
    zh: "神经病学",
  },
  orthopedics: {
    en: "Orthopedics",
    ru: "Ортопедия",
    az: "Ortopediya",
    tr: "Ortopedi",
    fr: "Orthopédie",
    zh: "骨科",
  },
  ent: {
    en: "ENT (Ear, Nose & Throat)",
    ru: "Отоларингология (ЛОР)",
    az: "Otolarinqologiya (LOR)",
    tr: "Kulak Burun Boğaz (KBB)",
    fr: "ORL (Oto-rhino-laryngologie)",
    zh: "耳鼻喉科",
  },
  ophthalmology: {
    en: "Ophthalmology",
    ru: "Офтальмология",
    az: "Oftalmologiya",
    tr: "Göz Hastalıkları",
    fr: "Ophtalmologie",
    zh: "眼科",
  },
  endocrinology: {
    en: "Endocrinology",
    ru: "Эндокринология",
    az: "Endokrinologiya",
    tr: "Endokrinoloji",
    fr: "Endocrinologie",
    zh: "内分泌科",
  },
  urology: {
    en: "Urology",
    ru: "Урология",
    az: "Urologiya",
    tr: "Üroloji",
    fr: "Urologie",
    zh: "泌尿科",
  },
  psychiatry: {
    en: "Psychiatry",
    ru: "Психиатрия",
    az: "Psixiatriya",
    tr: "Psikiyatri",
    fr: "Psychiatrie",
    zh: "精神病学",
  },
};

export const specialtyOrder: SpecialtyId[] = [
  "general_practice",
  "cardiology",
  "dermatology",
  "pediatrics",
  "gynecology",
  "neurology",
  "orthopedics",
  "ent",
  "ophthalmology",
  "endocrinology",
  "urology",
  "psychiatry",
];
