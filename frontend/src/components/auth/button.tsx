export function Button({label, onClick} : {label:string,onClick : React.MouseEventHandler<HTMLButtonElement>}) {
    return  <button onClick={onClick} type="button" className="bg-black text-white font-bold my-4 mx-1 py-2 px-4 rounded-lg">{label}</button>
}