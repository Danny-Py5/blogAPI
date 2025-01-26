const postModel = require('../model/post.js'); 
const asyncWrapper = require('../meddleware/asyncWrapper.js');
const {createCustomAPIError} = require('../error/customeError.js');

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
const getAllPosts = asyncWrapper( async (req, res) => {
    const allPosts = await postModel.find({});
    res.status(200).json({allPosts});
});

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
const getAPost = asyncWrapper( async (req, res, next) => {
    // console.log(req.params);
    const {id} = req.params;
    const post = await postModel.findOne({_id:id});
    if (!post){
        console.log(post);
        // create a custom error object 
        const error = createCustomAPIError(404, `cannot find a post with the id of ${id}`);
        return next(error);
    }
    // console.log(post)
    res.status(200).json({post, success:true,});
});

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
const addPost = asyncWrapper( async (req, res) => {
    console.log(req.body)
    const createdPost = await postModel.create(req.body);
    return res.status(201).json({createdPost, requestBody: req.body});
});

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 */
const updatePost = asyncWrapper( async (req, res, next) => {
    const {id} = req.params;
    const updatedPost = await postModel.findOneAndUpdate({_id:id}, req.body, {new: true, runValidators: true});
    // console.log(updatedPost)
    if (!updatedPost){
        const error = createCustomAPIError(404, `cannot find a post with the id of ${id}`);
        return next(error)
    };
    res.status(200).json({updatedPost, success:true})
});

const deletePost = asyncWrapper( async (req, res, next) => {
    const { id } = req.params;
    const deletedPost = await postModel.findOneAndDelete({_id:id});
    if (!deletedPost){
        const error = createCustomAPIError(404, `cannot find a post with the id of ${id}`);
        return next(error);
    };
    res.status(200).json({success:true, deletedPost});
})


module.exports = {
    getAllPosts,
    addPost,
    getAPost,
    updatePost,
    deletePost
}
