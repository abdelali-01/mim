"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine } from "@/icons";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const EcommerceMetrics = () => {
  const { statistic } = useSelector((state: RootState) => state.cashRegister);
  const { statistic: trodatStatistic } = useSelector((state: RootState) => state.trodatRegister);

  if (!statistic || !trodatStatistic) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BanknotesIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              This Month`s Income Summary
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {statistic.total} DA
            </h4>
          </div>
          <Badge color={statistic.isUp ? 'success' : 'error'}>
            {statistic.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              This Month’s Tampon Box Sales
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {trodatStatistic.trodatSells.current} Box
            </h4>
          </div>

          <Badge color={trodatStatistic.trodatSells.isUp ? 'success' : 'error'}>
            {trodatStatistic.trodatSells.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
