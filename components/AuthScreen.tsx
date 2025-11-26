
import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './Button';

interface AuthScreenProps {
  onAuthSuccess: (user: { name: string; email: string }) => void;
  onGuestAccess: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess, onGuestAccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const existingUsersStr = localStorage.getItem('dindin_users');
      const users: any[] = existingUsersStr ? JSON.parse(existingUsersStr) : [];

      if (mode === 'register') {
        if (users.find((u: any) => u.email === email)) {
          throw new Error('Este email já está cadastrado.');
        }
        
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('dindin_users', JSON.stringify(users));
        onAuthSuccess({ name, email });
      } else {
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
          onAuthSuccess({ name: user.name, email: user.email });
        } else {
          throw new Error('Email ou senha incorretos.');
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md bg-card/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        {/* Header Color Bar */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 w-full"></div>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h2>
            <p className="text-gray-400 text-sm">
              {mode === 'login' 
                ? 'Entre para gerenciar suas finanças' 
                : 'Comece a controlar seu dinheiro hoje'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-medium ml-1">Nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-dark/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-600"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-600"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-dark/50 border border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-900/20 mt-6 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {mode === 'login' ? 'Entrar' : 'Cadastrar'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-4">
            <p className="text-gray-400 text-sm">
              {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button 
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="ml-2 text-emerald-400 hover:text-emerald-300 font-medium hover:underline transition-all"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Fazer login'}
              </button>
            </p>

            <div className="w-full flex items-center gap-2">
               <div className="h-[1px] bg-gray-700 flex-1"></div>
               <span className="text-xs text-gray-500 uppercase">ou</span>
               <div className="h-[1px] bg-gray-700 flex-1"></div>
            </div>

            <button 
              onClick={onGuestAccess}
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors hover:underline"
            >
              Continuar como visitante (Sem cadastro)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
