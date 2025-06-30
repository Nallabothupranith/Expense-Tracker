"use client";
import { useEffect, useState } from "react";
import AddExpenseForm from "@/components/add-expense-form";
import ExpensesList from "@/components/expenses-list";
import SettleUpModal from "./settle-up-modal";

interface Member {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  amount: number;
  currency: string;
  spent_by: string;
  spend_by_name?: string;
  spent_to: string[];
  created_at: string;
}

export default function ExpensesPageClient({ groupId }: { groupId: string }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showSettleUp, setShowSettleUp] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [membersRes, expensesRes] = await Promise.all([
          fetch(`/api/groups/${groupId}/members`),
          fetch(`/api/expences?groupId=${groupId}`),
        ]);

        const membersData = await membersRes.json();
        if (membersRes.ok) {
          setMembers(membersData.members || []);
        } else {
          setError(
            (prev) =>
              (prev ? `${prev}, ` : "") +
              (membersData.error || "Failed to load members")
          );
        }

        const expensesData = await expensesRes.json();
        if (expensesRes.ok) {
          setExpenses(expensesData.expenses || []);
        } else {
          setError(
            (prev) =>
              (prev ? `${prev}, ` : "") +
              (expensesData.error || "Failed to load expenses")
          );
        }
      } catch {
        setError("An unexpected error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId, refreshKey]);

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowSettleUp(true)}
            className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all font-semibold text-base shadow-md text-center"
          >
            Settle Up
          </button>
        </div>
      </div>
      <ExpensesList
        expenses={expenses}
        loading={loading}
        error={error}
        onAddExpense={() => setShowAddExpense(true)}
      />
      {showAddExpense && (
        <AddExpenseForm
          groupId={groupId}
          members={members}
          onClose={() => setShowAddExpense(false)}
          onExpenseAdded={() => {
            setShowAddExpense(false);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
      {showSettleUp && (
        <SettleUpModal
          expenses={expenses}
          members={members}
          onClose={() => setShowSettleUp(false)}
        />
      )}
    </>
  );
}
