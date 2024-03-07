import Post from "../models/post.model.js";

class PostController {
    getAllPost = async (req, res) => {
        let filtro = {};
        filtro = { ...filtro, deletedAt: false };
        const query = req.query;
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const filtrar = query.filtrar || '';
        if (filtrar != '') filtro = { ...filtro, Title: { $regex: filtrar, $options:'i' } };
        const total = Math.ceil((await Post.find(filtro)).length / limit);
        const numeroSkip = page * limit - limit;
        const arrayPost = await Post.find(filtro).skip(numeroSkip).limit(limit).sort({_id : 'desc' }).populate({ path: 'user', select: 'Email FullName' });
        res.status(200).send({ post: arrayPost, totalPage: total, page: page });
    }

    savePost = async (req, res) => {
        const { Title, Content, userId } = req.body;
        const post = new Post();
        post.Title = Title;
        post.Content = Content;
        post.userId = userId;
        post.user = userId;
        const dataPost = await post.save();
        return res.status(201).send(dataPost);
    }

    updatePost = async (req, res) => {
        const { Title, Content } = req.body;
        const data = { Title, Content };
        const { id } = req.params;
        await Post.findByIdAndUpdate(id, data);
        return res.status(200).send({ message: 'Se actualizo los datos' });
    }

    deletePost = async (req, res) => {
        const { id } = req.params;
        await Post.findByIdAndUpdate(id, { deletedAt: true });
        return res.status(200).send({ message: 'Se Elimino los datos' });
    }

    likePost = async (req, res) => {
        const { id } = req.params;
        const post = await Post.findOne({ _id: id});
        const dataPost = await Post.findOneAndUpdate(post._id, { Likes: post.Likes + 1 });
        return res.status(200).send({ message: 'Se actualizo los datos' });
    }
}

export default PostController;