
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  // Adjust for timezone issues by using getUTC methods or splitting string
  // Simple split ensures YYYY-MM-DD corresponds exactly to the day
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}`;
};

export const getCurrentMonthYear = () => {
  const now = new Date();
  return {
    month: now.getMonth(),
    year: now.getFullYear()
  };
};

export const getMonthName = (monthIndex: number) => {
  const date = new Date();
  date.setMonth(monthIndex);
  return date.toLocaleString('pt-BR', { month: 'long' });
};
