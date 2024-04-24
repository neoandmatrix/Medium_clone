export function BlogTitle({title,authorName,timeOfPublication}:{title:string,authorName:string,timeOfPublication:string}) {
    return <>
    <div className="">
        <div className="bg-slate-400 pt-12 pl-6 pr-5 text-6xl font-serif font-extrabold flex flex-col">
             {title}
             <div className=" text-xl pt-3 font-semibold">-By {authorName} at {timeOfPublication}</div>
        </div>
    </div>
    </>
}