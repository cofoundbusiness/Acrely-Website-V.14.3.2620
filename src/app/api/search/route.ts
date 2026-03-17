import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PropertyType } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, minPrice, maxPrice, minCapRate, propertyType, sortBy } = body;

    const whereClause: any = {
      isApproved: true,
    };

    if (propertyType && propertyType !== 'all') {
      whereClause.propertyType = propertyType.toUpperCase() as PropertyType;
    }
    
    if (minPrice) {
      whereClause.price = { ...whereClause.price, gte: minPrice };
    }

    if (maxPrice) {
      whereClause.price = { ...whereClause.price, lte: maxPrice };
    }

    if (minCapRate) {
      whereClause.capRate = { gte: minCapRate };
    }

    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { city: { contains: query, mode: 'insensitive' } },
        { state: { contains: query, mode: 'insensitive' } },
        { zipCode: { contains: query, mode: 'insensitive' } }
      ];
    }

    let orderByClause: any = { createdAt: 'desc' }; // default newest
    
    if (sortBy === 'price_asc') orderByClause = { price: 'asc' };
    else if (sortBy === 'price_desc') orderByClause = { price: 'desc' };
    else if (sortBy === 'cap_rate') orderByClause = { capRate: 'desc' };

    const results = await prisma.property.findMany({
      where: whereClause,
      orderBy: orderByClause,
      include: {
        images: { orderBy: { order: 'asc' } },
        analytics: true
      }
    });

    return NextResponse.json({
      status: 'success',
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error("Advanced search error:", error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
