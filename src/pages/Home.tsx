import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BloodType, UserProfile, WeightRecord, FoodStatus, FoodItem } from '../../types';

interface RecommendationSectionProps {
  title: string;
  status: FoodStatus;
  foods: (FoodItem & { userStatus: FoodStatus })[];
  icon: string;
  color: string;
}

const RecommendationSection = ({ title, status, foods, icon, color }: RecommendationSectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 mb-2">
      <span className={`material-icons-round ${color}`}>{icon}</span>
      <h3 className="font-bold text-slate-700 dark:text-slate-300">{title}</h3>
    </div>
    <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-2 gap-2">
      {foods.slice(0, 4).map(food => (
        <div key={food.id} className="relative group cursor-pointer">
          <img src={food.image} className="w-full h-16 object-cover rounded-xl border dark:border-slate-700" alt={food.name} />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
             <span className="text-[8px] text-white font-bold uppercase">{food.name}</span>
          </div>
        </div>
      ))}
    </div>
    <p className="text-xs text-slate-500 h-8 line-clamp-2">
      {foods.map(f => f.name).join(', ')}
    </p>
  </div>
);

interface HomeProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  weightHistory: WeightRecord[];
  filteredFoods: (FoodItem & { userStatus: FoodStatus })[];
  setTab: (tab: string) => void;
}

export const Home = ({ user, setUser, weightHistory, filteredFoods, setTab }: HomeProps) => {
  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Blood Type Card */}
        <div className="flex-1 glass-card p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6">Tipo Sanguíneo</h2>
          <div className="flex justify-between items-center mb-8">
            {(['A', 'B', 'AB', 'O'] as BloodType[]).map(type => (
              <button 
                key={type}
                onClick={() => setUser(prev => ({ ...prev, bloodType: type }))}
                className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl font-bold transition-all transform active:scale-95 ${user.bloodType === type ? 'bg-rose-500 text-white shadow-xl ring-4 ring-rose-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-rose-500">Tipo {user.bloodType}: {user.weeksOnDiet} semanas</span>
              <span className="text-slate-400">65% completo</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-full rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
            </div>
            <p className="text-sm text-slate-500 italic">"Seu tipo sanguíneo determina sua dieta ideal para melhores resultados."</p>
          </div>
        </div>

        {/* Progress Card */}
        <div className="flex-1 bg-navy-deep p-8 rounded-3xl shadow-2xl border border-white/5 text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Progresso de Peso</h2>
            <span className="material-icons-round text-primary opacity-50">show_chart</span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightHistory} margin={{ top: 10, right: 0, left: -40, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#66D2B3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#66D2B3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#66D2B3" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorWeight)" 
                  animationDuration={1500}
                />
                <XAxis dataKey="date" hide />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
                    backgroundColor: '#1a2333',
                    color: '#fff'
                  }} 
                  itemStyle={{ color: '#66D2B3', fontWeight: 'bold' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/10 mt-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Inicial</p>
              <p className="font-bold text-white">{weightHistory.length > 0 ? weightHistory[0].weight : (user.currentWeight || '--')} <small className="text-[8px] opacity-40">kg</small></p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Atual</p>
              <p className="font-bold text-primary">{user.currentWeight || '--'} <small className="text-[8px] opacity-40">kg</small></p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Meta</p>
              <p className="font-bold text-white">{user.targetWeight || '--'} <small className="text-[8px] opacity-40">kg</small></p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Recommendations Grid */}
      <div className="glass-card p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold mb-8">Recomendações para Tipo {user.bloodType}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RecommendationSection 
            title="Benéficos" 
            status={FoodStatus.BENEFICIAL} 
            foods={filteredFoods.filter(f => f.userStatus === FoodStatus.BENEFICIAL)}
            icon="check_circle"
            color="text-emerald-500"
          />
          <RecommendationSection 
            title="Neutros" 
            status={FoodStatus.NEUTRAL} 
            foods={filteredFoods.filter(f => f.userStatus === FoodStatus.NEUTRAL)}
            icon="radio_button_checked"
            color="text-blue-500"
          />
          <RecommendationSection 
            title="A Evitar" 
            status={FoodStatus.AVOID} 
            foods={filteredFoods.filter(f => f.userStatus === FoodStatus.AVOID)}
            icon="cancel"
            color="text-rose-500"
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button 
            onClick={() => setTab('foods')}
            className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
          >
            Ver Plano Completo
            <span className="material-icons-round text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* AI Assistant Mini Card */}
      <div className="bg-navy-deep p-6 rounded-3xl text-white flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div className="bg-primary/20 p-4 rounded-2xl">
          <span className="material-icons-round text-primary text-4xl">auto_awesome</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold">Assistente Nutricional</h3>
          <p className="text-slate-400 text-sm">Tire suas dúvidas sobre alimentos e seu tipo sanguíneo agora mesmo.</p>
        </div>
        <button 
          onClick={() => setTab('ai')}
          className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary-hover transition-all"
        >
          Conversar Agora
        </button>
      </div>
    </div>
  );
};
