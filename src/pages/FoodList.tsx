import React, { useState } from 'react';
import { FoodBadge } from '../components/FoodBadge';
import { FoodItem, FoodStatus } from '../../types';

interface FoodListProps {
  filteredFoods: (FoodItem & { userStatus: FoodStatus })[];
}

export const FoodList = ({ filteredFoods }: FoodListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | FoodStatus>('ALL');

  const displayFoods = filteredFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || food.userStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Guia de Alimentos</h1>
        <div className="relative">
          <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-primary w-64" 
            placeholder="Buscar..." 
            />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setStatusFilter('ALL')}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${statusFilter === 'ALL' ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
          Todos
        </button>
        <button 
          onClick={() => setStatusFilter(FoodStatus.BENEFICIAL)}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${statusFilter === FoodStatus.BENEFICIAL ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}
        >
          Benéficos
        </button>
        <button 
          onClick={() => setStatusFilter(FoodStatus.NEUTRAL)}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${statusFilter === FoodStatus.NEUTRAL ? 'bg-blue-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
        >
          Neutros
        </button>
        <button 
          onClick={() => setStatusFilter(FoodStatus.AVOID)}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${statusFilter === FoodStatus.AVOID ? 'bg-rose-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-900/20'}`}
        >
          Evitar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayFoods.map(food => (
          <div key={food.id} className="glass-card p-4 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
            <img src={food.image} className="w-20 h-20 rounded-xl object-cover" alt={food.name} />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{food.name}</h3>
              <p className="text-xs text-slate-500 mb-2">{food.category}</p>
              <FoodBadge status={food.userStatus} />
            </div>
          </div>
        ))}
        {displayFoods.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-400">
                Nenhum alimento encontrado.
            </div>
        )}
      </div>
    </div>
  );
};
