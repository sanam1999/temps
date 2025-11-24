const Post = require("../Model/post")

module.exports.getpost = async (req, res) => {
    try {
        const type = req.query.type;
        const post = await Post.find({ type: type })
        post.map((p) => {
            console.log(p)
            p.images.map((i) => { i.url = process.env.baseurl+i.url})
        })
        if (post.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "imvalid ruquest"
            })
        } 
            res.status(200).json({
                success: true,
                data: post,
            })
        

    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: `Error ${e}`,
            error: e.message,
        });
    }
}

