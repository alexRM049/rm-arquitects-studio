import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css',
})
export class ClientForm {

  private fb = inject(FormBuilder);
  submitted = signal(false);
  submitting = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    number: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(15)]],
    message: ['', [Validators.required, Validators.minLength(10)]]

  });

  sendInquiry(){
    const templateParams = {
    client_name: this.form.value.name,
      client_email: this.form.value.email,
      client_phone: this.form.value.number,
      client_message: this.form.value.message
    };
    emailjs.send('service_5lowa5z','template_qxxm4ij',templateParams,'grHhI9I47wnIWdMeV')
    .then((response) => {
      console.log("Success! ", response.status,response.text);
      this.form.reset();
    })
    .catch((error) => {
      console.log("Failed...", error);
    })
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sendInquiry();

    this.submitting.set(true);

    // Simulate network request — replace with real API call later
    await new Promise(resolve => setTimeout(resolve, 1500));

    this.submitting.set(false);
    this.submitted.set(true);
    this.form.reset();
  }

  resetForm() {
    this.submitted.set(false);
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get message() { return this.form.get('message'); }
  get number() { return this.form.get('number'); }
}
