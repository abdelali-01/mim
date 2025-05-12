'use client';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { useRouter } from 'next/navigation';
import { formatDateToISO } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { deleteCashRegisterPage, fetchCashRegisterPages } from '@/store/cash-register/cashRegisterHandler';
import { ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import ChartTab from '../common/ChartTab';
import { useDeleteModal } from '@/context/DeleteModalContext';


export default function CashRegisterTable() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { cashRegisterPages, registers } = useSelector((state: RootState) => state.cashRegister);
    const [filterType, setFilterType] = useState<"daily" | "monthly">("daily");


    const { openModal } = useDeleteModal();


    useEffect(() => {
        dispatch(fetchCashRegisterPages());
    }, [dispatch]);

    if (!cashRegisterPages) return null;
    return (
        <>
            <div className='flex justify-end'>
                <ChartTab selected={filterType} onSelect={setFilterType} />
            </div>

            {filterType === 'monthly' ? <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
                                        Register month
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
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {registers.map(register => (
                                    <TableRow key={register._id}
                                    >
                                        <TableCell className="px-5 py-4 sm:px-6  text-white font-semibold text-start dark:text-gray-400">
                                            {formatDateToISO(register._id)}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {register.t_total || 0} DA
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {register.f_total || 0} DA
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {register.total || 0} DA
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div> :
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
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center gap-2">
                                                <ArrowTopRightOnSquareIcon className='text-brand-500 cursor-pointer size-7'
                                                    onClick={() => { router.push(`/admin/cash-register/${page._id}`) }}
                                                />
                                                <TrashIcon className='text-brand-500 cursor-pointer size-7' onClick={() => openModal(page._id, (id) => { dispatch(deleteCashRegisterPage(id)) })} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>}
        </>
    )
}
