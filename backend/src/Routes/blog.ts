import { Hono } from "hono";
import { jwt } from 'hono/jwt'
import { getPrisma } from "../prismaFn";
import { pcs, pes } from "@devilsaint/medium-clone-common"
import { Prisma } from "@prisma/client";

type Bindings= {
    JWT_SECRET : string
    DATABASE_URL : string
}

const blog = new Hono<{Bindings: Bindings}>();

//blog Schemas



//applying authentication to routes
blog.post('*', (c,next)=>{
    const jwtVar = jwt({
        secret: c.env.JWT_SECRET
    })
    return jwtVar(c, next)
})

blog.put('*', (c,next)=>{
    const jwtVar = jwt({
        secret: c.env.JWT_SECRET
    })
    return jwtVar(c, next)
})

blog.use("/bulk", (c,next)=>{
    const jwtVar = jwt({
        secret: c.env.JWT_SECRET
    })
    return jwtVar(c, next)
})

//blog routes
blog.post('/', async (c)=>{
    try{
        const prisma =  getPrisma(c.env.DATABASE_URL)
        const body = await c.req.json()
        const validate = pcs.safeParse(body)
        if(validate.success){
            const payload = c.get('jwtPayload')
            const postData = validate.data
            await prisma.posts.create({
                data:{
                    userId:payload.id,
                    title: postData.title,
                    Post: postData.post,
                    LastUpdated: new Date()
                    
                }
            })
            return c.json({message: "post created"})
        }
        else{
            return c.json('Invalid data',400)
        }
    }
    catch(e){
        console.log(e)
        return c.json("Couldn't not Post. Try Again after some time", 501)
    }
    
})

blog.put('/', async (c)=>{
    try{
        const prisma =  getPrisma(c.env.DATABASE_URL)
        const body = await c.req.json()
        const validate = pes.safeParse(body)
        const payload = c.get('jwtPayload')
        const userId = payload.id
        if(validate.success){
            const upData = validate.data
            await prisma.posts.update({
                data:{
                    title: upData.title,
                    Post: upData.post
                },
                where:{
                    id: upData.id,
                    userId: userId
                }
            })
            return c.json({message: "Edit completed"})
        }
        else{
            return c.json('Invalid data',400)
        }
    }
    catch(e){
        console.error(e)
        return c.json("Couldn't not update the post. Try Again after some time", 501)
    }
   
})
blog.get('/bulk', async (c)=>{
    const prisma = getPrisma(c.env.DATABASE_URL)
    const bulkPost = await prisma.posts.findMany({
        include:{
            user:{
                select:{
                    firstName: true
                }
            }
        }
    })
    return c.json(bulkPost)
})


blog.get('/:id', async (c)=>{
    try{
        const paramId = parseInt(c.req.param('id'))
        const prisma =  getPrisma(c.env.DATABASE_URL)
        const blogData = await prisma.posts.findFirst({
            where:{
                id: paramId
            },
            include:{
                user:{
                    select:{
                        firstName:true
                    }
                }
            }
        })
    
        return c.json(blogData)
    }
    catch(e){
        console.error(e)
        return c.json("Try Again after some time", 501)
    }
    
})


 


export default blog;