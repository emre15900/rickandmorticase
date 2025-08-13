import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader className="pb-3">
            <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-300 h-6 rounded w-3/4"></div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-gray-300 w-3 h-3 rounded-full"></div>
              <div className="bg-gray-300 h-5 rounded w-16"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-300 w-4 h-4 rounded"></div>
              <div className="bg-gray-300 h-5 rounded w-12"></div>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-300 h-4 rounded w-1/2"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}