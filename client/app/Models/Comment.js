export default class Comment {

  constructor(data) {
    this.post = data.post
    this.creatorEmail = data.creatorEmail
    this.body = data.body
    this.upvote = data.upvote || []
    this.downvote = data.downvote || []
    this._id = data._id
  }

  get Template() {
    return `
    <div class="row">
      <div class="col-12">
        <div class="card mb-1">
          <div class="card-header">
          <h5>
            <button type="button" class="btn btn-syellow float-right stext" onclick="app.commentsController.deleteComment('${this._id}')">Delete Comment  <i class="fa fa-times" aria-hidden="true"></i>
            </button>
            ${this.creatorEmail} |
            ${this.upvote.length} <i class="fa fa-arrow-up" aria-hidden="true" onclick="app.commentsController.vote(true, '${this._id}')"></i>  ${this.downvote.length} <i class="fa fa-arrow-down" aria-hidden="true" onclick="app.commentsController.vote(false, '${this._id}')"></i>
          </h5>
          </div>
          <div class="card-body">
            <p>${this.body}</p>
          </div>
        </div>
      </div>
    </div>
    `
  }

}