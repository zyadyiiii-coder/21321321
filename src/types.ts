export enum CategoryType {
  BRAND = 'brand',
  VIDEO = 'video',
  MUSIC = 'music',
  EVENT = 'event',
  PRINT = 'print'
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  videoUrl?: string; // If present, it's a video item
  tags?: string[];
}

export interface ServiceCategory {
  id: CategoryType;
  title: string;
  subtitle: string;
  icon: string; // FontAwesome class
  description: string;
  items: PortfolioItem[];
}

export interface ContactInfo {
  phone: string[];
  companyName: string;
  address?: string;
}

export interface AppConfig {
  companyName: string;
  slogan: string;
  description: string;
  contact: ContactInfo;
  services: ServiceCategory[];
}