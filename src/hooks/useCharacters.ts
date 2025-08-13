import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '@/lib/api';
import { CharacterFilters } from '@/types/character';

export const useCharacters = (filters: CharacterFilters) => {
  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => fetchCharacters(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};