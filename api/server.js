const { createServer } = require("./presentation/server");

createServer()
  .then(({ app, env }) => {
    app.listen(env.appPort, env.appHost, () => {
      console.log(`API listening on http://${env.appHost}:${env.appPort}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start API:", error.message);
    process.exit(1);
  });
