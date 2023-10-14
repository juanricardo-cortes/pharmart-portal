export class Constants {
  apiUrl: string = "http://localhost:3000/api";
  invalidLogin: Message = {
    message: "Invalid username/password",
    color: "red-text"
  };
  succcessfulRegister: Message = {
    message: "User successfully registered",
    color: "green-text"
  };
  invalidRegister: Message = {
    message: "User already exists",
    color: "red-text"
  };
}

export interface Message {
  message: string;
  color: string;
}
