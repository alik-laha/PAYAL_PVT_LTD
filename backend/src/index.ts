import dotenv from 'dotenv'
import app from "./app"

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`server is runing on port ${process.env.PORT}`)
})