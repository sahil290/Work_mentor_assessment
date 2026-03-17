import Header from './components/ui/Header';
import InventoryPage from './pages/InventoryPage';
import { useState, useRef } from 'react';

export default function App() {
  const openAddRef = useRef(null);

  return (
    <div className="min-h-screen">
      <Header onAdd={() => openAddRef.current?.()} />
      <main>
        <InventoryPage registerOpenAdd={(fn) => { openAddRef.current = fn; }} />
      </main>
    </div>
  );
}
