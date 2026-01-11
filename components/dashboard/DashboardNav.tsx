'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, User, LogOut } from 'lucide-react';

interface DashboardNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-2xl font-bold">
              Langvo
            </Link>

            <div className="hidden md:flex items-center gap-2">
              <Link href="/dashboard">
                <Button
                  variant={pathname === '/dashboard' ? 'default' : 'ghost'}
                  size="sm"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            {user.image && (
              <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.image} alt={user.name || 'User'} className="h-full w-full object-cover" />
              </div>
            )}

            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
