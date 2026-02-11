import React, { useMemo } from 'react';
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
  user: UserProfile & { startWeight?: number };
}

export const Stats = ({ weightHistory, user }: StatsProps) => {
  const startWeight = user.startWeight || (weightHistory.length > 0 ? weightHistory[0].weight : user.currentWeight);
  const currentWeight = user.currentWeight;
  const targetWeight = user.targetWeight;
  
  // Generate trend data for the chart with net loss calculation
  const chartData = useMemo(() => {
    return weightHistory.map((record, index) => {
      // Linear goal: from startWeight to targetWeight over the history length
      const step = weightHistory.length > 1 ? (startWeight - targetWeight) / (weightHistory.length - 1) : 0;
      const progressiveGoal = Math.max(targetWeight, startWeight - (step * index));
      
      // Calculate net loss relative to starting weight
      const eliminated = parseFloat((startWeight - record.weight).toFixed(1));
      
      return {
        ...record,
        eliminated,
        goal: parseFloat(progressiveGoal.toFixed(1))
      };
    });
  }, [weightHistory, startWeight, targetWeight]);

  const totalEliminated = weightHistory.length > 0 
    ? parseFloat((startWeight - weightHistory[weightHistory.length - 1].weight).toFixed(1)) 
    : 0;
  const paramWeight = Math.max(0.1, startWeight - targetWeight);
  const percentage = Math.min(100, Math.max(0, (totalEliminated / paramWeight) * 100));

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold">Sua Evolução</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="glass-card p-4 md:p-6 rounded-3xl flex flex-col justify-between">
          <span className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Partida</span>
          <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{startWeight} <small className="text-[10px] font-normal text-slate-400 italic">kg</small></span>
        </div>
        <div className="glass-card p-4 md:p-6 rounded-3xl flex flex-col justify-between border-primary/20 bg-primary/5">
          <span className="text-primary-dark text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Eliminado</span>
          <span className="text-xl md:text-2xl font-black text-primary">
            {totalEliminated > 0 ? `-${totalEliminated.toFixed(1)}` : '0'} <small className="text-[10px] font-normal opacity-60 italic">kg</small>
          </span>
        </div>
        <div className="glass-card p-4 md:p-6 rounded-3xl flex flex-col justify-between bg-primary/10 border-primary/20">
          <span className="text-primary-dark text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Peso Atual</span>
          <span className="text-xl md:text-2xl font-black text-primary">{currentWeight} <small className="text-[10px] font-normal text-primary/60 italic">kg</small></span>
        </div>
        <div className="glass-card p-4 md:p-6 rounded-3xl flex flex-col justify-between">
          <span className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wider">Sua Meta</span>
          <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{targetWeight} <small className="text-[10px] font-normal text-slate-400 italic">kg</small></span>
        </div>
      </div>

      <div className="bg-navy-deep p-8 rounded-3xl shadow-2xl border border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h2 className="text-xl font-bold text-white mb-1">Histórico Completo</h2>
                <p className="text-slate-400 text-xs">Acompanhamento detalhado da sua jornada</p>
            </div>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_rgba(102,210,179,0.5)]"></div> Real</div>
                <div className="flex items-center gap-2"><div className="w-4 h-0.5 border-t-2 border-dashed border-slate-600"></div> Meta</div>
            </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="5 5" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                dy={10}
                tickFormatter={(value) => value.split('/').slice(0, 2).join('/')}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const weightData = payload.find(p => p.dataKey === 'weight');
                    const weightValue = weightData ? weightData.value : 0;
                    const eliminatedValue = weightData?.payload?.eliminated || 0;

                    return (
                      <div className="bg-navy-deep border border-white/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
                        <p className="text-slate-400 text-[10px] font-bold mb-3 uppercase tracking-tighter">{label}</p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-6">
                                <span className="text-slate-500 text-[10px] font-bold uppercase">Peso</span>
                                <p className="text-white font-black text-xl leading-none">
                                    {weightValue} <small className="text-[10px] font-medium text-slate-500">kg</small>
                                </p>
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl flex items-center justify-between gap-4">
                                <span className="text-emerald-500 text-[10px] font-black uppercase">Eliminado</span>
                                <span className="text-emerald-500 font-black text-sm">
                                    {eliminatedValue > 0 ? `-${eliminatedValue.toFixed(1)}` : (eliminatedValue < 0 ? `+${Math.abs(eliminatedValue).toFixed(1)}` : '0')} kg
                                </span>
                            </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                name="Meta"
                type="monotone" 
                dataKey="goal" 
                stroke="#334155" 
                strokeWidth={2} 
                strokeDasharray="8 8"
                dot={false}
                activeDot={false}
              />
              <Line 
                name="Peso"
                type="monotone" 
                dataKey="weight" 
                stroke="#66D2B3" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#66D2B3', strokeWidth: 3, stroke: '#1a2333' }} 
                activeDot={{ r: 8, fill: '#66D2B3', strokeWidth: 4, stroke: 'rgba(102,210,179,0.3)' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>


       <div className="glass-card p-8 rounded-3xl text-center">
            <h3 className="font-bold text-lg mb-2">Progresso da Meta</h3>
            <p className="text-slate-500 mb-4 text-sm font-medium">Você já percorreu <span className="text-primary font-black">{Math.round(percentage)}%</span> do caminho!</p>
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
