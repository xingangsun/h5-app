import express from 'express'
import ip from 'ip'
import chalk from 'chalk'

import fs from 'fs'

import lowdb from 'lowdb'

import config from '../config'

const app = express()

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  if(req.method == "OPTIONS") {
    res.sendStatus(200) // 让options请求快速返回
  } else {
    next()
  }
})

app.listen(config.bkdServerPort, function () {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  console.log(`bkd-server at ${chalk.magenta.underline(`http://${ip.address()}:${this.address().port}`)}`)
})

// API router
const apiRouter = express.Router()
app.use('/api', apiRouter)

// IMG router
// const imgRouter = express.Router()
// app.use('/img', imgRouter) // sharp
app.use('/img', express.static(`${__dirname}/img`))

// 遍历目录并执行文件，你不再需要在手动引入
const walkDirAndRequire = function (dir, router) {
  try {
    let hasIndexJs = false, hasDbJson = false
    fs.readdirSync(dir).forEach((fname) => {
      const path = `${dir}/${fname}`
      if (fs.statSync(path).isDirectory()) {
        walkDirAndRequire(path, router)
      } else if (fname === 'index.js') {
        hasIndexJs = true
      } else if (fname === 'db.json') {
        hasDbJson = true
      }
    })

    if (hasIndexJs) {
      let db // 数据库
      if (hasDbJson) {
        db = lowdb(`${dir}/db.json`)
      } else {
        db = lowdb() // 基于内存的DB
      }
      require(`${dir}/index`).default(router, db)
    }
  } catch (err) {
    console.log(err)
  }
}
walkDirAndRequire(`${__dirname}/api`, apiRouter)
// walkDirAndRequire(`${__dirname}/img`, imgRouter)
