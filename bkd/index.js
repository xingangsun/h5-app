import nodemon from 'nodemon'

nodemon({
  script: `${__dirname}/app.js`,
  watch: [`${__dirname}/api`, `${__dirname}/img`],
  ext: 'js json',
  execMap: {
    'js': 'babel-node --presets=env,stage-0'
  }
}).on('crash', function () {
  console.error('nodemon crashed!')
}).on('quit', function() {
  process.kill(process.pid)
}).on('restart', function (files) {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(`bkd-server restarting due to [${files.map(file => file.replace(`${__dirname}/`, ''))}]`)
})

// 防止进程意外退出
process.on('uncaughtException', function (err) {
  // console.log(err);
  // console.log(err.stack);
});
