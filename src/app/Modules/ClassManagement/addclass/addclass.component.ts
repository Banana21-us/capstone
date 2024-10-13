import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

export interface Subject {
    subject_id: number | null; 
    subject_name: string;
    grade_level: number;
    strand: string;
}

export interface Section {
    level: number; // The grade level
    strand: string; // The strand, e.g., "-"
    sections: { section_id: string; section_name: string }[]; // An array of section objects
}

export interface Teacher {
    admin_id: number;
    fname: string;
    lname: string;
    role: string;
}

@Component({
    selector: 'app-addclass',
    standalone: true,
    imports:[
        RouterLink,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './addclass.component.html',
    styleUrls: ['./addclass.component.css'],
})
export class AddclassComponent implements OnInit {
    classManagementForm: FormGroup;
    sections: { section_id: string; section_name: string; grade_level: number; strand: string }[] = [];
    subjects: Subject[] = []; 
    teachers: Teacher[] = []; 
    sectionIdMap: { [key: string]: string } = {}; 

    constructor(private fb: FormBuilder, private classService: ConnectService) {
        this.classManagementForm = this.fb.group({
            section: ['', Validators.required],
            room: ['', Validators.required],
            
            forms: this.fb.array([]) // Assuming this is set up correctly
        });
    }

    ngOnInit(): void {
        this.fetchSections(); 
        this.fetchTeachers(); 
    }

    fetchSections() {
        this.classService.getsectioncclass().subscribe(
            (data: Section[]) => {
                this.sections = []; 
                this.sectionIdMap = {}; 

                data.forEach(item => {
                    const gradeLevel = item.level; 
                    const strand = item.strand; 

                    item.sections.forEach(section => {
                        this.sections.push({
                            section_id: section.section_id,
                            section_name: section.section_name,
                            grade_level: gradeLevel,
                            strand: strand,
                        });

                        this.sectionIdMap[section.section_name] = section.section_id;
                    });
                });
            },
            (error) => {
                console.error('Error fetching sections:', error);
            }
        );
    }

    fetchTeachers() {
        this.classService.getTeachers().subscribe(
            (data: Teacher[]) => {
                this.teachers = data.filter(teacher => teacher.role === 'Teacher');
            },
            (error) => {
                console.error('Error fetching teachers:', error); 
            }
        );
    }

    onSectionChange(sectionId: string) {
        const selectedSection = this.sections.find(section => section.section_id === sectionId);
        
        if (selectedSection) {
            this.fetchSubjects(selectedSection.grade_level, selectedSection.strand);
        }
    }
    
    fetchSubjects(gradeLevel: number, strand: string) {
      console.log(`Fetching subjects for Grade Level: ${gradeLevel}, Strand: ${strand}`); // Log the parameters
  
      this.classService.getclasssubjects().subscribe(
          (allSubjects: any[]) => { 
              console.log('Fetched subjects from service:', allSubjects); // Log the fetched subjects
  
              this.subjects = [];
              allSubjects.forEach(item => {
                  console.log('Processing item:', item); // Log each item being processed
  
                  if (item.level === gradeLevel && item.strand === strand) {
                      console.log(`Item matches - Level: ${item.level}, Strand: ${item.strand}`); // Log matching items
  
                      item.subjects.forEach((subject: Subject) => { 
                          console.log(`Adding subject - ID: ${subject.subject_id}, Name: ${subject.subject_name}`); // Log each subject added
                          this.subjects.push({
                              subject_id: subject.subject_id,
                              subject_name: subject.subject_name,
                              grade_level: item.level,
                              strand: item.strand,
                          });
                      });
                  } else {
                      console.log(`Item does not match - Level: ${item.level}, Strand: ${item.strand}`); // Log non-matching items
                  }
              });
  
              console.log('Final subjects array:', this.subjects); // Log the final subjects array
              this.updateFormArray(); 
          },
          (error) => {
              console.error('Error fetching subjects:', error); 
          }
      );
  }

  updateFormArray() {
    this.forms.clear();

    this.subjects.forEach((subject: Subject) => { 
        const formGroup = this.createFormGroup(subject);
        console.log('Adding Form Group:', formGroup.value); // Debug log
        this.forms.push(formGroup);
    });

    console.log('Forms Array:', this.forms.controls); // Debug log
}

createFormGroup(subject: Subject): FormGroup {
  return this.fb.group({
      teacher: ['', Validators.required],
      subject_id: [subject.subject_id, Validators.required],
      subject: [subject.subject_name, Validators.required], // Ensure this line is present
      time: ['', Validators.required],
      selectedDays: [[], Validators.required],
  });
}

    get forms(): FormArray {
        return this.classManagementForm.get('forms') as FormArray;
    }

    onSubmit() {
      if (this.classManagementForm.valid) {
          const formValues = {
              section_id: this.classManagementForm.value.section,
              room: parseInt(this.classManagementForm.value.room, 10),
              forms: this.classManagementForm.value.forms.map((formGroup: any) => ({
                  teacher: formGroup.teacher,
                  subject_id: formGroup.subject_id, // Ensure matches backend expectations
                  time: formGroup.time,
                  selectedDays: formGroup.selectedDays,
              })),
          };
  
          console.log('Submitting Form Values:', formValues);
  
          this.classService.createClass(formValues).subscribe(
              (response) => {
                  console.log('Form submission successful:', response);
                  this.classManagementForm.reset();
              },
              (error) => {
                  console.error('Error submitting form:', error);
                  alert('Failed to create classes. Please check your input.');
                  if (error.status === 422 && error.error && error.error.errors) {
                      console.log('Validation errors:', error.error.errors);
                  }
              }
          );
      } else {
          console.log('Form is invalid. Please check the input fields.');
      }
  }
}