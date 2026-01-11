import { redirect } from 'next/navigation';
import { getCurrentUser, getPointsBalance } from '@/lib/actions/user';
import { getLearnerCallHistory } from '@/lib/actions/calls';
import { PointsBalance } from '@/components/dashboard/PointsBalance';
import { CallHistory } from '@/components/dashboard/CallHistory';
import { StartPractice } from '@/components/dashboard/StartPractice';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const [pointsBalance, callHistory] = await Promise.all([
    getPointsBalance(user.id),
    getLearnerCallHistory(10),
  ]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user.name || 'Learner'}!</h1>
        <p className="text-muted-foreground mt-1">
          Ready to practice your language skills?
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <StartPractice
            userLanguages={{
              nativeLanguage: user.nativeLanguage,
              targetLanguage: user.targetLanguage,
            }}
          />
          <CallHistory calls={callHistory} />
        </div>

        <div>
          <PointsBalance balance={pointsBalance} />
        </div>
      </div>
    </div>
  );
}
