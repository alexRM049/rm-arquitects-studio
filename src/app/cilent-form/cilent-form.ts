import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cilent-form',
  imports: [ReactiveFormsModule],
  templateUrl: './cilent-form.html',
  styleUrl: './cilent-form.css',
})
export class CilentForm {

  private fb = inject(FormBuilder);
  public clientForm!: FormGroup;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required]
  });
}
