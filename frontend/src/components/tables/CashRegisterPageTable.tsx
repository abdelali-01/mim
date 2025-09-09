import React, { useEffect, useRef, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import { CashRegisterPage, CashRegisterPageItem, RemovedItem } from '@/store/cash-register/cashRegisterSlice'
import { formatDateToISO } from '@/utils'
import { PencilSquareIcon, PlusIcon, PrinterIcon, TrashIcon } from '@heroicons/react/24/outline'
import Button from '../ui/button/Button'
import { useModal } from '@/hooks/useModal'
import { Modal } from '../ui/modal'
import Label from '../form/Label'
import Input from '../form/input/InputField'
import Select from '../form/Select'
import { useParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { updateCashRegisterPage } from '@/store/cash-register/cashRegisterHandler'
import { useDeleteModal } from '@/context/DeleteModalContext'
import { useReactToPrint } from 'react-to-print'

interface Props {
    page: CashRegisterPage
}

export default function CashRegisterPageTable({ page }: Props) {

    const printRef = useRef(null);
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `caisse-${formatDateToISO(page.date)}`
    })

    return (
        <div ref={printRef}>
            <div className='grid grid-cols-12 gap-4 '>
                <div className="col-span-12 lg:col-span-9 overflow-x-auto print:overflow-visible mb-5">
                    <div className="min-w-[700px] print:min-w-0 print:w-full">
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
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {page.t_total || 0} DA
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {page.f_total || 0} DA
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {page.total} DA
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
                <div className="col-span-12 lg:col-span-3 overflow-x-auto print:overflow-visible">
                    <div className="min-w-[200px] print:min-w-0 print:w-full">
                        <RemouvedItemTable items={page.removed} />
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto print:overflow-visible">
                <div className="min-w-[200px] print:min-w-0 print:w-full">
                    <CashItems items={page.items} />
                </div>
            </div>
        </div>
    )
}


function RemouvedItemTable({ items }: { items: RemovedItem[] }) {
    const { isOpen, openModal, closeModal, selectedItem } = useModal();
    const { openModal: openDeleteModal } = useDeleteModal()
    const { pageId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<RemovedItem>({
        _id: '',
        note: '',
        some: undefined,
    });

    useEffect(() => {
        if (selectedItem) {
            setFormData({
                _id: selectedItem._id,
                note: selectedItem.note,
                some: selectedItem.some,
            });
        } else {
            setFormData({
                note: '',
                some: undefined,
            });
        }
    }, [selectedItem, isOpen]);

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedItem) {
            dispatch(updateCashRegisterPage({
                pageId,
                updateRemoved: formData,
            }));
        } else {
            dispatch(updateCashRegisterPage({
                pageId,
                addRemoved: formData,
            }));
        }

        closeModal();
    };

    return (
        <>

            {items.length < 1 ? <></> :
                <Table className='print-table overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>
                    <TableHeader className="print-header border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Note</TableCell>
                            <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Some</TableCell>
                            <TableCell className="no-print px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Actions</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {items.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">{item.note}</TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.some} DA</TableCell>
                                <TableCell className="no-print px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex gap-2 items-center">
                                    <PencilSquareIcon className='text-brand-500 cursor-pointer size-7' onClick={() => openModal(item)} />
                                    <TrashIcon className='text-brand-500 cursor-pointer size-7' onClick={() => openDeleteModal(item._id, (id) => {
                                        dispatch(updateCashRegisterPage({ pageId, deleteRemovedId: id }))
                                    })} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}

            {isOpen &&
                <Modal onClose={closeModal} isOpen={isOpen} className='max-w-[584px] p-5 lg:p-10'>
                    <form onSubmit={handleSave}>
                        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                            Removed Item Information
                        </h4>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                            <div>
                                <Label>Note</Label>
                                <Input
                                    type="text"
                                    placeholder="Enter note"
                                    value={formData.note}
                                    onChange={(e) => handleChange('note', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label>Some</Label>
                                <Input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={formData.some}
                                    onChange={(e) => handleChange('some', Number(e.target.value))}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-6">
                            <Button size="sm" variant="outline" onClick={closeModal}>Close</Button>
                            <Button size="sm">Save Changes</Button>
                        </div>
                    </form>
                </Modal>
            }
            <div className='flex justify-end my-3 no-print'>
                <Button size="sm" variant="outline" startIcon={<PlusIcon className="size-4" />} onClick={() => openModal()}>
                    Add Note
                </Button>
            </div>
        </>
    );
}


