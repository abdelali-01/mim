"use client";
import { useState, useCallback } from "react";
import { NotebookItem } from "../../public/types";

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [selectedItem, setSelectedItem] = useState<NotebookItem | null>(null);

  const openModal = useCallback((item : NotebookItem) => {
    setSelectedItem(item);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
  }, []);
  const toggleModal = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, openModal, closeModal , selectedItem, toggleModal };
};
