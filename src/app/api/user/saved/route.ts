import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = session.user as any;
    if (!user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const saved = await prisma.savedProperty.findMany({
      where: { userId: user.id },
      include: {
        property: {
          include: {
            images: { orderBy: { order: 'asc' }, take: 1 }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ status: 'success', data: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = session.user as any;
    if (!user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { propertyId } = await request.json();

    const existing = await prisma.savedProperty.findUnique({
      where: {
        userId_propertyId: {
          userId: user.id,
          propertyId
        }
      }
    });

    if (existing) {
      // Toggle off
      await prisma.savedProperty.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ status: 'success', action: 'removed' });
    } else {
      // Toggle on
      await prisma.savedProperty.create({
        data: {
          userId: user.id,
          propertyId
        }
      });
      return NextResponse.json({ status: 'success', action: 'added' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
