import app from "./controller/app"
import { freightRouter } from "./controller/routers/freightRouter"
import { userRouter } from "./controller/routers/userRouter"

app.use('/user/', userRouter)
app.use('/freight/', freightRouter)
