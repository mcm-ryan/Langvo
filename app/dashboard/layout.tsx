import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { DashboardNav } from '@/components/dashboard/DashboardNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen">
      <DashboardNav user={session.user} />
      <main>{children}</main>
    </div>
  );
}
