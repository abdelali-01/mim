'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageBreadcrumb from '../../../../../../components/common/PageBreadCrumb';
import { tableData } from "../../../../../../../public/data";
import { Notebook } from "../../../../../../../public/types";
import ComponentCard from "@/components/common/ComponentCard";
import NotebookTable from "@/components/tables/NotebookTable";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import NotebookModal from "@/components/example/ModalExample/NotebookModal";

export default function NotebookPage() {
  const { isOpen, openModal, closeModal } = useModal()
  const { notebookId } = useParams();
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  console.log(notebook)

  useEffect(() => {
    const findNotebook = tableData.find((n) => {
      console.log(n._id, notebookId);

      return n._id == notebookId
    });
    console.log('finded one', findNotebook);

    if (findNotebook) setNotebook(findNotebook);
  }, [notebookId]);



  if (!notebook) return null;
  return (
    <div>
      <PageBreadcrumb pageTitle={`credit notebook of ${notebook.client.username}`} 
      paths={['notebooks']}
      />
      <ComponentCard title={`credit notebook`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-500 dark:text-gray-400 text-xl">Client Name : {notebook.client.username}</h3>
            <h3 className="text-gray-500 dark:text-gray-400 text-lg">Tel : {notebook.client.phone}</h3>
          </div>

          <Button size="sm" variant="outline" startIcon={<PlusIcon className="size-4" />} onClick={()=> openModal()}>Add</Button>
        </div>
        <NotebookTable notebook={notebook} />
      </ComponentCard>

      {isOpen && <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <NotebookModal />
      </Modal>}
    </div>
  )
}
