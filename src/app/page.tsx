'use client';

import { useQueryState } from 'nuqs';
import { useCharacters } from '@/hooks/useCharacters';
import { CharacterCard } from '@/components/ui/character-card';
import { CharacterFilters } from '@/components/ui/character-filters';
import { Pagination } from '@/components/ui/pagination';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Users } from 'lucide-react';

export default function HomePage() {
  const [status, setStatus] = useQueryState('status', {
    defaultValue: '',
    shallow: false,
  });
  const [gender, setGender] = useQueryState('gender', {
    defaultValue: '',
    shallow: false,
  });
  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: parseInt,
    serialize: String,
    shallow: false,
  });

  const filters = {
    status: status || undefined,
    gender: gender || undefined,
    page,
  };

  const { data, isLoading, error } = useCharacters(filters);

  const handleClearFilters = () => {
    setStatus('');
    setGender('');
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Rick and Morty Characters
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the multiverse and discover your favorite characters from
            the Rick and Morty universe. Filter by status and gender to find
            exactly who you&apos;re looking for.
          </p>
        </header>

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
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">
                Showing {data.results.length} of {data.info.count} characters
                {page > 1 && ` (Page ${page} of ${data.info.pages})`}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
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