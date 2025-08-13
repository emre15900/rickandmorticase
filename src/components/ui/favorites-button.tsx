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
          className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-pink-200 hover:border-pink-300 h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
        >
          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500" />
          <span className="hidden xs:inline sm:inline">My Favorites</span>
          <span className="xs:hidden">Fav</span>
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/favorites">
      <Button 
        variant="outline" 
        className="flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-pink-200 hover:border-pink-300 h-8 sm:h-10 px-2 sm:px-4 text-xs sm:text-sm"
      >
        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500" />
        <span className="hidden xs:inline sm:inline">My Favorites</span>
        <span className="xs:hidden">Fav</span>
        {favoritesCount > 0 && (
          <span className="bg-pink-500 text-white text-xs px-1.5 sm:px-2 py-0.5 rounded-full min-w-[16px] sm:min-w-[20px] text-center">
            {favoritesCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
