import React, { useState } from 'react';
import { X, Plus, Tag } from 'lucide-react';
import { Button } from './Button';

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onAdd: (category: string) => void;
  onRemove: (category: string) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  isOpen,
  onClose,
  categories,
  onAdd,
  onRemove
}) => {
  const [newCategory, setNewCategory] = useState('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAdd(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-dark/50">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            Gerenciar Categorias
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(cat => (
              <div key={cat} className="flex items-center gap-1 bg-dark px-3 py-1.5 rounded-lg border border-gray-700 group hover:border-gray-500 transition-colors">
                <span className="text-sm text-gray-200">{cat}</span>
                <button 
                  onClick={() => onRemove(cat)}
                  className="p-0.5 text-gray-500 hover:text-danger opacity-50 group-hover:opacity-100 transition-all"
                  title={`Remover ${cat}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {categories.length === 0 && (
              <p className="text-gray-500 text-sm italic w-full text-center py-2">Nenhuma categoria cadastrada.</p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 bg-dark/30">
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nova categoria..."
              className="flex-1 bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <Button type="submit" className="whitespace-nowrap px-3">
              <Plus className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};