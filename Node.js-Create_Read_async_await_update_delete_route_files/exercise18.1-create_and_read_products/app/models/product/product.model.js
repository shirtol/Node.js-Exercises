import mongoose from "mongoose";
import validator from "validator";

export const Product = mongoose.model("Product", {
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
