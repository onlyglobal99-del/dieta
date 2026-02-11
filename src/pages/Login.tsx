import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Login = () => {
  const { signIn, signUp, resetPassword } = useAuth();
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (view === 'login') {
        await signIn(email, password);
      } else if (view === 'register') {
        await signUp(email, password, name);
        setMessage({ type: 'success', text: 'Conta criada com sucesso! Você já pode entrar.' });
      } else if (view === 'forgot') {
        await resetPassword(email);
        setMessage({ type: 'success', text: 'Link de recuperação enviado para seu e-mail.' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Ocorreu um erro.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative ornaments */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative z-10 border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-icons-round text-3xl">
              {view === 'login' ? 'login' : view === 'register' ? 'person_add' : 'lock_reset'}
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {view === 'login' ? 'Bem-vindo(a) de volta' : view === 'register' ? 'Criar sua conta' : 'Recuperar senha'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {view === 'login' ? 'Acesse sua conta para continuar' : view === 'register' ? 'Cadastre-se para salvar seu progresso' : 'Enviaremos um link para seu e-mail'}
          </p>
        </div>

        {message && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium flex items-start gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
            <span className="material-icons-round text-lg">{message.type === 'success' ? 'check_circle' : 'error'}</span>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Nome Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 focus:ring-primary focus:border-primary font-medium"
                placeholder="Ex: João Silva"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 focus:ring-primary focus:border-primary font-medium"
              placeholder="seu@email.com"
            />
          </div>

          {view !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Senha</label>
                {view === 'login' && (
                  <button 
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Esqueceu?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 focus:ring-primary focus:border-primary font-medium"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  <span className="material-icons-round text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
            {view === 'login' ? 'Entrar Agora' : view === 'register' ? 'Criar Minha Conta' : 'Enviar Link de Recuperação'}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            {view === 'login' ? (
              <>Não tem uma conta? <button onClick={() => setView('register')} className="text-primary font-bold hover:underline">Cadastre-se</button></>
            ) : (
              <>Já tem uma conta? <button onClick={() => setView('login')} className="text-primary font-bold hover:underline">Fazer Login</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
