import React from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import { CashRegisterPage, CashRegisterPageItem, RemovedItem } from '@/store/cash-register/cashRegisterSlice'
import { formatDateToISO } from '@/utils'
import { PlusIcon, PrinterIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from '../ui/button/Button'
import { useModal } from '@/hooks/useModal'

interface Props {
    page: CashRegisterPage
}

export default function CashRegisterPageTable({ page }: Props) {


    return (
        <div>
            <div className="max-w-full overflow-x-auto print:overflow-visible mb-5">
                <div className="min-w-[1000px] print:min-w-0 print:w-full">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                        <Table className='print-table'>
                            <TableHeader className="print-header border-b border-gray-100 dark:border-white/[0.05]">
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
                                        {formatDateToISO(page.date)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                                        {page.t_Total || 0} DA
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {page.f_Total || 0} DA
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {page.total} DA
                                    </TableCell>
                                    <TableCell className="no-print px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center gap-2">
                                        <PrinterIcon className='size-7 cursor-pointer text-brand-500'
                                        //   onClick={handlePrint}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            <div className="max-w-full overflow-x-auto print:overflow-visible">
                <div className="min-w-[1000px] print:min-w-0 print:w-full">
                    <div className="grid grid-cols-12 gap-4 ">
                        <div className='col-span-4  '>
                            <RemouvedItemTable items={page.removed} />
                        </div>
                        <div className='col-span-8'>
                            <CashItems items={page.items} />
                        </div>
                    </div>

                    {/* {isOpen && selectedItem && <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[584px] p-5 lg:p-10"
          >
            <NotebookModal notebookData={selectedItem} closeModal={closeModal} />
          </Modal>} */}
                </div>
            </div>
        </div>
    )
}


function RemouvedItemTable({ items }: { items: RemovedItem[] }) {
    const {isOpen , openModal , closeModal , selectedItem} = useModal();

    return (
        <>
            <div className='flex justify-end mb-3'>
                <Button size="sm" variant="outline" startIcon={<PlusIcon className="size-4" />} onClick={() => openModal()}>Add Removed</Button>
            </div>


            <Table className='print-table overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>

                <TableHeader className="print-header border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                        <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                            Note
                        </TableCell>
                        <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                            Some
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
                    {items.map((item) => {
                        return (
                            <TableRow key={item._id}
                            >
                                <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                                    {item.note}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {item.some} DA
                                </TableCell>

                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <TrashIcon className='text-brand-500 cursor-pointer size-7' />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}

function CashItems({ items }: { items: CashRegisterPageItem[] }) {
    const {isOpen , openModal , closeModal , selectedItem} = useModal();
    return (
        <><div className='flex justify-end mb-3'>
            <Button size="sm" startIcon={<PlusIcon className="size-4" />} onClick={() => openModal()}>Add Item</Button>

        </div>
            <Table className='print-table overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>

                <TableHeader className="print-header border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                        <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                            Title
                        </TableCell>
                        <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                            Category
                        </TableCell>
                        <TableCell
                            isHeader
                            className="no-print px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                            Price
                        </TableCell>
                        <TableCell
                            isHeader
                            className="no-print px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                        >
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHeader>


                {/* <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {items.map((item) => {
                    return (
                            <TableRow key={item._id}
                            >
                                <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                                    {item.note}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {item.some} DA
                                </TableCell>

                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <TrashIcon className='text-brand-500 cursor-pointer size-7' />
                                </TableCell>
                            </TableRow>
                    )
                })}
            </TableBody> */}
            </Table>
        </>
    )
}