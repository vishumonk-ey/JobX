import { Account, Client, ID, OAuthProvider } from "appwrite";
import { config } from "../assets/config";
class Auth {
  client = new Client().setProject(config.appwriteProjectId);
  account;
  constructor() {
    this.account = new Account(this.client);
  }
  async Signup({ email, password, name }) {
    try {
      const promise = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (promise) {
        return this.Login(email, password);
      }
    } catch (error) {
      throw error;
    }
  }
  async Login({ email, password }) {
    try {
      const sessionObject = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return sessionObject;
    } catch (error) {
      throw error;
    }
  }
  async Logout() {
    try {
      const promise = await this.account.deleteSession("current");
      return promise ? true : false;
    } catch (error) {
      throw error;
    }
  }
  OAuthGoogle() {
    this.account.createOAuth2Session(
      OAuthProvider.Google,
      "home site link**********",
      "back to login ***********"
    );
    // wont work as just the previous method runs , user is redirected to the google oauth and my execution stops
  }
  OAuthGithub() {
    this.account.createOAuth2Session(
      OAuthProvider.Github,
      "home site link**********",
      "back to login ***********"
    );
  }
  async getCurrentUser(){
    try {
        const promise = await this.account.get()
        return promise
    } catch (error) {
        throw error
    }
  }
  async createRecovery({email}){
    try {
        this.account.createRecovery(email,"password-reset-page-link*******")
    } catch (error) {
        throw error
    }
  }
  async updatePassword({email,secretKey , password}){
    try {
        this.account.updateRecovery(email,secretKey , password)
    } catch (error) {
        throw error
    }
  }
}
export const authService = new Auth()

