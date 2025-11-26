# 💰 Dindin - Controle Financeiro Pessoal

<div align="center">
  <strong>Uma aplicação web moderna para gerenciar suas finanças pessoais com estilo</strong>
</div>

## 🎯 Funcionalidades

- ✅ **Dashboard Inteligente** - Veja suas entradas, gastos e saldo em tempo real
- 📊 **Gráficos Visuais** - Distribuição de despesas por categoria em gráfico de pizza
- 📋 **Índice de Gastos** - Acompanhe o percentual gasto por categoria
- 💳 **Gerenciamento de Contas** - Registre contas a vencer e parcelas
- 🎯 **Meta de Economia** - Acompanhe seu progresso em relação à meta de poupança
- 💾 **Sincronização Automática** - Seus dados são salvos no localStorage
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Design Moderno** - Interface escura elegante com tema consistente

## 🛠️ Stack Tecnológico

- **React 19** - Library UI
- **TypeScript** - Type safety
- **Vite** - Build tool rápido
- **Tailwind CSS** - Styling
- **Recharts** - Gráficos
- **Lucide React** - Ícones
- **Node.js** - Runtime

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/enzobarbosa10/Dindin.git
   cd Dindin
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Abra seu navegador em `http://localhost:5173`

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build otimizado para produção |
| `npm run preview` | Visualiza o build de produção localmente |

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Dashboard.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   ├── FinancialChart.tsx
│   ├── CategoryBreakdown.tsx
│   ├── BillList.tsx
│   ├── SavingsGoal.tsx
│   └── Button.tsx
├── App.tsx             # Componente principal
├── types.ts            # Types e interfaces TypeScript
├── utils.ts            # Funções auxiliares
├── index.tsx           # Entry point
└── index.html          # HTML base
```

## 💡 Como Usar

### Adicionar uma Transação
1. Clique no botão **+** flutuante no canto inferior direito
2. Selecione a aba "Nova Transação"
3. Preencha os dados (descrição, valor, tipo, data, categoria)
4. Clique em "Adicionar"

### Registrar uma Conta a Vencer
1. Clique no botão **+** flutuante
2. Selecione a aba "Nova Conta/Parcela"
3. Preencha os dados da conta
4. Clique em "Agendar Conta"

### Marcar Conta como Paga
1. Na seção "Contas e Parcelas a Vencer"
2. Clique no status da conta para alternar entre "A vencer", "Vencido" ou "Pago"

## 🎨 Categorias Disponíveis

- 🍔 **Comida** - Alimentos e refeições
- ✨ **Luxos** - Itens de luxo e entretenimento
- 🏠 **Contas** - Contas fixas (aluguel, luz, internet)
- 🚗 **Transporte** - Uber, gasolina, combustível
- 📦 **Necessidades** - Itens essenciais
- 💰 **Depósito** - Transferências para poupança

## 🔒 Privacidade e Segurança

Todos os seus dados são armazenados **localmente no seu navegador** usando `localStorage`. Nenhum dado é enviado para servidores externos.

## 🤝 Contribuições

Contribuições são bem-vindas! Para reportar bugs ou sugerir melhorias, abra uma [issue](https://github.com/enzobarbosa10/Dindin/issues).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**Enzo Barbosa** - [@enzobarbosa10](https://github.com/enzobarbosa10)

---

**Desenvolvido com ❤️ para ajudar você a controlar suas finanças**
