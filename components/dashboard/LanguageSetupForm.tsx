'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { updateUserLanguages } from '@/lib/actions/user';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import { Loader2, AlertCircle } from 'lucide-react';

interface LanguageSetupFormProps {
  currentNativeLanguage: string | null;
  currentTargetLanguage: string | null;
}

export function LanguageSetupForm({ currentNativeLanguage, currentTargetLanguage }: LanguageSetupFormProps) {
  const router = useRouter();
  const [nativeLanguage, setNativeLanguage] = useState(currentNativeLanguage || '');
  const [targetLanguage, setTargetLanguage] = useState(currentTargetLanguage || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nativeLanguage || !targetLanguage) {
      setError('Please select both languages');
      return;
    }

    if (nativeLanguage === targetLanguage) {
      setError('Your native and target languages must be different');
      return;
    }

    setIsSubmitting(true);

    try {
      await updateUserLanguages(nativeLanguage, targetLanguage);
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('Failed to update languages. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="native-language" className="text-sm font-medium">
          What is your native language?
        </label>
        <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
          <SelectTrigger id="native-language">
            <SelectValue placeholder="Select your native language" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="target-language" className="text-sm font-medium">
          Which language do you want to learn?
        </label>
        <Select value={targetLanguage} onValueChange={setTargetLanguage}>
          <SelectTrigger id="target-language">
            <SelectValue placeholder="Select the language you want to learn" />
          </SelectTrigger>
          <SelectContent>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem
                key={lang.value}
                value={lang.value}
                disabled={lang.value === nativeLanguage}
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Languages'
          )}
        </Button>
      </div>
    </form>
  );
}
