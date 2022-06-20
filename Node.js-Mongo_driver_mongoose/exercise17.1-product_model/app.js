import mongoose from "mongoose";
import validator from "validator";
import { products } from "./products.js";

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

const Product = mongoose.model("Product", {
    name: {
        type: String,
        require: true,
        unique: true,
    },
    category: {
        type: String,
        require: true,
    },
    isActive: {
        type: Boolean,
    },
    details: {
        description: {
            type: String,
            require: true,
            minLength: 10,
        },
        price: {
            type: Number,
            require: true,
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
            url: {
                type: String,
                require: true,
            },
            validate(value) {
                if (value.length < 2) {
                    throw Error(
                        "images field must contains at least 2 images!"
                    );
                }
            },
        },
        phoneNumber: {
            type: String,
            require: true,
            validate(value) {
                if (!validator.isMobilePhone(value, ["he-IL"])) {
                    throw Error(
                        "Phone number must be a valid israeli mobile number!"
                    );
                }
            },
        },
        dateAdded: {
            type: Date,
            default: new Date(),
        },
    },
});

products.forEach((product) => {
    const currProduct = new Product(product);
    currProduct
        .save()
        .then(() => {
            console.log(product);
        })
        .catch((err) => {
            console.log(err);
        });
});

//!Check for fail:
const product = new Product({
    name: "Nike1",
    category: "shoes",
    isActive: true,
    details: {
        description: "amazingvdvdsvdd!",
        price: 300,
        discount: 50,
        phoneNumber: "+972509344123",
        images: [{ url: "hfkdgdfgdnchfmc.png" }],
    },
});

product
    .save()
    .then(() => {
        console.log(product);
    })
    .catch((err) => {
        console.log(err);
    });

//!Using schema:
// const Schema = mongoose.Schema;

// const imagesSchema = new Schema({
//     url: {
//         type: String,
//         require: true,
//     },
// });

// const detailsSchema = new Schema({
//     description: {
//         type: String,
//         require: true,
//         minLength: 10,
//     },
//     price: {
//         type: Number,
//         require: true,
//         min: 0,
//     },
//     discount: {
//         type: Number,
//         default: 0,
//     },
//     images: [imagesSchema],
//     phoneNumber: {
//         type: String,
//         require: true,
//     },
//     dateAdded: {
//         type: Date,
//         default: new Date(),
//     },
// });

// const productSchema = new Schema({
//     name: {
//         type: String,
//         require: true,
//         unique: true,
//     },
//     category: {
//         type: String,
//         require: true,
//     },
//     isActive: {
//         type: Boolean,
//     },
//     details: detailsSchema,
// });

// const ProductModel = mongoose.model("product", productSchema);
// const DetailsModel = mongoose.model("details", detailsSchema);
// const ImagesModel = mongoose.model("images", imagesSchema);

// const newProduct = new ProductModel({
//     name: "Nike shoes",
//     category: "shoes",
//     isActive: true,
// });

// const newDetails = new DetailsModel({
//     description: "amazing shoes!",
//     price: 300,
//     discount: 50,
//     phoneNumber: "+972509344123",
// });

// const newImage1 = new ImagesModel({
//     url: "hfkdnchfmc.png",
// });

// const newImage2 = new ImagesModel({
//     url: "dnslcmfjfsfsd.png",
// });

// newImage1.save();
// newImage2.save();

// newDetails.images.push(newImage1);
// newDetails.images.push(newImage2);

// newDetails.save();

// newProduct.details = newDetails;

// newProduct.save();
