"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import DashboardHeader from "@/components/dashboard-header";
import TransactionsTable from "@/components/transactions-table";
import TransactionFormModal from "@/components/transaction-form-modal";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import type { Transaction } from "@/types/transaction";
import { fetchTransactions } from "@/lib/api";
import { toast } from "sonner";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated and not loading
    if (!user && !authLoading) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast.error("Failed to load transactions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransactionAdded = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
    setShowAddModal(false);
    toast.success("Your transaction has been added successfully");
  };

  const handleTransactionUpdated = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    toast.success("Your transaction has been updated successfully");
  };

  const handleTransactionDeleted = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.success("Your transaction has been deleted successfully");
  };

  // If still loading authentication state, show loading
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // If not authenticated and not loading, the useEffect will redirect
  if (!user && !authLoading) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader />

      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Transactions</h1>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <TransactionsTable
            transactions={transactions}
            onUpdate={handleTransactionUpdated}
            onDelete={handleTransactionDeleted}
          />
        )}
      </main>

      {showAddModal && (
        <TransactionFormModal
          onClose={() => setShowAddModal(false)}
          onSave={handleTransactionAdded}
        />
      )}
    </div>
  );
}
