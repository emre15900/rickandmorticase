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
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="relative">
          <Image
            src={character.image}
            alt={character.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-lg"
            priority={false}
          />
          <Button
            variant={selected ? 'default' : 'outline'}
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleToggleSelect}
          >
            <Heart
              className={`w-4 h-4 ${selected ? 'fill-current' : ''}`}
            />
          </Button>
        </div>
        <CardTitle className="text-lg font-bold truncate">
          {character.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`}
          />
          <Badge variant="secondary">{character.status}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <Badge className={getGenderColor(character.gender)}>
            {character.gender}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-gray-700">Species:</p>
              <p className="text-gray-600">{character.species}</p>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-medium text-gray-700">Location:</p>
            <p className="text-gray-600 truncate">{character.location.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}