import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { Buffer } from 'buffer'
import { signUpInput,signInInput,deleteUserInput } from "../../../common/src/index";


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string
    SECRET_DATA : string
    JWT_SECRET : string
    ENCRYPTION_KEY : string
	}
}>();


// * signup route

userRouter.post('/signup',async function(c) {
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const success = signUpInput.safeParse(body).success;

  if (!success) {
    c.status(401)
    return c.json({
      message : "wrong inputs",
      data : body
    })
  }

  // TODO : try to use generics here
  async function hashThePassword(encryption : string): Promise<string> {
    // hashing password using web crypto
  
    const encoder = new TextEncoder();
  
    // importing sectet key
    const secretKeyData = encoder.encode(
      c.env.ENCRYPTION_KEY ?? "temporaryKey"
    )
  
    // importing key for signing and verifying purposes
    const key = await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      {name : "HMAC", hash : "SHA-256"},
      false,
      ["sign","verify"]
    );
  
    const signedPassword = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(encryption)
    )
  
    const enctypedPassword = Buffer.from(signedPassword).toString("base64");
      
    return enctypedPassword
  }
  
  try {
    const userAlreadyExist = await prisma.user.findUnique({
      where : {
        email : body.email
      }
    })

    if (userAlreadyExist) {
      c.status(401)
      return c.json({
        message : "email is already in use please use another email"
      })
    }

    try {

      const storedPassword = await hashThePassword(body.password);

      const user = await prisma.user.create({
        data : {
         email : body.email,
         password : storedPassword,
         firstName : body.firstName,
         lastName : body.lastName ?? null
        }
      })
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt : jwt });
  
    } catch (error) {
      c.status(403);
      return c.json({ error: "error while signing up" });
    }

  } catch (error) {
    c.status(403);
		return c.json({ error: "error while signing up" });
  }

}
)

// * signin route

userRouter.post('/signin',async function (c) {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const success = signInInput.safeParse(body).success;

  if (!success) {
    c.status(401)
    return c.json({
      message : "wrong inputs"
    })
  }


  const user = await prisma.user.findUnique({
    where : {
      email : body.email
    }
  });

  async function passwordMatch() {

    const encoder = new TextEncoder();
  
    // importing sectet key
    const secretKeyData = encoder.encode(
      c.env.ENCRYPTION_KEY ?? "temporaryKey"
    )
  

    // importing key for signing and verifying purposes
    const key = await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      {name : "HMAC", hash : "SHA-256"},
      false,
      ["sign","verify"]
    );
    
   const storedPasword = Buffer.from(user!.password,"base64");
  
   const verified = await crypto.subtle.verify(
    "HMAC",
    key,
    storedPasword,
    encoder.encode(body.password ?? null)
   ) 

   return verified;
  }
  
if (!user) {
  c.status(403);
  return c.json({
    message : "user not found"
  })
}

const passwordMatchStatus = await passwordMatch();

if (!passwordMatchStatus) {
  c.status(403);
  return c.json({
    message : "incorrect password"
  })
}

const token = await sign({id : user.id},c.env.JWT_SECRET);
return c.json({token : token})

});


// * delete user route

userRouter.delete('/delete',async function (c) {
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const success = deleteUserInput.safeParse(body).success;

  if (!success) {
    c.status(401)
    return c.json({
      message : "wrong inputs"
    })
  }

  const user = await prisma.user.findUnique({
    where : {
      email : body.email
    }
  })

  async function passwordMatch() {

    const encoder = new TextEncoder();
  
    // importing sectet key
    const secretKeyData = encoder.encode(
      c.env.ENCRYPTION_KEY ?? "temporaryKey"
    )
  

    // importing key for signing and verifying purposes
    const key = await crypto.subtle.importKey(
      "raw",
      secretKeyData,
      {name : "HMAC", hash : "SHA-256"},
      false,
      ["sign","verify"]
    );
    
   const storedPasword = Buffer.from(user!.password,"base64");
  
   const verified = await crypto.subtle.verify(
    "HMAC",
    key,
    storedPasword,
    encoder.encode(body.password ?? null)
   ) 

   return verified;
  }
  
if (!user) {
  c.status(403);
  return c.json({
    message : "user not found"
  })
}

const passwordMatched = await passwordMatch();

if (!passwordMatched) {
  c.status(403);
  return c.json({
    message : "incorrect password"
  })
}

try {
  const deltedUser = await prisma.user.delete({
    where : {
      email : body.email
    }
  }) 

  c.status(200);
  return c.json({
    message : `user with email ${deltedUser.email} deleted`
  })

} catch (error) {
  c.status(403);
  return c.json({ error: "can't delete user" });
}
})



userRouter.get('/:id',async function(c) {
  
  const userId:string = c.req.param('id');
  
  // this is an un authenticated route
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
      const foundBlog = await prisma.post.findMany({
          where :{
              authorId : userId
          }
      })

      c.status(200);
     return c.json(foundBlog);

  } catch (error) {
      c.status(401);
     return c.json({
          message : "can't get blog"
      })
  }

})

// TODO how to handel if prisma goes down during production

