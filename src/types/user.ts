export class User {
  uid: string;
  displayName: string;
  photoURL: string;

  constructor(uid: string, displayName: string, photoURL: string) {
    this.uid = uid;
    this.displayName = displayName;
    this.photoURL = photoURL;
  }
}
export type IUserModel = {
  login(): Promise<boolean>;
  logout(): Promise<boolean>;
};
