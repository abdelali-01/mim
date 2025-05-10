import ComponentCard from '@/components/common/ComponentCard'
import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import AccountsTable from '@/components/tables/AccountsTable'
import React from 'react'

export default function AccountPage() {
  return (
    <div>
    <PageBreadcrumb pageTitle="Accounts table" />
      <div className="space-y-6">
        <ComponentCard title="Accounts table">
            <AccountsTable/>
        </ComponentCard>
      </div>
    </div>
  )
}
