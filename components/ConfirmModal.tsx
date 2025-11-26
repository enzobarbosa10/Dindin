import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Modal de confirmação reutilizável
 * @param isOpen - Se o modal está aberto
 * @param title - Título do modal
 * @param message - Mensagem de confirmação
 * @param confirmText - Texto do botão confirmar (padrão: "Confirmar")
 * @param cancelText - Texto do botão cancelar (padrão: "Cancelar")
 * @param isDangerous - Se é uma ação perigosa (altera cores) (padrão: false)
 * @param onConfirm - Função chamada ao confirmar
 * @param onCancel - Função chamada ao cancelar
 */
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isDangerous = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-sm rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800/50">
          <div className="flex items-center gap-2">
            <AlertCircle className={`w-5 h-5 ${isDangerous ? 'text-red-500' : 'text-yellow-500'}`} />
            <h3 className="font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-300 text-sm leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-gray-700 bg-gray-800/30">
          <Button
            onClick={onCancel}
            variant="ghost"
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={`flex-1 ${isDangerous ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primaryDark'}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
