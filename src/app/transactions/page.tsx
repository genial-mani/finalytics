"use client";

import { AddTransaction } from "@/components/AddTransaction";
import { Transaction } from "@/components/Transaction";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useTransactionStore from "@/hooks/useTransactionStore";

const Transactions = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const transactions = useTransactionStore((state) => state.transactions);
  const setTransactions = useTransactionStore((state) => state.setTransactions);

  const fetchTransactions = async (page: number) => {
    try {
      const response = await fetch(`/api/transactions?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch transactions");

      const data = await response.json();
      setTransactions(data?.transactions);
      setTotalPages(Math.ceil(data.total / 10)); // Assuming limit = 10
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  return (
    <div className="w-full max-w-full px-5 py-7 flex flex-col ">
      <div className="w-full max-w-full flex justify-between">
        <h1 className="text-2xl mb-5">Transactions</h1>
        <AddTransaction />
      </div>

      <div className="w-full max-w-full py-5">
        {transactions?.length > 0 ? (
          transactions?.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} />
          ))
        ) : (
          <p>No transactions.</p>
        )}
      </div>

      {/* Pagination Component */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => page > 1 && setPage(page - 1)}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => page < totalPages && setPage(page + 1)}
              aria-disabled={page >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Transactions;
