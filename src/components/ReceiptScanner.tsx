"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { receiptscanner } from "@/actions/recieptscanner";
import { toast } from "sonner";

export interface ScannedData {
  amount: string;
  date: string;
  description: string;
  category: string;
}

interface ReceiptScannerProps {
  onScanSuccess: (data: ScannedData) => void;
}

const ReceiptScanner = ({ onScanSuccess }: ReceiptScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    setIsScanning(true);
    const apiFormData = new FormData();
    apiFormData?.append("image", file);

    try {
      const res = await fetch('/api/scanreceipt', {
        method: "POST",
        body: apiFormData,
      })
      const result = await res.json()
      if(!res.ok){
        toast.error(result?.error || "Failed to scan receipt.")
      }
      onScanSuccess(result?.extractedData);
      toast.success("Receipt scanned successfully!");
    } catch (error) {
      console.log("Error scanning receipt:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(`Scan Failed: ${errorMessage}`);
    }
    finally{
        setIsScanning(false);
        if(fileInputRef?.current){
            fileInputRef.current.value = "";
        }
    }
  };

  return (
    <div className="flex">
      <Input
        id="receipt-scan"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full cursor-pointer"
        onClick={() => fileInputRef?.current?.click()}
        disabled={isScanning}
      >
        {isScanning ? (
          <LoaderCircleIcon className="animate-spin mr-2" />
        ) : (
          <Icon icon="mdi:line-scan" className="mr-2 h-5 w-5" />
        )}
        {isScanning ? "Scanning..." : "Scan Receipt"}
      </Button>
    </div>
  );
};

export default ReceiptScanner;
