

export function Balance({value}){
  return <div className="flex px-4 py-2">
    <div className="font-bold text-lg">
      Your balance
    </div>
    <div className="font-semibold ml-4 text-lg">
      Rs {value}
    </div>
  </div>
} 