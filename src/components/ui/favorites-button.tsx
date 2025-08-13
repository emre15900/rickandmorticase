"use client";

import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function FavoritesButton() {
  const { favoritesCount } = useFavorites();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Link href="/favorites">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-pink-200 hover:border-pink-300"
        >
          <Heart className="w-4 h-4 text-pink-500" />
          <span>My Favorites</span>
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/favorites">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-pink-200 hover:border-pink-300"
      >
        <Heart className="w-4 h-4 text-pink-500" />
        <span>My Favorites</span>
        {favoritesCount > 0 && (
          <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
            {favoritesCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
