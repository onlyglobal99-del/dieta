import React, { useState, useEffect, useMemo } from 'react';
import { AuthProvider, useAuth } from './src/contexts/AuthContext.tsx';
import { UserProfile, WeightRecord, FoodItem } from './types';
import { getDietAdvice } from './geminiService';
import { useStorage } from './src/hooks/useStorage';
import { supabase } from './src/lib/supabase';

// Components
import { Navbar } from './src/components/Navbar';
import { AIAssistant } from './src/components/AIAssistant';

// Pages
import { Home } from './src/pages/Home';
import { FoodList } from './src/pages/FoodList';
import { RecipeList } from './src/pages/RecipeList';
import { Profile } from './src/pages/Profile';
import { Stats } from './src/pages/Stats';

import { AdminDashboard } from './src/pages/AdminDashboard';
import { Login } from './src/pages/Login';
import { Onboarding } from './src/pages/Onboarding';
import { ResetPassword } from './src/pages/ResetPassword';

// --- App Content ---

function AppContent() {
  const { user: authUser, loading: authLoading, signOut } = useAuth();
  const [tab, setTab] = useState('home');
  const [darkMode, setDarkMode] = useStorage('dietatipo_darkmode', false);
  const [user, setUser] = useState<(UserProfile & { role?: string }) | null>(null);
  const [weightHistory, setWeightHistory] = useStorage<WeightRecord[]>('dietatipo_weight_history', [
    { date: '01/03/2025', weight: 75 },
    { date: '01/04/2025', weight: 72 },
    { date: '01/05/2025', weight: 68 }
  ]);

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const { data, error } = await supabase
        .from('food_items')
        .select('*');
      
      if (error) {
        console.error('Error fetching foods:', error);
      } else if (data) {
        setFoodItems(data);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    if (authUser) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setUser({
            ...data,
            bloodType: data.blood_type || 'A',
            rhFactor: data.rh_factor || '+',
            weeksOnDiet: data.weeks_on_diet || 1,
            currentWeight: data.current_weight || 70,
            targetWeight: data.target_weight || 65,
            height: data.height || 1.70,
            startWeight: data.start_weight || data.current_weight || 70,
            weeksOnDiet: data.weeks_on_diet || 1,
            dietDuration: data.diet_duration || 4,
            onboarded: data.onboarded || false,
            avatar: data.avatar_url,
            role: data.role
          } as UserProfile & { role: string; startWeight?: number });
        } else {
          // If no profile exists yet, the trigger might be slow, or it's first login
          // We can create a temporary user object until the trigger finishes or we create it manually
          setUser({
            name: authUser.user_metadata?.full_name || 'Usuário',
            bloodType: 'A',
            rhFactor: '+',
            weeksOnDiet: 1,
            dietDuration: 4,
            currentWeight: 70,
            targetWeight: 65,
            height: 1.70,
            startWeight: 70,
            onboarded: false,
            role: 'user',
            avatar: authUser.user_metadata?.avatar_url
          } as UserProfile & { role: string; startWeight?: number });
        }
      };
      fetchProfile();
    }
  }, [authUser]);

  const handleOnboardingComplete = async (onboardingData: Partial<UserProfile>) => {
    if (!authUser || !user) return;

    const dataToUpdate = {
      blood_type: onboardingData.bloodType,
      rh_factor: onboardingData.rhFactor,
      height: onboardingData.height,
      current_weight: onboardingData.currentWeight,
      target_weight: onboardingData.targetWeight,
      start_weight: onboardingData.currentWeight,
      diet_duration: onboardingData.dietDuration,
      onboarded: true
    };

    const { error } = await supabase
      .from('profiles')
      .update(dataToUpdate)
      .eq('id', authUser.id);

    if (error) {
      console.error('Error saving onboarding:', error);
    } else {
      setUser(prev => prev ? ({
        ...prev,
        ...onboardingData,
        startWeight: onboardingData.currentWeight,
        onboarded: true
      }) : null);
    }
  };

  const handleUserUpdate = async (newUser: UserProfile & { startWeight?: number }) => {
    // If startWeight is not set on the server yet, we should set it during the first save
    const profileToUpdate = {
        name: newUser.name,
        blood_type: newUser.bloodType,
        rh_factor: newUser.rhFactor,
        avatar_url: newUser.avatar,
        height: newUser.height,
        current_weight: newUser.currentWeight,
        target_weight: newUser.targetWeight,
        weeks_on_diet: newUser.weeksOnDiet,
        start_weight: user?.startWeight || newUser.currentWeight // Persist current start weight or set it now
    };

    const { error } = await supabase
      .from('profiles')
      .update(profileToUpdate)
      .eq('id', authUser?.id);

    if (error) {
        console.error('Error updating profile:', error);
    }

    if (user && newUser.currentWeight !== user.currentWeight) {
      const newRecord: WeightRecord = { 
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }), 
        weight: newUser.currentWeight 
      };
      setWeightHistory(prev => [...prev, newRecord]);
    }
    setUser(newUser);
  };

  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || !user) return;
    const msg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: msg }]);
    setIsTyping(true);
    
    const response = await getDietAdvice(user.bloodType, msg);
    setChatHistory(prev => [...prev, { role: 'bot', text: response || '' }]);
    setIsTyping(false);
  };

  const filteredFoods = useMemo(() => {
    if (!user) return [];
    return foodItems.map(item => ({
      ...item,
      userStatus: item.recommendations[user.bloodType]
    }));
  }, [foodItems, user]);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  
  // Handle password reset route
  if (window.location.pathname === '/reset-password') {
    return <ResetPassword />;
  }

  if (!authUser) return <Login />;
  if (!user) return <div className="min-h-screen flex items-center justify-center">Sincronizando Perfil...</div>;

  // Show Onboarding if user exists but hasn't completed it
  if (!user.onboarded) {
    return <Onboarding user={user} onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen pb-24 lg:pt-24 lg:pb-8 px-4 lg:px-8 max-w-7xl mx-auto">
      <Navbar currentTab={tab} setTab={setTab} darkMode={darkMode} setDarkMode={setDarkMode} userAvatar={user.avatar} isAdmin={user.role === 'admin'} onLogout={signOut} />
      
      <main className="mt-8 lg:mt-0">
        {tab === 'home' && (
          <Home 
            user={user} 
            setUser={setUser} 
            weightHistory={weightHistory} 
            filteredFoods={filteredFoods} 
            setTab={setTab} 
          />
        )}
        {tab === 'foods' && <FoodList filteredFoods={filteredFoods} />}
        {tab === 'recipes' && <RecipeList userBloodType={user.bloodType} />}
        {tab === 'ai' && (
          <AIAssistant 
            chatHistory={chatHistory}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            handleSendMessage={handleSendMessage}
            isTyping={isTyping}
            userBloodType={user.bloodType}
          />
        )}
        {tab === 'profile' && (
           <Profile user={user} setUser={handleUserUpdate} darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
        {tab === 'stats' && (
           <Stats weightHistory={weightHistory} user={user} />
        )}
        {tab === 'admin' && user.role === 'admin' && (
           <AdminDashboard />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
