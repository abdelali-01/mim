'use client';
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";




export default function Dashboard() {
  const {user} = useSelector((state : RootState)=> state.auth);

  if(!user || user.role === 'manager') return null ;
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>
{/* 
      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div> */}

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12">
        {/* <RecentOrders /> */}
      </div>
    </div>
  );
}
