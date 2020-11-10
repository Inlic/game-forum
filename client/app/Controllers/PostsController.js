import { ProxyState } from "../AppState.js";
import { AuthService } from "../Services/AuthService.js";
import { postsService } from "../Services/PostsService.js";


//Private
function _draw() {
  let template = ''
  for (let i = 0; i < ProxyState.posts.length; i++) {
    const post = ProxyState.posts[i];
    if (post.display == true) {
      template += post.Template
    }
  }
  document.getElementById("postList").innerHTML = template
}

function _drawActive() {
  let ap = ProxyState.activePost
  let template = ''
  if (ap) {
    template = ap.activeTemplate
  }
  document.getElementById("activePost").innerHTML = template
}

//Public
export default class PostsController {
  constructor() {
    ProxyState.on("posts", _draw);
    ProxyState.on("activePost", _drawActive);
    this.getPosts()
    AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, () => {
    })
  }

  addPost(event) {
    event.preventDefault()
    let e = event.target
    let rawPost = { title: e.title.value, body: e.body.value, img: e.imgUrl.value, category: e.category.value }
    try {
      postsService.addPost(rawPost)
    } catch (error) {
      console.error(error)
    }
    e.reset()
  }

  setPost(id) {
    postsService.setPost(id)
  }

  getPosts() {
    try {
      postsService.getPosts()
    } catch (error) {
      console.error(error);
    }
  }

  deletePost(id) {
    try {
      postsService.deletePost(id)
    } catch (error) {
      console.error(error);
    }

  }

  vote(bool, id) {
    window.event.stopPropagation()
    console.log("you voted");
    try {
      postsService.vote(bool, id)
    } catch (error) {
      console.error(error);
    }
  }

  sortByUpvote() {
    try {
      postsService.sortByUpvote()
    } catch (error) {
      console.error(error)
    }
  }

  sortByDownvote() {
    try {
      postsService.sortByDownvote()
    } catch (error) {
      console.error(error)
    }
  }

  filterCategorys(category) {
    try {
      postsService.filterCategorys(category)
    } catch (error) {
      console.error(error);
    }
  }
}