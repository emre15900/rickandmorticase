import { Suspense } from 'react';
import { HomePageContent } from '@/components/HomePage';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

function HomePageFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-blue-500/10 to-purple-600/10" />
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <header className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">Live from the Multiverse</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight px-2">
              Rick & Morty
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">Character Explorer</span>
            </h1>
          </header>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-16">
        <LoadingSkeleton />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomePageContent />
    </Suspense>
  );
}