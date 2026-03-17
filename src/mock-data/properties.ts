import { Property } from "@/types/property";

export const mockProperties: Property[] = [
  {
    id: "prop-001",
    title: "Prime OMR Class A Office",
    price: 125000000, // ₹12.5 Cr
    address: {
      street: "Old Mahabalipuram Road, Perungudi",
      city: "Chennai",
      state: "Tamil Nadu",
      zipCode: "600096",
    },
    capRate: 6.2,
    noi: 7750000,
    sqft: 45000,
    yearBuilt: 2010,
    occupancy: 95,
    type: "Office",
    coordinates: { lat: 12.9516, lng: 80.2271 },
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop",
    ],
    tags: ["Trophy Asset", "OMR Corridor", "Class A"],
    description: "Exceptional Class A office building on the OMR IT corridor. Features modern amenities, energy-efficient systems, and high-profile corporate technology tenants.",
  },
  {
    id: "prop-002",
    title: "Oragadam Logistics Hub",
    price: 84000000, // ₹8.4 Cr
    address: {
      street: "Oragadam Industrial Corridor",
      city: "Chennai",
      state: "Tamil Nadu",
      zipCode: "602105",
    },
    capRate: 5.8,
    noi: 4872000,
    sqft: 120000,
    yearBuilt: 2018,
    occupancy: 100,
    type: "Warehouse",
    coordinates: { lat: 12.7499, lng: 79.9603 },
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1470&auto=format&fit=crop",
    ],
    tags: ["Logistics", "Triple Net", "High Clearance"],
    description: "Modern high-clearance distribution center in the Oragadam auto & industrial corridor. Fully leased to a national logistics operator on a NNN basis.",
  },
  {
    id: "prop-003",
    title: "Guindy Multifamily Residences",
    price: 240000000, // ₹24 Cr
    address: {
      street: "Guindy Industrial Estate",
      city: "Chennai",
      state: "Tamil Nadu",
      zipCode: "600032",
    },
    capRate: 4.9,
    noi: 11760000,
    sqft: 200000,
    yearBuilt: 2021,
    occupancy: 98,
    type: "Multifamily",
    coordinates: { lat: 13.0079, lng: 80.2194 },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop",
    ],
    tags: ["Value-Add", "200+ Units", "Premium"],
    description: "Newly constructed luxury multifamily asset in Guindy, one of Chennai's most well-connected localities. Includes premium amenities and strong rental yield potential.",
  },
  {
    id: "prop-004",
    title: "ECR Retail Plaza",
    price: 45000000, // ₹4.5 Cr
    address: {
      street: "East Coast Road, Thiruvanmiyur",
      city: "Chennai",
      state: "Tamil Nadu",
      zipCode: "600041",
    },
    capRate: 7.1,
    noi: 3195000,
    sqft: 22000,
    yearBuilt: 2005,
    occupancy: 88,
    type: "Retail",
    coordinates: { lat: 12.9831, lng: 80.2582 },
    images: [
      "https://images.unsplash.com/photo-1519494140681-8b17d7678b80?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555529733-0e670560f4e1?q=80&w=1470&auto=format&fit=crop",
    ],
    tags: ["Neighbourhood Centre", "Upside", "Anchored"],
    description: "Stable grocery-anchored retail centre on the high-footfall ECR strip. Value-add opportunity through lease-up of remaining vacant suites.",
  },
  {
    id: "prop-005",
    title: "Sriperumbudur Development Land",
    price: 32000000, // ₹3.2 Cr
    address: {
      street: "Sriperumbudur Growth Corridor",
      city: "Kanchipuram",
      state: "Tamil Nadu",
      zipCode: "602105",
    },
    capRate: 0,
    noi: 0,
    sqft: 0,
    lotSizeAcres: 5.4,
    yearBuilt: 0,
    occupancy: 0,
    type: "Land",
    coordinates: { lat: 12.9674, lng: 79.9462 },
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?q=80&w=1470&auto=format&fit=crop",
    ],
    tags: ["Development", "Zoned Commercial", "High Visibility"],
    description: "Prime land parcel zoned for mixed-use commercial development in the Sriperumbudur–Oragadam electronics and auto manufacturing corridor. Excellent highway visibility.",
  },
  {
    id: "prop-006",
    title: "Ambattur Medical Office",
    price: 78000000, // ₹7.8 Cr
    address: {
      street: "Ambattur Industrial Estate, Phase II",
      city: "Chennai",
      state: "Tamil Nadu",
      zipCode: "600058",
    },
    capRate: 6.8,
    noi: 5304000,
    sqft: 32000,
    yearBuilt: 2012,
    occupancy: 100,
    type: "Office",
    coordinates: { lat: 13.1143, lng: 80.1648 },
    images: [
      "https://images.unsplash.com/photo-1519494026892-80ba3f5247a3?q=80&w=1470&auto=format&fit=crop",
    ],
    tags: ["Medical", "NNN", "Stabilized"],
    description: "Fully stabilised medical office building anchored by a leading regional healthcare provider on a long-term NNN lease. Recession-resilient asset in a rapidly growing micro-market.",
  }
];
