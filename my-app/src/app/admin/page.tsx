'use client';
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React, { useEffect } from "react";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import { fecthStatistic } from "@/store/cash-register/cashRegisterHandler";


export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fecthStatistic());
  }, [dispatch]);

  if (!user || user.role === 'manager') return null;
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-7">
      <div className="col-span-12 space-y-7 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5 max-h-full">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        {/* <StatisticsChart /> */}
      </div>
    </div>
  );
}
