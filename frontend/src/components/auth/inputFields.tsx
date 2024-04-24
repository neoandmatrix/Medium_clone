interface InputComponentsProps {
    lable:string;
    placeholder : string;
    onChange : React.ChangeEventHandler<HTMLInputElement>
    type : string
} 

export function InputBox({lable,placeholder,onChange,type}: InputComponentsProps){
    return <div>
        <div className="text-black pb-2 pt-5 text-lg font-medium font-serif">
            {lable}
        </div>
        <div>
        <input type={type} onChange={onChange} placeholder={placeholder}
         className="w-full px-2 py-1 border rounded-lg border-slate-500"/>
        </div>
    </div>
}