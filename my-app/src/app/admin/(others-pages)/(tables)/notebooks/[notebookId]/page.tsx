'use client';

import { useEffect } from "react";
import { useParams } from "next/navigation";
import PageBreadcrumb from '../../../../../../components/common/PageBreadCrumb';
import ComponentCard from "@/components/common/ComponentCard";
import NotebookTable from "@/components/tables/NotebookTable";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import NotebookModal from "@/components/example/ModalExample/NotebookModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchNotebooks, findNotebook } from "@/store/notebooks/notebookHandler";

export default function NotebookPage() {
  const { isOpen, openModal, closeModal } = useModal()
  const { notebookId } = useParams();
  const dispatch = useDispatch<AppDispatch>()
  const {selectedNotebook : notebook , notebooks} = useSelector((state : RootState)=> state.notebooks);
  

  useEffect(() => {
    if(!notebooks){
    dispatch(fetchNotebooks());
    }else if (notebookId){
      dispatch(findNotebook(notebooks , notebookId));
    }
  }, [notebookId , dispatch , notebooks]);



  if (!notebook) return <div>Loading ...</div>;
  return (
    <div>
      <PageBreadcrumb pageTitle={`credit notebook of ${notebook.client.username}`} 
      paths={['notebooks']}
      />
      <ComponentCard title={`credit notebook`}>
        <div className="flex items-center justify-end">
          <Button size="sm" variant="outline" startIcon={<PlusIcon className="size-4" />} onClick={()=> openModal()}>Add</Button>
        </div>
        <NotebookTable notebook={notebook} />
      </ComponentCard>

      {isOpen && <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <NotebookModal closeModal={closeModal}/>
      </Modal>}
    </div>
  )
}
