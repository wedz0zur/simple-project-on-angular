import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  users: any = []
  getUsers(){
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [];
    }
    return this.users;
  }

  addUser(newUser: any) {
    this.users.push(newUser);
    localStorage.setItem("users", JSON.stringify(this.users));
  }
  constructor() {}
}
