import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Phone, Clock } from 'lucide-react';
import { CallWithUsers, CallStatus } from '@/types';

interface CallHistoryProps {
  calls: CallWithUsers[];
}

export function CallHistory({ calls }: CallHistoryProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: CallStatus) => {
    const variants: Record<CallStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      [CallStatus.COMPLETED]: { label: 'Completed', variant: 'default' },
      [CallStatus.CANCELLED]: { label: 'Cancelled', variant: 'destructive' },
      [CallStatus.ACTIVE]: { label: 'Active', variant: 'default' },
      [CallStatus.PENDING]: { label: 'Pending', variant: 'secondary' },
    };

    const { label, variant } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  if (calls.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Practice History
          </CardTitle>
          <CardDescription>Your recent practice sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Phone className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No practice sessions yet</p>
            <p className="text-sm">Start practicing to see your history here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Practice History
        </CardTitle>
        <CardDescription>Your recent practice sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call) => (
              <TableRow key={call.id}>
                <TableCell>{formatDate(call.startedAt)}</TableCell>
                <TableCell className="font-medium">{call.tutor.name || 'Anonymous'}</TableCell>
                <TableCell>{call.language}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(call.durationSeconds)}
                </TableCell>
                <TableCell>
                  {call.tipAmount ? (
                    <span className="text-muted-foreground">{call.tipAmount} pts</span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(call.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
