'use client';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { useRouter } from 'next/navigation';
import { filterItems, formatDateToISO } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { ArrowTopRightOnSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import ChartTab from '../common/ChartTab';
import { useDeleteModal } from '@/context/DeleteModalContext';
import { deleteTrodatRegisterPage, fetchTrodatRegisterPages } from '@/store/trodat-register/trodatRegisterHandler';
import { useSearch } from '@/context/SearchContext';


export default function TrodatRegistersTable() {
    const { user } = useSelector((state: RootState) => state.auth);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { trodatRegisterPages, registers } = useSelector((state: RootState) => state.trodatRegister);
    const [filterType, setFilterType] = useState<"daily" | "monthly">("daily");

    const { openModal } = useDeleteModal();

    useEffect(() => {
        dispatch(fetchTrodatRegisterPages());
    }, [dispatch]);

    // search logic
    const [searchedPages, setSearchedPages] = useState(trodatRegisterPages)
    const { search } = useSearch();

    useEffect(() => {
        if (trodatRegisterPages) {
            setFilterType('daily');
            const result = filterItems(trodatRegisterPages, search);
            setSearchedPages(result);
        }
    }, [search, trodatRegisterPages]);

    if (!searchedPages || !registers) return null;
    return (
        <>
            {user?.role !== 'manager' && <div className='flex justify-end'>
                <ChartTab selected={filterType} onSelect={setFilterType} />
            </div>}


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
                                        trodat sell´s
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        total
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
                                            {register.trodatSells}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
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
                                            Trodat sell´s
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
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHeader>

                                {/* Table Body */}
                                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                    {searchedPages.map(page => (
                                        <TableRow key={page._id}
                                        >
                                            <TableCell className="px-5 py-4 sm:px-6  text-white font-semibold text-start dark:text-gray-400">
                                                {formatDateToISO(page.date)}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {page.trodatSells}
                                            </TableCell>

                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {page.total || 0} DA
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center gap-2">
                                                <ArrowTopRightOnSquareIcon className='text-brand-500 cursor-pointer size-7'
                                                    onClick={() => { router.push(`/admin/trodat-orders/${page._id}`) }}
                                                />
                                                {user?.role !== 'manager' && <TrashIcon className='text-brand-500 cursor-pointer size-7' onClick={() => openModal(page._id, (id) => { dispatch(deleteTrodatRegisterPage(id)) })} />}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
