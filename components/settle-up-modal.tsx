"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface AutoTableOptions {
  startY: number;
  head: string[][];
  body: string[][];
}
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: AutoTableOptions) => jsPDF;
  }
}

interface Member {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  amount: number;
  currency: string;
  spent_by: string;
  spent_to: string[];
}

interface SettleUpModalProps {
  expenses: Expense[];
  members: Member[];
  onClose: () => void;
}

export default function SettleUpModal({
  expenses,
  members,
  onClose,
}: SettleUpModalProps) {
  const [transactions, setTransactions] = useState<
    { from: string; to: string; amount: number }[]
  >([]);

  useEffect(() => {
    const calculateSettlement = () => {
      if (expenses.length === 0 || members.length === 0) {
        return;
      }

      const balances: { [key: string]: number } = {};
      members.forEach((m) => (balances[m.id] = 0));

      expenses.forEach((expense) => {
        const payerId = expense.spent_by;
        const amount = expense.amount;
        let splitWith = expense.spent_to;

        if (splitWith.length === 0) {
          splitWith = members.map((m) => m.id);
        }
        const share = amount / splitWith.length;

        balances[payerId] += amount;

        splitWith.forEach((memberId) => {
          balances[memberId] -= share;
        });
      });

      const debtors = Object.entries(balances)
        .filter(([, balance]) => balance < 0)
        .map(([id, balance]) => ({ id, balance: -balance }));
      const creditors = Object.entries(balances)
        .filter(([, balance]) => balance > 0)
        .map(([id, balance]) => ({ id, balance }));

      const newTransactions: { from: string; to: string; amount: number }[] =
        [];

      let i = 0,
        j = 0;
      while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];
        const amountToSettle = Math.min(debtor.balance, creditor.balance);

        if (amountToSettle > 0.01) {
          newTransactions.push({
            from: getMemberName(debtor.id),
            to: getMemberName(creditor.id),
            amount: amountToSettle,
          });
        }

        debtor.balance -= amountToSettle;
        creditor.balance -= amountToSettle;

        if (debtor.balance < 0.01) i++;
        if (creditor.balance < 0.01) j++;
      }

      setTransactions(newTransactions);
    };

    calculateSettlement();
  }, [expenses, members]);

  const getMemberName = (id: string) => {
    return members.find((m) => m.id === id)?.name || "Unknown Member";
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Settlement", 14, 20);

    doc.autoTable({
      startY: 30,
      head: [["From", "To", "Amount"]],
      body: transactions.map((t) => [t.from, t.to, `${t.amount.toFixed(2)}`]),
    });

    doc.save("settlement.pdf");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#2d2e82]">Settle Up</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                No settlements needed or still calculating...
              </p>
            ) : (
              <ul className="space-y-3">
                {transactions.map((t, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <span className="font-semibold text-red-600">{t.from}</span>
                    <span className="text-gray-500 mx-2">&rarr;</span>
                    <span className="font-semibold text-green-600">{t.to}</span>
                    <span className="font-bold text-lg text-gray-800 ml-auto">
                      {t.amount.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={exportToPDF}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              disabled={transactions.length === 0}
            >
              Export as PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
