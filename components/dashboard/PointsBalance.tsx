import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Coins, Clock } from 'lucide-react';
import { PointsBalance as PointsBalanceType } from '@/types';

interface PointsBalanceProps {
  balance: PointsBalanceType;
}

export function PointsBalance({ balance }: PointsBalanceProps) {
  const hasExpiringPoints = balance.expiring > 0 && balance.expiringDate;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Your Points
        </CardTitle>
        <CardDescription>Use points to tip tutors after practice sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-4xl font-bold">{balance.total}</div>
            <p className="text-sm text-muted-foreground">Available points</p>
          </div>

          {hasExpiringPoints && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <span className="font-medium">{balance.expiring} points</span> expiring on{' '}
                {balance.expiringDate && formatDate(balance.expiringDate)}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">Weekly refresh</Badge>
            <span>Points expire after 7 days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
