const app = require('./app')

const serverPort = process.env.SERVER_PORT || 3333

app.listen(serverPort, () => console.log(`Server running on *:${serverPort}`))
