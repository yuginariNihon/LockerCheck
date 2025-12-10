'use client'

import { Input } from "@/components/ui/input";

export default function LockerSearch({ value, onChange }: any) {
  return (
    <Input
      placeholder="🔍 Search Locker Number / Employee ID / Name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-800 text-white border-gray-600 mb-5"
    />
  );
}
