import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircleIcon } from "lucide-react";
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

export const AddTransaction = () => {
  const [formData, setFormData] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const isLoading = useTransactionStore((state) => state.isLoading);
  const setIsLoading = useTransactionStore((state) => state.setLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transaction Submitted:", formData);

    try {
      setIsLoading(true);
      const response = await fetch("/api/transactions/", {
        method: "POST",
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
        console.error("Failed to add transaction");
        const data = await response.json();
        toast.error(data?.error);
        return;
      }
      const data = await response.json();
      toast.success(data.message);
      const newTransaction: TransactionType = data.newTransaction;
      addTransaction(newTransaction);
      setFormData({
        amount: "",
        date: "",
        description: "",
        category: "",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <Dialog>
      <form
        className="onscroll-y-auto"
        id="transaction-form"
        onSubmit={handleSubmit}
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer flex justify-center items-center">
            <Icon
              icon="si:add-fill"
              width="24"
              height="24"
            />
            <p className="hidden sm:block">New Transaction</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Transaction</DialogTitle>
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
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  return setFormData({
                    amount: "",
                    date: "",
                    description: "",
                    category: "",
                  });
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              form="transaction-form"
              disabled={
                !formData.amount ||
                !formData.date ||
                !formData.category ||
                isLoading
              }
            >
              {isLoading && <LoaderCircleIcon className="animate-spin mr-1" />}
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
