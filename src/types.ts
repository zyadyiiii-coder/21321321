
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
  videoUrl?: string; // URL to the video file (mp4)
  audioUrl?: string; // URL to audio file (mp3)
  tags?: string[];
  gallery?: string[]; // Extra images for the detail page
}

export interface ServiceCategory {
  id: CategoryType;
  title: string;
  subtitle: string;
  icon: string; // FontAwesome class
  description: string;
  items: PortfolioItem[];
}

export interface TeamMember {
  id: string;
  name?: string; // Optional, can use role as main identifier based on PDF
  role: string;
  imageUrl: string;
  bio?: string; // Detailed introduction
  works?: string[]; // Array of image URLs showing their work
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
}

export interface BrandLogo {
  id: string;
  name: string;
  imageUrl: string;
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
  brandLogos: BrandLogo[]; // Added brand logos section
  services: ServiceCategory[];
  team: TeamMember[];
  partners: Partner[]; // Added partners section
  heroConfig?: { // Added hero background config
    backgroundImage?: string;
    backgroundColor?: string;
  };
}
