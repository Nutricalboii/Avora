'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { VentureStage } from '@prisma/client';

export async function getVentures() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const ventures = await prisma.venture.findMany({
      include: {
        founder: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return ventures;
  } catch (error) {
    console.error('Error fetching ventures:', error);
    throw new Error('Failed to fetch ventures');
  }
}

export async function getVentureById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const venture = await prisma.venture.findUnique({
      where: { id },
      include: {
        founder: {
          select: { name: true, email: true },
        },
      },
    });
    return venture;
  } catch (error) {
    console.error('Error fetching venture:', error);
    throw new Error('Failed to fetch venture');
  }
}

export async function createVenture(data: {
  name: string;
  problem: string;
  vision: string;
  fundingTarget: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    throw new Error('Unauthorized');
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) throw new Error('User not found');

    const defaultCapTable = {
      avora: 100,
      founders: 0,
      investors: 0,
      optionsPool: 0,
    };

    const defaultMarketData = {
      tam: 0,
      sam: 0,
      som: 0,
      competitors: [],
    };

    const venture = await prisma.venture.create({
      data: {
        name: data.name,
        problem: data.problem,
        vision: data.vision,
        fundingTarget: data.fundingTarget,
        stage: 'IDEATION',
        capTable: defaultCapTable,
        marketData: defaultMarketData,
        founderId: user.id,
      },
    });

    revalidatePath('/dashboard/ventures');
    return { success: true, venture };
  } catch (error) {
    console.error('Error creating venture:', error);
    throw new Error('Failed to create venture');
  }
}

export async function updateVentureStage(id: string, stage: VentureStage) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const venture = await prisma.venture.update({
      where: { id },
      data: { stage },
    });

    revalidatePath('/dashboard/ventures');
    revalidatePath(`/dashboard/ventures/${id}`);
    return { success: true, venture };
  } catch (error) {
    console.error('Error updating venture stage:', error);
    throw new Error('Failed to update venture stage');
  }
}

export async function updateCapTable(id: string, capTable: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const venture = await prisma.venture.update({
      where: { id },
      data: { capTable },
    });

    revalidatePath(`/dashboard/ventures/${id}`);
    return { success: true, venture };
  } catch (error) {
    console.error('Error updating cap table:', error);
    throw new Error('Failed to update cap table');
  }
}
