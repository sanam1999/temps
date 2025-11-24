const mongoose = require('mongoose');
const Post = require('./Model/post');


module.exports.runSeed = async()=> {
    await Post.deleteMany({}); // remove old data (optional)

    const samplePosts = [
        {
            type: "others",
            caption: "Post One Caption",
            images: [
                { url: "/uploads/images.jpeg", index: 1 },
                { url: "/uploads/images.jpeg", index: 2 }
            ]
        },
        {
            type: "best",
            caption: "Post Two Caption",
            images: [
                { url: "/uploads/images.jpeg", index: 1 },
                { url: "/uploads/images.jpeg", index: 2 },
                { url: "/uploads/images.jpeg", index: 3 }
            ]
        },
        {
            type: "latest",
            caption: "Post Three Caption",
            images: [
                { url: "/uploads/images.jpeg", index: 1 },
                { url: "/uploads/images.jpeg", index: 2 },
                { url: "/uploads/images.jpeg", index: 3 },
                { url: "/uploads/images.jpeg", index: 4 }
            ]
        }
    ];

    await Post.insertMany(samplePosts);

    console.log("3 posts inserted successfully!");
    mongoose.connection.close();
}
