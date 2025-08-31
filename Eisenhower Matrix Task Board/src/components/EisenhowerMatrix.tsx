import { useIsMobile } from '@/hooks/use-mobile';
import { Quadrant, quadrants } from '@/types/task';
import { QuadrantPanel } from '@/components/QuadrantPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function EisenhowerMatrix() {
  const isMobile = useIsMobile();
  
  // Desktop/Tablet Layout - Matrix or Grid
  if (!isMobile) {
    // Desktop view - 2x2 grid
    return (
      <div className="h-[calc(100vh-4rem)] p-4">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Top Row - Important */}
          <div className="flex flex-col">
            {/* Important & Urgent (Q1) */}
            <div className="flex-1 mb-2">
              <QuadrantPanel quadrantId="urgent-important" />
            </div>
            
            {/* Important & Not Urgent (Q2) */}
            <div className="flex-1 mt-2">
              <QuadrantPanel quadrantId="important" />
            </div>
          </div>
          
          {/* Bottom Row - Not Important */}
          <div className="flex flex-col">
            {/* Urgent & Not Important (Q3) */}
            <div className="flex-1 mb-2">
              <QuadrantPanel quadrantId="urgent" />
            </div>
            
            {/* Not Urgent & Not Important (Q4) */}
            <div className="flex-1 mt-2">
              <QuadrantPanel quadrantId="not-urgent-not-important" />
            </div>
          </div>
        </div>
        
        {/* Matrix Labels */}
        <div className="relative">
          {/* Vertical Axis - Importance */}
          <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 rotate-90 origin-center whitespace-nowrap"
            style={{ top: '50%', left: '-1.5rem' }}
          >
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Importance</div>
          </div>
          
          {/* Horizontal Axis - Urgency */}
          <div 
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-2"
            style={{ bottom: '-1.5rem' }}
          >
            <div className="text-xs uppercase tracking-wider text-muted-foreground text-center">Urgency</div>
          </div>
        </div>
      </div>
    );
  }
  
  // Mobile Layout - Swipeable Tabs
  return (
    <div className="h-[calc(100vh-4rem)]">
      <Tabs defaultValue="urgent-important" className="h-full">
        <div className="px-4 py-2 border-b overflow-auto">
          <TabsList className="inline-flex w-auto">
            {Object.entries(quadrants).map(([id, quadrant]) => (
              <TabsTrigger 
                key={id} 
                value={id}
                className={`${quadrant.color} ${quadrant.foregroundColor} data-[state=active]:opacity-100 opacity-70`}
              >
                {quadrant.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {Object.keys(quadrants).map((id) => (
          <TabsContent key={id} value={id} className="h-[calc(100%-53px)] p-4">
            <QuadrantPanel quadrantId={id as Quadrant} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}