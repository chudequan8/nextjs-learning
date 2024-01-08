module.exports = {
  apps: [
    {
      name: 'nextjs-dashboard',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 7000,
      },
    },
  ],
};
