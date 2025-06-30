"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Member = {
  id: string;
  name: string;
};

interface AddExpenseFormProps {
  groupId: string;
  members: Member[];
  onClose: () => void;
  onExpenseAdded: () => void;
}

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "CAD", symbol: "C$" },
  { code: "AUD", symbol: "A$" },
  { code: "INR", symbol: "₹" },
];

export default function AddExpenseForm({
  groupId,
  members,
  onClose,
  onExpenseAdded,
}: AddExpenseFormProps) {
  const [formData, setFormData] = useState({
    amount: "",
    currency: "USD",
    spent_by: "",
    spent_to: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/expences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date(),
          amount: parseFloat(formData.amount),
          currency: formData.currency,
          spent_by: formData.spent_by,
          group_id: groupId,
          spent_to: formData.spent_to.length > 0 ? formData.spent_to : members,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onExpenseAdded();
        onClose();
      } else {
        setError(data.error || "Failed to add expense");
      }
    } catch {
      setError("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  const toggleMember = (member: Member) => {
    setFormData((prev) => ({
      ...prev,
      spent_to: prev.spent_to.includes(member.id)
        ? prev.spent_to.filter((m) => m !== member.id)
        : [...prev.spent_to, member.id],
    }));
  };

  const selectAllMembers = () => {
    setFormData((prev) => ({
      ...prev,
      spent_to: members.map((m) => m.id),
    }));
  };

  const clearAllMembers = () => {
    setFormData((prev) => ({
      ...prev,
      spent_to: [],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#2d2e82]">Add Expense</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount and Currency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  placeholder="0.00"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7b8cff] focus:border-transparent"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Paid By */}
            <div>
              <Label htmlFor="spent_by">Paid By</Label>
              <select
                id="spent_by"
                value={formData.spent_by}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, spent_by: e.target.value }))
                }
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7b8cff] focus:border-transparent"
              >
                <option value="">Select who paid</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Split With */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Split With</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={selectAllMembers}
                    className="text-xs text-[#7b8cff] hover:underline"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={clearAllMembers}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
                {members.map((member) => (
                  <label
                    key={member.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.spent_to.includes(member.id)}
                      onChange={() => toggleMember(member)}
                      className="rounded border-gray-300 text-[#7b8cff] focus:ring-[#7b8cff]"
                    />
                    <span className="text-sm">{member.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#7b8cff] hover:bg-[#2d2e82] text-white"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Expense"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
