import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Takewheel — A driver for your own car",
  description: "Book a driver for your own car. Try immediate, scheduled, hourly and full-day demo bookings.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
