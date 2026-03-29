'use client';
import React from 'react';
import { Input } from '../atoms/Input';

// Định nghĩa đúng tên prop là onFilter
interface FilterGroupProps {
  onFilter: (value: number) => void;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({ onFilter }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase text-zinc-400">
        Min Sales Threshold ($)
      </label>
      <Input 
        type="number" 
        placeholder="e.g. 4000" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilter(Number(e.target.value))} 
      />
    </div>
  );
};