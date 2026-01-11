import { User, TutorProfile, Call, PointsLedger, UserRole, CallStatus, PointsTransactionType } from '@/app/generated/prisma';

export type {
  User,
  TutorProfile,
  Call,
  PointsLedger,
};

export { UserRole, CallStatus, PointsTransactionType };

export type UserWithProfile = User & {
  tutorProfile?: TutorProfile | null;
};

export type CallWithUsers = Call & {
  learner: User;
  tutor: User;
};

export type PointsBalance = {
  total: number;
  expiring: number;
  expiringDate: Date | null;
};
