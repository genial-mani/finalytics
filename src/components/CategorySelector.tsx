import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from "@/utils/categories"
import { Icon } from "@iconify/react"

export function CategorySelector({
  formData,
  setFormData,
}: {
  formData?: {
    amount: string;
    date: string;
    description: string;
    category: string;
} ;
  setFormData?: React.Dispatch<React.SetStateAction<{
    amount: string;
    date: string;
    description: string;
    category: string;
}>>;
}) {
  return (
    <Select value={formData?.category} onValueChange={(value) => {
        if (setFormData) {
            setFormData((prev)=> ({...prev, category: value}))
        }
    }
    }>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category) => (
            <SelectItem key={category.name} value={category.name}>
              <div className="flex items-center gap-2">
                <Icon
                  icon={category.icon}
                  width={20}
                  height={20}
                  />
                {category.name}
              </div>
            </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
