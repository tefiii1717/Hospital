module.exports = {
  apps: [{
    name: 'hospital-backend',
    script: 'src/app.js',
    watch: false,
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }]
};
