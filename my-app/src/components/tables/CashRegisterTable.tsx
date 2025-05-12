'use client';
import React, { useEffect} from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { useRouter } from 'next/navigation';
import { formatDateToISO } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCashRegisterPages } from '@/store/cash-register/cashRegisterHandler';
import { TrashIcon } from '@heroicons/react/24/outline';



// const cashRegisterPages: CashRegisterPage[] = [
//     {
//         _id: 'page001',
//         date: new Date('2025-05-01'),
//         removed: [{ note: 'Damaged item', some: 2 }],
//         total: 150,
//         t_Total: 50,
//         f_Total: 100,
//         items: [
//             { _id: 'item001', title: 'T-Shirt', catgory: 'F', price: 50 },
//             { _id: 'item002', title: 'Stamp', catgory: 'T', price: 50 },
//             { _id: 'item003', title: 'Flyer', catgory: 'T', price: 50 },
//         ],
//     },
//     {
//         _id: 'page002',
//         date: new Date('2025-05-02'),
//         removed: [{ note: 'Returned item', some: 1 }],
//         total: 120,
//         t_Total: 70,
//         f_Total: 50,
//         items: [
//             { _id: 'item004', title: 'Poster', catgory: 'T', price: 30 },
//             { _id: 'item005', title: 'Brochure', catgory: 'T', price: 40 },
//             { _id: 'item006', title: 'Cap', catgory: 'F', price: 50 },
//         ],
//     },
//     {
//         _id: 'page003',
//         date: new Date('2025-05-03'),
//         removed: [{ note: 'Lost in delivery', some: 3 }],
//         total: 90,
//         t_Total: 30,
//         f_Total: 60,
//         items: [
//             { _id: 'item007', title: 'Sticker', catgory: 'T', price: 30 },
//             { _id: 'item008', title: 'Mug', catgory: 'F', price: 60 },
//         ],
//     },
//     {
//         _id: 'page004',
//         date: new Date('2025-05-04'),
//         removed: [],
//         total: 200,
//         t_Total: 100,
//         f_Total: 100,
//         items: [
//             { _id: 'item009', title: 'Notebook', catgory: 'T', price: 60 },
//             { _id: 'item010', title: 'Pen', catgory: 'T', price: 40 },
//             { _id: 'item011', title: 'Bag', catgory: 'F', price: 100 },
//         ],
//     },
//     {
//         _id: 'page005',
//         date: new Date('2025-05-05'),
//         removed: [{ note: 'Misprint', some: 2 }],
//         total: 80,
//         t_Total: 40,
//         f_Total: 40,
//         items: [
//             { _id: 'item012', title: 'Envelope', catgory: 'T', price: 40 },
//             { _id: 'item013', title: 'Hat', catgory: 'F', price: 40 },
//         ],
//     },
// ];




export default function CashRegisterTable() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { cashRegisterPages } = useSelector((state: RootState) => state.cashRegister);

    console.log(cashRegisterPages);
    
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
                                        {page.t_Total || 0} DA
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {page.f_Total || 0} DA
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
