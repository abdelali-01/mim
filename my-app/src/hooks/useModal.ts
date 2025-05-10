"use client";
import { useState, useCallback } from "react";
import { NotebookItem } from "../../public/types";
import { User } from "@/components/auth/SignUpForm";

export const useModal = (initialState: boolean = false, initilizeError? : ()=> void) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [selectedItem, setSelectedItem] = useState<NotebookItem | User |null>(null);

  const openModal = useCallback((item? : NotebookItem | User) => {
    if(item) setSelectedItem(item);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
    if (initilizeError) initilizeError();
  }, [initialState , initilizeError]);
  
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, openModal, closeModal , selectedItem, toggleModal };
};
