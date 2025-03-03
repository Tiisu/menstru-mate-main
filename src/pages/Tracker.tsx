
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { 
  Calendar as CalendarIcon, 
  Droplets, 
  Thermometer, 
  HeartPulse, 
  Star, 
  Pill, 
  Frown, 
  Plus 
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';

const symptoms = [
  { icon: Droplets, label: 'Flow', color: 'bg-mate-100 text-mate-600' },
  { icon: Thermometer, label: 'Temperature', color: 'bg-orange-100 text-orange-600' },
  { icon: HeartPulse, label: 'Mood', color: 'bg-violet-100 text-violet-600' },
  { icon: Star, label: 'Energy', color: 'bg-blue-100 text-blue-600' },
  { icon: Pill, label: 'Medication', color: 'bg-emerald-100 text-emerald-600' },
  { icon: Frown, label: 'Pain', color: 'bg-red-100 text-red-600' },
];

const Tracker = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [flowLevel, setFlowLevel] = useState(0);
  const [activeTab, setActiveTab] = useState('log');
  const [symptomLogs, setSymptomLogs] = useState<{[key: string]: number}>({});
  
  const handleSymptomLog = (symptom: string, value: number[]) => {
    setSymptomLogs({
      ...symptomLogs,
      [symptom]: value[0]
    });
  };

  return (
    <div className="pt-4 pb-20 px-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cycle Tracker</h1>
        <Button variant="outline" size="icon" className="rounded-full">
          <CalendarIcon size={20} />
        </Button>
      </div>
      
      <div className="glass-card rounded-3xl p-5 mb-6 animate-scale-in">
        <div className="text-center mb-4">
          <p className="text-muted-foreground mb-1">Selected date</p>
          <h2 className="text-xl font-semibold">{format(date, 'MMMM d, yyyy')}</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {differenceInDays(new Date(), date) === 0 
              ? 'Today' 
              : differenceInDays(new Date(), date) === 1 
                ? 'Yesterday' 
                : differenceInDays(new Date(), date) === -1 
                  ? 'Tomorrow' 
                  : `${Math.abs(differenceInDays(new Date(), date))} days ${differenceInDays(new Date(), date) > 0 ? 'ago' : 'from now'}`}
          </p>
        </div>
        
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border mx-auto"
        />
      </div>
      
      <Tabs defaultValue="log" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="log">Log Symptoms</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="log" className="animate-fade-in">
          <div className="space-y-6">
            <div className="neo-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-mate-100">
                  <Droplets className="h-5 w-5 text-mate-600" />
                </div>
                <div>
                  <h3 className="font-medium">Period Flow</h3>
                  <p className="text-sm text-muted-foreground">Track your flow intensity</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <span className="text-sm text-muted-foreground">Light</span>
                  <span className="text-sm text-muted-foreground">Heavy</span>
                </div>
                <Slider 
                  defaultValue={[0]} 
                  max={4} 
                  step={1} 
                  value={[flowLevel]}
                  onValueChange={(value) => setFlowLevel(value[0])}
                  className="mb-2"
                />
                <div className="grid grid-cols-5 gap-2">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <button
                      key={level}
                      className={cn(
                        "h-10 rounded-md flex items-center justify-center border",
                        flowLevel === level 
                          ? "bg-mate-100 border-mate-300 text-mate-600" 
                          : "border-border bg-background text-muted-foreground"
                      )}
                      onClick={() => setFlowLevel(level)}
                    >
                      {level === 0 ? 'None' : '•'.repeat(level)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {symptoms.slice(1).map((symptom, index) => (
                <div key={index} className="neo-card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      symptom.color.split(' ')[0] // Get just the background color
                    )}>
                      <symptom.icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium text-sm">{symptom.label}</h3>
                  </div>
                  
                  <Slider 
                    defaultValue={[0]} 
                    max={4} 
                    step={1}
                    value={[symptomLogs[symptom.label.toLowerCase()] || 0]}
                    onValueChange={(value) => handleSymptomLog(symptom.label.toLowerCase(), value)}
                    className="my-2"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>None</span>
                    <span>Severe</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full" size="lg">
              <Plus size={18} className="mr-2" />
              Save Today's Log
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="animate-fade-in">
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <CalendarIcon size={28} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No logs yet</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mb-6">
              Start tracking your symptoms to see your history here
            </p>
            <Button onClick={() => setActiveTab('log')}>
              Start Tracking
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tracker;
