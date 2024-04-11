export function Appbar(){
  return <div className="shadow-md h-14 flex justify-between bg-slate-100">
    <div className="flex flex-col justify-center h-full ml-4 font-bold uppercase text-xl text-slate-700 tracking-widest">
      SwiftPay
    </div>
    <div className="flex">
      <div className="flex flex-col justify-center h-full  mr-4">
        Hello
      </div>
      <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-2">
        <div className="flex flex-col justify-center h-full text-xl">
          P
        </div>
      </div>
    </div>
  </div>
}