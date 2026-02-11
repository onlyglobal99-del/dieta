
import { FoodCategory, FoodStatus, FoodItem, Recipe, BloodType } from './types';

export const FOOD_ITEMS: FoodItem[] = [
  // --- CARNES & AVES ---
  {
    id: '1',
    name: 'Salmão',
    category: FoodCategory.PROTEIN,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '2',
    name: 'Carne Vermelha',
    category: FoodCategory.PROTEIN,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.AVOID, B: FoodStatus.NEUTRAL, AB: FoodStatus.AVOID, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '6',
    name: 'Frango',
    category: FoodCategory.PROTEIN,
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.NEUTRAL, B: FoodStatus.AVOID, AB: FoodStatus.AVOID, O: FoodStatus.NEUTRAL }
  },
  {
    id: '9',
    name: 'Carne de Porco',
    category: FoodCategory.PROTEIN,
    image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.AVOID, B: FoodStatus.AVOID, AB: FoodStatus.AVOID, O: FoodStatus.AVOID }
  },
  {
    id: '10',
    name: 'Bacalhau',
    category: FoodCategory.PROTEIN,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '11',
    name: 'Ovos',
    category: FoodCategory.PROTEIN,
    image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.NEUTRAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.NEUTRAL, O: FoodStatus.NEUTRAL }
  },

  // --- VEGETAIS ---
  {
    id: '3',
    name: 'Brócolis',
    category: FoodCategory.VEGETABLE,
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '12',
    name: 'Espinafre',
    category: FoodCategory.VEGETABLE,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.NEUTRAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '13',
    name: 'Milho',
    category: FoodCategory.VEGETABLE,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.NEUTRAL, B: FoodStatus.AVOID, AB: FoodStatus.AVOID, O: FoodStatus.AVOID }
  },
  {
    id: '14',
    name: 'Tomate',
    category: FoodCategory.VEGETABLE,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.AVOID, AB: FoodStatus.AVOID, O: FoodStatus.NEUTRAL }
  },
  {
    id: '15',
    name: 'Batata',
    category: FoodCategory.VEGETABLE,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.NEUTRAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.AVOID }
  },
  {
    id: '16',
    name: 'Abóbora',
    category: FoodCategory.VEGETABLE,
    image: 'https://images.unsplash.com/photo-1507396115152-320e8f00033c?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.NEUTRAL, AB: FoodStatus.NEUTRAL, O: FoodStatus.BENEFICIAL }
  },

  // --- FRUTAS ---
  {
    id: '4',
    name: 'Mirtilos',
    category: FoodCategory.FRUIT,
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.NEUTRAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.NEUTRAL }
  },
  {
    id: '17',
    name: 'Banana',
    category: FoodCategory.FRUIT,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.NEUTRAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '18',
    name: 'Laranja',
    category: FoodCategory.FRUIT,
    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.AVOID, B: FoodStatus.NEUTRAL, AB: FoodStatus.AVOID, O: FoodStatus.AVOID }
  },
  {
    id: '19',
    name: 'Maçã',
    category: FoodCategory.FRUIT,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '20',
    name: 'Abacaxi',
    category: FoodCategory.FRUIT,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },

  // --- LATICÍNIOS & OVO ---
  {
    id: '5',
    name: 'Leite Integral',
    category: FoodCategory.DAIRY,
    image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.AVOID, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.AVOID }
  },
  {
    id: '21',
    name: 'Queijo Mussarela',
    category: FoodCategory.DAIRY,
    image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '22',
    name: 'Iogurte Natural',
    category: FoodCategory.DAIRY,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.NEUTRAL }
  },

  // --- GRÃOS & CEREAIS ---
  {
    id: '7',
    name: 'Arroz Branco',
    category: FoodCategory.GRAIN,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.NEUTRAL, B: FoodStatus.NEUTRAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.AVOID }
  },
  {
    id: '23',
    name: 'Trigo',
    category: FoodCategory.GRAIN,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.AVOID, B: FoodStatus.AVOID, AB: FoodStatus.AVOID, O: FoodStatus.AVOID }
  },
  {
    id: '24',
    name: 'Aveia',
    category: FoodCategory.GRAIN,
    image: 'https://images.unsplash.com/photo-1613769049987-b31b641f25b1?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '25',
    name: 'Feijão Preto',
    category: FoodCategory.GRAIN,
    image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.AVOID, AB: FoodStatus.AVOID, O: FoodStatus.NEUTRAL }
  },

  // --- OUTROS ---
  {
    id: '8',
    name: 'Azeite de Oliva',
    category: FoodCategory.OTHER,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.BENEFICIAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.BENEFICIAL }
  },
  {
    id: '26',
    name: 'Café',
    category: FoodCategory.OTHER,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.NEUTRAL, AB: FoodStatus.BENEFICIAL, O: FoodStatus.AVOID }
  },
  {
    id: '27',
    name: 'Amendoim',
    category: FoodCategory.OTHER,
    image: 'https://images.unsplash.com/photo-1525904097878-94fb15817968?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.BENEFICIAL, B: FoodStatus.AVOID, AB: FoodStatus.BENEFICIAL, O: FoodStatus.NEUTRAL }
  },
  {
    id: '28',
    name: 'Cerveja',
    category: FoodCategory.OTHER,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=300&q=80',
    recommendations: { A: FoodStatus.AVOID, B: FoodStatus.AVOID, AB: FoodStatus.AVOID, O: FoodStatus.AVOID }
  }
];

export const RECIPES: Recipe[] = [
  {
    id: 'r1',
    title: 'Salmão Grelhado com Brócolis',
    meal_type: 'Almoço',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
    calories: 340,
    time: '25 min',
    difficulty: 'Fácil',
    blood_types: ['A', 'B', 'AB', 'O'],
    ingredients: ['200g de salmão', '1 xícara de brócolis', '1 colher de azeite', 'Limão'],
    steps: ['Tempere o salmão com limão.', 'Grelhe por 4 min cada lado.', 'Cozinhe o brócolis no vapor.']
  },
  {
    id: 'r2',
    title: 'Sopa Detox de Lentilha',
    meal_type: 'Jantar',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    calories: 280,
    time: '40 min',
    difficulty: 'Médio',
    blood_types: ['A', 'AB'],
    ingredients: ['Lentilha', 'Espinafre', 'Cebola', 'Cenoura'],
    steps: ['Refogue os vegetais.', 'Adicione lentilha e água.', 'Cozinhe até amaciar.']
  }
];
