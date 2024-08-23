import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"
import { CircleCompnent } from "./CircleComponent"

interface IBlogCard {
    id: string
    authorName: string,
    title: string,
    description: string,
    publishedDate: string
}

export const BlogCard = ({id,authorName, title, description, publishedDate}: IBlogCard)=>{
    return(
        <div className="border-b-2 pb-8 mt-5 max-w-3xl">
            <div className="flex place-items-center">
                <Avatar initials={authorName.charAt(0)}/>
                <div className="flex text-xs">
                    <div className="ml-2 text-gray-950">
                        {authorName}    
                    </div>
                    <div className="mx-2 flex place-items-center">
                        <CircleCompnent />
                    </div>
                    <div className="text-slate-400">
                        {publishedDate}
                    </div>
                </div>
                
                 
            </div>
            <Link to={`/blog/${id}`}>
                <div className="text-xl font-bold mt-2 text-gray-950">
                    {title}
                </div>
                <div className="text-gray-950">
                    { description.length> 99 ? description.slice(0,100) + "..." : description}
                </div>
            </Link>
        </div>
    )
}