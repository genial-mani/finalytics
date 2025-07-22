import { TransactionStore } from '@/utils/interfaces';
import {create} from 'zustand'; 
import { persist } from 'zustand/middleware';

const useTransactionStore = create<TransactionStore>()(
    persist(
    (set) => ({
    transactions: [],
    setTransactions: (transactions) => set({ transactions: transactions }),
    addTransaction: (transaction) => set((state) => ({
        transactions: [transaction, ...state.transactions]
    })),
    updateTransaction: (updatedTransaction) => set((state) => ({
        transactions: state.transactions.map(tx =>
            tx.id === updatedTransaction.id ? updatedTransaction : tx
        )
    })),
    removeTransaction: (transactionId) => set((state) => ({
        transactions: state.transactions.filter(tx => tx.id !== transactionId)
    })),
    clearTransactions: () => set({ transactions: [] }), // left unused intentionaly
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
    budgets: [],
    setBudgets: (budgets)=> set({budgets: budgets}),
    addBudget: (budget)=> set((state)=>({
        budgets: [budget, ...state.budgets]
    })),
    }),
    {name: 'transaction-storage'})
);


export default useTransactionStore;