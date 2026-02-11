import React from 'react';
import { Recipe } from '../../types';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeModal = ({ recipe, onClose }: RecipeModalProps) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 flex-shrink-0">
          <img src={recipe.image} className="w-full h-full object-cover" alt={recipe.title} />
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all"
          >
            <span className="material-icons-round">close</span>
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
              {recipe.meal_type}
            </span>
            <h2 className="text-3xl font-bold drop-shadow-lg">{recipe.title}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex gap-4">
            <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-center">
              <span className="material-icons-round text-primary mb-1">local_fire_department</span>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Calorias</p>
              <p className="font-bold">{recipe.calories} kcal</p>
            </div>
            <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-center">
              <span className="material-icons-round text-primary mb-1">schedule</span>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Preparo</p>
              <p className="font-bold">{recipe.time}</p>
            </div>
            <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl text-center">
              <span className="material-icons-round text-primary mb-1">signal_cellular_alt</span>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Dificuldade</p>
              <p className="font-bold">{recipe.difficulty}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm">01</span>
              Ingredientes
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center text-sm">02</span>
              Modo de Preparo
            </h3>
            <div className="space-y-6">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-black text-slate-200 dark:text-slate-800 text-4xl italic flex-shrink-0 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
