import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class PostsService {
  async find(query = {}) {
    let posts = await dbContext.Posts.find(query).populate("creator", "name picture")
    return posts
  }
  async findById(id) {
    let post = await dbContext.Posts.findById(id)
    if (!post) {
      throw new BadRequest("Invalid Id")
    }
    return post
  }
  async create(body) {
    return await dbContext.Posts.create(body)
  }
  async edit(body) {
    let update = dbContext.Posts.findOneAndUpdate({ _id: body.id, creatorEmail: body.creatorEmail }, body, { new: true })
    if (!update) {
      throw new BadRequest("Invalid id, or Unauthorized User")
    }
    return update
  }
  async delete(id, creatorEmail) {
    let success = await dbContext.Posts.findOneAndDelete({ _id: id, creatorEmail: creatorEmail })
    await dbContext.Comment.deleteMany({ post: id })
    if (!success) {
      throw new BadRequest("Invalid id")
    }
  }
}

export const postsService = new PostsService()