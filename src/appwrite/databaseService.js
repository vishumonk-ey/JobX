import { Client, Databases, ID, Permission , Role } from "appwrite";
import { config } from "../assets/config";
class DataBaseService {
  client = new Client()
    .setEndpoint(config.appwriteEndpoint)
    .setProject(config.appwriteProjectId);
  database;
  constructor() {
    this.database = new Databases(this.client);
  }
  async createDocument(data) {
    try {
      const document = await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        data,
        // [
        //   Permission.read(Role.user(authorId)),
        //   Permission.write(Role.user(authorId)),
        // ]
      );
      return document;
    } catch (error) {
      throw error;
    }
  }
  async getDocument(documentId) {
    try {
      const document = await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentId
      );
      return document
    } catch (error) {
      throw error;
    }
  }
  async listDocuments(filterArr) {
    try {
      const allDocuments = this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        filterArr
      );
      return allDocuments;
    } catch (error) {
      throw error;
    }
  }
  async updateDocument(data, documentId) {
    try {
      const result = await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentId,
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteDocument(documentId) {
    try {
      const result = await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        documentId
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
export const databaseService = new DataBaseService();
