import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { updatePostInput, createPostInput } from "../../../common/src/index";

export const blogRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string
    SECRET_DATA : string
    JWT_SECRET : string
	}

    Variables :{
        userId : string
    }

}>();


//* middleware

blogRouter.use('/*',async (c,next) =>{
    const jwt = c.req.header('Authorization');
    if (!jwt) {
      c.status(403);
      return c.json({message : "opps! can't authorize"})
    }
  
    const token = jwt.split(" ")[1];
    const payload = await verify(token,c.env.JWT_SECRET);
    if (!payload) {
      c.status(401);
      return c.json({
        msg : "wrong token"
      })
    }
  
    c.set('userId',payload.id);
    await next();
  })
  



// * post new blog

blogRouter.post('/post',async function (c) {
    // here we are directly checking for user id and not considering not found condition as if token is not there the middleware will automatically reject it
    const userId = c.get('userId');
   
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const success = createPostInput.safeParse(body).success;

    if (!success) {
        c.status(403);
        return c.json({
            message : 'wrong inputs'
        })
    }

try {
    const createdBlog = await prisma.post.create({
        data : {
            title: body.title,
			content: body.content,
			authorId: userId
        }
    });

    c.status(200);
    return c.json({
        blogId : createdBlog.id
    })
} catch (error) {
    c.status(403);
    return c.json({ error: "error while creting blog" });
}
});




//* for updating a blog

blogRouter.put('/:id',async function (c) {
    const blogId = c.req.param('id');
    const userId = c.get('userId');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const success = updatePostInput.safeParse(body).success;

    if (!success) {
        c.status(403);
        return c.json({
            message : 'wrong inputs'
        })
    }        

    try {
        const updatedBlog = await prisma.post.update({
            where : {
                id : blogId,
                authorId : userId
            },
            data: {
                title : body.title,
                content : body.content
            }
        })
        c.status(200);
        return c.json({
            message : `blog of id ${(updatedBlog).id} updated`
        })
    } catch (error) {
        c.status(401);
        return c.json({
            message : error
        })
    }

});



//* for getting a specific blog

blogRouter.get('/:id',async function(c) {
  
    const blogId:string = c.req.param('id');
    
    // this is an un authenticated route
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const foundBlog = await prisma.post.findUnique({
            where :{
                id : blogId
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



// * get all blogs

blogRouter.get('/get/bulk',async function (c) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany();
        c.status(200);
        return c.json({posts : posts});        
    } catch (error) {
        c.status(401);
        return c.json({
            message : "can't get blogs"
        })
    }
});




// * hide a blog

blogRouter.put('/hide/:id',async function (c) {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id');

    try {
        const hiddenBlog = await prisma.post.update({
            where : {
                id : blogId
            },
            data : {
                isPublished : false
            }
        })

        c.status(200);
        return c.json({
            message : `blog of id ${(hiddenBlog).id} hidden`
        })
    } catch (error) { 
        c.status(403)
        return c.json({
            message : "unable to hide blog"
        })  
    }
})




// * delete a blog

blogRouter.delete('/delete/:id', async function (c) {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id');

    try {
        const deleteBlog = await prisma.post.delete({
            where : {
                id : blogId
            }
        })

        c.status(200);
        return c.json({
            message : `blog of id ${deleteBlog.id} is delted` 
        })
    } catch (error) {
        c.status(401);
        c.json({
            message : "unable to delte blog"
        })
    }
})
