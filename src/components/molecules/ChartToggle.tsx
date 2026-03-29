'use client';
import React from 'react';
import { Button } from '../atoms/Button';

interface ChartToggleProps {
  currentType: 'bar' | 'line';
  onToggle: (type: 'bar' | 'line') => void;
}

export const ChartToggle: React.FC<ChartToggleProps> = ({ currentType, onToggle }) => {
  return (
    <div className="flex gap-2 border border-gray-200 p-1 rounded-lg bg-gray-50">
      <Button 
        variant="secondary" 
        isActive={currentType === 'bar'} 
        onClick={() => onToggle('bar')}
      >
        Bar Chart
      </Button>
      <Button 
        variant="secondary" 
        isActive={currentType === 'line'} 
        onClick={() => onToggle('line')}
      >
        Line Chart
      </Button>
    </div>
  );
};