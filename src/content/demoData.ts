// Sample data for the interactive dashboard frame in Products section

export interface StockItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  unit: string;
  status: "Urgent" | "Low";
}

export interface StockCategory {
  category: string;
  count: number;
}

export interface BookingItem {
  id: string;
  time: string;
  day: string;
  customer: string;
  service: string;
  duration: string;
  notes: string;
}

export interface KitchenSalesDay {
  day: string;
  sales: number;
}

export interface CafeItem {
  name: string;
  category: string;
  cost: string;
  price: string;
  margin: string;
}

export const stockPulseData = {
  name: "StockPulse",
  subtitle: "Inventory & Reorder Intelligence",
  kpis: [
    { label: "Items in stock", value: "1,420", change: "+12 this week" },
    { label: "Low stock count", value: "8", alert: true, change: "Requires reorder" },
    { label: "Reorder value", value: "$1,840", change: "Estimated purchase" },
  ],
  categories: [
    { category: "Coffee beans", count: 340 },
    { category: "Milk and alternatives", count: 280 },
    { category: "Tea", count: 190 },
    { category: "Bakery", count: 420 },
    { category: "Cups and packaging", count: 310 },
  ] as StockCategory[],
  lowStockItems: [
    { id: "1", name: "Espresso beans 1kg", category: "Coffee beans", currentStock: 3, minThreshold: 10, unit: "bags", status: "Urgent" },
    { id: "2", name: "Oat milk 1L", category: "Milk & alt", currentStock: 4, minThreshold: 12, unit: "cartons", status: "Urgent" },
    { id: "3", name: "Paper cups 12oz", category: "Packaging", currentStock: 5, minThreshold: 15, unit: "boxes", status: "Low" },
    { id: "4", name: "Croissants", category: "Bakery", currentStock: 4, minThreshold: 16, unit: "trays", status: "Urgent" },
    { id: "5", name: "Green tea", category: "Tea", currentStock: 6, minThreshold: 14, unit: "tins", status: "Low" },
  ] as StockItem[],
};

export const bookEaseData = {
  name: "BookEase",
  subtitle: "Weekly Appointment Calendar",
  kpis: [
    { label: "Bookings today", value: "14", change: "4 remaining" },
    { label: "Confirmed this week", value: "68", change: "96% attendance" },
    { label: "Open slots", value: "12", change: "Next: 3:30 PM" },
  ],
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  bookings: [
    { id: "b1", day: "Mon", time: "10:00 AM", customer: "Alex", service: "Consultation", duration: "45m", notes: "Review wholesale bean orders & roast schedule" },
    { id: "b2", day: "Mon", time: "02:30 PM", customer: "Sam", service: "Tasting session", duration: "30m", notes: "Sample seasonal single-origin coffees" },
    { id: "b3", day: "Tue", time: "11:15 AM", customer: "Jordan", service: "Workshop", duration: "60m", notes: "Espresso machine calibration & extraction guide" },
    { id: "b4", day: "Wed", time: "01:00 PM", customer: "Taylor", service: "Follow-up", duration: "30m", notes: "Check grinder settings and batch workflow" },
    { id: "b5", day: "Thu", time: "10:30 AM", customer: "Morgan", service: "Consultation", duration: "45m", notes: "Seasonal beverage menu & inventory planning" },
    { id: "b6", day: "Fri", time: "03:00 PM", customer: "Casey", service: "Tasting session", duration: "40m", notes: "Cold brew steep profile comparison" },
    { id: "b7", day: "Sat", time: "11:00 AM", customer: "Riley", service: "Workshop", duration: "60m", notes: "Pourover technique & staff brew standards" },
  ] as BookingItem[],
};

export const kitchenLedgerData = {
  name: "KitchenLedger",
  subtitle: "Kitchen Cost & Daily Sales",
  kpis: [
    { label: "Today's sales", value: "$2,480", change: "+8% vs yesterday" },
    { label: "Food cost ratio", value: "28.4%", change: "Target: under 30%" },
    { label: "Tracked kitchen waste", value: "$85", change: "3.2% of daily cost" },
  ],
  salesTrend: [
    { day: "Mon", sales: 1650 },
    { day: "Tue", sales: 1740 },
    { day: "Wed", sales: 1560 },
    { day: "Thu", sales: 1950 },
    { day: "Fri", sales: 2450 },
    { day: "Sat", sales: 2850 },
    { day: "Sun", sales: 2600 },
  ] as KitchenSalesDay[],
  costBreakdown: [
    { category: "Raw Ingredients", percent: 28.4, color: "#2340FF" },
    { category: "Kitchen Overhead", percent: 18.2, color: "#5A6170" },
    { category: "Operating Margin", percent: 53.4, color: "#DCE0EA" },
  ],
  cafeItems: [
    { name: "Latte", category: "Coffee", cost: "$1.10", price: "$4.50", margin: "75%" },
    { name: "Cappuccino", category: "Coffee", cost: "$1.05", price: "$4.25", margin: "75%" },
    { name: "Cold brew", category: "Coffee", cost: "$0.85", price: "$4.75", margin: "82%" },
    { name: "Sandwich", category: "Food", cost: "$2.40", price: "$7.50", margin: "68%" },
    { name: "Cake slice", category: "Bakery", cost: "$1.50", price: "$5.00", margin: "70%" },
  ] as CafeItem[],
};
