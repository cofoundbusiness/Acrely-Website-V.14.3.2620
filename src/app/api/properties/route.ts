import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PropertyType, ListingType } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as PropertyType | null;
    const city = searchParams.get('city');
    const isFeatured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 50;
    
    // Construct Prisma where clause dynamically
    const whereClause: any = {
      isApproved: true,
    };

    if (type && type !== 'all' as any) {
      whereClause.propertyType = type;
    }

    if (city) {
      whereClause.city = {
        equals: city,
        mode: 'insensitive',
      };
    }

    if (isFeatured) {
      whereClause.isFeatured = true;
    }

    const properties = await prisma.property.findMany({
      where: whereClause,
      take: limit,
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        analytics: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json({
      status: 'success',
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // To be protected by session auth in a production environment
  try {
    const body = await request.json();
    const {
      title, description, propertyType, listingType, price,
      capRate, noi, sqft, lotSizeAcres, yearBuilt, occupancy,
      streetAddress, city, state, zipCode, lat, lng,
      images, submitterId
    } = body;

    const property = await prisma.property.create({
      data: {
        title, description, propertyType, listingType, price,
        capRate, noi, sqft, lotSizeAcres, yearBuilt, occupancy,
        streetAddress, city, state, zipCode, lat, lng,
        isApproved: false, // requires admin approval
        submitter: {
          connect: { id: submitterId }
        },
        images: {
          create: images.map((url: string, idx: number) => ({
            url,
            order: idx
          }))
        },
        // Auto-create blank analytics record
        analytics: {
          create: {}
        }
      },
      include: {
        images: true,
        analytics: true
      }
    });

    return NextResponse.json({
      status: 'success',
      data: property
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
