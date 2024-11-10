"use client";
import React from "react";
import Image from "next/image";
import BarChartComponent from "./components/Chart";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4">
      <div
        className="text-white rounded-md w-full max-w-sm py-2 px-6 flex justify-between items-center"
        style={{ backgroundColor: "hsl(10, 79%, 65%)" }}
      >
        <div>
          <p>My balance</p>
          <p className="text-3xl font-bold">$921.48</p>
        </div>
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="design image"
          className="p-3"
          priority
        />
      </div>

      <div className="flex-col text-left p-3 justify-start bg-white max-w-sm w-full h-auto flex items-center rounded-lg ">
        <div className="w-full text-left">
          <p className="text-amber-950 font-[600] text-2xl ml-4">
            Spending - Last 7 days
          </p>
        </div>
        <BarChartComponent />
        <hr className="border-t border-gray-300 w-full max-w-sm mx-16" />
        <div className="flex justify-between items-center w-full px-6 py-4">
          <div>
            <p className="text-sm text-gray-500">Total this month</p>
            <p className="text-3xl font-[900] text-amber-950">$478.33</p>
          </div>

          <div className="text-right">
            <p className="font-bold text-amber-950">+2.4%</p>
            <p className="text-sm text-gray-500">from last month</p>
          </div>
        </div>
      </div>
    </main>
  );
}
