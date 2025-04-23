import { Component, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RegistrationService } from "../service/registration.service";
import { NgIf } from "@angular/common";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-registration",
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"],
})
export class RegistrationComponent {
  name: string = "";
  userName: string = "";
  userAge: number | null = null;
  userEmail: string = "";
  userPassword: string = "";
  userCheckPassword: string = "";
  userAvatar: string =
    "https://avatars.mds.yandex.net/i?id=93932abfd430c7aab32a3d45806ea6e6d4d0523a-4944707-images-thumbs&n=13";
  error: string = "";
  errorValid: string = "";
  errorPassword: string = "";
  isSubmitting: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(private registrationService: RegistrationService) {}

  onFormSubmit(formData: any) {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("username", formData.userName);
    formDataToSend.append("age", formData.userAge.toString());
    formDataToSend.append("email", formData.userEmail);
    formDataToSend.append("password", formData.userPassword);

    if(formData.userAvatar instanceof File){
      formDataToSend.append("avatar", formData.userAvatar);
    }
  }

  http = inject(HttpClient);

  authorization() {
    this.errorValid = "";
    this.errorPassword = "";
    this.error = "";

    if (
      !this.name ||
      !this.userName ||
      !this.userEmail ||
      !this.userAge ||
      !this.userPassword ||
      !this.userCheckPassword
    ) {
      this.errorValid = "Пожалуйста, заполните все поля корректно";
      return;
    }
    if (this.userAge <= 0) {
      this.errorValid = "Возраст должен быть положительным числом";
      return;
    }
    if (this.userPassword !== this.userCheckPassword) {
      this.errorPassword = "Пароли должны совпадать";
      return;
    }
    if (this.userPassword.length < 6) {
      this.errorPassword = "Пароль должен быть не менее 6 символов";
      return;
    }

    this.isSubmitting = true;

    const user = {
      name: this.name,
      username: this.userName,
      age: this.userAge,
      email: this.userEmail,
      password: this.userPassword,
      avatar: this.userAvatar,
    };
    this.isSubmitting = false;

    this.http.post("http://localhost:5000/auth/registration", user).subscribe({
      next: (res: any) => {
        if (res === "Регистрация прошла успешно") {
          this.showSuccessMessage = true;
        } else {
          this.error = "Не удалось зарегистрировать пользователя";
        }
      },
      error: (e) => {
        this.error = e.error?.message || "Ошибка регистрации";
        console.error("HTTP error:", e);
      },
    });
  }

  uploadFile(file: any) {
    console.log(file);
  }

  registration() {}
}
