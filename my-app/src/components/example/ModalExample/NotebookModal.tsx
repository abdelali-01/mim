"use client";
import React, { useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import { NotebookItem, ProductItem } from "../../../../public/types";
import { useModal } from "@/hooks/useModal";
import { formatDateToISO } from "@/utils";
import Badge from "@/components/ui/badge/Badge";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  notebookData?: NotebookItem;
}


export default function NotebookModal({ notebookData }: Props) {
  const { closeModal } = useModal();
  const [item, setItem] = useState<NotebookItem | null>(null);

  const addProduct = () => {
    if (!item) return;
    const newProduct = { product: '', price: 0, quantity: 1 };
    const updatedItem = {
      ...item,
      products: [...item.products, newProduct],
    };

    setItem(updatedItem);
  }


  useEffect(() => {
    if (notebookData) setItem(notebookData)
    else setItem({
      products: [
        {
          product: '',
          quantity: 1,
          price: 0,
        },
      ],
      total: 0,
      prePayment: 0,
      paid: false,
    })
  }, [notebookData]);

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  if (!item) return null;
  return (
    <form className="" onSubmit={(e) => { e.preventDefault() }}>
      <div className="max-h-[75vh] overflow-y-auto">
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90 flex items-center gap-2 ">
          <span>{notebookData ? `Credit Information of ${formatDateToISO(item.date)}` : 'Add The credit information'}</span>
          <Badge
            size="sm"
            color={
              item.total === 0 && item.prePayment === 0
                ? "light"
                : item.total > 0 === item.prePayment > 0 ?
                  "success" : "warning"
            }
          >
            {item.total === 0 && item.prePayment === 0
              ? "still"
              : item.total > 0 === item.prePayment > 0 ?
                "paid" : "not paid"}
          </Badge>
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>Pre Payment</Label>
            <Input type="number" defaultValue={item.prePayment} placeholder="The pre payment " />
          </div>

          <div className="col-span-1">
            <Label>Rest</Label>
            <Input type="number" placeholder="Rest" defaultValue={item.total - item.prePayment} disabled />
          </div>

          <div className="col-span-1">
            <Label>Total</Label>
            <Input type="number" placeholder="total credit in this date" defaultValue={item.total} />
          </div>

          <div className="col-span-1">
            <Label>Paid date</Label>
            <Input type='date' placeholder="paid date" defaultValue={item.paidDate && formatDateToISO(item.paidDate)} />
          </div>
        </div>

        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90 mt-5">
          Products
        </h4>
        {item.products.length < 1 ? <div>
          <h4 className="mb-6 text-lg font-medium text-gray-400 dark:text-gray-500 mt-5 text-center">
            The is no product added
          </h4>
        </div> :
          item.products.map(({ product, price, quantity }, i) => (
            <div key={product + Date.now()}>
              <h4 className="ms-3 font-medium text-gray-800 dark:text-white/90 mt-6 mb-3 flex items-center justify-between">
                <span>Product {i + 1}</span>
                <TrashIcon className="size-7 cursor-pointer text-brand-500" />
              </h4>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
                <div className="col-span-3">
                  <Label>Product</Label>
                  <Input type="text" defaultValue={product} placeholder="The product name" />
                </div>

                <div className="col-span-1">
                  <Label>Price</Label>
                  <Input type="number" placeholder="Rest" defaultValue={price} />
                </div>
                <div className="col-span-1">
                  <Label>Quantity</Label>
                  <Input type='number' min="1" placeholder="Quantity of product" defaultValue={quantity} />
                </div>
                <div className="col-span-1">
                  <Label>Total</Label>
                  <Input type="number" placeholder="Total" defaultValue={price * quantity} />
                </div>


              </div>

              {i !== item.products.length - 1 && <hr className="border-gray-500 my-4" />}
            </div>
          ))
        }

        <div className="my-4 flex justify-end" onClick={addProduct}>
          <Button size="sm">Add Product</Button>
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="sm" variant="outline" onClick={closeModal}>
          Close
        </Button>
        <Button size="sm" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </form>

  );
}
