const {exec} = require('../db/mysql')

//获取博客列表
const getList = (author,keyword)=>{
  let sql = `select * from blogs where 1=1 `
  if(author){
    sql += `and author = ${author} `
  }
  if (keyword) {
    sql += `and keyword=${keyword} `
  }
  sql += `order by createtime desc;`

  return exec(sql)

}
//获取博客详情
const getDetail = (id)=>{
  const sql =`select * from blogs where id=${id};`
  return exec(sql).then(rows=>{
    return rows[0]
  })
}
//新建博客
const newBlog = (blogData={})=>{
  //blogData是一个对象
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author||''
  const keyword = '123'
  const createtime = Date.now()
  const sql = `insert into blogs (title, content, createtime, author, keyword) values
   ('${title}', '${content}', ${createtime}, '${author}', '${keyword}');`
   return exec(sql).then(insertData=>{
     return {
       id: insertData.insertId
     }
   })
}
//更新博客
const updateBlog = (id,blogData={})=>{
  const title =  blogData.title
  const content = blogData.content
  console.info(title,content,'contenttitle')
  const sql = `
    update blogs set title = '${title}', content = '${content}' where id = ${id}
  `
  return exec(sql).then(resData=>{
    console.info(resData,'resData')
    if(resData.affectedRows>0){
      return true
    }
    return false
  })

}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog
}