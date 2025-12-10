'use client'

import LockerCard from "./LockerCard";

export default function LockerGrid({
  lockers,
  totalLocker,
  layerSize = 15,
  onSelect,
}: any) {
  const totalLayer = Math.ceil(lockers.length / layerSize);
  const isFiltered = lockers.length !== totalLocker;

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 items-center">
      {Array.from({ length: totalLayer }, (_, layer) => (
        <div key={layer} className="space-y-2">
          {!isFiltered && (
            <h2 className="text-lg font-semibold text-gray-300 text-center">
              Locker Number {layer + 1}
            </h2>
          )}
          
          <div className="grid grid-cols-3 gap-1">
            {lockers
              .slice(layer * layerSize, (layer + 1) * layerSize)
              .map((locker: any) => (
                <LockerCard
                  key={locker.lockerUserData_ID}
                  locker={locker}
                  onClick={() => onSelect(locker)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
