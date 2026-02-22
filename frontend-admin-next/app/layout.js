import "./globals.css";

export const metadata = {
  title: "MAVRIC Admin",
  description: "MAVRIC admin panel built on Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
