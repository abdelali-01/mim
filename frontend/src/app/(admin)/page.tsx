'use client';
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React, { useEffect, useState } from "react";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import { fecthStatistic } from "@/store/cash-register/cashRegisterHandler";
import { handleFetchCalendarItems } from "@/store/calendar/calendarHandler";
import { CalendarItem } from "@/store/calendar/calendarSlice";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { items: calendarItems, loading: calendarLoading } = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fecthStatistic());
    dispatch(handleFetchCalendarItems());
  }, [dispatch]);


  const [todayEvents, setTodayEvents] = useState<CalendarItem[] | null>(null);
  console.log(todayEvents)

  useEffect(() => {
    if (calendarItems) {
      // Filter calendar items for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const filtredItems = calendarItems.filter(item => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        return (startDate <= tomorrow && endDate >= today);
      });

      setTodayEvents(filtredItems);
    }
  }, [calendarItems]);

  if (!user || user.role === 'manager') return null;
  return (
    <div className="space-y-7">
      {calendarLoading || !todayEvents ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
        </div>
      ) : todayEvents.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">Today&apos;s Events</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {todayEvents.map((event) => (
              <div
                key={event._id}
                className={`rounded-lg p-4 ${event.level === 'danger'
                  ? 'bg-error-50 dark:bg-error-500/10'
                  : event.level === 'success'
                    ? 'bg-success-50 dark:bg-success-500/10'
                    : event.level === 'warning'
                      ? 'bg-orange-50 dark:bg-orange-500/10'
                      : 'bg-brand-50 dark:bg-brand-500/10'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-2 w-2 rounded-full mt-2 ${event.level === 'danger'
                      ? 'bg-error-500'
                      : event.level === 'success'
                        ? 'bg-success-500'
                        : event.level === 'warning'
                          ? 'bg-orange-500'
                          : 'bg-brand-500'
                      }`}
                  />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white/90">{event.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-3">
                      {event.startDate.split('T')[0]}
                      <ArrowRightIcon className="size-5"/>
                      {event.endDate.split('T')[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:gap-7 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <EcommerceMetrics />
          <div className="mt-7">
            <MonthlySalesChart />
          </div>
        </div>

        <div className="xl:col-span-5">
          <MonthlyTarget />
        </div>
      </div>
    </div>
  );
}
