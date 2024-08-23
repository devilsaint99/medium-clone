import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import moment from "moment";
import { useBlogs } from "../hooks";
import { useNavigate } from "react-router-dom";
import { BlogAllSkeleton } from "../components/BlogAllSkeleton";
export const Blog = () =>{

    const {loading, blogs, auth} = useBlogs()
    const navigate = useNavigate()

    if(loading){
        return (
            <div>
                <AppBar buttonType={'Write'} onClick={()=>navigate("/publish")}/>
                <div className="mx-20">
                    <div className="mt-5">
                        <BlogAllSkeleton />
                        <BlogAllSkeleton />
                        <BlogAllSkeleton />
                        <BlogAllSkeleton />
                    </div>
                </div>
                
            </div>
        )
    }

    return (<>   
        {auth?
        <div className="">
            <AppBar buttonType={'Write'} onClick={()=>navigate("/publish")}/>
            <div className="mx-20">
            {/* <HeaderMain /> */}
            <div className="mt-5">
                
                {blogs.map(
                    (p) => 
                        <>
                        
                        <BlogCard
                            id={p.id}
                            authorName={p.user.firstName}
                            title={p.title}
                            description={p.Post}
                            publishedDate={`${moment().month(p.LastUpdated.slice(6,8)).format('MMM')} ${p.LastUpdated.slice(8,10)}, ${p.LastUpdated.slice(0,4)}`}
                         />
                         </>
                    )}
            </div>
            </div>
        </div>:""}
        </>
    )
}