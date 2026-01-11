import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/user';
import { LanguageSetupForm } from '@/components/dashboard/LanguageSetupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Languages } from 'lucide-react';

export default async function SetupPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-6 w-6" />
            Language Setup
          </CardTitle>
          <CardDescription>
            Tell us which language you want to learn and which language you already speak
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LanguageSetupForm
            currentNativeLanguage={user.nativeLanguage}
            currentTargetLanguage={user.targetLanguage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
