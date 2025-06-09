import { useEffect, useState } from "react";

interface Transaction {
  date: string;
  referenceId: string;
  to: string;
  transactionType: string;
  amount: number;
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transaction-history")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Fetched transactions:", data);
        setTransactions(data);
      })
      .catch((err) => console.error("Failed to fetch transactions:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Transaction History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Reference ID</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">Transaction Type</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border">{txn.date}</td>
                <td className="p-2 border">{txn.referenceId}</td>
                <td className="p-2 border">{txn.to}</td>
                <td className="p-2 border">{txn.transactionType}</td>
                <td className="p-2 border">${txn.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
