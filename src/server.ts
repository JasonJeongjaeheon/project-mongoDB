import config from './configs/environment'
import { createApp } from "./app";
import appDataSource from './dataSource';

const setServer = async(): Promise<void> => {
    const app = createApp()
    const PORT = config.port

    appDataSource
    .then(() => {
        console.log("Data Source has been initialized")
    })
    .catch(() => {
        console.log("Error: Data Source initialization has been failed")
    })

    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`)
    })
}

setServer()