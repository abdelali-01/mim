'use client';
import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import TamponTable from '@/components/tables/TamponTable';
import React from 'react'

export default function TamponStockPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle='Tompons stock' />
      <ComponentCard title='Tompons stock Table' cta={{content : 'Update' , onClick : ()=>{}}}>
        <TamponTable/>
      </ComponentCard>
    </div>
  )
}
