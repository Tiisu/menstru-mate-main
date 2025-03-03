
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, differenceInDays } from 'date-fns';
import { Calendar as CalendarIcon, Droplets, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type PeriodStatus = 'period' | 'fertile' | 'ovulation' | 'normal';

const getStatusForDate = (
  date: Date, 
  lastPeriod: Date | undefined, 
  cycleLength: number,
  periodLength: number
): PeriodStatus => {
  if (!lastPeriod) return 'normal';
  
  const daysSinceLastPeriod = differenceInDays(date, lastPeriod);
  // Ensure we get a positive value for cycle day calculation
  const cycleDay = ((daysSinceLastPeriod % cycleLength) + cycleLength) % cycleLength;
  
  if (cycleDay < periodLength) return 'period';
  if (cycleDay >= 11 && cycleDay <= 17) {
    return cycleDay === 14 ? 'ovulation' : 'fertile';
  }
  return 'normal';
};

const CycleTracker = () => {
  const [lastPeriod, setLastPeriod] = useState<Date | undefined>(undefined);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const today = new Date();
  
  const nextPeriodDate = lastPeriod 
    ? addDays(lastPeriod, cycleLength) 
    : undefined;
    
  const daysUntilNextPeriod = nextPeriodDate 
    ? Math.max(0, differenceInDays(nextPeriodDate, today))
    : undefined;
    
  const status = lastPeriod 
    ? getStatusForDate(today, lastPeriod, cycleLength, periodLength)
    : undefined;
    
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setLastPeriod(date);
      setShowCalendar(false);
    }
  };

  // Custom day render function for the calendar
  const renderDay = (dayProps: React.HTMLAttributes<HTMLButtonElement> & { date: Date }) => {
    const status = getStatusForDate(dayProps.date, lastPeriod, cycleLength, periodLength);
    
    return (
      <div className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-full",
        status === 'period' && "bg-mate-200",
        status === 'fertile' && "bg-blue-100",
        status === 'ovulation' && "bg-blue-200",
        dayProps.date.toDateString() === today.toDateString() && "border-2 border-primary"
      )}>
        {dayProps.date.getDate()}
      </div>
    );
  };
  
  return (
    <div className="glass-card rounded-3xl p-6 w-full max-w-md mx-auto animate-scale-in">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-foreground">Cycle Tracker</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon size={22} />
          </Button>
        </div>
        
        {showCalendar && (
          <div className="mt-4 animate-fade-in">
            <Calendar
              mode="single"
              selected={lastPeriod}
              onSelect={handleDateSelect}
              className="rounded-md border"
              components={{
                Day: ({ date, ...props }) => (
                  <button {...props}>
                    {renderDay({ date, ...props })}
                  </button>
                )
              }}
            />
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            {lastPeriod ? (
              <div className="bg-background/50 rounded-2xl p-4 border border-border">
                <div className="text-muted-foreground text-sm mb-1">Last period started</div>
                <div className="text-lg font-medium">
                  {format(lastPeriod, 'MMMM d, yyyy')}
                </div>
              </div>
            ) : (
              <div className="bg-background/50 rounded-2xl p-4 border border-border">
                <div className="text-muted-foreground text-sm mb-1">Last period started</div>
                <button 
                  className="text-primary text-lg font-medium"
                  onClick={() => setShowCalendar(true)}
                >
                  Select date
                </button>
              </div>
            )}
          </div>
          
          {lastPeriod && nextPeriodDate && (
            <div className="bg-accent/50 rounded-2xl p-4 border border-accent">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-accent-foreground text-sm mb-1">Next period in</div>
                  <div className="text-lg font-medium flex items-center">
                    <span>{daysUntilNextPeriod} days</span>
                    <span className="text-xs ml-2 text-muted-foreground">
                      {format(nextPeriodDate, 'MMM d')}
                    </span>
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <AlertCircle className="h-5 w-5 text-accent-foreground" />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {lastPeriod && (
          <div className="grid grid-cols-3 gap-3">
            <div className={cn(
              "flex flex-col items-center rounded-2xl p-3 border",
              status === 'period' 
                ? "border-mate-300 bg-mate-50" 
                : "border-border bg-background/50"
            )}>
              <Droplets className={cn(
                "h-6 w-6 mb-1",
                status === 'period' ? "text-mate-500" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs font-medium",
                status === 'period' ? "text-mate-700" : "text-muted-foreground"
              )}>
                Period
              </span>
            </div>
            
            <div className={cn(
              "flex flex-col items-center rounded-2xl p-3 border",
              status === 'fertile' 
                ? "border-blue-300 bg-blue-50" 
                : "border-border bg-background/50"
            )}>
              <Sparkles className={cn(
                "h-6 w-6 mb-1",
                status === 'fertile' ? "text-blue-500" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs font-medium",
                status === 'fertile' ? "text-blue-700" : "text-muted-foreground"
              )}>
                Fertile
              </span>
            </div>
            
            <div className={cn(
              "flex flex-col items-center rounded-2xl p-3 border",
              status === 'ovulation' 
                ? "border-blue-400 bg-blue-100" 
                : "border-border bg-background/50"
            )}>
              <span className={cn(
                "h-6 w-6 mb-1 flex items-center justify-center text-lg",
                status === 'ovulation' ? "text-blue-600" : "text-muted-foreground"
              )}>
                ✨
              </span>
              <span className={cn(
                "text-xs font-medium",
                status === 'ovulation' ? "text-blue-800" : "text-muted-foreground"
              )}>
                Ovulation
              </span>
            </div>
          </div>
        )}
        
        {!lastPeriod && (
          <Button 
            className="w-full"
            onClick={() => setShowCalendar(true)}
          >
            Track Your Cycle
          </Button>
        )}
      </div>
    </div>
  );
};

export default CycleTracker;