function CashItems({ items }: { items: CashRegisterPageItem[] }) {
    const { isOpen, openModal, closeModal, selectedItem } = useModal();
    const { openModal: openDeleteModal } = useDeleteModal();
    const { pageId } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<CashRegisterPageItem>({
        _id: '',
        title: '',
        category: 'F',
        price: undefined,
    });

    useEffect(() => {
        if (selectedItem) {
            setFormData({
                _id: selectedItem._id,
                title: selectedItem.title,
                category: selectedItem.category,
                price: selectedItem.price,
            });
        } else {
            setFormData({
                title: '',
                category: 'F',
                price: undefined,
            });
        }
    }, [selectedItem, isOpen]);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const [tCat, setTCat] = useState<CashRegisterPageItem[] | null>(null);
    const [fCat, setFCat] = useState<CashRegisterPageItem[] | null>(null);
    useEffect(() => {
        const tCategory = items.filter(item => item.category === 'T');
        const fCategory = items.filter(item => item.category === 'F');

        setFCat(fCategory);
        setTCat(tCategory);
    }, [items])

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedItem) {
            dispatch(updateCashRegisterPage({
                pageId,
                updateItem: formData
            }))
        } else {
            dispatch(updateCashRegisterPage({
                pageId,
                addItem: formData
            }))
        }

        closeModal();
    };

    if (!fCat || !tCat) return null;
    return (
        <>
            <div className='flex justify-end my-3 no-print'>
                <Button size="sm" startIcon={<PlusIcon className="size-4" />} onClick={() => openModal()}>Add Item</Button>
            </div>

            <div className='grid grid-cols-12 gap-4 '>
                <div className="col-span-12 md:col-span-6 print:col-span-6">
                    <h4 className='text-base font-medium text-gray-800 dark:text-white/90 my-2'>Tompons Table</h4>
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

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {tCat.map((item) => {
                                return (
                                    <TableRow key={item._id}
                                    >
                                        <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                                            {item.title}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.price} DA
                                        </TableCell>

                                        <TableCell className="no-print px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex items-center gap-2">
                                            <PencilSquareIcon className='text-brand-500 cursor-pointer size-7' onClick={() => openModal(item)} />
                                            <TrashIcon className='text-brand-500 cursor-pointer size-7' onClick={() => {
                                                openDeleteModal(item._id, (id) => { dispatch(updateCashRegisterPage({ pageId, deleteItemId: id })) });
                                            }} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                <div className="col-span-12 md:col-span-6 print:col-span-6">
                    <h4 className='text-base font-medium text-gray-800 dark:text-white/90 my-2'>Fourniture Table</h4>
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


                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {fCat.map((item) => {
                                return (
                                    <TableRow key={item._id}
                                    >
                                        <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                                            {item.title}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.price} DA
                                        </TableCell>

                                        <TableCell className="no-print px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 flex items-center gap-2">
                                            <PencilSquareIcon className='text-brand-500 cursor-pointer size-7' onClick={() => openModal(item)} />
                                            <TrashIcon className='text-brand-500 cursor-pointer size-7' onClick={() => {
                                                openDeleteModal(item._id, (id) => { dispatch(updateCashRegisterPage({ pageId, deleteItemId: id })) });
                                            }} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>



            {isOpen &&
                <Modal onClose={closeModal} isOpen={isOpen} className='max-w-[584px] p-5 lg:p-10'>
                    <form onSubmit={handleSave}>
                        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                            Item Information
                        </h4>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                            <div className="col-span-2">
                                <Label>Title</Label>
                                <Input required type="text" placeholder="Item Title" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} />
                            </div>

                            <div className="col-span-1">
                                <Label>Category</Label>
                                <Select options={[
                                    { value: 'T', label: 'Trodat' },
                                    { value: 'F', label: 'Fourniture' },
                                ]}
                                    defaultValue={formData.category}
                                    onChange={(value) => { setFormData((prev) => ({ ...prev, category: value })) }}
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <Label>Price</Label>
                                <Input type="number" placeholder="select item price" value={formData.price} onChange={(e) => handleChange('price', e.target.value)} required />
                            </div>
                        </div>

                        <div className="flex items-center justify-end w-full gap-3 mt-6">
                            <Button size="sm" variant="outline" onClick={closeModal}>
                                Close
                            </Button>
                            <Button size="sm"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Modal>}
        </>
    )
}