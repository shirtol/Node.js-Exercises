import { app } from "./app/app.js";
import "./app/db/mongoose.js";

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server is up and running on port " + PORT));
