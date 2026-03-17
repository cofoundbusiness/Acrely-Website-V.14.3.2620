export type PropertyType = 
  | "Office"
  | "Retail"
  | "Industrial"
  | "Multifamily"
  | "Land"
  | "Warehouse"
  | "Special Purpose";

export interface Property {
  id: string;
  title: string;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  capRate: number; // e.g. 5.5 (%)
  noi: number; // Net Operating Income
  sqft: number;
  lotSizeAcres?: number;
  yearBuilt: number;
  occupancy: number; // e.g. 95 (%)
  type: PropertyType;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  tags: string[];
  description: string;
}
