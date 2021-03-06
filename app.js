const querystring = require('querystring');
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

//用于处理post data
const getPostData = (req) => {
  const promise = new Promise((resolve,reject)=>{
    if(req.method !=='POST'){
      resolve({})
      return
    }
    if(req.headers['content-type']!=='application/json'){
      resolve({})
      return
    }
    let postData =''
    req.on('data', chuck => {
      postData += chuck.toString()
    })

    req.on('end',() => {
      if(!postData){
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
        )
    })
  })
  return promise
}

const serverHandle = (req,res)=>{
  //设置返回格式
  res.setHeader('Content-type','application/json')
  const url = req.url
  const path = url.split('?')[0]
  req.path = path
  req.query = querystring.parse(url.split('?')[1]) 

  //处理postdata
  getPostData(req).then((postData)=>{
    req.body = postData

    //处理blog路由
  const blogResult = handleBlogRouter(req,res)
  if(blogResult){
    blogResult.then(blogData=>{
      res.end(JSON.stringify(blogData))
    })
    return
  }
 
  // const blogData = handleBlogRouter(req,res)
  // if(blogData){
  //   res.end(JSON.stringify(blogData))
  //   return
  // }
  //处理user路由 
  const userData = handleUserRouter(req,res)
  if(userData){
    res.end(JSON.stringify(userData))
    return
  }
  //未命中路由
  res.writeHead(404,{'Content-type':'text/plain'})
  res.write('404 not find page\n')
  res.end()
  })
  
  
}
module.exports = serverHandle