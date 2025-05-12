'use client';
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import CashRegisterTable from '@/components/tables/CashRegisterTable'
import { addCashRegisterPage } from '@/store/cash-register/cashRegisterHandler';
import { AppDispatch } from '@/store/store';
import React from 'react'
import { useDispatch } from 'react-redux';

export default function CashRegister() {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            <PageBreadcrumb pageTitle='Cash Register' />
            <ComponentCard title='Cash Register' cta={{ content: 'Add Page', onClick: () => { dispatch(addCashRegisterPage()) } }}>
                <CashRegisterTable />
            </ComponentCard>
        </div>
    )
}
