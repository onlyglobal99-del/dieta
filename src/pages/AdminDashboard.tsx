import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { FoodItem, Recipe, FoodCategory, FoodStatus, BloodType } from '../../types';

export const AdminDashboard = () => {
  const [activeView, setActiveView] = useState<'foods' | 'recipes'>('foods');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeView]);

  const fetchData = async () => {
    if (activeView === 'foods') {
      const { data } = await supabase.from('food_items').select('*');
      if (data) setFoods(data);
    } else {
      const { data } = await supabase.from('recipes').select('*');
      if (data) setRecipes(data);
    }
  };

  const handleDelete = async (id: string, table: 'food_items' | 'recipes') => {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) fetchData();
    else alert('Erro ao excluir: ' + error.message);
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setShowModal(true);
  };

  const handleAddNew = () => {
    if (activeView === 'foods') {
      setEditingItem({
        name: '',
        category: FoodCategory.PROTEIN,
        image: '',
        recommendations: { A: FoodStatus.NEUTRAL, B: FoodStatus.NEUTRAL, AB: FoodStatus.NEUTRAL, O: FoodStatus.NEUTRAL },
        description: ''
      });
    } else {
      setEditingItem({
        title: '',
        meal_type: 'Almoço',
        image: '',
        calories: 0,
        time: '',
        difficulty: 'Fácil',
        blood_types: ['A', 'B', 'AB', 'O'],
        ingredients: [],
        steps: [],
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const table = activeView === 'foods' ? 'food_items' : 'recipes';
    const { error } = await supabase.from(table).upsert(editingItem);

    if (error) {
      alert('Erro ao salvar: ' + error.message);
    } else {
      setShowModal(false);
      fetchData();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Painel de Controle</h1>
          <p className="text-slate-500">Gerencie o conteúdo do seu aplicativo de forma dinâmica.</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
          <button 
            onClick={() => setActiveView('foods')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeView === 'foods' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
          >
            Alimentos
          </button>
          <button 
            onClick={() => setActiveView('recipes')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeView === 'recipes' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500'}`}
          >
            Receitas
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">{activeView === 'foods' ? 'Lista de Alimentos' : 'Lista de Receitas'}</h2>
          <button 
            onClick={handleAddNew}
            className="bg-primary text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform active:scale-95"
          >
            <span className="material-icons-round">add</span> Novo {activeView === 'foods' ? 'Alimento' : 'Receita'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/20 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-8 py-4">ID / Imagem</th>
                <th className="px-8 py-4">Nome / Título</th>
                <th className="px-8 py-4">Categoria / Tipo</th>
                <th className="px-8 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {activeView === 'foods' ? foods.map(food => (
                <tr key={food.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-4">
                    <img src={food.image} className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800" alt="" />
                  </td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-700 dark:text-slate-200">{food.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono uppercase">{food.id}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-medium text-slate-500 text-nowrap">{food.category}</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(food)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                      >
                        <span className="material-icons-round">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(food.id, 'food_items')}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <span className="material-icons-round">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : recipes.map(recipe => (
                <tr key={recipe.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-4">
                    <img src={recipe.image} className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800" alt="" />
                  </td>
                  <td className="px-8 py-4">
                    <p className="font-bold text-slate-700 dark:text-slate-200">{recipe.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono uppercase">{recipe.id}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-medium text-slate-500 text-nowrap">{recipe.meal_type}</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(recipe)}
                        className="p-2 text-slate-400 hover:text-primary transition-colors"
                      >
                        <span className="material-icons-round">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(recipe.id, 'recipes')}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <span className="material-icons-round">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(activeView === 'foods' ? foods : recipes).length === 0 && (
             <div className="p-20 text-center">
                <p className="text-slate-400">Nenhum item encontrado.</p>
             </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-10 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black">{editingItem.id ? 'Editar' : 'Novo'} {activeView === 'foods' ? 'Alimento' : 'Receita'}</h2>
                <p className="text-slate-500 text-sm">Preencha os campos abaixo corretamente.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeView === 'foods' ? (
                <>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nome do Alimento</label>
                      <input 
                        type="text" 
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">URL da Imagem</label>
                      <input 
                        type="text" 
                        value={editingItem.image}
                        onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                        className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">Categoria</label>
                      <select 
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary font-bold"
                      >
                        {Object.values(FoodCategory).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Recomendações por Sangue</h3>
                    {(['A', 'B', 'AB', 'O'] as BloodType[]).map(type => (
                      <div key={type} className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <span className="font-black text-primary ml-2 uppercase">Tipo {type}</span>
                        <select 
                          value={editingItem.recommendations[type]}
                          onChange={(e) => setEditingItem({
                            ...editingItem,
                            recommendations: { ...editingItem.recommendations, [type]: e.target.value }
                          })}
                          className="bg-transparent border-none font-bold text-sm focus:ring-0 text-slate-700 dark:text-slate-200 cursor-pointer"
                        >
                          {Object.values(FoodStatus).map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4 col-span-2 grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Título da Receita</label>
                        <input 
                          type="text" 
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary font-bold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Calorias</label>
                          <input 
                            type="number" 
                            value={editingItem.calories}
                            onChange={(e) => setEditingItem({ ...editingItem, calories: parseInt(e.target.value) || 0 })}
                            className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Tempo</label>
                          <input 
                            type="text" 
                            value={editingItem.time}
                            onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                            className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary font-bold"
                            placeholder="Ex: 25 min"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Refeição</label>
                          <select 
                            value={editingItem.meal_type}
                            onChange={(e) => setEditingItem({ ...editingItem, meal_type: e.target.value })}
                            className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary font-bold"
                          >
                            <option value="Café da Manhã">Café da Manhã</option>
                            <option value="Almoço">Almoço</option>
                            <option value="Lanche">Lanche</option>
                            <option value="Jantar">Jantar</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Dificuldade</label>
                          <select 
                            value={editingItem.difficulty}
                            onChange={(e) => setEditingItem({ ...editingItem, difficulty: e.target.value })}
                            className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary font-bold"
                          >
                            <option value="Fácil">Fácil</option>
                            <option value="Médio">Médio</option>
                            <option value="Difícil">Difícil</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                       <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">URL da Imagem</label>
                        <input 
                          type="text" 
                          value={editingItem.image}
                          onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                          className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Ingredientes (um por linha)</label>
                        <textarea 
                          value={editingItem.ingredients.join('\n')}
                          onChange={(e) => setEditingItem({ ...editingItem, ingredients: e.target.value.split('\n') })}
                          className="w-full h-24 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary text-sm resize-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Passo a Passo (um por linha)</label>
                        <textarea 
                          value={editingItem.steps.join('\n')}
                          onChange={(e) => setEditingItem({ ...editingItem, steps: e.target.value.split('\n') })}
                          className="w-full h-24 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-4 py-3 focus:ring-primary focus:border-primary text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="px-8 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-white px-12 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {loading && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
