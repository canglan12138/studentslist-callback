/*
*router.js 路由模块
* 职责：
*   处理路由
*   根据不同的请求方法 + 请求路径设置具体的请求处理函数
* */

//Express 提供了包装路由的方式
var express = require('express')

var Students = require('./students')


//1.创建一个路由容器
var router = express.Router()

//2.把路由都挂载到 router 容器中
/*
* 首页
* */
router.get('/',(req,res) => {
  Students.find((err,students) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.render('index.html',{
      grandes: [
        '一年级',
        '二年级',
        '三年级',
        '四年级',
      ],
      students: students
    })
  })
})

/*
* 渲染添加页面
* */
router.get('/students/new',(req,res) => {
  res.render('new.html')
})

/*
* 处理添加学生请求
* */
router.post('/students/new',(req,res) => {
  /*
  * 1.获取表单数据
  * 2.处理，将数据保存到 db.json 文件中用以持久化
  *   读取 db.json 文件，转为对象
  *   往对象中 push 数据
  *   将对象转为字符串
  *   把字符串再次写入文件
  * 3.发送响应
  * */
  Students.save(req.body,(err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/')
  })
})

/*
* 渲染编辑学生页面
* */
router.get('/students/edit',(req,res) => {
  //1.在客户端的列表页处理链接问题（需要 id 参数）
  //2.获取要编辑的学生 id
  //3.渲染编辑页面
    //根据 id 把学生信息查出来
    //使用模板引擎渲染页面
  Students.findById(req.query.id,(err,student,studentGender) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    if (studentGender === '男') {
      return res.render('edit.html',{
        student: student,
        checkedman: 'checked'
      })
    }
    res.render('edit.html',{
      student: student,
      checkedwoman: 'checked'
    })
  })
})

/*
* 处理编辑学生
* */
router.post('/students/edit',(req,res) => {
  //1.获取表单数据
  //2.保存更新
  //3.发送响应
  Students.updateById(req.body,(err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/')
  })
})

/*
* 处理删除学生
* */
router.get('/students/delete',(req,res) => {
  //1.获取要删除的 id
  //2.根据 id 执行删除操作
  //3.根据操作结果发送响应数据
  Students.deleteById(req.query.id,(err) => {
    if (err) {
      return res.status(500).send('Server error')
    }
    res.redirect('/')
  })
})

//3.导出路由容器
module.exports = router