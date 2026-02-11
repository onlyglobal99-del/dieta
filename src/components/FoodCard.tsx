import React from 'react';
import { FoodStatus, FoodItem } from '../../types';

import { FoodBadge } from './FoodBadge';

interface FoodCardProps {
  food: FoodItem & { userStatus: FoodStatus };
}

export const FoodCard = ({ food }: FoodCardProps) => (
  <div className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
    <img src={food.image} className="w-20 h-20 rounded-xl object-cover" alt={food.name} />
    <div className="flex-1">
      <h3 className="font-bold text-lg">{food.name}</h3>
      <p className="text-xs text-slate-500 mb-2">{food.category}</p>
      <FoodBadge status={food.userStatus} />
    </div>
  </div>
);
