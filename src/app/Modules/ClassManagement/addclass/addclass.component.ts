import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Ensure SweetAlert2 is imported
import { map, Observable, of, startWith } from 'rxjs';
import { MatAutocomplete } from '@angular/material/autocomplete';

import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
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
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatAutocompleteModule
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
        selectedSection: { grade_level: number; strand: string } | null = null;

        myControl = new FormControl();
        filteredOptions!: Observable<Teacher[]>;

        constructor(private fb: FormBuilder, private classService: ConnectService,private router: Router) {
            this.classManagementForm = this.fb.group({
                section: ['', Validators.required],
                room: ['', Validators.required],
                semester: ['', Validators.nullValidator],
                forms: this.fb.array([]), // Assuming this is set up correctly
            });
        }

        ngOnInit(): void {
            this.fetchSections(); 
            this.fetchTeachers(); 
            this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : `${value.lname}, ${value.fname}`),
                map(name => this._filter(name))
            );
        }
        private _filter(name: string): Teacher[] {
            const filterValue = name.toLowerCase();
            return this.teachers.filter(option =>
                `${option.lname}, ${option.fname}`.toLowerCase().includes(filterValue)
            );
        }
        displayFn(teacher: Teacher): string {
            return teacher ? `${teacher.lname}, ${teacher.fname}` : '';
        }
        onOptionSelected(selectedValue: Teacher) {
            // Create a display value using first and last name
            const displayValue = `${selectedValue.lname}, ${selectedValue.fname}`;
            
            // Find the current form group to update
            const currentFormGroup = this.forms.at(0); // Adjust index based on your logic if necessary
            currentFormGroup.patchValue({
                teacher: displayValue, // Set display name here
                admin_id: selectedValue.admin_id // Store admin_id for submission
            });
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
            const selectedSection = this.sections.find(
                section => section.section_id === sectionId
            );
        
            if (selectedSection) {
                this.selectedSection = {
                    grade_level: +selectedSection.grade_level, // Convert to number
                    strand: selectedSection.strand,
                };
                this.fetchSubjects(
                    selectedSection.grade_level,
                    selectedSection.strand
                );
            } else {
                this.selectedSection = null; // Reset if no section is found
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
            console.log('Adding Form Group:', formGroup.value, 'Is Valid:', formGroup.valid); // Log validity
            this.forms.push(formGroup);
        });
    
        console.log('Forms Array:', this.forms.controls); // Debug log
    }

    createFormGroup(subject: Subject): FormGroup {
        return this.fb.group({
            teacher: ['', Validators.required], // This will hold the display name
            admin_id: [null, Validators.required], // This will hold the admin_id
            subject_id: [subject.subject_id, Validators.required],
            subject: [subject.subject_name, Validators.required],
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
                    room: this.classManagementForm.value.room,
                    semester: this.classManagementForm.value.semester || null,
                    forms: this.classManagementForm.value.forms.map((formGroup: any) => ({
                        teacher: formGroup.admin_id, // Send admin_id instead of display name
                        subject_id: formGroup.subject_id,
                        time: formGroup.time,
                        selectedDays: formGroup.selectedDays,
                    })),
                };
        
                console.log('Submitting Form Values:', formValues);
        
                this.classService.createClass(formValues).subscribe(
                    (response) => {
                        console.log('Form submission successful:', response);
                        Swal.fire({
                            title: "Success!",
                            text: "Class added successfully.",
                            icon: "success"
                        });
                        this.router.navigate(['/main-page/classmanagement/classlist']);
                    },
                    (error) => {
                        console.error('Error submitting form:', error);
                    }
                );
            } else {
                console.log('Form is invalid. Please check the input fields.');
            }
        }
    }