'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageBreadcrumb from '../../../../../../components/common/PageBreadCrumb';
import { tableData } from "../../../../../../../public/data";
import { Notebook } from "../../../../../../../public/types";
import ComponentCard from "@/components/common/ComponentCard";
import NotebookTable from "@/components/tables/NotebookTable";

export default function NotebookPage() {
    const {notebookId} = useParams();
    const [notebook, setNotebook]= useState<Notebook | null>(null);
    console.log(notebook)
    
    useEffect(()=>{
        const findNotebook = tableData.find((n) =>{
          console.log(n._id , notebookId);
            
          return n._id == notebookId
        });
        console.log('finded one' , findNotebook);
        
        if(findNotebook) setNotebook(findNotebook);
    },[notebookId]);



  if(!notebook) return null ;
  return (
    <div>
        <PageBreadcrumb pageTitle={`credit notebook of ${notebook.client.username}`}  />
        <ComponentCard title={`credit notebook`}>
          <div>
            <h3 className="text-gray-500 dark:text-gray-400 text-xl">Client Name : {notebook.client.username}</h3>
            <h3 className="text-gray-500 dark:text-gray-400 text-lg">Tel : {notebook.client.phone}</h3>
          </div>
          <NotebookTable notebook={notebook}/>
        </ComponentCard>
    </div>
  )
}
