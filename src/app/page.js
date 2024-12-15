"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

const AnalogClock = dynamic(() => import("./AnalogClock"));

export default function Home() {
  return (
    <div>
      <AnalogClock />
    </div>
  );
}
