import { create } from 'zustand';
import { Character } from '@/types/character';

interface CharacterState {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (characterId: number) => void;
  clearSelected: () => void;
  isSelected: (characterId: number) => boolean;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  selectedCharacters: [],
  addCharacter: (character) =>
    set((state) => ({
      selectedCharacters: [...state.selectedCharacters, character],
    })),
  removeCharacter: (characterId) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (char) => char.id !== characterId
      ),
    })),
  clearSelected: () => set({ selectedCharacters: [] }),
  isSelected: (characterId) =>
    get().selectedCharacters.some((char) => char.id === characterId),
}));