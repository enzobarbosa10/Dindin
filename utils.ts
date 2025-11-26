/**
 * Utilitários e funções auxiliares para a aplicação Dindin
 */

/**
 * Formata um valor numérico como moeda brasileira (BRL)
 * @param value - Valor a ser formatado
 * @returns String formatada como moeda
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata uma data ISO em DD/MM
 * @param dateStr - Data em formato ISO (YYYY-MM-DD)
 * @returns String formatada como DD/MM
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
};

/**
 * Formata uma data ISO em DD/MM/YYYY
 * @param dateStr - Data em formato ISO (YYYY-MM-DD)
 * @returns String formatada como DD/MM/YYYY
 */
export const formatDateFull = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
};

/**
 * Valida se um valor é positivo e dentro dos limites aceitáveis
 * @param amount - Valor a validar
 * @returns true se válido, false caso contrário
 */
export const isValidAmount = (amount: number): boolean => {
  const MAX_AMOUNT = 999999.99;
  return amount > 0 && amount <= MAX_AMOUNT;
};

/**
 * Valida se uma data não é muito distante no futuro
 * @param dateStr - Data em formato ISO
 * @param maxDaysAhead - Número máximo de dias no futuro (padrão: 365)
 * @returns true se válida, false caso contrário
 */
export const isValidDate = (dateStr: string, maxDaysAhead: number = 365): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + maxDaysAhead);

  return date >= today && date <= maxDate;
};

/**
 * Valida se uma descrição é válida
 * @param description - Descrição a validar
 * @returns true se válida, false caso contrário
 */
export const isValidDescription = (description: string): boolean => {
  const trimmed = description.trim();
  return trimmed.length > 0 && trimmed.length <= 100;
};

/**
 * Cores para os gráficos e categorias
 */
export const CHART_COLORS = [
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#6366F1', // Indigo
];

/**
 * Calcula a porcentagem de um valor em relação ao total
 * @param value - Valor para calcular
 * @param total - Total de referência
 * @returns Porcentagem como número (0-100)
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Agrupa transações por período (mês/ano)
 * @param transactions - Array de transações
 * @returns Objeto com transações agrupadas por período
 */
export const groupTransactionsByPeriod = (transactions: any[]) => {
  return transactions.reduce((acc, transaction) => {
    const [year, month] = transaction.date.split('-');
    const period = `${month}/${year}`;

    if (!acc[period]) {
      acc[period] = [];
    }
    acc[period].push(transaction);
    return acc;
  }, {} as Record<string, any[]>);
};

/**
 * Valida se duas datas representam o mesmo dia
 * @param date1 - Primeira data em formato ISO
 * @param date2 - Segunda data em formato ISO
 * @returns true se são o mesmo dia
 */
export const isSameDay = (date1: string, date2: string): boolean => {
  return date1.split('T')[0] === date2.split('T')[0];
};

/**
 * Gera um ID único baseado em timestamp
 * @returns String com ID único
 */
export const generateId = (): string => {
  return Date.now().toString();
};

/**
 * Formata percentual com 1 casa decimal
 * @param percentage - Valor percentual (0-100)
 * @returns String formatada com %
 */
export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(1)}%`;
};
