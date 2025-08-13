'use client';

import { useQueryState } from 'nuqs';
import { useCharacters } from '@/hooks/useCharacters';
import { CharacterCard } from '@/components/ui/character-card';
import { CharacterFilters } from '@/components/ui/character-filters';
import { Pagination } from '@/components/ui/pagination';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Users, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';

export default function HomePage() {
  const { favoritesCount, mounted } = useFavorites();
  const [status, setStatus] = useQueryState('status', {
    defaultValue: 'all',
    shallow: false,
  });
  const [gender, setGender] = useQueryState('gender', {
    defaultValue: 'all',
    shallow: false,
  });
  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: parseInt,
    serialize: String,
    shallow: false,
  });

  const filters = {
    status: status === 'all' ? undefined : status,
    gender: gender === 'all' ? undefined : gender,
    page,
  };

  const { data, isLoading, error } = useCharacters(filters);

  const handleClearFilters = () => {
    setStatus('all');
    setGender('all');
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-blue-500/10 to-purple-600/10" />
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-12 relative">
            {/* Favorites Link */}
            <div className="absolute top-0 right-0">
              <Link href="/favorites">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-pink-200 hover:border-pink-300"
                >
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span>My Favorites</span>
                  {mounted && favoritesCount > 0 && (
                    <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
            
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">Live from the Multiverse</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              Rick & Morty
              <br />
              <span className="text-4xl md:text-5xl font-semibold">Character Explorer</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dive deep into the infinite multiverse and discover every character from the Rick and Morty universe. 
              <br className="hidden md:block" />
              Filter, explore, and collect your favorites from across all dimensions.
            </p>
          </header>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">

        <CharacterFilters
          status={status}
          gender={gender}
          onStatusChange={setStatus}
          onGenderChange={setGender}
          onClearFilters={handleClearFilters}
        />

        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load characters. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {isLoading && <LoadingSkeleton />}

        {data && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Characters Found</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {data.results.length} <span className="text-base font-normal text-gray-500">of {data.info.count}</span>
                  </p>
                </div>
              </div>
              {page > 1 && (
                <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    Page {page} of {data.info.pages}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {data.results.map((character, index) => (
                <div
                  key={character.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <CharacterCard character={character} />
                </div>
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={data.info.pages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {data && data.results.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No characters found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}