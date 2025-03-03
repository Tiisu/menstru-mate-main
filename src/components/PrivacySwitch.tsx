
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Calculator, Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

const PrivacySwitch = () => {
  const [stealthMode, setStealthMode] = useState(false);
  
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-background border border-border">
        {stealthMode ? (
          <Calculator className="h-5 w-5 text-foreground" />
        ) : (
          <Cloud className="h-5 w-5 text-foreground" />
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Stealth Mode</p>
            <p className="text-xs text-muted-foreground">
              {stealthMode 
                ? "App appears as a calculator" 
                : "Normal app appearance"}
            </p>
          </div>
          
          <Switch
            checked={stealthMode}
            onCheckedChange={setStealthMode}
            className={cn(
              stealthMode ? "bg-primary" : "bg-muted",
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacySwitch;
