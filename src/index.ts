import app from "./controller/app"
import { freightRouter } from "./controller/routers/freightRouter"
import { userRouter } from "./controller/routers/userRouter"

app.use('/users/', userRouter)
app.use('/freights/', freightRouter)
