// Server-side client for medalize_be's anonymous share-link endpoints (see
// QR_SHARE_PROFILE_PLAN.md Phase 0/1). Every fetch here runs on the server —
// never call these from a Client Component, or the backend URL and its
// response shape become visible in the browser bundle for no reason.

const BACKEND_API_URL = (process.env.BACKEND_API_URL || "http://localhost:8000").replace(/\/$/, "");

export interface PublicWorkplace {
  id: string;
  name: string;
  address: string;
  city: string;
  city_display: string;
  region: string;
  region_display: string;
  type: string;
  type_display: string;
  hospital_name: string;
}

export interface PublicDoctor {
  id: string;
  first_name: string;
  last_name: string;
  specialization: string;
  specialization_display: string;
  avatar_url: string | null;
  bio: string;
  primary_workplace: {
    name: string;
    address: string;
    city_display: string;
  } | null;
  average_rating: number | null;
  review_count: number;
  workplaces: PublicWorkplace[];
}

export interface PublicHospital {
  id: string;
  name: string;
  address: string;
  city: string;
  city_display: string;
  region: string;
  region_display: string;
  status: string;
  logo: string | null;
}

export interface PublicDoctorRosterEntry {
  id: string;
  first_name: string;
  last_name: string;
  specialization: string;
  specialization_display: string;
  avatar_url: string | null;
  average_rating: number | null;
  review_count: number;
}

async function fetchPublic<T>(path: string, locale: string): Promise<T | null> {
  const url = `${BACKEND_API_URL}${path}${path.includes("?") ? "&" : "?"}lang=${locale}`;
  let res: Response;
  try {
    res = await fetch(url);
  } catch (err) {
    console.error(`[publicProfiles] failed to reach backend at ${url}`, err);
    return null;
  }
  if (res.status === 404) return null;
  if (!res.ok) {
    console.error(`[publicProfiles] ${url} returned ${res.status}`);
    return null;
  }
  return (await res.json()) as T;
}

export function getPublicDoctor(id: string, locale: string) {
  return fetchPublic<PublicDoctor>(`/api/doctors/${encodeURIComponent(id)}/public/`, locale);
}

export function getPublicHospital(id: string, locale: string) {
  return fetchPublic<PublicHospital>(`/api/hospitals/${encodeURIComponent(id)}/`, locale);
}

export function getPublicHospitalDoctors(id: string, locale: string) {
  return fetchPublic<PublicDoctorRosterEntry[]>(
    `/api/hospitals/${encodeURIComponent(id)}/doctors/`,
    locale,
  );
}
