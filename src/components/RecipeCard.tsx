import React from 'react';
import { Recipe } from '../../types';

interface RecipeCardProps {
  recipe: Recipe;
  userBloodType: string;
  onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, userBloodType, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100 dark:border-slate-800 cursor-pointer active:scale-95"
  >
    <div className="h-48 relative overflow-hidden">
      <img src={recipe.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={recipe.title} />
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <span className="bg-white/90 dark:bg-slate-900/90 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">
          {recipe.calories} kcal
        </span>
        <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">
          {recipe.meal_type}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-bold mb-3 leading-tight h-12 overflow-hidden group-hover:text-primary transition-colors">{recipe.title}</h3>
      <div className="flex justify-between items-center text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="material-icons-round text-sm">schedule</span> {recipe.time}
        </span>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded font-medium">Tipo {userBloodType} OK</span>
      </div>
    </div>
  </div>
);
