"use client";

import { useState, useEffect } from 'react';
import { Character } from '@/types/character';
import { useToast } from '@/components/providers/ToastProvider';

const FAVORITES_KEY = 'rickAndMortyFavorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const { toast } = useToast();

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const addToFavorites = (character: Character) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === character.id);
      if (isAlreadyFavorite) {
        return prev;
      }
      
      toast.success(
        "✨ Favorilere Eklendi!",
        `${character.name} favorilerinize eklendi.`
      );
      
      return [...prev, character];
    });
  };

  const removeFromFavorites = (characterId: number) => {
    setFavorites(prev => {
      const character = prev.find(fav => fav.id === characterId);
      
      if (character) {
        toast.default(
          "💔 Favorilerden Çıkarıldı",
          `${character.name} favorilerinizden çıkarıldı.`
        );
      }
      
      return prev.filter(fav => fav.id !== characterId);
    });
  };

  const toggleFavorite = (character: Character) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === character.id);
    
    if (isAlreadyFavorite) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
  };

  const isFavorite = (characterId: number) => {
    return favorites.some(fav => fav.id === characterId);
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    toast.default(
      "🗑️ Tüm Favoriler Temizlendi",
      "Tüm favorileriniz başarıyla silindi."
    );
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    favoritesCount: favorites.length,
  };
}
