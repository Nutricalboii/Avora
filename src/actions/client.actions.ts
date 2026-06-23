'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { ClientTier } from '@prisma/client';

export async function getClients() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return clients;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw new Error('Failed to fetch clients');
  }
}

export async function createClient(data: {
  name: string;
  email: string;
  company: string;
  tier: ClientTier;
  totalRevenue: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const client = await prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company,
        tier: data.tier,
        totalRevenue: data.totalRevenue,
      },
    });

    revalidatePath('/dashboard/clients');
    revalidatePath('/dashboard');
    return { success: true, client };
  } catch (error) {
    console.error('Error creating client:', error);
    throw new Error('Failed to create client');
  }
}
