import React, { useEffect, useState } from 'react';

export const Confetti = ({ active }: { active: boolean }) => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    if (active) {
      setParticles(Array.from({ length: 50 }, (_, i) => i));
      const timer = setTimeout(() => setParticles([]), 3000); // Stop after 3s
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            backgroundColor: ['#FFC700', '#FF0000', '#2E3192', '#41BBC7'][i % 4],
            width: '10px',
            height: '10px',
            animationDuration: `${Math.random() * 2 + 1}s`,
            animationDelay: `${Math.random() * 0.5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};
