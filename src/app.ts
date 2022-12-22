import express from "express";
import cors from "cors";
import routes from "./router";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

export default app;
