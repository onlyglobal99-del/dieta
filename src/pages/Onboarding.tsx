import React, { useState } from 'react';
import { BloodType, RhFactor, UserProfile } from '../../types';

interface OnboardingProps {
  user: UserProfile;
  onComplete: (data: Partial<UserProfile>) => void;
}

export const Onboarding = ({ user, onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<UserProfile>>({
    name: user.name,
    bloodType: user.bloodType || 'A',
    rhFactor: user.rhFactor || '+',
    height: user.height || 1.70,
    currentWeight: user.currentWeight || 70,
    targetWeight: user.targetWeight || 65,
    dietDuration: user.dietDuration || 4,
  });

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
    else onComplete(data);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateData = (field: keyof UserProfile, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: 'Bem-vindo(a)!',
      desc: 'Vamos configurar seu plano personalizado em poucos segundos.',
      icon: 'auto_awesome',
    },
    {
      title: 'Seu Tipo Sanguíneo',
      desc: 'A base da sua dieta ideal.',
      icon: 'water_drop',
    },
    {
      title: 'Sua Altura',
      desc: 'Para calcularmos seu IMC ideal.',
      icon: 'straighten',
    },
    {
      title: 'Seu Peso Hoje',
      desc: 'Este será seu Peso de Partida.',
      icon: 'monitor_weight',
    },
    {
      title: 'Sua Meta',
      desc: 'Onde você quer chegar?',
      icon: 'ads_click',
    },
    {
      title: 'Duração do Foco',
      desc: 'Quantas semanas deseja manter o plano?',
      icon: 'calendar_month',
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-rose-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-xl relative">
        {/* Progress Bar */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5, 6].map(s => (
            <div 
              key={s} 
              className={`h-1.5 rounded-full transition-all duration-500 ${s <= step ? 'w-8 bg-primary shadow-sm shadow-primary/20' : 'w-4 bg-slate-200 dark:bg-slate-800'}`}
            ></div>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/40 dark:border-white/5 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
              <span className="material-icons-round text-4xl leading-none flex items-center justify-center">{steps[step-1].icon}</span>
            </div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{steps[step-1].title}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">{steps[step-1].desc}</p>
          </div>

          <div className="min-h-[220px] flex items-center justify-center">
            {step === 1 && (
              <div className="text-center space-y-4">
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                  Olá, <span className="text-primary font-bold">{user.name}</span>! Estamos felizes em ter você aqui. Para começar sua jornada, precisamos de alguns dados rápidos.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="w-full space-y-8">
                <div className="flex justify-center gap-3">
                  {(['A', 'B', 'AB', 'O'] as BloodType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => updateData('bloodType', type)}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl font-bold transition-all ${data.bloodType === type ? 'bg-rose-500 text-white shadow-xl scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center gap-4">
                  {(['+', '-'] as RhFactor[]).map(factor => (
                    <button
                      key={factor}
                      onClick={() => updateData('rhFactor', factor)}
                      className={`px-8 py-3 rounded-xl font-black text-lg transition-all ${data.rhFactor === factor ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                    >
                      Fator {factor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="w-full max-w-xs mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    value={data.height?.toString().replace('.', ',')}
                    onChange={(e) => {
                      const val = e.target.value.replace(',', '.');
                      if (/^\d*\.?\d*$/.test(val)) updateData('height', parseFloat(val) || 0);
                    }}
                    className="w-full text-5xl font-black text-center bg-transparent border-none focus:ring-0 text-primary"
                    placeholder="1,70"
                  />
                  <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">m</span>
                </div>
                <div className="h-0.5 bg-slate-200 dark:bg-slate-800 w-full mt-2"></div>
              </div>
            )}

            {step === 4 && (
              <div className="w-full max-w-xs mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    value={data.currentWeight?.toString().replace('.', ',')}
                    onChange={(e) => {
                      const val = e.target.value.replace(',', '.');
                      if (/^\d*\.?\d*$/.test(val)) updateData('currentWeight', parseFloat(val) || 0);
                    }}
                    className="w-full text-5xl font-black text-center bg-transparent border-none focus:ring-0 text-primary"
                    placeholder="70,0"
                  />
                  <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">kg</span>
                </div>
                <div className="h-0.5 bg-slate-200 dark:bg-slate-800 w-full mt-2"></div>
              </div>
            )}

            {step === 5 && (
              <div className="w-full max-w-xs mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    value={data.targetWeight?.toString().replace('.', ',')}
                    onChange={(e) => {
                      const val = e.target.value.replace(',', '.');
                      if (/^\d*\.?\d*$/.test(val)) updateData('targetWeight', parseFloat(val) || 0);
                    }}
                    className="w-full text-5xl font-black text-center bg-transparent border-none focus:ring-0 text-primary"
                    placeholder="65,0"
                  />
                  <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-400">kg</span>
                </div>
                <div className="h-0.5 bg-slate-200 dark:bg-slate-800 w-full mt-2"></div>
              </div>
            )}

            {step === 6 && (
              <div className="w-full max-w-sm mx-auto space-y-6">
                <div className="flex justify-center gap-3 flex-wrap">
                  {[1, 2, 4, 8, 12].map(weeks => (
                    <button
                      key={weeks}
                      onClick={() => updateData('dietDuration', weeks)}
                      className={`px-6 py-4 rounded-2xl font-bold transition-all ${data.dietDuration === weeks ? 'bg-primary text-white shadow-xl scale-110' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                    >
                      {weeks} {weeks === 1 ? 'Semana' : 'Semanas'}
                    </button>
                  ))}
                </div>
                <p className="text-center text-xs text-slate-400 italic font-medium">Você pode alterar isso a qualquer momento no perfil.</p>
              </div>
            )}
          </div>

          <div className="mt-12 flex gap-4">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex-1 py-4 px-6 rounded-2xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
              >
                Voltar
              </button>
            )}
            <button
              onClick={nextStep}
              className="flex-[2] py-4 px-6 rounded-2xl font-black bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {step === 6 ? 'Iniciar Jornada' : 'Continuar'}
              <span className="material-icons-round text-xl">
                {step === 6 ? 'check_circle' : 'arrow_forward'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
