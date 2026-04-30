import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Media Mosaic 좋거나 혹은 나쁘거나나",
  description: "좋은사람 나쁜사람을 구분하기 위해 당신의 힘이 필요합니다",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={"font-sans min-h-screen antialiased"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
