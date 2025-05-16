'use client';
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TrodatRegisterPageTable from '@/components/tables/TrodatRegisterPageTable';
import Button from '@/components/ui/button/Button';
import { AppDispatch, RootState } from '@/store/store'
import { fecthTrodatStockTable, fetchTrodatRegisterPages, findTrodatRegisterPage } from '@/store/trodat-register/trodatRegisterHandler';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Page() {
  const { trodatRegisterPages, selectedPage } = useSelector((state: RootState) => state.trodatRegister);
  const dispatch = useDispatch<AppDispatch>();
  const { pageId } = useParams();

  useEffect(() => {
    if (trodatRegisterPages) {
      dispatch(findTrodatRegisterPage(trodatRegisterPages, pageId));
    } else {
      dispatch(fetchTrodatRegisterPages());
    }
  }, [pageId, dispatch, trodatRegisterPages]);

  useEffect(() => {
    dispatch(fecthTrodatStockTable())
  }, [dispatch]);

  if (!selectedPage) return null;
  return (
    <div>
      <PageBreadcrumb pageTitle={`Trodat Register Page`}
        paths={['trodat-orders']}
      />
      <ComponentCard title={`Trodat Register Page`} info={<Button size='sm' className='cursor-default'>{selectedPage.total} DA</Button>}>
        <TrodatRegisterPageTable selectedPage={selectedPage} />
      </ComponentCard>
    </div>
  )
}
