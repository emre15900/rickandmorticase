'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-16 mb-8">
      <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-12 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center mx-4">
          {getVisiblePages().map((page, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={typeof page !== 'number'}
              className={`min-w-[48px] h-12 mx-1 rounded-xl transition-all duration-300 ${
                page === currentPage
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30'
                  : 'hover:bg-blue-50 text-gray-600 hover:text-blue-600'
              } ${typeof page !== 'number' ? 'cursor-default hover:bg-transparent' : ''}`}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-12 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-all duration-300"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}