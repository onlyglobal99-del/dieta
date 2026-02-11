import React from 'react';
import { FoodStatus } from '../../types';

interface FoodBadgeProps {
  status: FoodStatus;
}

export const FoodBadge = ({ status }: FoodBadgeProps) => {
  const styles = {
    [FoodStatus.BENEFICIAL]: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    [FoodStatus.NEUTRAL]: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    [FoodStatus.AVOID]: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
};
