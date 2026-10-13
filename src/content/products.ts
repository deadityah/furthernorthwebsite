// To add or update a product:
// 1. Add or edit an entry in the `products` array below with a unique `id`.
// 2. Set status: "available" | "testing" | "in-development".
// 3. For site-hosted downloads, set downloadUrl to e.g. "/downloads/name-1.0.0-windows.zip".
// 4. Update optional fields: version, fileSize, updated, screenshot, installNote.
// 5. Run `npm run build` to verify download file size and routes.

export type ProductStatus = "available" | "testing" | "in-development";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: ProductStatus;
  version?: string;
  platforms: string[];
  fileSize?: string;
  updated?: string;
  downloadUrl?: string;
  screenshot?: string;
  installNote?: string;
}

export const installGuide = {
  title: "How to install",
  steps: [
    "Click Download. A .zip file is saved to your computer.",
    'Right-click the file and choose "Extract All".',
    "Open the new folder and double-click the app file inside.",
  ],
  windowsWarningNote:
    "If Windows shows a blue warning screen, click More info, then Run anyway. The app is made by us and runs on your computer.",
};

export function getStatusLabel(status: ProductStatus): string {
  switch (status) {
    case "available":
      return "Available";
    case "testing":
      return "In testing";
    case "in-development":
      return "In development";
  }
}

export const products: Product[] = [
  {
    id: "stockpulse",
    name: "StockPulse",
    tagline: "Know what is on the shelf, what is low, and what to reorder.",
    description:
      "StockPulse helps you track inventory across your shelves. It alerts you when items run low and shows you what needs to be reordered. The app works offline on your desktop computer.",
    features: [
      "Current shelf stock tracking",
      "Low stock alerts",
      "Reorder recommendations",
      "Offline desktop access",
    ],
    status: "testing",
    platforms: ["Windows"],
    downloadUrl: "",
  },
  {
    id: "bookease",
    name: "BookEase",
    tagline: "Appointments and bookings in one calendar.",
    description:
      "BookEase brings all your appointments together in a single calendar view. It makes scheduling visits and managing bookings straightforward. The app works offline on your desktop computer.",
    features: [
      "Central appointment calendar",
      "Daily booking management",
      "Schedule conflict checking",
      "Offline desktop access",
    ],
    status: "in-development",
    platforms: ["Windows"],
    downloadUrl: "",
  },
  {
    id: "kitchenledger",
    name: "KitchenLedger",
    tagline: "Food cost, daily sales, and waste for restaurants and cafes.",
    description:
      "KitchenLedger helps restaurants and cafes keep track of food costs and daily sales. It records kitchen waste so you can see where food and money go. The app works offline on your desktop computer.",
    features: [
      "Food cost tracking",
      "Daily sales records",
      "Kitchen waste logging",
      "Offline desktop access",
    ],
    status: "in-development",
    platforms: ["Windows"],
    downloadUrl: "",
  },
  {
    id: "creditbook",
    name: "CreditBook",
    tagline: "Track which customers owe you money, and how long it has been.",
    description:
      "CreditBook keeps a clear record of money owed by customers. It shows pending balances and how long payments have been outstanding. The app works offline on your desktop computer.",
    features: [
      "Customer balance tracking",
      "Payment aging records",
      "Clear account ledgers",
      "Offline desktop access",
    ],
    status: "in-development",
    platforms: ["Windows"],
    downloadUrl: "",
  },
  {
    id: "fitdesk",
    name: "FitDesk",
    tagline: "Members, renewals, and attendance for gyms.",
    description:
      "FitDesk helps gym operators manage members, track daily attendance, and handle membership renewals. Keep your gym records organised on one screen. The app works offline on your desktop computer.",
    features: [
      "Member record directory",
      "Renewal date tracking",
      "Daily attendance logging",
      "Offline desktop access",
    ],
    status: "in-development",
    platforms: ["Windows"],
    downloadUrl: "",
  },
];
