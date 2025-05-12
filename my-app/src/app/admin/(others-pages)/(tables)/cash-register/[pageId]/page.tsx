'use client';
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import CashRegisterPageTable from '@/components/tables/CashRegisterPageTable';
import Button from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal';
import { useModal } from '@/hooks/useModal';
import { fetchCashRegisterPages, findCashRegisterPage } from '@/store/cash-register/cashRegisterHandler';
import { AppDispatch, RootState } from '@/store/store'
import { PlusIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Page() {
    const { cashRegisterPages ,selectedPage} = useSelector((state : RootState)=> state.cashRegister);
    const dispatch = useDispatch<AppDispatch>();
    const {pageId} = useParams();

    useEffect(()=>{
        if(cashRegisterPages){
            dispatch(findCashRegisterPage(cashRegisterPages , pageId));
        }else{
            dispatch(fetchCashRegisterPages());
        }
    },[pageId , dispatch , cashRegisterPages]);

  if(!selectedPage ) return null ;
  return (
    <div>
      <PageBreadcrumb pageTitle={`Cash Register Page`} 
      paths={['cash-register']}
      />
      <ComponentCard title={`Cash Register Page`}>
        <CashRegisterPageTable page={selectedPage}/>
      </ComponentCard>
    </div>
  )
}
