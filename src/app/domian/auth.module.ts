import { User } from "./user.module";
import { Err } from "./err.module";

export interface Auth {
  user?: User
  userId?: string
  token?: string
  err?: Err
}