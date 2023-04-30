export interface UserType {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  expireAt: Date;
}
export interface UserTokenType {
  username: string;
  email: string;
}
// export interface UserType {
//   username: string;
//   email: string;
//   password: string;
//   isVerified: boolean;
// }
