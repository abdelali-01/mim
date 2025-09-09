'use client';
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import CashRegisterTable from '@/components/tables/CashRegisterTable'
import { addCashRegisterPage } from '@/store/cash-register/cashRegisterHandler';
import { AppDispatch } from '@/store/store';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Button from '@/components/ui/button/Button';
import AddCashRegisterPageModal from '@/components/modals/AddCashRegisterPageModal';

export default function CashRegister() {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddPage = async () => {
        try {
            await dispatch(addCashRegisterPage());
        } catch (error) {
            console.error('Error adding page:', error);
        }
    };

    return (
        <div>
            <PageBreadcrumb pageTitle='Cash Register' />
            <ComponentCard 
                title='Cash Register' 
                info={
                    <div className="flex gap-2">
                        <Button 
                            size="sm" 
                            onClick={handleAddPage}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Add Page
                        </Button>
                        <Button 
                            size="sm" 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Add Manual
                        </Button>
                    </div>
                }
            >
                <CashRegisterTable />
            </ComponentCard>

            <AddCashRegisterPageModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
