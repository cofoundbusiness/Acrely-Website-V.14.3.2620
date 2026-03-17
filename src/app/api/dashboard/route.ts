import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = session.user as any;
    if (!user.id || user.role === 'USER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;
    
    // Get properties submitted by this user
    const submittedProperties = await prisma.property.findMany({
      where: { submitterId: userId },
      include: {
        analytics: true,
        _count: {
          select: { savedBy: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate sum of page views
    const totalViews = submittedProperties.reduce((acc: any, p: any) => acc + (p.analytics?.pageViews || 0), 0);
    const totalSaves = submittedProperties.reduce((acc: any, p: any) => acc + (p._count?.savedBy || 0), 0);

    return NextResponse.json({
      status: 'success',
      data: {
        properties: submittedProperties,
        metrics: {
          totalListings: submittedProperties.length,
          activeListings: submittedProperties.filter((p: any) => p.isApproved).length,
          totalViews,
          totalSaves
        }
      }
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
