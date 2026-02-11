import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { WeightRecord, UserProfile } from '../../types';

interface StatsProps {
  weightHistory: WeightRecord[];
  user: UserProfile;
}

export const Stats = ({ weightHistory, user }: StatsProps) => {
  const startWeight = weightHistory.length > 0 ? weightHistory[0].weight : user.currentWeight;
  const currentWeight = user.currentWeight;
  const paramWeight = startWeight - user.targetWeight;
  const progress = startWeight - currentWeight;
  const percentage = Math.min(100, Math.max(0, (progress / paramWeight) * 100));

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold">Sua Evolução</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between">
          <span className="text-slate-500 text-sm font-bold uppercase">Peso Inicial</span>
          <span className="text-3xl font-bold text-slate-800 dark:text-white">{startWeight} <small className="text-sm text-slate-400">kg</small></span>
        </div>
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between bg-primary/10 border-primary/20">
          <span className="text-primary-dark text-sm font-bold uppercase">Peso Atual</span>
          <span className="text-3xl font-bold text-primary">{currentWeight} <small className="text-sm text-primary/60">kg</small></span>
        </div>
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between">
          <span className="text-slate-500 text-sm font-bold uppercase">Meta</span>
          <span className="text-3xl font-bold text-slate-800 dark:text-white">{user.targetWeight} <small className="text-sm text-slate-400">kg</small></span>
        </div>
      </div>

      <div className="glass-card p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <h2 className="text-xl font-bold mb-6">Histórico Completo</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => value.split('/').slice(0, 2).join('/')}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-navy-deep p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
                        <p className="text-slate-500 text-sm font-bold mb-1">{label}</p>
                        <p className="text-primary font-bold text-lg">
                          {payload[0].value} <span className="text-xs">kg</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#66D2B3" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#66D2B3', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

       <div className="glass-card p-8 rounded-3xl text-center">
            <h3 className="font-bold text-lg mb-2">Progresso da Meta</h3>
            <p className="text-slate-500 mb-4">Você já percorreu {Math.round(percentage)}% do caminho!</p>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-full rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
       </div>
    </div>
  );
};
