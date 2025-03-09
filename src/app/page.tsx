"use client";
import AnalogSection from "@/components/analog-section";
import DigitalSection from "@/components/digital-section";
import SplitLayout from "@/components/split-layout";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get("view") as "split" | "left" | "right" | null;

  // Set the active side based on URL or default to "split"
  const activeSide = view === "left" || view === "right" ? view : "split";

  // Update URL when active side changes
  const handleSetActiveSide = (side: "split" | "left" | "right") => {
    const params = new URLSearchParams(searchParams.toString());

    if (side === "split") {
      params.delete("view");
    } else {
      params.set("view", side);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <SplitLayout
      activeSide={activeSide}
      setActiveSide={handleSetActiveSide}
      leftComponent={<AnalogSection />}
      rightComponent={<DigitalSection />}
      leftLabel="Analog"
      rightLabel="Digital"
      leftBackground="/images/analog-1.jpg"
      rightBackground="/images/digital-1.JPG"
    />
  );
}
