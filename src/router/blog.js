const {getList} = require('../controller/blog')
const {SuccessModel,errorModel} = require('../model/resModel')
//5个接口
const handleBlogRouter = (req,res) => {
  const method = req.method // GET POST
  //获取博客的列表
  if(method === 'GET'&&req.path==='/api/blog/list'){
    const author = req.query.author||''
    const keyword = req.query.keyword||''
    const listdata = getList(author,keyword)
    return new SuccessModel(listdata)
  }
  //博客详情
  if(method === 'GET'&&req.path==='/api/blog/detail'){
    return {
      msg:'博客详情'
    }
  }
  //新建一片博客
  if(method==='POST'&&req.path==='/api/blog/new'){
    return {
      msg:'这是新建博客的接口'
    }
  }
  //更新一片博客
  if(method==='POST'&&req.path==='/api/blog/update'){
    return{
      msg:'更新一片博客接口'
    }
  }
  //删除博客
  if(method==='POST'&&req.path==='/api/blog/del'){
    return{
      msg:'这是删除博客的接口'
    }
  }
}
module.exports = handleBlogRouter