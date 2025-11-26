
import React from 'react';
import { Wallet, TrendingUp, Shield, Smartphone, ArrowRight, CheckCircle2, User } from 'lucide-react';
import { Button } from './Button';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onGuestAccess: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin, onGuestAccess }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 flex flex-col font-sans selection:bg-emerald-500/30">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Din<span className="text-emerald-500">din</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onLogin}
              className="text-gray-300 hover:text-white font-medium transition-colors hidden sm:block"
            >
              Entrar
            </button>
            <Button onClick={onGetStarted} className="bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 rounded-full px-6">
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] -z-10 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -z-10 opacity-20"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Controle financeiro inteligente v2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Domine seu dinheiro <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              sem complicação.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            Organize suas finanças, acompanhe seus gastos e atinja suas metas com a plataforma mais intuitiva do mercado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <Button 
              onClick={onGetStarted}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full text-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Criar conta grátis
              <ArrowRight className="w-5 h-5" />
            </Button>
            <button 
              onClick={onGuestAccess}
              className="px-8 py-4 rounded-full text-lg font-medium text-gray-300 border border-white/10 hover:bg-white/5 hover:text-white transition-all w-full sm:w-auto flex items-center justify-center gap-2 group"
            >
              <User className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              Testar sem cadastro
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#020617]/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-emerald-400" />}
              title="Dashboard Intuitivo"
              description="Visualize suas receitas, despesas e saldo em tempo real com gráficos claros."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-blue-400" />}
              title="Dados Seguros"
              description="Seus dados são armazenados localmente e criptografados. Privacidade total."
            />
            <FeatureCard 
              icon={<Smartphone className="w-8 h-8 text-purple-400" />}
              title="100% Responsivo"
              description="Acesse suas finanças de qualquer lugar, seja no computador ou celular."
            />
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 md:p-12 backdrop-blur-sm relative">
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
             
             <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                 <h2 className="text-3xl font-bold text-white mb-6">Tudo que você precisa em um só lugar</h2>
                 <ul className="space-y-4">
                   <ListItem text="Controle de contas a pagar com alertas" />
                   <ListItem text="Metas de economia personalizáveis" />
                   <ListItem text="Relatórios detalhados por categoria" />
                   <ListItem text="Importação inteligente de extratos (IA)" />
                 </ul>
               </div>
               <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                 <div className="relative bg-gray-900 rounded-lg p-6 border border-gray-800 aspect-video flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">Preview do Dashboard</p>
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; 2024 Dindin Financeiro. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-gray-800/20 border border-gray-700/50 p-8 rounded-2xl hover:bg-gray-800/40 transition-colors">
    <div className="bg-gray-900/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-gray-700">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const ListItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3 text-gray-300">
    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
    {text}
  </li>
);
