import "./globals.css";

export const metadata = {
  title: "MAVRIC Watches",
  description: "MAVRIC user storefront built on Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
