import express from "express";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";
import { commentsService } from "../services/CommentsService"
import { Auth0Provider } from "@bcwdev/auth0provider";

export class PostsController extends BaseController {
  constructor() {
    super("api/posts");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/comments", this.getCommentsByPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
  }

  async getAll(req, res, next) {
    try {
      let data = await postsService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      let data = await postsService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByPostId(req, res, next) {
    try {
      let data = await commentsService.find({ post: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await postsService.create(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorEmail = req.userInfo.email
      let data = await postsService.edit(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      let data = await postsService.delete(req.params.id, req.userInfo.email)
      res.send("Successfully deleted")
    } catch (error) {
      next(error)
    }
  }
}
