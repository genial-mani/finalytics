import { TransactionType } from "@/utils/interfaces";
import { categories } from "@/utils/categories";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { UpdateTransaction } from "./UpdateTransaction";
import { DeleteTransaction } from "./DeleteTransaction";

export const Transaction = ({
  transaction,
}: {
  transaction: TransactionType;
}) => {
  return (
    <div className="flex items-center justify-between py-3 sm:p-4 border-b border-gray-200 max-[600px]:text-sm">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <span className="flex items-center text-gray-500 gap-2">
            <Icon
              icon={
                categories.find((cat) => cat.name === transaction.category)
                  ?.icon || "mdi:shape-outline"
              }
              width={20}
              height={20}
            />
            {transaction.category}
          </span>
          <div className="flex items-center justify-center flex-wrap sm:flex-row">
            <span className="text-sm sm:text-lg font-semibold">
              ${transaction.amount.toFixed(2)}
            </span>
            <span className="ml-4 text-sm text-gray-400">
              {format(transaction.date, "PPP")}
            </span>
          </div>
        </div>

        <span className="text-sm">{transaction.desc}</span>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1 sm:gap-4 sm:px-5">
          <div className="edit cursor-pointer">
            <UpdateTransaction transaction={transaction} />
          </div>
          <div className="delete cursor-pointer">
            <DeleteTransaction transactionId={transaction?.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
