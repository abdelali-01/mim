'use client';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import Badge from '../ui/badge/Badge'
import { Notebook } from '../../../public/types'
import React, { useEffect, useRef, useState } from 'react';
import { BarsArrowDownIcon, BarsArrowUpIcon, PencilSquareIcon, PrinterIcon } from '@heroicons/react/24/outline'
import { useModal } from '@/hooks/useModal';
import { Modal } from '../ui/modal';
import NotebookModal from '../example/ModalExample/NotebookModal';
import { filterItems, formatDateToISO, getNotebookStatus } from '@/utils';
import Image from 'next/image';
import { useImageModal } from '@/hooks/useImage';
import ImageModal from '../example/ImageModal';
import { useReactToPrint } from 'react-to-print';
import { useSearch } from '@/context/SearchContext';

interface Props {
  notebook: Notebook;
}

export default function NotebookTable({ notebook }: Props) {
  const { isOpen, openModal, closeModal, selectedItem } = useModal();
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRowId(prev => prev === id ? null : id);
  }

  const { color, label } = getNotebookStatus(notebook.total, notebook.prePayment);

  const {
    imageModalOpen,
    selectedImage,
    openImageModal,
    closeImageModal
  } = useImageModal();

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Notebook-${notebook.client.username}`,
  });


  // search logic
  const [filredTable, setFiltredTable] = useState(notebook.table);
  const { search } = useSearch();

  useEffect(() => {
    if (notebook.table) {
      const result = filterItems(notebook.table, search);
      setFiltredTable(result);
    }
  }, [search, notebook])


  return (
    <div ref={printRef}>
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
                    Client
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Phone
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
                    Pre-payment
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Rest
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
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
                <TableRow
                >
                  <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                    {notebook.client.username}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                    {notebook.client.phone}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {notebook.total} DA
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {notebook.prePayment} DA
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {notebook.total - notebook.prePayment} DA
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={color}
                      className='badge'
                    >
                      {label}
                    </Badge>
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

      <div className="max-w-full overflow-x-auto print:overflow-visible">
        <div className="min-w-[1000px] print:min-w-0 print:w-full">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <Table className='print-table'>
              {/* Table Header */}
              <TableHeader className="print-header border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Paid Date
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
                    Pre-payment
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Rest
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="no-print px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {filredTable.map((item) => {
                  const { label, color } = getNotebookStatus(item?.total, item?.prePayment);
                  return (
                    <React.Fragment key={item._id}>
                      <TableRow
                      >
                        <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                          {item.date && formatDateToISO(item.date)}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                          {item.paidDate ? formatDateToISO(item.paidDate) : <Badge
                            size='sm'
                            color='light'
                          >Still</Badge>}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {item.total} DA
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {item.prePayment} DA
                        </TableCell>

                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {item.total - item.prePayment} DA
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">

                          <Badge
                            size="sm"
                            color={color}
                            className='badge'

                          >
                            {label}
                          </Badge>
                        </TableCell>
                        <TableCell className="no-print px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center gap-2">
                          <span onClick={() => toggleRow(item._id)}>
                            {expandedRowId !== item._id ? <BarsArrowDownIcon className='size-7 cursor-pointer text-brand-500' /> : <BarsArrowUpIcon className='size-7 cursor-pointer text-brand-500' />}
                          </span>
                          <PencilSquareIcon className='size-7 cursor-pointer text-brand-500' onClick={() => openModal(item)} />
                        </TableCell>
                      </TableRow>

                      {expandedRowId === item._id && (
                        <TableRow>
                          <TableCell colSpan={7} className="px-6 py-4  divide-gray-100 dark:divide-white/[0.05]">
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                  <tr>
                                    <th className="text-left p-2  dark:text-gray-400  text-gray-500">Product</th>
                                    <th className="text-left p-2  dark:text-gray-400  text-gray-500">Quantity</th>
                                    <th className="text-left p-2  dark:text-gray-400  text-gray-500">Price</th>
                                    <th className="text-left p-2  dark:text-gray-400  text-gray-500">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.products.map((prod, i) => (
                                    <tr key={i}>
                                      <td className="p-2  dark:text-gray-400  text-gray-500">
                                        <div className='flex items-center gap-3'>
                                          {prod.image && <Image src={prod.image} alt='product image' width={60} height={60}
                                            className='object-cover cursor-pointer'
                                            onClick={() => prod.image && openImageModal(prod.image)} />}
                                          <span>{prod.product}</span>
                                        </div>
                                      </td>
                                      <td className="p-2  dark:text-gray-400  text-gray-500">{prod.quantity}</td>
                                      <td className="p-2  dark:text-gray-400  text-gray-500">{prod.price} DA</td>
                                      <td className="p-2  dark:text-gray-400  text-gray-500">{prod.quantity * prod.price} DA</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}

                      {/* print version */}
                      <TableRow className="hidden print:table-row ms-8">
                        <TableCell colSpan={7} className="px-6 py-4 align-top">
                          <div className="overflow-visible">
                            <table className="w-full text-sm border border-gray-200">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="text-left p-2 text-gray-500">Product</th>
                                  <th className="text-left p-2 text-gray-500">Quantity</th>
                                  <th className="text-left p-2 text-gray-500">Price</th>
                                  <th className="text-left p-2 text-gray-500">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.products.map((prod, i) => (
                                  <tr key={i}>
                                    <td className="p-2 text-gray-700">
                                      <div className="flex items-center gap-3">
                                        {prod.image && (
                                          <Image
                                            src={prod.image}
                                            alt="product"
                                            width={250}
                                            height={150}
                                            className="object-cover border border-gray-300"
                                          />
                                        )}
                                        <span>{prod.product}</span>
                                      </div>
                                    </td>
                                    <td className="p-2 text-gray-700">{prod.quantity}</td>
                                    <td className="p-2 text-gray-700">{prod.price} DA</td>
                                    <td className="p-2 text-gray-700">{prod.quantity * prod.price} DA</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </TableCell>
                      </TableRow>

                    </React.Fragment>
                  )
                })}
              </TableBody>
            </Table>

          </div>
          {isOpen && selectedItem && <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[584px] p-5 lg:p-10"
            index='z-99999'
          >
            <NotebookModal notebookData={selectedItem} closeModal={closeModal} />
          </Modal>}

          {imageModalOpen && selectedImage && (
            <ImageModal
              isOpen={imageModalOpen}
              onClose={closeImageModal}
              imageUrl={selectedImage}
            />
          )}

        </div>
      </div>
    </div>
  )
}
