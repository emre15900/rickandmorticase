'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Character } from '@/types/character';
import { useCharacterStore } from '@/store/characterStore';
import { Heart, MapPin, User } from 'lucide-react';
import Image from 'next/image';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { addCharacter, removeCharacter, isSelected } = useCharacterStore();
  const selected = isSelected(character.id);

  const handleToggleSelect = () => {
    if (selected) {
      removeCharacter(character.id);
    } else {
      addCharacter(character);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'bg-blue-100 text-blue-800';
      case 'female':
        return 'bg-pink-100 text-pink-800';
      case 'genderless':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-[1.02]">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Status Indicator */}
        <div className="absolute top-4 left-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/20`}>
            <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(character.status)} animate-pulse`} />
            <span className="text-xs font-semibold text-gray-800">{character.status}</span>
          </div>
        </div>

        {/* Favorite Button */}
        <Button
          variant={selected ? 'default' : 'outline'}
          size="sm"
          className={`absolute top-4 right-4 w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            selected 
              ? 'bg-red-500 border-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25' 
              : 'bg-white/90 border-white/20 text-gray-600 hover:bg-white hover:text-red-500 backdrop-blur-sm'
          }`}
          onClick={handleToggleSelect}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-300 ${
              selected ? 'fill-current scale-110' : 'group-hover:scale-110'
            }`}
          />
        </Button>
      </div>

      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {character.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{character.species}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <Badge 
              variant="secondary" 
              className={`${getGenderColor(character.gender)} border-0 font-medium`}
            >
              {character.gender}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-700 line-clamp-1">
                {character.location.name}
              </p>
              <p className="text-xs text-gray-500">Location</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}