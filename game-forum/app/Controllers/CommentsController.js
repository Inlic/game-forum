import { ProxyState } from "../AppState.js";
import { AuthService } from "../Services/AuthService.js";
import { commentsService } from "../Services/CommentsService.js";


//Private
function _draw() {
  let comments = ProxyState.comments
  let template = ''
  comments.forEach(c => template += c.Template)
  document.getElementById("comments").innerHTML = template
}

//Public
export default class CommentsController {
  constructor() {
    AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, () => {
      ProxyState.on("comments", _draw);
      this.getComments()
      console.log(ProxyState.comments)
    })
  }

  addComment(event) {
    event.preventDefault()
    let form = event.target
    let rawComment = { body: form.comment.value, post: ProxyState.activePost._id }

    try {
      commentsService.addComment(rawComment)
    } catch (error) {
      console.error(error)
    }
  }

  getComments() {
    try {
      commentsService.getComments()
    } catch (error) {
      console.error(error);
    }
  }

  deleteComment(id) {
    try {
      commentsService.deleteComment(id)
    } catch (error) {
      console.error(error);
    }

  }
}