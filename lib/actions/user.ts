'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { UserWithProfile, PointsBalance } from '@/types';

export async function getCurrentUser(): Promise<UserWithProfile | null> {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      tutorProfile: true,
    },
  });

  return user;
}

export async function getPointsBalance(userId: string): Promise<PointsBalance> {
  const now = new Date();

  const points = await prisma.pointsLedger.findMany({
    where: {
      userId,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: now } },
      ],
    },
    orderBy: {
      expiresAt: 'asc',
    },
  });

  const total = points.reduce((sum, transaction) => sum + transaction.amount, 0);

  const expiringPoints = points.filter(p => p.expiresAt && p.expiresAt <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const expiring = expiringPoints.reduce((sum, transaction) => sum + transaction.amount, 0);
  const expiringDate = expiringPoints.length > 0 ? expiringPoints[0].expiresAt : null;

  return {
    total,
    expiring,
    expiringDate,
  };
}

export async function updateUserLanguages(
  nativeLanguage: string,
  targetLanguage: string
): Promise<UserWithProfile | null> {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      nativeLanguage,
      targetLanguage,
    },
    include: {
      tutorProfile: true,
    },
  });

  return user;
}
