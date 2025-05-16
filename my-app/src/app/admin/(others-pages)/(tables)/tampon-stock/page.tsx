'use client';
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import TamponStockModal from '@/components/example/ModalExample/TamponStockModal';
import TamponTable from '@/components/tables/TamponTable';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import { AppDispatch, RootState } from '@/store/store';
import { fecthTrodatStockTable } from '@/store/trodat-register/trodatRegisterHandler';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function TamponStockPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {stockTable} = useSelector((state : RootState)=> state.trodatRegister);

    const {isOpen , openModal , closeModal} = useModal();

    useEffect(()=>{
        dispatch(fecthTrodatStockTable());
    },[]);


    if(!stockTable) return null ;
  return (
    <div>
      <PageBreadcrumb pageTitle='Tompons stock' />
      <ComponentCard title='Tompons stock Table' cta={{content : 'Update stock' , onClick : ()=>{openModal()}}}>
        <TamponTable table={stockTable}/>
      </ComponentCard>

      {isOpen && 
        <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className='max-w-[80%] p-5 lg:p-10'
        index='z-99999'
        >
            <TamponStockModal tableStock={stockTable.table} closeModal={closeModal} id={stockTable._id}/>
        </Modal>}
    </div>
  )
}
