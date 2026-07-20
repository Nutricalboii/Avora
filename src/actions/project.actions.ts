'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { ProjectType, ProjectStatus } from '@prisma/client';

export async function getProjects() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

export async function createProject(data: {
  name: string;
  clientId: string;
  type: ProjectType;
  budget: number;
  startDate: Date;
  deadlineDate: Date;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const project = await prisma.project.create({
      data: {
        name: data.name,
        clientId: data.clientId,
        type: data.type,
        budget: data.budget,
        timeline: {
          start: data.startDate,
          deadline: data.deadlineDate,
        },
      },
    });

    // Also update the client's project count
    await prisma.client.update({
      where: { id: data.clientId },
      data: {
        projectsCount: { increment: 1 },
      },
    });

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard');
    return { success: true, project };
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
}

export async function updateProjectStatus(id: string, status: ProjectStatus) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const project = await prisma.project.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard');
    return { success: true, project };
  } catch (error) {
    console.error('Error updating project status:', error);
    throw new Error('Failed to update project status');
  }
}
