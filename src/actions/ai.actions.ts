'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { AiFramework } from '@prisma/client';

export async function getAiModels() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const models = await prisma.aiModelRegistry.findMany({
      include: {
        project: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return models;
  } catch (error) {
    console.error('Error fetching AI models:', error);
    throw new Error('Failed to fetch AI models');
  }
}

export async function registerAiModel(data: {
  name: string;
  framework: AiFramework;
  endpoint: string;
  projectId?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const model = await prisma.aiModelRegistry.create({
      data: {
        name: data.name,
        framework: data.framework,
        endpoint: data.endpoint,
        projectId: data.projectId || null,
        deployedDate: new Date(),
        accuracy: 0, // Placeholder
        latency_ms: 0, // Placeholder
        cost_per_inference: 0, // Placeholder
      },
    });

    revalidatePath('/dashboard/ai-models');
    revalidatePath('/dashboard');
    return { success: true, model };
  } catch (error) {
    console.error('Error registering AI model:', error);
    throw new Error('Failed to register AI model');
  }
}
