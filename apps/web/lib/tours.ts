export type TourId = "lalibela" | "simien" | "danakil"

export type TourRecord = {
  id: TourId
  price: number
  rating: string
  reviewCount: number
  images: string[]
  providerInitials: string
  agencyId: string
}

export const TOURS: Record<TourId, TourRecord> = {
  lalibela: {
    id: "lalibela",
    price: 350,
    rating: "4.9",
    reviewCount: 128,
    providerInitials: "ET",
    agencyId: "ethioguide",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80",
    ],
  },
  simien: {
    id: "simien",
    price: 3800,
    rating: "4.8",
    reviewCount: 85,
    providerInitials: "SH",
    agencyId: "simien-horizons",
    images: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80",
    ],
  },
  danakil: {
    id: "danakil",
    price: 1900,
    rating: "5.0",
    reviewCount: 54,
    providerInitials: "DX",
    agencyId: "danakil-expeditions",
    images: [
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
    ],
  },
}

export function isTourId(id: string): id is TourId {
  return id in TOURS
}

export function getTour(id: string): TourRecord | undefined {
  return isTourId(id) ? TOURS[id] : undefined
}

export function listTourIds(): TourId[] {
  return Object.keys(TOURS) as TourId[]
}
