
export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  priceDisplay: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'Apartment' | 'Villa' | 'Penthouse' | 'Plot';
  status: string;
  image: string;
  images: string[];
  tags: string[];
  yearBuilt: number;
  description: string;
}

export interface Agent {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  deals: number;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export type ViewState = 'home' | 'buy' | 'sell' | 'invest' | 'agents' | 'blog' | 'blog-detail' | 'about' | 'careers' | 'login' | 'signup' | 'contact';

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  sources?: Array<{
    web?: { uri: string; title: string };
  }>;
}

export interface NavLink {
  name: string;
  id: ViewState;
}
