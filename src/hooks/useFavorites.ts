"use client";

import { useState, useEffect } from 'react';
import { Character } from '@/types/character';
import { useToast } from '@/components/providers/ToastProvider';

const FAVORITES_KEY = 'rickAndMortyFavorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  // Load favorites from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, mounted]);

  const addToFavorites = (character: Character) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === character.id);
      if (isAlreadyFavorite) {
        return prev;
      }
      
      // Schedule toast for next tick to avoid render during render
      setTimeout(() => {
        toast.success(
          "✨ Added to Favorites!",
          `${character.name} has been added to your favorites.`
        );
      }, 0);
      
      return [...prev, character];
    });
  };

  const removeFromFavorites = (characterId: number) => {
    setFavorites(prev => {
      const character = prev.find(fav => fav.id === characterId);
      
      if (character) {
        // Schedule toast for next tick to avoid render during render
        setTimeout(() => {
          toast.default(
            "💔 Removed from Favorites",
            `${character.name} has been removed from your favorites.`
          );
        }, 0);
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
    // Schedule toast for next tick to avoid render during render
    setTimeout(() => {
      toast.default(
        "🗑️ All Favorites Cleared",
        "All your favorites have been successfully removed."
      );
    }, 0);
  };

  return {
    favorites: mounted ? favorites : [],
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    favoritesCount: mounted ? favorites.length : 0,
    mounted,
  };
}
