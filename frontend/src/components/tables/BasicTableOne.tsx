"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchNotebooks } from "@/store/notebooks/notebookHandler";
import { filterItems, getNotebookStatus } from "@/utils";
import { useSearch } from "@/context/SearchContext";


export default function BasicTableOne() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {notebooks , isLoading} = useSelector((state : RootState) => state.notebooks);
  const [filtredNotebooks , setFiltredNotebooks] = useState(notebooks);
  const {search} = useSearch()

  useEffect(()=>{
    if(!notebooks) {
      dispatch(fetchNotebooks())
    }
  },[notebooks , dispatch]);

  useEffect(()=>{
    if(notebooks){
      const result = filterItems(notebooks , search);
      setFiltredNotebooks(result);
    }
  },[search, notebooks]);

  if(isLoading) return (<div>Loading...</div>)
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
                  Client
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Last update
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
                  Total credit
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filtredNotebooks && filtredNotebooks.map((notebook) => {
              const {label , color} = getNotebookStatus(notebook.total , notebook.prePayment)
              return(
                <TableRow key={notebook._id} 
                onClick={()=>{router.push(`/notebooks/${notebook._id}`)}}
                >
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {notebook.client.username}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {notebook.client.phone}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {formatDistanceToNow(notebook.updatedAt, { addSuffix: true })}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={color}
                    >
                      {label}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {notebook.total - notebook.prePayment}DA
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
