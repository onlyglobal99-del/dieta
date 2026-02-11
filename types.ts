
export type BloodType = 'A' | 'B' | 'AB' | 'O';
export type RhFactor = '+' | '-';
export type FullBloodType = `${BloodType}${RhFactor}`;

export enum FoodCategory {
  PROTEIN = 'Proteínas',
  VEGETABLE = 'Vegetais',
  FRUIT = 'Frutas',
  GRAIN = 'Grãos',
  DAIRY = 'Laticínios',
  OTHER = 'Outros'
}

export enum FoodStatus {
  BENEFICIAL = 'Benéfico',
  NEUTRAL = 'Neutro',
  AVOID = 'Evitar'
}

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  image: string;
  recommendations: Record<BloodType, FoodStatus>;
  description?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  meal_type: 'Café da Manhã' | 'Almoço' | 'Lanche' | 'Jantar';
  image: string;
  calories: number;
  time: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  blood_types: BloodType[];
  ingredients: string[];
  steps: string[];
}

export interface WeightRecord {
  date: string;
  weight: number;
}

export interface UserProfile {
  name: string;
  bloodType: BloodType;
  rhFactor: RhFactor;
  currentWeight: number;
  targetWeight: number;
  height: number;
  weeksOnDiet: number;
  onboarded: boolean;
  avatar?: string;
}
