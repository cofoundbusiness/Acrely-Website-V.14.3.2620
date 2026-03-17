import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PropertyCard } from "@/components/ui/PropertyCard";
// import { prisma } from "@/lib/prisma";
import { HomeHero } from "@/components/home/HomeHero";

// Server action to fetch featured properties securely
async function getFeaturedProperties() {
  try {
    const mockProperties = [
      {
        id: "1",
        title: "Industrial Warehouse",
        price: 25000000, // ₹2.5 Cr
        address: {
          street: "Ambattur Industrial Estate",
          city: "Chennai",
          state: "Tamil Nadu",
          zip: "600058",
          coordinates: [80.1648, 13.1143] as [number, number]
        },
        capRate: 7.2,
        noi: 1800000,
        sqft: 24000,
        type: "Industrial",
        images: ["https://images.unsplash.com/photo-1586528116311-ad8ed716d408?q=80&w=2070&auto=format&fit=crop"],
        tags: ["High Yield", "Triple Net"],
        description: "Prime industrial warehouse in Ambattur Industrial Estate with long-term tenant."
      },
      {
        id: "2",
        title: "Class A Office Building",
        price: 84000000, // ₹8.4 Cr
        address: {
          street: "Old Mahabalipuram Road",
          city: "Chennai",
          state: "Tamil Nadu",
          zip: "600096",
          coordinates: [80.2271, 12.9516] as [number, number]
        },
        capRate: 6.5,
        noi: 5460000,
        sqft: 45000,
        type: "Office",
        images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"],
        tags: ["Value Add", "OMR Corridor"],
        description: "Modern office complex on the OMR IT corridor, Chennai's premier tech district."
      },
      {
        id: "3",
        title: "Retail Strip Center",
        price: 32000000, // ₹3.2 Cr
        address: {
          street: "East Coast Road",
          city: "Chennai",
          state: "Tamil Nadu",
          zip: "603112",
          coordinates: [80.2523, 12.8329] as [number, number]
        },
        capRate: 8.1,
        noi: 2592000,
        sqft: 18500,
        type: "Retail",
        images: ["https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1974&auto=format&fit=crop"],
        tags: ["Anchored", "Stabilized"],
        description: "Fully leased retail center on ECR with strong anchor tenant and high footfall."
      }
    ];

    return mockProperties;
  } catch (error) {
    console.error("Failed to fetch properties", error);
    return [];
  }
}

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHero />

      {/* Featured Properties */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl mb-4">
              Featured Investment Opportunities
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              Explore hand-picked commercial assets boasting strong cap rates, durable yields, and prime visibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link href="/search">
              <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
                Explore All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
