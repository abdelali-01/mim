'use client';
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TrodatRegistersTable from '@/components/tables/TrodatRegistersTable';
import { AppDispatch } from '@/store/store';
import { addTrodatRegisterPage, fecthTrodatStockTable } from '@/store/trodat-register/trodatRegisterHandler';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function TrodatRegister() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(fecthTrodatStockTable())
    },[dispatch]);

    return (
        <div>
            <PageBreadcrumb pageTitle='Trodat Register' />
            <ComponentCard title='Trodat Register' cta={{ content: 'Add Page', onClick: () => {dispatch(addTrodatRegisterPage())} }}>
                <TrodatRegistersTable/>
            </ComponentCard>
        </div>
    )
}
