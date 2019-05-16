const {getList, getDetail, newBlog, updateBlog} = require('../controller/blog')
const {SuccessModel,errorModel} = require('../model/resModel')
//5个接口
const handleBlogRouter = (req,res) => {
  const method = req.method // GET POST
  const id = req.query.id
  //获取博客的列表
  if(method === 'GET'&&req.path==='/api/blog/list'){
    const author = req.query.author||''
    const keyword = req.query.keyword||''

    const result = getList(author,keyword)
    return result.then(listdata=>{
      return new SuccessModel(listdata)
    })
  }
  //博客详情
  if(method === 'GET'&&req.path==='/api/blog/detail'){
    const result = getDetail(id)
    return result.then(data=>{
      return new SuccessModel(data)
    })
  }
  //新建一片博客
  if(method==='POST'&&req.path==='/api/blog/new'){
    const result = newBlog(req.body)
    const author = 'zhangyachao'
    req.body.author = author
    return result.then(data=>{
      return new SuccessModel(data)
    })
  }
  //更新一片博客
  if(method==='POST'&&req.path==='/api/blog/update'){
    const result = updateBlog(id,req.body)
    return result.then(val=>{
      if(val){
        return new SuccessModel('更新成功')
      }
      return errorModel('更新博客失败')
    })
  }
  //删除博客
  if(method==='POST'&&req.path==='/api/blog/del'){
    return{
      msg:'这是删除博客的接口'
    }
  }
}
module.exports = handleBlogRouter