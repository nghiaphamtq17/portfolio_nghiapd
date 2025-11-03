import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nghia Pham Dai - Fullstack Developer",
  description:
    "Portfolio of Nghia Pham Dai - Fullstack Developer with 4 years of experience in React.js, Next.js and modern web technologies",
  keywords:
    "Nghia Pham Dai, nghiapd, Fullstack Developer, React.js, Next.js, TypeScript, Web Development, Portfolio, Phạm Đại Nghĩa, Dựng Website, Tạo Website, Lập Trình Web",
  authors: [{ name: "Nghia Pham Dai" }],
  openGraph: {
    title: "Nghia Pham Dai - Fullstack Developer",
    description:
      "Portfolio of Nghia Pham Dai - Fullstack Developer with 4 years of experience",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
