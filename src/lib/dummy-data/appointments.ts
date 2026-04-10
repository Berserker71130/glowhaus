export interface Appointment {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: "completed" | "cancelled" | "upcoming";
  price: number;
}

export const appointments: Appointment[] = [
  {
    id: "apt-101",
    serviceName: "Lace Wig Install & Melt",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "completed",
    price: 15000,
  },
  {
    id: "apt-102",
    serviceName: "Gel Manicure",
    date: "2024-02-02",
    time: "02:30 PM",
    status: "completed",
    price: 8500,
  },
  {
    id: "apt-103",
    serviceName: "Full Glam Makeup",
    date: "2024-03-20",
    time: "09:00 AM",
    status: "upcoming",
    price: 35000,
  },
  {
    id: "apt-104",
    serviceName: "Silk Press & Style",
    date: "2024-01-20",
    time: "12:00 PM",
    status: "completed",
    price: 12000,
  },
  {
    id: "apt-105",
    serviceName: "Acrylic Nail Set (Full)",
    date: "2024-02-14",
    time: "11:30 AM",
    status: "cancelled",
    price: 15000,
  },
  {
    id: "apt-106",
    serviceName: "Facial (Deep Cleanse)",
    date: "2024-03-05",
    time: "04:00 PM",
    status: "completed",
    price: 18000,
  },
  {
    id: "apt-107",
    serviceName: "Braids (Box Braids, Large)",
    date: "2023-12-28",
    time: "08:00 AM",
    status: "completed",
    price: 18000,
  },
  {
    id: "apt-108",
    serviceName: "Nail Art (Per Nail)",
    date: "2024-02-25",
    time: "01:00 PM",
    status: "completed",
    price: 3000,
  },
  {
    id: "apt-109",
    serviceName: "Bridal Package (Trial)",
    date: "2024-04-12",
    time: "10:00 AM",
    status: "upcoming",
    price: 35000,
  },
  {
    id: "apt-110",
    serviceName: "Pedicure (Luxury Spa)",
    date: "2024-01-05",
    time: "03:00 PM",
    status: "completed",
    price: 12000,
  },
];
