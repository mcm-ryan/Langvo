'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { CallWithUsers, CallStatus } from '@/types';

export async function getLearnerCallHistory(limit: number = 10): Promise<CallWithUsers[]> {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return [];
  }

  const calls = await prisma.call.findMany({
    where: {
      learnerId: user.id,
      status: {
        in: [CallStatus.COMPLETED, CallStatus.CANCELLED],
      },
    },
    include: {
      learner: true,
      tutor: true,
    },
    orderBy: {
      startedAt: 'desc',
    },
    take: limit,
  });

  return calls;
}

export async function getActiveCall(): Promise<CallWithUsers | null> {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return null;
  }

  const activeCall = await prisma.call.findFirst({
    where: {
      OR: [
        { learnerId: user.id },
        { tutorId: user.id },
      ],
      status: {
        in: [CallStatus.PENDING, CallStatus.ACTIVE],
      },
    },
    include: {
      learner: true,
      tutor: true,
    },
  });

  return activeCall;
}
