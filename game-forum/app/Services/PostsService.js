import { ProxyState } from "../AppState.js";
import Post from "../Models/Post.js";
import { api } from "./AxiosService.js";
import { commentsService } from "./CommentsService.js";

class PostsService {
  async vote(bool, id) {
    let found = ProxyState.posts.find(p => p._id = id)
    
    if(bool){
        if(!found.upvotes.find(u => ProxyState.user.email)){
          found.upvotes.push(ProxyState.user.email)
          await api.put(`api/posts/${id}`, found)
        }
        else{
          let index = found.upvotes.findIndex(u => ProxyState.user.email)
          found.upvotes.splice(index, 1)
        }
    }
    else{
      if(!found.downvotes.find(u => ProxyState.user.email)){
        found.downvotes.push(ProxyState.user.email)
        await api.put(`api/posts/${id}`, found)
      }
      else{
        let index = found.downvotes.findIndex(u => ProxyState.user.email)
        found.downvotes.splice(index, 1)
      }
  }
  console.log(found)
  }
  async deletePost(id) {
    console.log(id);
    let res = await api.delete(`api/posts/${id}`)
    console.log(res)
    ProxyState.activePost = null
    ProxyState.comments = []
    this.getPosts()
  }
  async getPosts() {
    let res = await api.get("api/posts")
    // @ts-ignore
    ProxyState.posts = res.data.map(p => new Post(p))
  }
  setPost(id) {
    let foundpost = ProxyState.posts.find(p => p.title == id)
    ProxyState.activePost = foundpost
    commentsService.getComments()
  }
  async addPost(rawPost) {
    rawPost.user = ProxyState.user.email
    await api.post("api/posts", rawPost)
    this.getPosts()
  }
}

export const postsService = new PostsService();

