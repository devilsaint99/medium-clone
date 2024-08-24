import { Hono } from "hono";
import { sign, jwt, JwtVariables } from "hono/jwt";
import { getPrisma } from "../prismaFn";
import { sis, sus } from "@devilsaint/medium-clone-common";

type Bindings= {
    DATABASE_URL : string,
    JWT_SECRET : string 
}


const user = new Hono<{Bindings: Bindings}>();


user.get('*', (c,next)=>{
    
    const jwtVar = jwt({
        secret: c.env.JWT_SECRET
    })
    return jwtVar(c, next)
    
})




user.post('/signup', async (c)=>{
    try{
        const prisma = getPrisma(c.env.DATABASE_URL)
        const body = await c.req.json()
    
        const validate = sus.safeParse(body)
    
        
        if(validate.success){
            const userData = validate.data
            try{
                await prisma.users.create({
                    data:{
                        email: userData.email,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        password: userData.password
                    }
                })
            }
            catch(e){
                return c.json({
                    message: "email id already exists"
                }, 400)
            }
            
        }
        else{
            return c.json({
                message: "Invalid inputs"
            }, 400)
        }
    }
    catch(e){
        return c.json({
            message: "Error Occured Signup"
        }, 400)
    }
    
    return c.json({message:"success"})
})

user.post('/signin', async (c)=>{
    try{

        const prisma = getPrisma(c.env.DATABASE_URL)
        const body = await c.req.json()
        const validate = sis.safeParse(body)

        if(validate.success){
            const userData = validate.data
            const userQuery = await prisma.users.findFirst({
                where:{
                    email: userData.email,
                    password: userData.password
                }
            })
            if(userQuery){
                const payload = {
                    id: userQuery.id,
                    email: userQuery.email,
                    firstName: userQuery.firstName
                }
                const token = await sign(payload, c.env.JWT_SECRET)

                return c.json({message: token})
            }
            else{
                return c.json({
                    message: "Incorrect email/password"
                }, 401)
            }
        }
        else{
            return c.json({
                message: "Input validation error"
            }, 400)
        }
    }
    catch{
        return c.json({
            message:"Error Occured Signin"
        }, 400)
    }
})

user.get("/", (c)=>{
    return c.json({"message":"already signed in"})
})

export default user;