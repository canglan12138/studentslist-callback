/*
* students-fs.js 数据操作模块
* 职责：
*   操作文件中的数据，只处理数据，不关心业务
*   封装异步 API
* 重点：
*   回调函数 异步操作
* */

var fs = require('fs')
var dbPath = './db.json'

/*
* 获取所有学生列表
* */
exports.find = (callback) => {
  fs.readFile(dbPath,'utf8',(err,data) => {
    if (err) {
      return callback(err)
    }
    callback(null,JSON.parse(data).students)
  })
}

/*
* 获取某个学生
* */
exports.findById = (id,callback) => {
  fs.readFile(dbPath,'utf8',(err,data) => {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    var ret = students.find((item) => {
      return item.id === parseInt(id)
    })
    callback(null,ret,ret.gender)
  })
}


/*
* 添加保存学生
* */
exports.save = (student,callback) => {
  fs.readFile(dbPath,'utf8',(err,data) => {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    student.id = students[students.length - 1].id + 1
    students.push(student)
    var fileData = JSON.stringify({
      students:students})
    fs.writeFile(dbPath,fileData,(err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/*
* 更新学生
* */
exports.updateById = (student,callback) => {
  fs.readFile(dbPath,'utf8',(err,data) => {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    //注意：统一把 id 转为 数字类型
    student.id = parseInt(student.id)
    /*
    * ES6 数组方法：find
    * 接收一个函数作为参数
    * 当某个遍历项符合 return item.id === parseInt(student.id) 返回这个对象
    * */
    var stu = students.find((item) => {
      return item.id === student.id
    })
    for (let key in student) {
      stu[key] = student[key]
    }
    //转化为字符串，写入文件
    var fileData = JSON.stringify({
      students:students})
    fs.writeFile(dbPath,fileData,(err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/*
* 删除学生
* */
exports.deleteById = (id,callback) => {
  fs.readFile(dbPath,'utf8',(err,data) => {
    if (err) {
      return callback(err)
    }
    var students = JSON.parse(data).students
    //findIndex 方法根据条件查找元素的下标
    var deleteId = students.findIndex((item) => {
      return item.id === parseInt(id)
    })
    //根据下标从数组中删除学生
    students.splice(deleteId,1)
    var fileData = JSON.stringify({
      students:students})
    fs.writeFile(dbPath,fileData,(err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}