
export enum CategoryType {
  BRAND = 'brand',
  VIDEO = 'video',
  MUSIC = 'music',
  EVENT = 'event',
  PRINT = 'print',
  LECTURE = 'lecture' // Added LECTURE category
}

export interface ImageStyleConfig {
  fit: 'cover' | 'contain' | 'fill' | 'scale-down'; // CSS object-fit
  position: string; // CSS object-position (e.g., 'center', 'top', 'left', '50% 50%')
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imgStyle?: ImageStyleConfig; 
  videoUrl?: string; 
  audioUrl?: string; 
  tags?: string[];
  gallery?: string[]; 
}

export interface ServiceCategory {
  id: CategoryType;
  title: string;
  subtitle: string;
  icon: string; 
  iconUrl?: string; 
  description: string;
  items: PortfolioItem[];
}

export interface TeamMember {
  id: string;
  name?: string; 
  role: string;
  imageUrl: string;
  imgStyle?: ImageStyleConfig; 
  bio?: string; 
  works?: string[]; 
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  imgStyle?: ImageStyleConfig; 
}

export interface BrandLogo {
  id: string;
  name: string;
  imageUrl: string;
  imgStyle?: ImageStyleConfig; 
}

export interface SubBrand {
  id: string;
  title: string;
  subtitle: string;
  icon?: string;
  iconUrl?: string;
  imgStyle?: ImageStyleConfig; 
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
  backgroundMusic?: string; // New field for global background music
  brandLogos: BrandLogo[]; 
  services: ServiceCategory[];
  team: TeamMember[];
  partners: Partner[]; 
  heroConfig?: { 
    backgroundImage?: string;
    backgroundColor?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
  };
  subBrands?: SubBrand[]; 
  uiIcons?: Record<string, string>; 
}
