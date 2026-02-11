import React, { useState, useRef } from 'react';
import { UserProfile, BloodType, RhFactor } from '../../types';
import { Confetti } from '../components/Confetti';
import { supabase } from '../lib/supabase';

interface ProfileProps {
  user: UserProfile;
  setUser: (u: UserProfile) => void;
}

export const Profile = ({ user, setUser }: ProfileProps) => {
  const handleChange = (field: keyof UserProfile, value: string | number) => {
    setUser({ ...user, [field]: value });
  };

  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const playSuccessSound = () => {
    // Using a generic success/celebration sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'); 
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio play failed', e));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        name: user.name,
        blood_type: user.bloodType,
        rh_factor: user.rhFactor,
        avatar_url: user.avatar
      })
      .eq('id', (await supabase.auth.getUser()).data.user?.id);

    if (error) {
        alert('Erro ao salvar: ' + error.message);
        return;
    }

    setShowConfetti(true);
    setShowModal(true);
    playSuccessSound();
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 relative">
      <Confetti active={showConfetti} />
      <h1 className="text-3xl font-bold">Perfil & Configurações</h1>

      {/* Avatar Section */}
      <div className="flex flex-col items-center justify-center -mb-4 z-10 relative">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <img 
            src={user.avatar || "https://picsum.photos/seed/user/150/150"} 
            className="w-32 h-32 rounded-full border-4 border-white dark:border-navy-deep shadow-xl object-cover"
            alt="Profile"
          />
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-icons-round text-white text-3xl">photo_camera</span>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-2 font-medium">Toque para alterar foto</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      <div className="glass-card p-8 pt-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4">Dados Pessoais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase">Nome</label>
            <input 
              type="text" 
              value={user.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 focus:ring-primary focus:border-primary font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase">Tipo Sanguíneo</label>
              <select 
                value={user.bloodType}
                onChange={(e) => handleChange('bloodType', e.target.value as BloodType)}
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 focus:ring-primary focus:border-primary font-bold"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase">Fator Rh</label>
              <select 
                value={user.rhFactor}
                onChange={(e) => handleChange('rhFactor', e.target.value as RhFactor)}
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 focus:ring-primary focus:border-primary font-bold"
              >
                <option value="+">+</option>
                <option value="-">-</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase">Altura (cm)</label>
            <input 
              type="number" 
              value={user.height}
              onChange={(e) => handleChange('height', parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 focus:ring-primary focus:border-primary font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase">Semanas na Dieta</label>
            <input 
              type="number" 
              value={user.weeksOnDiet}
              onChange={(e) => handleChange('weeksOnDiet', parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 focus:ring-primary focus:border-primary font-semibold"
            />
          </div>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-4">Metas de Peso</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase">Peso Atual (kg)</label>
            <div className="relative">
              <input 
                type="number" 
                value={user.currentWeight}
                onChange={(e) => handleChange('currentWeight', parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 focus:ring-primary focus:border-primary font-bold text-lg text-primary"
                step="0.1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">kg</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 uppercase">Meta de Peso (kg)</label>
            <div className="relative">
              <input 
                type="number" 
                value={user.targetWeight}
                onChange={(e) => handleChange('targetWeight', parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 focus:ring-primary focus:border-primary font-bold text-lg"
                step="0.1"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">kg</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3">
          <span className="material-icons-round text-blue-500">info</span>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Atualize seu peso atual semanalmente para acompanhar sua evolução no gráfico da tela inicial.
          </p>
        </div>
        <div className="flex justify-center pt-4">
          <button 
            onClick={handleSave}
            className="bg-gradient-to-r from-primary to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <span className="material-icons-round">celebration</span>
            Salvar & Comemorar
          </button>
        </div>
      </div>

      {/* Congratulation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-navy-deep p-8 rounded-3xl shadow-2xl max-w-md w-full text-center relative animate-in zoom-in-50 duration-500 border-2 border-primary/20">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <span className="material-icons-round">close</span>
            </button>
            
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-icons-round text-5xl text-emerald-500">emoji_events</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              Parabéns, {user.name.split(' ')[0]}! 🚀
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Você está investindo em si mesmo! Cada pequeno passo é uma vitória. Continue firme no seu objetivo! 💪
            </p>
            
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
