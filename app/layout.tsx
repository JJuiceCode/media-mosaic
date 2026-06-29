import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "MeMo | 공적 인물 기록 아카이브",
  description: "공적 인물의 발언, 기사, 논란, 반론, 정정 이력을 출처 기반으로 정리하는 시민용 기록 아카이브입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
