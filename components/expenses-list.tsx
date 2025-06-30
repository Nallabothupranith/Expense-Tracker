"use client";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Expense {
  id: string;
  amount: number;
  currency: string;
  spent_by: string;
  spend_by_name?: string;
  spent_to: string[];
  created_at: string;
  Groups?: { name: string };
  Users?: { name: string; email: string };
}

interface ExpensesListProps {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  onAddExpense?: () => void;
}

export default function ExpensesList({
  expenses,
  loading,
  error,
  onAddExpense,
}: ExpensesListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  return (
    <div className="w-full space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#2d2e82]">Expenses</h2>
        {onAddExpense && (
          <Button
            onClick={onAddExpense}
            className="bg-[#7b8cff] hover:bg-[#2d2e82] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        )}
      </div>

      {/* Mobile Card Layout */}
      <div className="block sm:hidden space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="rounded-xl bg-white/80 shadow p-3 flex flex-col gap-1 border border-white/40"
          >
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">
                {formatDate(expense.created_at)}
              </span>
              <span className="font-bold text-green-600">
                {formatCurrency(expense.amount, expense.currency)}
              </span>
            </div>
            <div className="text-xs">
              Paid By:{" "}
              <span className="font-semibold">
                {expense.spend_by_name || expense.spent_by}
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="p-2 rounded hover:bg-blue-100"
                title="Edit Expense"
              >
                <Pencil className="w-4 h-4 text-blue-600" />
              </button>
              <button
                className="p-2 rounded hover:bg-red-100"
                title="Delete Expense"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-center text-gray-500 py-6 text-xs">
            Loading expenses...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-6 text-xs">{error}</div>
        )}
        {!loading && !error && expenses.length === 0 && (
          <div className="text-center text-gray-500 py-6 text-xs">
            No expenses found. Add your first expense!
          </div>
        )}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-md shadow-md sm:shadow-xl border border-white/40 mt-6 sm:mt-8 transition-all duration-700">
        <div className="min-w-[400px] sm:min-w-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                  Date
                </TableHead>
                <TableHead className="min-w-[100px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm text-right">
                  Amount
                </TableHead>
                <TableHead className="min-w-[120px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                  Paid By
                </TableHead>
                <TableHead className="min-w-[80px] px-1 sm:px-2 py-2 sm:py-3 text-[11px] sm:text-sm">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-500 py-6 sm:py-8 text-xs sm:text-base"
                  >
                    Loading expenses...
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-red-500 py-6 sm:py-8 text-xs sm:text-base"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              )}
              {!loading && !error && expenses.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-500 py-6 sm:py-8 text-xs sm:text-base"
                  >
                    No expenses found. Add your first expense!
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                !error &&
                expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="px-1 sm:px-2 py-2 sm:py-3 text-[12px] sm:text-base">
                      {formatDate(expense.created_at)}
                    </TableCell>
                    <TableCell className="font-bold text-green-600 px-1 sm:px-2 py-2 sm:py-3 text-[12px] sm:text-base text-right">
                      {formatCurrency(expense.amount, expense.currency)}
                    </TableCell>
                    <TableCell className="px-1 sm:px-2 py-2 sm:py-3 text-[12px] sm:text-base">
                      {expense.spend_by_name || expense.spent_by}
                    </TableCell>
                    <TableCell className="flex gap-1 sm:gap-2 items-center px-1 sm:px-2 py-2 sm:py-3">
                      <button
                        className="p-2 rounded hover:bg-blue-100 transition-colors"
                        title="Edit Expense"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        className="p-2 rounded hover:bg-red-100 transition-colors"
                        title="Delete Expense"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableCaption className="text-center text-[11px] sm:text-xs">
              {!loading &&
                !error &&
                expenses.length === 0 &&
                "No expenses found."}
            </TableCaption>
          </Table>
        </div>
        <div className="block sm:hidden text-center text-[10px] text-gray-400 pt-1 pb-2">
          Swipe &rarr; to see more
        </div>
      </div>
    </div>
  );
}
