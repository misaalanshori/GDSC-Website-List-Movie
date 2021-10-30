const presets = [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": 80, // this version to support `async/await`
        },
        "modules": false, // you might want it to native support esm in browser
      }
    ],
    "@babel/preset-react"
  ];

module.exports = { presets };