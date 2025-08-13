'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCharacterStore } from '@/store/characterStore';
import { X, Filter } from 'lucide-react';

interface CharacterFiltersProps {
  status: string;
  gender: string;
  onStatusChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onClearFilters: () => void;
}

export function CharacterFilters({
  status,
  gender,
  onStatusChange,
  onGenderChange,
  onClearFilters,
}: CharacterFiltersProps) {
  const { selectedCharacters, clearSelected } = useCharacterStore();

  const hasActiveFilters = status !== 'all' || gender !== 'all';

  return (
    <Card className="mb-12 border-0 bg-white/60 backdrop-blur-xl shadow-xl shadow-blue-500/5">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <Filter className="w-6 h-6" />
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Smart Filters
          </span>
        </CardTitle>
        <p className="text-gray-600 mt-2">Filter characters by their attributes to find exactly who you're looking for</p>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Life Status
            </label>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger className="border-2 border-gray-200 hover:border-green-400 focus:border-green-500 transition-colors bg-white/80">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">🌍 All Status</SelectItem>
                <SelectItem value="alive">💚 Alive</SelectItem>
                <SelectItem value="dead">💀 Dead</SelectItem>
                <SelectItem value="unknown">❓ Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Gender Identity
            </label>
            <Select value={gender} onValueChange={onGenderChange}>
              <SelectTrigger className="border-2 border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-colors bg-white/80">
                <SelectValue placeholder="All Genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">👥 All Genders</SelectItem>
                <SelectItem value="male">👨 Male</SelectItem>
                <SelectItem value="female">👩 Female</SelectItem>
                <SelectItem value="genderless">⚪ Genderless</SelectItem>
                <SelectItem value="unknown">❓ Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="w-full h-11 border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-600 hover:text-red-700 transition-all duration-300"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-end">
            {selectedCharacters.length > 0 && (
              <Button
                variant="outline"
                onClick={clearSelected}
                className="w-full h-11 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-600 hover:text-purple-700 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                <div className="relative flex items-center">
                  <X className="w-4 h-4 mr-2" />
                  Clear Selected ({selectedCharacters.length})
                </div>
              </Button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {status && (
              <Badge variant="secondary">
                Status: {status}
                <button
                  onClick={() => onStatusChange('')}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {gender && (
              <Badge variant="secondary">
                Gender: {gender}
                <button
                  onClick={() => onGenderChange('')}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}