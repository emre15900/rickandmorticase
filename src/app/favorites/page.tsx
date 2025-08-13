"use client";

import { useFavorites } from '@/hooks/useFavorites';
import { CharacterCard } from '@/components/ui/character-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Trash2, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites, clearAllFavorites, favoritesCount, mounted } = useFavorites();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading favorites...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 via-purple-500/10 to-red-600/10" />
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-12 relative">
            {/* Back Button */}
            <div className="absolute left-0 top-0">
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white/90">
                  <ArrowLeft className="w-4 h-4" />
                  Home
                </Button>
              </Link>
            </div>
            
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 mb-6">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Your Favorite Collection</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-6 leading-tight">
              💖 My Favorites
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Keep track of your favorite Rick and Morty characters here.<br className="hidden md:block"/>
              {favoritesCount > 0 ? `Total ${favoritesCount} characters in your favorites.` : 'You don\'t have any favorite characters yet.'}
            </p>
          </header>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Stats Card */}
        <Card className="mb-12 border-0 bg-white/60 backdrop-blur-xl shadow-xl shadow-purple-500/5">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  <Star className="w-6 h-6" />
                </div>
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Favorite Statistics
                </span>
              </div>
              
              {favoritesCount > 0 && (
                <Button
                  onClick={clearAllFavorites}
                  variant="outline"
                  className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {favoritesCount}
                </div>
                <div className="text-gray-600 mt-1">Total Favorites</div>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {favorites.filter(char => char.status === 'Alive').length}
                </div>
                <div className="text-gray-600 mt-1">Alive</div>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {new Set(favorites.map(char => char.species)).size}
                </div>
                <div className="text-gray-600 mt-1">Species</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Characters Grid */}
        {favoritesCount === 0 ? (
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-16 text-center">
              <div className="mb-6">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  No favorite characters yet
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  You can add characters to your favorites by clicking the heart icon on the home page.
                </p>
              </div>
              <Link href="/">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Explore Characters
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Favorite Characters
                  </h2>
                  <p className="text-gray-600">
                    {favoritesCount} characters found
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favorites.map((character, index) => (
                <div
                  key={character.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: '0.6s'
                  }}
                >
                  <CharacterCard character={character} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
