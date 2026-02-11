import React, { useState, useMemo, useEffect } from 'react';
import { RecipeCard } from '../components/RecipeCard';
import { RecipeModal } from '../components/RecipeModal';
import { Recipe, BloodType } from '../../types';
import { supabase } from '../lib/supabase';

interface RecipeListProps {
  userBloodType: BloodType;
}

const MEAL_TYPES = ['Todos', 'Café da Manhã', 'Almoço', 'Lanche', 'Jantar'] as const;

export const RecipeList = ({ userBloodType }: RecipeListProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<typeof MEAL_TYPES[number]>('Todos');

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*');
      
      if (error) {
        console.error('Error fetching recipes:', error);
      } else if (data) {
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const typeMatch = recipe.blood_types.includes(userBloodType);
      const tabMatch = activeTab === 'Todos' || recipe.meal_type === activeTab;
      return typeMatch && tabMatch;
    });
  }, [recipes, userBloodType, activeTab]);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-black tracking-tight">Receitas Saudáveis</h1>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl overflow-x-auto no-scrollbar">
          {MEAL_TYPES.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              userBloodType={userBloodType} 
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <span className="material-icons-round text-5xl text-slate-300 mb-4">restaurant_menu</span>
          <p className="text-slate-500 font-medium">Nenhuma receita encontrada para este filtro.</p>
        </div>
      )}

      <RecipeModal 
        recipe={selectedRecipe} 
        onClose={() => setSelectedRecipe(null)} 
      />
    </div>
  );
};
