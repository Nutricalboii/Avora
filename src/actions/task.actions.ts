'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { TaskType, TaskPriority } from '@prisma/client';

export async function getTasksByProject(projectId: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
      include: {
        assignedTo: true,
      },
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
}

export async function createTask(data: {
  title: string;
  type: TaskType;
  priority: TaskPriority;
  estimatedHours: number;
  projectId: string;
  assignedToId?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        type: data.type,
        priority: data.priority,
        estimatedHours: data.estimatedHours,
        projectId: data.projectId,
        assignedToId: data.assignedToId || null,
      },
    });

    revalidatePath(`/dashboard/projects`);
    revalidatePath(`/dashboard/tasks`);
    return { success: true, task };
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
}
