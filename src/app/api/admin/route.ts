import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized Admin Access' }, { status: 401 });
    }
    const user = session.user as any;
    if (!user.id || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized Admin Access' }, { status: 401 });
    }

    // Get unapproved listings
    const pendingProperties = await prisma.property.findMany({
      where: { isApproved: false },
      include: {
        submitter: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const userCount = await prisma.user.count();
    const propertyCount = await prisma.property.count();

    return NextResponse.json({
      status: 'success',
      data: {
        pendingProperties,
        metrics: { totalUsers: userCount, totalProperties: propertyCount }
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = session.user as any;
    if (!user.id || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { propertyId, action } = await request.json();

    if (action === 'approve') {
      await prisma.property.update({
        where: { id: propertyId },
        data: { isApproved: true }
      });
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
