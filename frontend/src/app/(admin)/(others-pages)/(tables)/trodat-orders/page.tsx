'use client';
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TrodatRegistersTable from '@/components/tables/TrodatRegistersTable';
import { AppDispatch } from '@/store/store';
import { addTrodatRegisterPage, fecthTrodatStockTable } from '@/store/trodat-register/trodatRegisterHandler';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AddTrodatPageModal from '@/components/modals/AddTrodatPageModal';
import Button from '@/components/ui/button/Button';

export default function TrodatRegister() {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        dispatch(fecthTrodatStockTable())
    },[dispatch]);

    const handleAddPage = async () => {
        try {
            await dispatch(addTrodatRegisterPage());
        } catch (error) {
            console.error('Error adding page:', error);
        }
    };

    return (
        <div>
            <PageBreadcrumb pageTitle='Trodat Register' />
            <ComponentCard 
                title='Trodat Register'
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
                <TrodatRegistersTable/>
            </ComponentCard>

            <AddTrodatPageModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}
