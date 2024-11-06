import { create, router as _router, defaults } from "json-server";
import cors from "cors";
const server = create();
const router = _router("database.json");
const middlewares = defaults();

// CORS-ის გაშვება
server.use(cors());

// Middleware
server.use(middlewares);

// Routes
server.use("/countries", router);
server.listen(3000, () => {
  console.log("JSON Server is running on http://localhost:3000");
});
