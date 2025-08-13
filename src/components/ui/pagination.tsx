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
    <div className="flex items-center justify-center mt-8 md:mt-16 mb-8 px-4">
      <div className="flex flex-col sm:flex-row items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 gap-2 sm:gap-0">
        {/* Mobile-first compact layout */}
        <div className="flex items-center order-2 sm:order-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="h-10 sm:h-12 px-3 sm:px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        </div>

        <div className="flex items-center mx-2 sm:mx-4 order-1 sm:order-2">
          {getVisiblePages().map((page, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={typeof page !== 'number'}
              className={`min-w-[40px] sm:min-w-[48px] h-10 sm:h-12 mx-0.5 sm:mx-1 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                page === currentPage
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30'
                  : 'hover:bg-blue-50 text-gray-600 hover:text-blue-600'
              } ${typeof page !== 'number' ? 'cursor-default hover:bg-transparent' : ''}`}
            >
              {page}
            </Button>
          ))}
        </div>

        <div className="flex items-center order-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-10 sm:h-12 px-3 sm:px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-all duration-300"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 sm:ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}