module.exports = {
  apps : [{
    name:"index",
    script: './src/index.js',
    cwd:"/home/ubuntu/api-test",
    instances:2,
    exec_mode:"cluster",
    watch: '.'
 }]
};
