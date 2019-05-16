const env = process.env.NODE_ENV  //获取环境变量
//根据环境不同  设置不同的配置
let MYSQL_CONF
if(env==='dev'){
  MYSQL_CONF = {
    host:'127.0.0.1',
    user:'root',
    password:'liuwei@hero',
    port:'3306',
    database:'myblog'
  }
}
if(env==='production'){
  MYSQL_CONF = {
    host:'localhost',
    user:'root',
    password:'liuwei@hero',
    port:'3306',
    database:'myblog'
  }
}

module.exports ={
  MYSQL_CONF
}