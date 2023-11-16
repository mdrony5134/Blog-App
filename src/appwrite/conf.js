/* eslint-disable no-unreachable */
import config from "../config/config";

import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ Title, Content, slug, FeaturedImage, Status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      {
        Title, Content, FeaturedImage, Status, userId;
      }
    } catch (error) {
      console.log("createPost error", error);
    }
  }

  async updatePost(slug, { Title, Content, FeaturedImage, Status }) {
    try {
      return await this.databases(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      {
        Title, Content, FeaturedImage, Status;
      }
    } catch (error) {
      console.log("updatePost error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("deletePost error", error);
    }
    return false;
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("getPost error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("Status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("getPosts error", error);
      return false;
    }
  }

  // file upload services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("upload file error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("delete file error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appWriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
