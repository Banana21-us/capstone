import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ConnectService } from '../../../connect.service'
import { AddsubjectdialogComponent } from '../addsubjectdialog/addsubjectdialog.component'
import { MatDialog } from '@angular/material/dialog'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field'
import Swal from 'sweetalert2'
interface Subject {
  name: string
  image: File | Blob | string | null
}
@Component({
  selector: 'app-addsubject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatError],
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.css']
})
export class AddsubjectComponent implements OnInit {
  isStrandVisible: boolean = false
  subjectsList: Array<{ name: string; image: File | Blob | string | null }> = []

  subjectManagementForm = new FormGroup({
    subject_name: new FormControl(''),
    grade_level: new FormControl(''),
    strand: new FormControl(''),
    section_name: new FormControl('')
  })

  constructor (
    private dialog: MatDialog,
    private subservice: ConnectService,
    private router: Router
  ) {}

  ngOnInit (): void {
    console.log('subjectsList', this.subjectsList)
  }

  onGradeChange (): void {
    const selectedGrade = this.subjectManagementForm.get('grade_level')?.value
    this.isStrandVisible = selectedGrade === '11' || selectedGrade === '12'
    if (!this.isStrandVisible) {
      this.subjectManagementForm.get('strand')?.setValue('-')
    }
  }

  submitsubjects(): void {
    if (this.subjectsList.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'No subjects to submit'
        });
        return;
    }

    const formData = new FormData();
    let hasInvalidImage = false; // Flag to track invalid images

    // Append each subject and its image
    this.subjectsList.forEach(subject => {
        formData.append('subject_name[]', subject.name);

        // Check if subject.image exists and is an array
        if (
            subject.image &&
            Array.isArray(subject.image) &&
            subject.image.length > 0
        ) {
            const imageFile = subject.image[0].image; // Access the file from the array

            if (this.isFile(imageFile)) {
                formData.append('image[]', imageFile, imageFile.name);
            } else if (this.isBlob(imageFile)) {
                formData.append('image[]', imageFile);
            } else {
                console.error('Invalid image type:', imageFile);
                hasInvalidImage = true; // Set flag to true if invalid type
            }
        } else {
            console.warn('No valid image found for subject:', subject.name);
            hasInvalidImage = true; // Set flag to true if no valid image
        }
    });

    // Stop submission if any invalid images were found
    if (hasInvalidImage) {
        Swal.fire({
            icon: 'error',
            title: 'Submission Error',
            text: 'All subjects must have valid images.'
        });
        return; // Exit the function early
    }

    // Append additional required fields with checks
    const gradeLevel = this.subjectManagementForm.get('grade_level')?.value;
    const strand = this.subjectManagementForm.get('strand')?.value;

    if (gradeLevel !== undefined && gradeLevel !== null) {
        formData.append('grade_level', gradeLevel);
    }

    if (strand !== undefined && strand !== null) {
        formData.append('strand', strand);
    }

    // Send the FormData object to the backend
    this.subservice.postsubject(formData).subscribe(
        result => {
            console.log('Subjects submitted successfully:', result);
            this.subjectManagementForm.reset();
            this.subjectsList = [];
            Swal.fire({
                title: 'Success!',
                text: 'Subjects created successfully!',
                icon: 'success'
            });
            this.navigateToMainPage();
        },
        error => {
            console.error('Error submitting subjects:', error);
            if (error.status === 422) {
                console.error('Validation errors:', error.error.errors);
                Swal.fire({
                    icon: 'error',
                    title: 'Validation Error',
                    text: JSON.stringify(error.error.errors)
                });
            }
        }
    );
}

  navigateToMainPage (): void {
    this.router.navigate(['/main-page/subjectmanagement/subjectlist'])
  }

  openDialog (): void {
    const dialogRef = this.dialog.open(AddsubjectdialogComponent, {
      width: 'auto',
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Subject added:', result)
        this.subjectsList.push(result)
      }
    })
  }

  removeSubject (index: number): void {
    this.subjectsList.splice(index, 1)
  }

  private isFile (image: any): image is File {
    return image instanceof File
  }

  private isBlob (image: any): image is Blob {
    return image instanceof Blob
  }
}

// submitsubjects(): void {
//   if (this.subjectsList.length === 0) {
//     Swal.fire({
//       icon: "error",
//       title: "Something went wrong!",
//       text: "No subjects to submit",
//     });
//     return;
//   }

//   const formData = {
//     ...this.subjectManagementForm.value,
//     subject_name: this.subjectsList,
//     section: this.subjectManagementForm.get('section_name')?.value,
//   };

//   if (!formData.grade_level || !formData.strand || formData.subject_name.length === 0) {
//     Swal.fire({
//       icon: "error",
//       title: "Something went wrong!",
//       text: "No grade level to submit",
//     });
//     console.error('Form is invalid:', formData);
//     return;
//   }

//   this.subservice.postsubject(formData).subscribe(
//     (result) => {
//       console.log('Subjects submitted successfully:', result);
//       this.subjectManagementForm.reset();
//       this.subjectsList = [];
//       Swal.fire({
//         title: "Success!",
//         text: "Subjects created successfully!",
//         icon: "success",
//       });
//       this.navigateToMainPage();
//     },
//     (error) => {
//       console.error('Error submitting subjects:', error);
//     }
//   );
// }
