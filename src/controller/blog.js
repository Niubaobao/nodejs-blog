const getList = (author,keyword)=>{
  //返回假数据
  return[
    {
      id:1,
      title:'标题1',
      content:'内容一',
      author:'zhangsan'
    },
    {
      id:2,
      title:'标题2',
      content:'内容2',
      author:'lisi'
    }
  ]

}
module.exports = {
  getList
}