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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { DatePicker } from "./dashboard/DatePicker";
import { useState } from "react";
import { CategorySelector } from "./CategorySelector";
import { toast } from "sonner";
import { TransactionType } from "@/utils/interfaces";
import useTransactionStore from "@/hooks/useTransactionStore";
import { LoaderCircleIcon } from "lucide-react";

export const UpdateTransaction = ({
  transaction,
}: {
  transaction: TransactionType;
}) => {
  const [formData, setFormData] = useState({
    amount: transaction?.amount.toString(),
    date: transaction?.date,
    description: transaction?.desc,
    category: transaction?.category,
  });
  const update = useTransactionStore((state) => state.updateTransaction);
  const isLoading = useTransactionStore((state) => state.isLoading);
  const setIsLoading = useTransactionStore((state) => state.setLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Transaction Submitted:", formData);
    const id = transaction?.id;
    try {
      setIsLoading(true);
      const response = await fetch(`/api/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          date: formData.date,
          description: formData.description,
          category: formData.category,
        }),
      });
      if (!response.ok) {
        setIsLoading(false);
        console.error("Failed to update transaction");
        const data = await response.json();
        toast.error(data?.error);
        return;
      }
      const data = await response.json();
      setIsLoading(false);
      toast.success(data?.message);
      const updatedTransaction = data?.updatedTransaction;
      update(updatedTransaction);
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating transaction:", error);
      toast.error("Failed to update transaction");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("Form Data Changed:", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Dialog
      key={transaction?.id}
      onOpenChange={(open) => {
        if (open) {
          setFormData({
            amount: transaction?.amount.toString(),
            date: transaction?.date,
            description: transaction?.desc,
            category: transaction?.category,
          });
        }
      }}
    >
      <form
        className="onscroll-y-auto"
        id={`updateTransaction-form-${transaction?.id}`}
        onSubmit={handleSubmit}
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <Icon
              icon="tdesign:edit-filled"
              width={20}
              height={20}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Transaction</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData?.amount}
                placeholder="$"
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <DatePicker formData={formData} setFormData={setFormData} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData?.description}
                onChange={handleChange}
                placeholder="Its a grocery shoping..."
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Category</Label>
              <CategorySelector formData={formData} setFormData={setFormData} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              form={`updateTransaction-form-${transaction?.id}`}
              disabled={
                !formData.amount ||
                !formData.date ||
                !formData.category ||
                isLoading
              }
            >
              {isLoading && <LoaderCircleIcon className="animate-spin mr-1" />}
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
