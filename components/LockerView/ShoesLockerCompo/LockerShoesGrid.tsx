'use client'

import LockerShoesCard from "./LockerShoesCard";

export default function LockerShoesGrid({
  lockersShoes,
  totallockershoe,
  layerSize = 18,
  onSelect,
}: any) {
  const totalLayer = Math.ceil(lockersShoes.length / layerSize);
  const isFiltered = lockersShoes.length !== totallockershoe;

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 items-center">
      {Array.from({ length: totalLayer }, (_, layer) => (
        <div key={layer} className="space-y-2">
          {!isFiltered &&(
            <h2 className="text-lg font-semibold text-gray-300 text-center">
              Locker Number {layer + 1}
            </h2>
          )}
          
          <div className="grid grid-cols-3 gap-1">
            {lockersShoes
              .slice(layer * layerSize, (layer + 1) * layerSize)
              .map((lockershoe: any) => (
                <LockerShoesCard
                  key={lockershoe.shoeLockerId}
                  lockerShoes={lockershoe}
                  onClick={() => onSelect(lockershoe)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
