import { Link } from "react-router-dom";

export function SubHeading({lable,link,linkText}:{lable:string,link:string,linkText:string}){

    return <div className="flex text-sm justify-center py-3">
        <div>
            {lable}
        </div>
        <Link className="underline pl-1 text-gray-600" to={link}>{linkText}</Link>
</div>
}