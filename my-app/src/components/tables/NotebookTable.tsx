'use client';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'
import Badge from '../ui/badge/Badge'
import { Notebook} from '../../../public/types'
import React, { useState } from 'react';
import { BarsArrowDownIcon, BarsArrowUpIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { useModal } from '@/hooks/useModal';
import { Modal } from '../ui/modal';
import NotebookModal from '../example/ModalExample/NotebookModal';

interface Props {
  notebook: Notebook;
}

export default function NotebookTable({ notebook }: Props) {
  const { isOpen, openModal, closeModal, selectedItem } = useModal();
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRowId(prev => prev === id ? null : id);
  }

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
                  Total Price
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
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
              {notebook.table.map((item) => (
                <React.Fragment key={item._id}>
                  <TableRow
                  >
                    <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                      {item.date.split('T')[0]}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start font-semibold dark:text-gray-400">
                      {item.paidDate ? item.paidDate.split('T')[0] : <Badge
                        size='sm'
                        color='light'
                      >Still</Badge>}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.prePayment} DA
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.total - item.prePayment} DA
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.total} DA
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          item.total === item.prePayment
                            ? "success"
                            : "warning"
                        }
                      >
                        {item.total === item.prePayment
                          ? "paid"
                          : "not paid"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center gap-2">
                      <span onClick={() => toggleRow(item._id)}>
                        {expandedRowId !== item._id ? <BarsArrowDownIcon className='size-7 cursor-pointer' /> : <BarsArrowUpIcon className='size-7 cursor-pointer' />}
                      </span>
                      <PencilSquareIcon className='size-7 cursor-pointer' onClick={() => openModal(item)} />
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
                                  <td className="p-2  dark:text-gray-400  text-gray-500">{prod.product}</td>
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
                </React.Fragment>
              ))}
            </TableBody>
          </Table>


          {isOpen && selectedItem && <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[584px] p-5 lg:p-10"
          >
            <NotebookModal notebookData={selectedItem} />
          </Modal>}

        </div>
      </div>
    </div>
  )
}
