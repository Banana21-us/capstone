import {CommonModule, JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-addclass',
  standalone: true,
  imports: [
    FormsModule,
    MatCheckboxModule,
    JsonPipe,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './addclass.component.html',
  styleUrl: './addclass.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AddclassComponent {

  classManagementForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.classManagementForm = this.fb.group({
      section: ['', Validators.required],
      room: ['', Validators.required],
      forms: this.fb.array([this.createFormGroup()]), // Initialize with one form group
    });
  }

  get forms(): FormArray {
    return this.classManagementForm.get('forms') as FormArray;
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      teacher: ['', Validators.required],
      subject: ['', Validators.required],
      time: ['', Validators.required],
      selectedDays: [[], Validators.required], // Initialize as an array for multiple selections
    });
  }

  addForm() {
    this.forms.push(this.createFormGroup()); // Add a new form group to the array
  }
  removeForm(index: number) {
    if (this.forms.length > 1) { // Prevent removal if only one form is present
      this.forms.removeAt(index); // Remove the form group at the specified index
    }
  }

  onSubmit() {
    if (this.classManagementForm.valid) {
      console.log(this.classManagementForm.value);
    }
  }

}
