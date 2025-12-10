'use client'

export default function LockerShoesCard({ lockerShoes, onClick }: any) {

  let bgColor = "";
  
  if((lockerShoes.memberIdFirst !== null && lockerShoes.memberIdFirst !== "") && 
  (lockerShoes.memberIdSecound !== null && lockerShoes.memberIdSecound !== "") &&
  (lockerShoes.shoestatus)){
    bgColor = "bg-red-500";
  }else if(lockerShoes.shoestatus && 
    ((lockerShoes.memberIdFirst !== null && lockerShoes.memberIdFirst !== "") ||
    (lockerShoes.memberIdSecound !== null && lockerShoes.memberIdSecound !== "")
  )){
    bgColor = "bg-green-500";
  }else{
    bgColor = "bg-blue-500";
  }

  return (
    <div
      onClick={onClick}
      className={`w-18 h-18 flex items-center justify-center rounded-lg shadow 
        ${bgColor} 
        hover:scale-105 transition-transform cursor-pointer`}
    >
      <p className="text-xs font-bold text-center w-full">
        {lockerShoes.shoesLockerNumber}
      </p>
    </div>
  );
}
