import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Страница не найдена</h1>
      <p className="mt-4">Извините, но запрашиваемая страница не существует.</p>
    </div>
  );
};

export default NotFound;