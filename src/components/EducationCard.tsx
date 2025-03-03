
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EducationCardProps {
  title: string;
  subtitle: string;
  content: string;
  imageUrl?: string;
  category: string;
  readTime: string;
}

const EducationCard = ({
  title,
  subtitle,
  content,
  imageUrl,
  category,
  readTime,
}: EducationCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn(
      "neo-card overflow-hidden transition-all duration-300",
      expanded ? "mb-6" : "mb-4"
    )}>
      <div className="relative">
        {imageUrl && (
          <div className="w-full h-48 relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10">
              {category}
            </span>
            <span className="text-xs text-muted-foreground">
              {readTime}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mt-2 text-balance">{title}</h3>
          <p className="text-muted-foreground text-sm mt-1 text-balance">{subtitle}</p>
          
          {expanded && (
            <div className="mt-4 text-sm text-foreground/90 animate-fade-in">
              {content}
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 flex items-center justify-center"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <span className="mr-1">Read less</span>
                <ChevronUp size={16} />
              </>
            ) : (
              <>
                <span className="mr-1">Read more</span>
                <ChevronDown size={16} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
