import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card 
          key={index} 
          className="overflow-hidden border-0 bg-white/80 backdrop-blur-sm animate-pulse"
          style={{
            animationDelay: `${index * 100}ms`,
            animationDuration: '2s'
          }}
        >
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 bg-[length:300px_300px] animate-shimmer"></div>
            
            {/* Status skeleton */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="w-12 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>

            {/* Heart button skeleton */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90"></div>
          </div>

          <CardContent className="p-6 space-y-4">
            <div>
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-4/5 mb-2 bg-[length:300px_100%] animate-shimmer"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded mt-1"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}