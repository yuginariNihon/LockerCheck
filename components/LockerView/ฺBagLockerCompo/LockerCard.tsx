'use client'

export default function LockerCard({ locker, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={`w-18 h-18 flex items-center justify-center rounded-lg shadow 
        ${locker.active_status ? "bg-green-500" : "bg-blue-500"} 
        hover:scale-105 transition-transform cursor-pointer`}
    >
      <p className="text-xs font-bold text-center w-full">{locker.locker_Number}</p>
    </div>
  );
}
