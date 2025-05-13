'use client';
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TrodatRegistersTable from '@/components/tables/TrodatRegistersTable';
import { AppDispatch } from '@/store/store';
import { addTrodatRegisterPage } from '@/store/trodat-register/trodatRegisterHandler';
import { useDispatch } from 'react-redux';

export default function TrodatRegister() {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <PageBreadcrumb pageTitle='Trodat Register' />
            <ComponentCard title='Trodat Register' cta={{ content: 'Add Page', onClick: () => {dispatch(addTrodatRegisterPage())} }}>
                <TrodatRegistersTable/>
            </ComponentCard>
        </div>
    )
}
