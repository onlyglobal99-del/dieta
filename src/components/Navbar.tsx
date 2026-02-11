import React from 'react';

interface NavbarProps {
  currentTab: string;
  setTab: (t: string) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  userAvatar?: string;
  isAdmin?: boolean;
  onLogout?: () => void;
}

interface TabButtonProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ icon, label, active, onClick }: TabButtonProps) => (
  <button onClick={onClick} className={`flex flex-col lg:flex-row items-center gap-1 transition-all ${active ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-primary'}`}>
    <span className="material-icons-round">{icon}</span>
    <span className="text-[10px] lg:text-sm font-bold uppercase lg:capitalize">{label}</span>
  </button>
);

export const Navbar = ({ currentTab, setTab, darkMode, setDarkMode, userAvatar, isAdmin, onLogout }: NavbarProps) => (
  <nav className="fixed bottom-0 left-0 right-0 lg:top-0 lg:bottom-auto bg-white dark:bg-navy-deep border-t lg:border-b border-slate-200 dark:border-slate-800 px-6 py-3 lg:py-4 flex justify-between items-center z-50 shadow-lg">
    <div className="hidden lg:flex items-center gap-2 text-primary font-bold text-xl">
      <span className="material-icons-round">eco</span>
      <span className="text-slate-900 dark:text-white">Dieta Tipo Sanguíneo</span>
    </div>
    
    <div className="flex justify-between w-full lg:w-auto lg:gap-8 items-center">
      <TabButton icon="dashboard" label="Início" active={currentTab === 'home'} onClick={() => setTab('home')} />
      <TabButton icon="restaurant_menu" label="Alimentos" active={currentTab === 'foods'} onClick={() => setTab('foods')} />
      <TabButton icon="book" label="Receitas" active={currentTab === 'recipes'} onClick={() => setTab('recipes')} />
      <TabButton icon="insights" label="Evolução" active={currentTab === 'stats'} onClick={() => setTab('stats')} />
      <TabButton icon="settings" label="Perfil" active={currentTab === 'profile'} onClick={() => setTab('profile')} />
      {isAdmin && <TabButton icon="admin_panel_settings" label="Admin" active={currentTab === 'admin'} onClick={() => setTab('admin')} />}
      
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden lg:block"
      >
        <span className="material-icons-round text-slate-500">{darkMode ? 'light_mode' : 'dark_mode'}</span>
      </button>
    </div>
    
    <div className="hidden lg:flex items-center gap-3">
      <img src={userAvatar || "https://picsum.photos/seed/user/100/100"} className="w-8 h-8 rounded-full border-2 border-primary object-cover" alt="User" />
      <button 
        onClick={onLogout}
        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
        title="Sair"
      >
        <span className="material-icons-round">logout</span>
      </button>
    </div>
  </nav>
);
