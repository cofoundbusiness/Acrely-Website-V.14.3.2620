
import { Property, Agent, BlogPost } from './types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "The Arbour Luxury Apartments",
    location: "Whitefield, Bangalore",
    price: 24500000,
    priceDisplay: "₹2.45 Cr",
    beds: 3,
    baths: 3,
    sqft: 2150,
    type: "Apartment",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Verified", "Luxury"],
    yearBuilt: 2023,
    description: "Experience the pinnacle of luxury living in the heart of Whitefield. This premium 3BHK offers panoramic views, Italian marble flooring, and smart home automation."
  },
  {
    id: 2,
    title: "Greenfield Villa Estate",
    location: "Gachibowli, Hyderabad",
    price: 45000000,
    priceDisplay: "₹4.50 Cr",
    beds: 4,
    baths: 5,
    sqft: 3800,
    type: "Villa",
    status: "New Launch",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1599809275311-273a3a9987bb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Gated Community", "Private Pool"],
    yearBuilt: 2024,
    description: "A sprawling 4BHK villa in a gated community designed for privacy and peace. Features a private garden, terrace lounge, and dedicated home theater room."
  },
  {
    id: 3,
    title: "Skyline Towers Penthouse",
    location: "Worli, Mumbai",
    price: 85000000,
    priceDisplay: "₹8.50 Cr",
    beds: 3,
    baths: 4,
    sqft: 2600,
    type: "Penthouse",
    status: "Resale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1556912172-45b7abe8d7e1?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Sea View", "High Yield"],
    yearBuilt: 2018,
    description: "Sea-facing penthouse with uninterrupted views of the Arabian Sea. Recently renovated interiors with imported fixtures. High rental yield potential."
  },
  {
    id: 4,
    title: "DLF Cyber City Loft",
    location: "Gurgaon, Delhi-NCR",
    price: 18500000,
    priceDisplay: "₹1.85 Cr",
    beds: 2,
    baths: 2,
    sqft: 1450,
    type: "Apartment",
    status: "Ready to Move",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1616137466211-f939a420be63?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Furnished", "Metro Access"],
    yearBuilt: 2020,
    description: "Modern loft-style apartment perfect for young professionals. Walking distance to Cyber Hub. Comes fully furnished with premium appliances."
  },
  {
    id: 5,
    title: "Eon Waterfront",
    location: "Kharadi, Pune",
    price: 12500000,
    priceDisplay: "₹1.25 Cr",
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "Apartment",
    status: "Under Construction",
    image: "https://images.unsplash.com/photo-1600596542815-60c37c6525fa?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1600596542815-60c37c6525fa?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1551298370-9d3d53740c72?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1499955085172-a104c9463ece?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["River View", "Investment"],
    yearBuilt: 2025,
    description: "River-facing apartments with large balconies. Part of an integrated township with school, mall, and hospital inside the campus."
  },
  {
    id: 6,
    title: "Prestige Golfshire Plot",
    location: "Nandi Hills, Bangalore",
    price: 32000000,
    priceDisplay: "₹3.20 Cr",
    beds: 0,
    baths: 0,
    sqft: 5000,
    type: "Plot",
    status: "Resale",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1501854140884-074bf6bcbde0?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1528698188158-b3260337c89f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1626075908123-6ca2f664531c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Golf Course", "Resort Living"],
    yearBuilt: 2015,
    description: "Build your dream weekend home on this premium golf-facing plot. Access to the clubhouse, spa, and championship golf course."
  }
];

export const INITIAL_AGENTS: Agent[] = [
  { id: 1, name: "Priya Sharma", role: "Luxury Specialist", location: "Bangalore", rating: 4.9, deals: 45, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500" },
  { id: 2, name: "Arjun Mehta", role: "Commercial Expert", location: "Mumbai", rating: 4.8, deals: 32, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500" },
  { id: 3, name: "Sarah John", role: "Villa Specialist", location: "Hyderabad", rating: 5.0, deals: 28, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500" },
  { id: 4, name: "Rohan Das", role: "New Launch Expert", location: "Delhi-NCR", rating: 4.7, deals: 55, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500" },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Scaling Your Startup",
    excerpt: "Strategies for sustainable growth in the competitive real estate tech market. Learn how to navigate early-stage challenges and scale effectively.",
    content: `
      <p>Scaling a startup in the real estate technology sector requires a blend of innovation, market understanding, and operational excellence. As we've grown Acrely, we've learned that sustainable growth isn't just about speed—it's about building a solid foundation.</p>
      
      <h3 class="text-xl font-bold mt-6 mb-3">Product-Market Fit is Key</h3>
      <p>Before aggressive scaling, ensure your solution truly solves a pain point. In PropTech, this means addressing trust deficits and process inefficiencies.</p>

      <h3 class="text-xl font-bold mt-6 mb-3">Technology as an Enabler</h3>
      <p>Leverage AI and data analytics not just as buzzwords, but as tools to provide tangible value to your users—whether it's accurate pricing models or seamless virtual tours.</p>

      <p>Focus on customer retention as much as acquisition. In the property market, trust is your most valuable currency.</p>
    `,
    author: "Sanjay Aaron",
    date: "Oct 24, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
    category: "Growth"
  },
  {
    id: 2,
    title: "Why Founder Verification Matters",
    excerpt: "Building trust in the ecosystem through transparency and vetted backgrounds. Why knowing who you build with is crucial for success.",
    content: `
      <p>In the startup ecosystem, and particularly in high-stakes industries like real estate and fintech, trust is paramount. Founder verification isn't just a checkbox; it's a fundamental layer of security and credibility for investors and customers alike.</p>

      <h3 class="text-xl font-bold mt-6 mb-3">The Trust Deficit</h3>
      <p>The market is flooded with new ventures. Distinguishing legitimate, high-potential teams from fly-by-night operators is a challenge. Verified profiles help bridge this gap.</p>

      <h3 class="text-xl font-bold mt-6 mb-3">Transparency Wins</h3>
      <p>Openly sharing backgrounds, past achievements, and even failures creates a culture of transparency. This attracts better talent, smarter capital, and loyal customers.</p>

      <p>At Acrely, we believe in radical transparency. Knowing the people behind the platform ensures accountability and fosters long-term relationships.</p>
    `,
    author: "Priya Sharma",
    date: "Nov 02, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
    category: "Trust & Safety"
  },
  {
    id: 3,
    title: "How to Find the Right Co-Founder",
    excerpt: "Key traits to look for when building your founding team in the property sector. Complementary skills and shared vision are just the start.",
    content: `
      <p>Building a company is a marathon, not a sprint. Having the right co-founder by your side can be the difference between burning out and crossing the finish line. But how do you find 'the one'?</p>

      <h3 class="text-xl font-bold mt-6 mb-3">Complementary Skill Sets</h3>
      <p>If you're technical, look for someone with business acumen. If you're a visionary, find an operator. Overlap is good for communication, but divergence is essential for coverage.</p>

      <h3 class="text-xl font-bold mt-6 mb-3">Values Alignment</h3>
      <p>Skills can be hired, but values cannot. Ensure you share the same ethical framework and long-term vision for the company. Disagreements on strategy are healthy; disagreements on values are fatal.</p>

      <p>Test the waters with a small project before committing. The pressure of a startup will amplify any cracks in the relationship, so choose wisely.</p>
    `,
    author: "Rahul Menon",
    date: "Nov 15, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
    category: "Team Building"
  }
];
