import mongoose from "mongoose";

mongoose.connect(
    "mongodb://127.0.0.1/e-commerce",
    (err, mongoConnectionInstance) => {
        if (err) throw Error("Mongoose Connection Error: " + err);
        if (!process.env.NODE_ENV) {
            const { host, port, name } = mongoConnectionInstance;
            console.log({ host, port, name });
        }
    }
);
