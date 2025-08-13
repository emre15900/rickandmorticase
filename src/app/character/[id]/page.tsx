"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFavorites } from '@/hooks/useFavorites';
import { Character } from '@/types/character';
import { 
  Heart, 
  ArrowLeft, 
  MapPin, 
  Calendar,
  Zap,
  User,
  Globe,
  Star
} from 'lucide-react';

async function getCharacter(id: string): Promise<Character | null> {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
}

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const characterId = params.id as string;

  useEffect(() => {
    if (characterId) {
      getCharacter(characterId)
        .then((data) => {
          setCharacter(data);
          setError(!data);
        })
        .finally(() => setLoading(false));
    }
  }, [characterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm animate-pulse">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-gray-300 rounded-xl"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Karakter Bulunamadı</h1>
              <p className="text-gray-600 mb-6">Aradığınız karakter mevcut değil.</p>
              <Button onClick={() => router.push('/')} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ana Sayfaya Dön
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive': return 'bg-green-500';
      case 'dead': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive': return '💚';
      case 'dead': return '💀';
      default: return '❓';
    }
  };

  const isCharacterFavorite = isFavorite(character.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="flex items-center gap-2 hover:bg-gray-100/80"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri Dön
            </Button>
            
            <Button
              onClick={() => toggleFavorite(character)}
              variant={isCharacterFavorite ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                isCharacterFavorite 
                  ? "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600" 
                  : "hover:bg-gray-100/80"
              }`}
            >
              <Heart 
                className={`w-4 h-4 ${isCharacterFavorite ? 'fill-current' : ''}`} 
              />
              {isCharacterFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Character Image */}
              <div className="relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(character.status)} text-white border-0`}>
                      {getStatusEmoji(character.status)} {character.status}
                    </Badge>
                  </div>
                  {isCharacterFavorite && (
                    <div className="absolute top-4 right-4">
                      <div className="p-2 rounded-full bg-white/90 backdrop-blur-sm">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Character Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {character.name}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-lg">ID: #{character.id}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Status */}
                  <Card className="border border-gray-200/50 bg-white/60">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-green-500" />
                        Durum
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`} />
                        <span className="font-semibold">{character.status}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Species */}
                  <Card className="border border-gray-200/50 bg-white/60">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-blue-500" />
                        Tür
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <span className="font-semibold">{character.species}</span>
                      {character.type && (
                        <span className="text-gray-600 text-sm block">({character.type})</span>
                      )}
                    </CardContent>
                  </Card>

                  {/* Gender */}
                  <Card className="border border-gray-200/50 bg-white/60">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-purple-500" />
                        Cinsiyet
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <span className="font-semibold">{character.gender}</span>
                    </CardContent>
                  </Card>

                  {/* Created */}
                  <Card className="border border-gray-200/50 bg-white/60">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        Oluşturma Tarihi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <span className="font-semibold">
                        {new Date(character.created).toLocaleDateString('tr-TR')}
                      </span>
                    </CardContent>
                  </Card>
                </div>

                {/* Origin & Location */}
                <div className="space-y-4">
                  <Card className="border border-gray-200/50 bg-white/60">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-500" />
                        Köken
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <span className="font-semibold text-lg">{character.origin.name}</span>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200/50 bg-white/60">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        Son Bilinen Konum
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <span className="font-semibold text-lg">{character.location.name}</span>
                    </CardContent>
                  </Card>
                </div>

                {/* Episodes */}
                <Card className="border border-gray-200/50 bg-white/60">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      Bölümler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-yellow-600">
                        {character.episode.length}
                      </span>
                      <span className="text-gray-600">bölümde görüldü</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
