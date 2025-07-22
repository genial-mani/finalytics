export interface TransactionType {
    id: string;
    amount: number;
    date: string;
    desc: string;
    category: string;
    createdAt: string;
}

export interface CategoryBudgetType{
    id: string;
    category: string;
    budget: number;
}

export interface budgetType{
    id: string;
    month: string;
    year: number;
    budget: CategoryBudgetType[];
}

export interface TransactionStore {
    transactions: TransactionType[];
    setTransactions: (transactions: TransactionType[]) => void;
    addTransaction: (transaction: TransactionType) => void;
    updateTransaction: (transaction: TransactionType) => void;
    removeTransaction: (transactionId: string) => void;
    clearTransactions: () => void;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    budgets: budgetType[];
    setBudgets: (budgets: budgetType[])=> void;
    addBudget: (budget:budgetType)=> void;
}