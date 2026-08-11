import type { Locale } from "@/i18n/routing";

// Hand-translated instead of Intl.DateTimeFormat: this runs inside a small
// looping demo animation shown to every visitor, and Intl's "az" coverage
// is inconsistent across browsers/Node builds — it silently falls back to
// degraded output ("2026 M08" instead of "Avqust 2026") rather than
// throwing, so there's no reliable way to detect and recover from it at
// runtime. Hardcoding guarantees the same correct output everywhere.

export const WEEKDAY_SHORT: Record<Locale, string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  az: ["B", "B.E", "Ç.A", "Ç", "C.A", "C", "Ş"],
  ru: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
  tr: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
  zh: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  fr: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
};

export const WEEKDAY_LONG: Record<Locale, string[]> = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  az: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"],
  ru: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
  tr: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
  zh: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  fr: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
};

// August, in three forms: header ("August 2026"), genitive/running-text
// (Russian "14 августа 2026" needs the genitive case, distinct from the
// nominative "Август" used in a header), and short ("Aug").
const MONTH_HEADER: Record<Locale, string> = {
  en: "August",
  az: "Avqust",
  ru: "Август",
  tr: "Ağustos",
  zh: "8月",
  fr: "Août",
};
const MONTH_GENITIVE: Record<Locale, string> = {
  en: "August",
  az: "Avqust",
  ru: "августа",
  tr: "Ağustos",
  zh: "8月",
  fr: "août",
};
const MONTH_SHORT: Record<Locale, string> = {
  en: "Aug",
  az: "Avq",
  ru: "авг",
  tr: "Ağu",
  zh: "8月",
  fr: "août",
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatMonthYear(locale: Locale): string {
  if (locale === "zh") return "2026年8月";
  return `${MONTH_HEADER[locale]} 2026`;
}

// weekdayIndex: 0=Sun .. 6=Sat
export function formatFullDate(locale: Locale, day: number, weekdayIndex: number): string {
  const weekday = WEEKDAY_LONG[locale][weekdayIndex];
  switch (locale) {
    case "zh":
      return `2026年8月${day}日${weekday}`;
    case "ru":
      return `${capitalize(weekday)}, ${day} ${MONTH_GENITIVE.ru} 2026`;
    case "az":
      return `${weekday}, ${day} ${MONTH_GENITIVE.az} 2026`;
    case "tr":
      return `${day} ${MONTH_GENITIVE.tr} 2026, ${weekday}`;
    case "fr":
      return `${capitalize(weekday)} ${day} ${MONTH_GENITIVE.fr} 2026`;
    default:
      return `${weekday}, ${MONTH_GENITIVE.en} ${day}, 2026`;
  }
}

export function formatShortDate(locale: Locale, day: number, weekdayIndex: number): string {
  const weekday = WEEKDAY_SHORT[locale][weekdayIndex];
  switch (locale) {
    case "zh":
      return `8月${day}日 ${weekday}`;
    case "ru":
      return `${capitalize(weekday)}, ${day} ${MONTH_SHORT.ru}`;
    case "az":
      return `${weekday}, ${day} ${MONTH_SHORT.az}`;
    case "tr":
      return `${day} ${MONTH_SHORT.tr} ${weekday}`;
    case "fr":
      return `${weekday} ${day} ${MONTH_SHORT.fr}`;
    default:
      return `${weekday}, ${MONTH_SHORT.en} ${day}`;
  }
}
