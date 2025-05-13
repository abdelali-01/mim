import { TrodatRegisterPage } from '@/store/trodat-register/trodatRegisterSlice'
import React, { useEffect, useRef, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { filterItems, formatDateToISO } from '@/utils';
import { PencilSquareIcon, PrinterIcon, TrashIcon } from '@heroicons/react/24/outline';
import Badge from '../ui/badge/Badge';
import { useModal } from '@/hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import TrodatOrderModal from '../example/ModalExample/trodatOrderModal';
import { useDeleteModal } from '@/context/DeleteModalContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { updateTrodatRegisterPage } from '@/store/trodat-register/trodatRegisterHandler';
import { useParams } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';
import { useReactToPrint } from 'react-to-print';

export default function TrodatRegisterPageTable({ selectedPage }: { selectedPage: TrodatRegisterPage }) {
    const { user } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<AppDispatch>()
    const { isOpen, openModal, closeModal, selectedItem } = useModal();
    const { openModal: openDeleteModal } = useDeleteModal();
    const { pageId } = useParams();


    const printRef = useRef(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `trodat-register-${formatDateToISO(selectedPage.date)}`
    })

    // search logic
    const [searchedOrders, setSearchedOrders] = useState(selectedPage.orders)
    const { search } = useSearch();

    useEffect(() => {
        if (selectedPage) {
            const result = filterItems(selectedPage.orders, search);
            setSearchedOrders(result);
        }
    }, [search, selectedPage]);



    if (!searchedOrders) return null;
    return (
        <div ref={printRef}>
            <div className="max-w-full overflow-x-auto print:overflow-visible mb-5">
                <div className="min-w-[1000px] print:min-w-0 print:w-full">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <Table className='print-table'>
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
                                        className="no-print px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Print
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                <TableRow
                                >
                                    <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                                        {formatDateToISO(selectedPage.date)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                                        {selectedPage.trodatSells}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {selectedPage.total} DA
                                    </TableCell>

                                    <TableCell className="no-print px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center gap-2">
                                        <PrinterIcon className='size-7 cursor-pointer text-brand-500'
                                            onClick={handlePrint}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <div className="flex justify-end my-3 no-print">
                <Button size='sm' onClick={() => openModal()}>Add Order</Button>
            </div>
            <div className="max-w-full overflow-x-auto print:overflow-visible">
                <div className="min-w-[1000px] print:min-w-0 print:w-full">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <Table className='print-table'>
                            <TableHeader className="print-header border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Destination
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Model x Q
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Pre payment / Rest
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Total Price
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        P /  Status
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="no-print px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {searchedOrders.map((item) => {
                                    return (
                                        <TableRow key={item._id}
                                        >
                                            <TableCell className="px-4 py-3 text-gray-500 text-start dark:text-gray-400 max-w-[250px]">
                                                <div className='flex flex-col'>
                                                    <div className='font-semibold'>{item.destination}</div>
                                                    {item.phone && <div className='text-theme-sm'>{item.phone}</div>}
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {item.model} x {item.quantity}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {item.prePayment === (item.quantity || 1) * (item.price || 0) ? <span>/</span> : <>{item.prePayment} DA / {(item.total || 0) - item.prePayment} DA</>}
                                            </TableCell>
                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                {item.total} DA
                                            </TableCell>

                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                {item.isDelivered ? <Badge
                                                    size="sm"
                                                    color={'success'}
                                                    className='badge'

                                                >
                                                    Delivered
                                                </Badge> : <div className="flex flex-col items-start gap-2">
                                                    <Badge
                                                        size="sm"
                                                        color={item.total === item.prePayment ? 'success' : item.prePayment === 0 ? 'warning' : 'light'}
                                                        className='badge'

                                                    >
                                                        {item.total === item.prePayment ? 'paid' : item.prePayment === 0 ? 'not paid' : 'pre paid'}
                                                    </Badge>
                                                    <Badge
                                                        size="sm"
                                                        color={item.isCompleted ? 'success' : 'info'}
                                                        className='badge'

                                                    >
                                                        {item.isCompleted ? 'completed' : 'pending'}
                                                    </Badge>
                                                </div>}
                                            </TableCell>


                                            <TableCell className="no-print px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 ">
                                                <div className='flex items-center gap-2'>
                                                    <PencilSquareIcon className='size-6 cursor-pointer text-brand-500' onClick={() => openModal(item)} />
                                                    {user?.role === 'manager' ? <></> :
                                                        <>
                                                            <TrashIcon className='size-6 cursor-pointer text-brand-500' onClick={() => openDeleteModal(item._id, (id) => dispatch(updateTrodatRegisterPage({ pageId, removeOrderId: id })))} />
                                                        </>
                                                    }
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                    </div>


                    {isOpen && <Modal
                        isOpen={isOpen}
                        onClose={closeModal}
                        className="max-w-[584px] p-5 lg:p-10"
                    >
                        <TrodatOrderModal dataOrder={selectedItem} closeModal={closeModal} />
                    </Modal>}



                </div>
            </div>
        </div>
    )
}
