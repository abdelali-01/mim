"use client";
import React from "react";
import Button from "../../ui/button/Button";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import { NotebookItem } from "../../../../public/types";
import { useModal } from "@/hooks/useModal";

interface Props {
  notebookData: NotebookItem;
}


export default function NotebookModal({ notebookData}: Props) {
  const { closeModal } = useModal();

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };


  return (
    <form className="">
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        Credit Information of {notebookData.date.split('T')[0]} 
      </h4>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
        <div className="col-span-1">
          <Label>Pre Payment</Label>
          <Input type="text" defaultValue={notebookData.prePayment} placeholder="The pre payment "/>
        </div>

        <div className="col-span-1">
          <Label>Rest</Label>
          <Input type="text" placeholder="Rest" defaultValue={notebookData.total - notebookData.prePayment}/>
        </div>

        <div className="col-span-1">
          <Label>Last Name</Label>
          <Input type="email" placeholder="emirhanboruch55@gmail.com" />
        </div>

        <div className="col-span-1">
          <Label>Phone</Label>
          <Input type="text" placeholder="+09 363 398 46" />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <Label>Bio</Label>
          <Input type="text" placeholder="Team Manager" />
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
