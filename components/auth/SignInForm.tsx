'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';

export function SignInForm() {
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        className="w-full"
        size="lg"
      >
        <Chrome className="mr-2 h-5 w-5" />
        Sign in with Google
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}
