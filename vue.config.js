module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://app.51xuexiaoyi.com",
        changOrigin: true, 
      },
    },
  },
};
