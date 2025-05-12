'use client';
import React, { useEffect} from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { useRouter } from 'next/navigation';
import { formatDateToISO } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCashRegisterPages } from '@/store/cash-register/cashRegisterHandler';
import { TrashIcon } from '@heroicons/react/24/outline';


export default function CashRegisterTable() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { cashRegisterPages } = useSelector((state: RootState) => state.cashRegister);

    
    useEffect(() => {
        dispatch(fetchCashRegisterPages());
    }, [dispatch]);

    if (!cashRegisterPages) return null;
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1000px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Page date
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Trodat total
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Fourniture total
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Total
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {cashRegisterPages.map(page => (
                                <TableRow key={page._id}
                                    onClick={() => { router.push(`/admin/cash-register/${page._id}`) }}
                                >
                                    <TableCell className="px-5 py-4 sm:px-6  text-white font-semibold text-start dark:text-gray-400">
                                        {formatDateToISO(page.date)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {page.t_total || 0} DA
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {page.f_total || 0} DA
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        {page.total || 0} DA
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <TrashIcon className='text-brand-500 cursor-pointer size-7' />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
