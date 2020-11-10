import { ProxyState } from "../AppState.js";
import Comment from "../Models/Comment.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async vote(bool, cId) {
    let found = ProxyState.comments.find(p => p._id == cId)

    if (bool) {
      if (!found.upvote.find(u => u == ProxyState.user.email)) {
        found.upvote.push(ProxyState.user.email)
        await api.put(`api/comments/${cId}`, found)
      }
      else {
        let index = found.upvote.findIndex(u => u == ProxyState.user.email)
        found.upvote.splice(index, 1)
        await api.put(`api/comments/${cId}`, found)
      }
    }
    else {
      if (!found.downvote.find(u => u == ProxyState.user.email)) {
        found.downvote.push(ProxyState.user.email)
        await api.put(`api/comments/${cId}`, found)
      }
      else {
        let index = found.downvote.findIndex(u => u == ProxyState.user.email)
        found.downvote.splice(index, 1)
        await api.put(`api/comments/${cId}`, found)
      }
    }
    ProxyState.comments = ProxyState.comments
  }
  async deleteComment(id) {
    let res = await api.delete(`api/comments/${id}`)
    this.getComments()
  }

  async getComments() {
    let res = await api.get(`api/posts/${ProxyState.activePost._id}/comments`)
    ProxyState.comments = res.data.map(c => new Comment(c))
    this.sortByUpvote()
  }

  async addComment(rawComment) {
    rawComment.user = ProxyState.user.email
    await api.post("api/comments", rawComment)
    this.getComments()
  }

  async sortByUpvote() {
    await ProxyState.comments.sort((a, b) => ((a.upvote.length - a.downvote.length) > (b.upvote.length - b.downvote.length)) ? -1 : 1)
    ProxyState.comments = ProxyState.comments
  }

  async sortByDownvote() {
    await ProxyState.comments.sort((a, b) => ((a.upvote.length - a.downvote.length) < (b.upvote.length - b.downvote.length)) ? 1 : -1)
    ProxyState.comments = ProxyState.comments
  }
}

export const commentsService = new CommentsService();

