import { ApiResponse, CharacterFilters } from '@/types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (
  filters: CharacterFilters = {}
): Promise<ApiResponse> => {
  const params = new URLSearchParams();

  if (filters.status) params.append('status', filters.status);
  if (filters.gender) params.append('gender', filters.gender);
  if (filters.page) params.append('page', filters.page.toString());

  const url = `${BASE_URL}/character?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.statusText}`);
  }

  return response.json();
};