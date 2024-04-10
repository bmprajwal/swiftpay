

export function Balance({value}){
  const formattedValue = Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
  return <div className="flex px-4 py-2">
    <div className="font-bold text-lg">
      Your balance
    </div>
    <div className="font-semibold ml-4 text-lg">
      Rs {formattedValue}
    </div>
  </div>
} 