import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Client Notebooks",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Credit clients table" />
      <div className="space-y-6">
        <ComponentCard title="Credit clients table" cta={{
          content : 'Add Notebook' ,
          onClick : ()=>{}
        }}>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
