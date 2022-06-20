import mongodb from "mongodb";
import { comment, posts, users } from "./data.js";

const MongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "blog";
let mongoClient = undefined;
let currPostId = undefined;

MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true },
    async (error, client) => {
        if (error) {
            console.log("Unable to connect to database!");
        }
        mongoClient = client;
        console.log("Connected correctly!");

        const db = client.db(databaseName);
        let usersIds = [];
        const postsIds = [];

        //!2: async await
        try {
            const result = await db.collection("users").insertMany(users);
            usersIds = result.insertedIds;
            console.log(usersIds);
        } catch (err) {
            console.log(err);
        }

        //!3: async await - posts
        posts.forEach(async (post, idx) => {
            try {
                const { insertedId } = await db
                    .collection("posts")
                    .insertOne(post);
                console.log(insertedId);
                currPostId = insertedId;
                postsIds.push(insertedId);
                await db
                    .collection("posts")
                    .updateOne(
                        { _id: currPostId },
                        { $set: { owner: usersIds[idx] } }
                    );
                await db
                    .collection("users")
                    .updateOne(
                        { _id: usersIds[idx] },
                        { $push: { posts: currPostId } }
                    );
            } catch (err) {
                console.log(err);
            }
        });

        //!4: async await comments

        try {
            const { insertedId } = await db
                .collection("comments")
                .insertOne(comment);
            console.log(insertedId);
            await db
                .collection("comments")
                .updateOne(
                    { _id: insertedId },
                    { $set: { owner: usersIds[0], postId: postsIds[0] } }
                );
            await db
                .collection("posts")
                .updateOne(
                    { _id: postsIds[0] },
                    { $push: { comments: insertedId } }
                );
            await db
                .collection("users")
                .updateOne(
                    { _id: usersIds[0] },
                    { $push: { userComments: insertedId } }
                );
        } catch (err) {
            console.log(err);
        }

        // db.collection("users").deleteMany({});
    }
);

// const getUserById = (id) => {
//     return db.collection("users").find({ _id: id });
// };
