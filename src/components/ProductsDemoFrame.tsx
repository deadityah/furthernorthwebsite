import React, { useState } from "react";
import { stockPulseData, bookEaseData, kitchenLedgerData, BookingItem } from "../content/demoData";

export const ProductsDemoFrame: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"StockPulse" | "BookEase" | "KitchenLedger">("StockPulse");
  const [selectedBooking, setSelectedBooking] = useState<BookingItem>(bookEaseData.bookings[0]);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);

  // 120ms fade out, switch tab, 200ms fade in
  const handleTabChange = (tab: "StockPulse" | "BookEase" | "KitchenLedger") => {
    if (tab === activeTab) return;

    setIsFading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsFading(false);
    }, 120);
  };

  return (
    <div className="mt-14" data-reveal>
      {/* Tab Selection */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3" role="tablist">
        {(["StockPulse", "BookEase", "KitchenLedger"] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => handleTabChange(tab)}
            className={`rounded px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2 ${
              activeTab === tab
                ? "bg-white/10 text-paper"
                : "text-slate hover:text-paper"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Browser Window Mockup Frame */}
      <div className="mt-4 overflow-hidden rounded-[2px] border border-white/10 bg-[#14171E] shadow-2xl">
        {/* Top Frame Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#10131A]">
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 font-mono text-xs text-slate">{activeTab}.app — offline</span>
          </div>
          <span className="font-mono text-xs text-slate">Local Node: Desktop</span>
        </div>

        {/* Dashboard Workspace */}
        <div
          className={`p-6 sm:p-8 font-mono transition-opacity ${
            isFading ? "opacity-0 duration-120" : "opacity-100 duration-200"
          }`}
        >
          {/* TAB 1: StockPulse */}
          {activeTab === "StockPulse" && (
            <div className="space-y-8">
              {/* KPIs */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stockPulseData.kpis.map((kpi) => (
                  <div key={kpi.label} className="border border-white/10 bg-white/[0.02] p-4 rounded-[2px]">
                    <span className="text-xs text-slate">{kpi.label}</span>
                    <div className="mt-2 text-2xl sm:text-3xl font-bold text-paper">
                      {kpi.value}
                    </div>
                    <div className={`mt-1 text-xs ${kpi.alert ? "text-north-blue font-semibold" : "text-slate"}`}>
                      {kpi.change}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stock by Category Bar Chart */}
              <div className="border border-white/10 bg-white/[0.02] p-5 rounded-[2px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase text-slate">Stock By Category (Units)</span>
                  <span className="text-xs text-slate">Hover bar for exact count</span>
                </div>

                <div className="mt-6 flex h-48 items-end gap-3 sm:gap-6 pt-4">
                  {stockPulseData.categories.map((cat, idx) => {
                    const maxVal = 500;
                    const heightPercent = Math.round((cat.count / maxVal) * 100);
                    const isHovered = hoveredBarIndex === idx;

                    return (
                      <div
                        key={cat.category}
                        className="relative flex flex-1 flex-col items-center h-full justify-end group cursor-pointer"
                        onMouseEnter={() => setHoveredBarIndex(idx)}
                        onMouseLeave={() => setHoveredBarIndex(null)}
                      >
                        {/* Hover tooltip */}
                        {isHovered && (
                          <div className="absolute -top-9 z-10 rounded bg-north-blue px-2 py-1 text-[11px] text-paper shadow-md">
                            {cat.count} units
                          </div>
                        )}

                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full max-w-[48px] rounded-t-[2px] transition-all duration-300 ${
                            isHovered ? "bg-north-blue" : "bg-white/20 group-hover:bg-white/30"
                          }`}
                        />
                        <span className="mt-3 text-[10px] sm:text-xs text-slate text-center truncate max-w-full">
                          {cat.category.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Low Stock Items Table */}
              <div className="border border-white/10 bg-white/[0.02] p-5 rounded-[2px] overflow-x-auto">
                <span className="text-xs uppercase text-slate">Low Stock Threshold Warnings</span>
                <table className="mt-4 w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate">
                      <th className="pb-2 font-normal">Item</th>
                      <th className="pb-2 font-normal">Current</th>
                      <th className="pb-2 font-normal">Threshold</th>
                      <th className="pb-2 font-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {stockPulseData.lowStockItems.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.03]">
                        <td className="py-2.5 font-medium text-paper">{item.name}</td>
                        <td className="py-2.5 text-slate">{item.currentStock} {item.unit}</td>
                        <td className="py-2.5 text-slate">{item.minThreshold} {item.unit}</td>
                        <td className="py-2.5">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                            item.status === "Urgent" ? "bg-north-blue text-paper" : "bg-white/10 text-slate"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: BookEase */}
          {activeTab === "BookEase" && (
            <div className="space-y-8">
              {/* KPIs */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {bookEaseData.kpis.map((kpi) => (
                  <div key={kpi.label} className="border border-white/10 bg-white/[0.02] p-4 rounded-[2px]">
                    <span className="text-xs text-slate">{kpi.label}</span>
                    <div className="mt-2 text-2xl sm:text-3xl font-bold text-paper">
                      {kpi.value}
                    </div>
                    <div className="mt-1 text-xs text-slate">{kpi.change}</div>
                  </div>
                ))}
              </div>

              {/* Week Schedule & Detail Split */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Schedule List */}
                <div className="border border-white/10 bg-white/[0.02] p-5 rounded-[2px] lg:col-span-8">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs uppercase text-slate">This Week's Calendar Schedule</span>
                    <span className="text-xs text-slate">Click slot for details</span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bookEaseData.bookings.map((booking) => {
                      const isSelected = selectedBooking.id === booking.id;
                      return (
                        <button
                          key={booking.id}
                          type="button"
                          onClick={() => setSelectedBooking(booking)}
                          className={`flex flex-col text-left p-3 rounded-[2px] border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-north-blue focus-visible:outline-offset-2 ${
                            isSelected
                              ? "border-north-blue bg-north-blue/10"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-paper">{booking.day} · {booking.time}</span>
                            <span className="text-slate">{booking.duration}</span>
                          </div>
                          <span className="mt-1 text-xs text-paper truncate">{booking.customer}</span>
                          <span className="text-[11px] text-slate truncate">{booking.service}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Booking Details Side Panel */}
                <div className="border border-white/10 bg-white/[0.02] p-5 rounded-[2px] lg:col-span-4 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase text-slate">Booking Details</span>
                    <div className="mt-4 space-y-3 text-xs">
                      <div>
                        <span className="text-slate">Customer</span>
                        <div className="text-paper text-sm font-semibold">{selectedBooking.customer}</div>
                      </div>
                      <div>
                        <span className="text-slate">Time & Day</span>
                        <div className="text-paper">{selectedBooking.day}, {selectedBooking.time} ({selectedBooking.duration})</div>
                      </div>
                      <div>
                        <span className="text-slate">Service Requested</span>
                        <div className="text-paper">{selectedBooking.service}</div>
                      </div>
                      <div>
                        <span className="text-slate">Operational Notes</span>
                        <div className="text-slate mt-1 text-[11px] leading-relaxed border-l-2 border-north-blue pl-2">
                          {selectedBooking.notes}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-3 flex items-center justify-between text-[11px] text-slate">
                    <span>Status: Confirmed</span>
                    <span className="h-2 w-2 rounded-full bg-north-blue" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KitchenLedger */}
          {activeTab === "KitchenLedger" && (
            <div className="space-y-8">
              {/* KPIs */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {kitchenLedgerData.kpis.map((kpi) => (
                  <div key={kpi.label} className="border border-white/10 bg-white/[0.02] p-4 rounded-[2px]">
                    <span className="text-xs text-slate">{kpi.label}</span>
                    <div className="mt-2 text-2xl sm:text-3xl font-bold text-paper">
                      {kpi.value}
                    </div>
                    <div className="mt-1 text-xs text-slate">{kpi.change}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* 7-Day Sales Performance */}
                <div className="border border-white/10 bg-white/[0.02] p-5 rounded-[2px] lg:col-span-8">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs uppercase text-slate">7-Day Sales Performance</span>
                    <span className="text-xs text-slate">Peak: Sat ($2.8k)</span>
                  </div>

                  <div className="mt-6 h-48 w-full">
                    <svg viewBox="0 0 500 160" className="h-full w-full overflow-visible">
                      <line x1="0" y1="30" x2="500" y2="30" stroke="#FFFFFF" strokeOpacity="0.08" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#FFFFFF" strokeOpacity="0.08" strokeDasharray="3 3" />
                      <line x1="0" y1="130" x2="500" y2="130" stroke="#FFFFFF" strokeOpacity="0.08" strokeDasharray="3 3" />

                      <polyline
                        fill="none"
                        stroke="#2340FF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="40,120 106,113 173,127 240,97 306,59 373,30 440,48"
                      />

                      {[
                        { x: 40, y: 120, label: "Mon" },
                        { x: 106, y: 113, label: "Tue" },
                        { x: 173, y: 127, label: "Wed" },
                        { x: 240, y: 97, label: "Thu" },
                        { x: 306, y: 59, label: "Fri" },
                        { x: 373, y: 30, label: "Sat" },
                        { x: 440, y: 48, label: "Sun" },
                      ].map((pt) => (
                        <g key={pt.label}>
                          <circle cx={pt.x} cy={pt.y} r="4" fill="#2340FF" stroke="#14171E" strokeWidth="2" />
                          <text x={pt.x} y="152" fill="#5A6170" fontSize="10" textAnchor="middle" fontFamily="IBM Plex Mono">
                            {pt.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Donut Chart */}
                <div className="border border-white/10 bg-white/[0.02] p-5 rounded-[2px] lg:col-span-4 flex flex-col justify-between">
                  <span className="text-xs uppercase text-slate">Food Cost Split</span>
                  
                  <div className="my-auto flex flex-col items-center justify-center py-4">
                    <svg width="140" height="140" viewBox="0 0 100 100" className="-rotate-90">
                      <circle cx="50" cy="50" r="38" stroke="#1F2430" strokeWidth="12" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#2340FF"
                        strokeWidth="12"
                        strokeDasharray="67.8 238.8"
                        strokeDashoffset="0"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#5A6170"
                        strokeWidth="12"
                        strokeDasharray="43.4 238.8"
                        strokeDashoffset="-67.8"
                        fill="none"
                      />
                    </svg>
                    <div className="mt-3 text-center">
                      <span className="text-xs text-paper font-semibold">28.4% Raw Cost</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 border-t border-white/10 pt-3 text-[11px]">
                    {kitchenLedgerData.costBreakdown.map((item) => (
                      <div key={item.category} className="flex items-center justify-between text-slate">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.category}
                        </span>
                        <span>{item.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Menu Item Cost & Margin Table */}
              <div className="border border-white/10 bg-white/[0.02] p-5 rounded-[2px] overflow-x-auto">
                <span className="text-xs uppercase text-slate">Menu Item Cost & Margin</span>
                <table className="mt-4 w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate">
                      <th className="pb-2 font-normal">Item</th>
                      <th className="pb-2 font-normal">Category</th>
                      <th className="pb-2 font-normal">Ingredient Cost</th>
                      <th className="pb-2 font-normal">Retail Price</th>
                      <th className="pb-2 font-normal">Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {kitchenLedgerData.cafeItems.map((item) => (
                      <tr key={item.name} className="hover:bg-white/[0.03]">
                        <td className="py-2.5 font-medium text-paper">{item.name}</td>
                        <td className="py-2.5 text-slate">{item.category}</td>
                        <td className="py-2.5 text-slate">{item.cost}</td>
                        <td className="py-2.5 text-paper">{item.price}</td>
                        <td className="py-2.5">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-north-blue text-paper">
                            {item.margin}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
