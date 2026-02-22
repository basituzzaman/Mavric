"use client";

import dynamic from "next/dynamic";

const LegacyClient = dynamic(() => import("../legacy/LegacyClient"), {
  ssr: false,
});

export default function LegacyAppPage() {
  return <LegacyClient />;
}
