import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  private _registrationService: RegistrationService;
  constructor(RegistrationService: RegistrationService) {
    this._registrationService = RegistrationService;
  }

  userName = ""
  userAge = ""
  userAvatar = "https://avatars.mds.yandex.net/i?id=93932abfd430c7aab32a3d45806ea6e6d4d0523a-4944707-images-thumbs&n=13"
  error = ""


  users: any = []
  

  addUser = ()=>{
    if(this.userName && this.userAge){
      let newUser = {
        id: Date.now,
        name: this.userName,
        age: this.userAge,
        avatar: this.userAvatar
      }
      this._registrationService.addUser(newUser)
      this.userName = ""
      this.userAge = ""
      this.userAvatar = ""
    }else{
      this.error = "Нужно заполнить все поля"
    }

  }


}
