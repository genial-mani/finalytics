import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { toast } from "sonner";
import useTransactionStore from "@/hooks/useTransactionStore";
import { LoaderCircleIcon } from "lucide-react";

export const DeleteTransaction = ({
  transactionId,
}: {
  transactionId: string;
}) => {
    const [transaction_Id, setTransactionId] = useState(transactionId);
  
  const removeTransaction = useTransactionStore((state) => state.removeTransaction);
  const isLoading = useTransactionStore((state) => state.isLoading);
  const setIsLoading = useTransactionStore((state) => state.setLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transaction Submitted:", transaction_Id);
    const id = transactionId;
    try {
    setIsLoading(true);
      const response = await fetch(`/api/transactions/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error("Failed to delete transaction");
      const data = await response.json();
      setIsLoading(false);
      toast.error(data?.error);
      return;
    }
    const data = await response.json();
    toast.success(data?.message);
    removeTransaction(transaction_Id);
    setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to delete transaction", error);
      toast.error("Failed to delete transaction");
      return;
      
    }
  };
  return (
    <Dialog
    key={transactionId}
        onOpenChange={(open) => {
            if (open) {
            setTransactionId(transactionId);
            }
        }}
    >
      <form
        className="onscroll-y-auto"
        id={`deleteTransaction-form-${transactionId}`}
        onSubmit={handleSubmit}
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="">
            <Icon icon="mdi:delete" width={20} height={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-medium">Delete the transaction.</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              form={`deleteTransaction-form-${transactionId}`}
              disabled={isLoading}
            >
              {isLoading && <LoaderCircleIcon className="animate-spin mr-1" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
