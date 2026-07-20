import type { TourId } from "@/lib/tours"

export type AgencyId = "ethioguide" | "simien-horizons" | "danakil-expeditions"

export type AgencyRecord = {
  id: AgencyId
  logoInitials: string
  coverImage: string
  rating: string
  reviewCount: number
  verified: boolean
  phone: string
  email: string
  website: string
  websiteLabel: string
  tours: TourId[]
}

export const AGENCIES: Record<AgencyId, AgencyRecord> = {
  ethioguide: {
    id: "ethioguide",
    logoInitials: "EG",
    coverImage:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=80",
    rating: "4.8",
    reviewCount: 156,
    verified: true,
    phone: "+251 911 234 567",
    email: "hello@ethioguide.com",
    website: "https://ethioguide.com",
    websiteLabel: "ethioguide.com",
    tours: ["lalibela", "danakil"],
  },
  "simien-horizons": {
    id: "simien-horizons",
    logoInitials: "SH",
    coverImage:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    rating: "4.9",
    reviewCount: 98,
    verified: true,
    phone: "+251 912 555 010",
    email: "trek@simienhorizons.com",
    website: "https://simienhorizons.com",
    websiteLabel: "simienhorizons.com",
    tours: ["simien"],
  },
  "danakil-expeditions": {
    id: "danakil-expeditions",
    logoInitials: "DX",
    coverImage:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
    rating: "4.7",
    reviewCount: 64,
    verified: true,
    phone: "+251 913 700 220",
    email: "salt@danakilexpeditions.com",
    website: "https://danakilexpeditions.com",
    websiteLabel: "danakilexpeditions.com",
    tours: ["danakil"],
  },
}

export function isAgencyId(id: string): id is AgencyId {
  return id in AGENCIES
}

export function getAgency(id: string): AgencyRecord | undefined {
  return isAgencyId(id) ? AGENCIES[id] : undefined
}

export function listAgencyIds(): AgencyId[] {
  return Object.keys(AGENCIES) as AgencyId[]
}
