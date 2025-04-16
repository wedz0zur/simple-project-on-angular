import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  name:string = "";
  userName: string = "";
  userAge: number | null = null;
  userEmail: string = "";
  userPassword: string = "";
  userCheckPassword: string = "";
  userAvatar: string = "https://avatars.mds.yandex.net/i?id=93932abfd430c7aab32a3d45806ea6e6d4d0523a-4944707-images-thumbs&n=13";
  error: string = "";
  isSubmitting: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(private registrationService: RegistrationService) {}

  get isFormValid(): boolean {
    return !!this.userName && 
           this.userAge !== null && 
           this.userAge > 0 && 
           this.userPassword.length >= 6 && 
           this.userPassword === this.userCheckPassword;
  }

  get passwordMismatch(): boolean {
    return this.userPassword !== this.userCheckPassword && 
           this.userCheckPassword.length > 0;
  }

  get isPasswordWeak(): boolean {
    return this.userPassword.length > 0 && this.userPassword.length < 6;
  }
  http = inject(HttpClient);
  addUser(): void {
    if (!this.isFormValid) {
      this.error = "Пожалуйста, заполните все поля корректно";
      return;
    }

    this.isSubmitting = true;
    this.error = "";

    try {
      const newUser = {
        id: Date.now(),
        name: this.userName,
        age: this.userAge,
        avatar: this.userAvatar,
        password: this.userPassword
      };

      this.registrationService.addUser(newUser);
      this.showSuccessMessage = true;
      
      setTimeout(() => {
        this.resetForm();
        this.isSubmitting = false;
      }, 2000);
      
    } catch (err) {
      this.error = "Произошла ошибка при регистрации";
      this.isSubmitting = false;
    }
  }

  private resetForm(): void {
    this.userName = "";
    this.userAge = null;
    this.userPassword = "";
    this.userCheckPassword = "";
    this.userAvatar = "https://avatars.mds.yandex.net/i?id=93932abfd430c7aab32a3d45806ea6e6d4d0523a-4944707-images-thumbs&n=13";
    this.showSuccessMessage = false;
  }

  onAvatarChange(): void {
    if (this.userAvatar && !this.userAvatar.startsWith('http')) {
      this.error = "Пожалуйста, введите корректный URL изображения";
    } else {
      this.error = "";
    }
  }

  authorization() {
    const user = {
      name: this.name,
      username: this.userName,
      age: this.userAge,
      email: this.userEmail,
      password: this.userPassword,
    };

    this.http
    .post('http://localhost:5000/auth/registration', user)
    .subscribe({
      next: (res: any) => {
        if (res === 'Регистрация прошла успешно') {
          this.showSuccessMessage = true;
          setTimeout(() => this.resetForm(), 2000);
        } else {
          this.error = 'Не удалось зарегистрировать пользователя';
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Ошибка регистрации';
        console.error('HTTP error:', err);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

}