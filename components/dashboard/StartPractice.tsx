'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Loader2 } from 'lucide-react';

interface StartPracticeProps {
  userLanguages: {
    nativeLanguage: string | null;
    targetLanguage: string | null;
  };
}

export function StartPractice({ userLanguages }: StartPracticeProps) {
  const [isMatching, setIsMatching] = useState(false);
  const router = useRouter();

  const handleStartPractice = async () => {
    setIsMatching(true);
    try {
      router.push('/practice/matching');
    } catch (error) {
      console.error('Error starting practice:', error);
      setIsMatching(false);
    }
  };

  const hasLanguagesSet = userLanguages.nativeLanguage && userLanguages.targetLanguage;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Start Practicing
        </CardTitle>
        <CardDescription>
          {hasLanguagesSet
            ? `Practice ${userLanguages.targetLanguage} with a native speaker`
            : 'Set your languages to start practicing'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasLanguagesSet ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium">Learning:</span>
                <span>{userLanguages.targetLanguage}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Native:</span>
                <span>{userLanguages.nativeLanguage}</span>
              </div>
            </div>

            <Button
              onClick={handleStartPractice}
              disabled={isMatching}
              size="lg"
              className="w-full"
            >
              {isMatching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding tutor...
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-4 w-4" />
                  Start Practice Session
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              You&apos;ll be matched with an available tutor for a 10-15 minute audio call
            </p>
          </div>
        ) : (
          <Button
            onClick={() => router.push('/dashboard/setup')}
            variant="outline"
            className="w-full"
          >
            Set Your Languages
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
