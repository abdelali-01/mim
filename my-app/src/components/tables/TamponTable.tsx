import React from 'react'
import { Table, TableCell, TableHeader, TableRow } from '../ui/table'

export default function TamponTable() {
    return (
        <div>
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
                {/* <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {registers.map(register => (
                                    <TableRow key={register._id}
                                    >
                                        <TableCell className="px-5 py-4 sm:px-6  text-gray-500 font-semibold text-start dark:text-gray-400">
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
                            </TableBody> */}
            </Table>
        </div>
    )
}
