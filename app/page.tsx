import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Users, Coins, Clock } from 'lucide-react';

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Langvo</h1>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              Practice Languages with Real Humans
            </h1>
            <p className="text-xl text-muted-foreground">
              On-demand audio calls with bilingual tutors. No scheduling, no hassle.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg">
                Get Started
              </Button>
            </Link>
            <Link href="/tutor">
              <Button size="lg" variant="outline">
                Become a Tutor
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            <div className="p-6 border rounded-lg">
              <Phone className="h-10 w-10 mb-4 mx-auto text-primary" />
              <h3 className="font-semibold mb-2">Audio Calls</h3>
              <p className="text-sm text-muted-foreground">
                Practice speaking with real conversation
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <Users className="h-10 w-10 mb-4 mx-auto text-primary" />
              <h3 className="font-semibold mb-2">Native Speakers</h3>
              <p className="text-sm text-muted-foreground">
                Learn from bilingual tutors
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <Clock className="h-10 w-10 mb-4 mx-auto text-primary" />
              <h3 className="font-semibold mb-2">On Demand</h3>
              <p className="text-sm text-muted-foreground">
                No scheduling, practice anytime
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <Coins className="h-10 w-10 mb-4 mx-auto text-primary" />
              <h3 className="font-semibold mb-2">Points System</h3>
              <p className="text-sm text-muted-foreground">
                Tip tutors with weekly points
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
