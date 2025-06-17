// Types pour l'application

// Type pour les traductions
export interface TranslationRecord {
  [key: string]: string
}

export interface Translations {
  fr: TranslationRecord
  en: TranslationRecord
  ru: TranslationRecord
}

export type Language = keyof Translations

// Type pour les photos
export interface Photo {
  src: string
  alt: string
  caption: string
}

// Type pour les données de timeline
export interface TimelineEvent {
  id: string
  date: string
  title: {
    fr: string
    en: string
    ru: string
  }
  description: {
    fr: string
    en: string
    ru: string
  }
}

// Type pour les points sur le globe
export interface GlobePoint {
  lat: number
  lng: number
  name: string
  person: string
  color: string
  size: number
}
