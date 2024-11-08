import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Teacher } from './Modules/ClassManagement/addclass/addclass.component';



@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  constructor(private http: HttpClient) {}

  url = "http://localhost:8000/api/";
  token = localStorage.getItem('token');
  
  private adminPicSubject = new BehaviorSubject<string | null>(null); // This will store the admin image URL
  adminPic$ = this.adminPicSubject.asObservable();

  login(data:any){
    return this.http.post(this.url + 'login',data);
  }

  logout(): Observable<any> {
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'logout', {}, { headers });
  }
  // dashboard
  getdash(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'dashboard');
  }

  // classes section
  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'classes-list');
  }
  getclasssubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'class-subjects'); 
  }
  getsectioncclass(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'class/sections'); 
  }
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.url}admins?role=Teacher`); // Ensure this URL is correct
  }
  deleteClass(classId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}classes/${classId}`);
  }
  createClass(classData: any): Observable<any> {
    return this.http.post(`${this.url}classes`, classData);
  }
  updateClass(classData: any): Observable<any> {
    return this.http.put(`${this.url}classes/${classData.class_id}`, classData);
  }
  removeSection(id: number): Observable<any> {
    return this.http.delete(`${this.url}section/removesection/${id}`);
}

  // Subjects section
  postsubject(subjectData:any):Observable<any>{
    return this.http.post<any>(this.url + 'subjects',subjectData)
  }
  getsubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'subjects'); 
  }
  deleteSubjectByGrade(gradeLevel: number, strand: string): Observable<any> {
    return this.http.delete(`${this.url}subjects/${gradeLevel}/${strand}`); 
  }
  updateSubjectsByGrade(gradeLevel: number, strand: string, subjectData: any): Observable<any> {
    return this.http.put(`${this.url}subjects/${gradeLevel}/${strand}`, subjectData);
  }
  removesubject(id: number): Observable<any> {
    return this.http.delete(`${this.url}subject/removesubject/${id}`);
}
  
  

  // teacher section 
  postteacher(teacherData:any):Observable<any>{
    return this.http.post<any>(this.url + 'register',teacherData)
  }
  getteacher(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'admins'); 
  }
  deleteteacher(admin_id: number): Observable<any> {
    return this.http.delete(`${this.url}admins/${admin_id}`);
  }
  updateAdmin(admin: any): Observable<any> {
    return this.http.put(`${this.url}admins/${admin.admin_id}`, admin);
}

  // announcement section 
  submitannouncement(announcementData:any):Observable<any>{
    return this.http.post<any>(this.url + 'announcements',announcementData)
  }
  getannouncement(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'announcements'); 
  }
  getupdateannouncement(ancmnt_id: number): Observable<any> {
    return this.http.get<any>(`${this.url}announcements/${ancmnt_id}`); // Adjust the endpoint as necessary
  }
  updateannouncement(ancmnt_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}announcements/${ancmnt_id}`, data);
  }
  
  deleteAnnouncement(ancmnt_id: number): Observable<any> {
    return this.http.delete(`${this.url}announcements/${ancmnt_id}`);
  }

  // section section
  postsection(sectionData:any):Observable<any>{
    return this.http.post<any>(this.url + 'sections',sectionData)
  }
  getsection(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'sections'); 
  }
  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'subjects'); // Adjust endpoint as necessary
  }

  updateSectionsByGrade(gradeLevel: number, strand: string, sectionData: any): Observable<any> {
    return this.http.put(`${this.url}sections/${gradeLevel}/${strand}`, sectionData);
}
  deleteSectionsByGrade(gradeLevel: number, strand: string): Observable<any> {
    return this.http.delete(`${this.url}sections/${gradeLevel}/${strand}`); // No body sent here
}
  

  // parent section
  getparent(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'parentguardian'); 
  }
  deleteParent(email: string): Observable<void> {
    return this.http.delete<void>(`${this.url}parentguardian/${email}`);
  }
  getStudentByLRN(lrn: string): Observable<any> {
    return this.http.get<any>(`${this.url}student/${lrn}`); 
  }
  // getAllLRNs(): Observable<string[]> {  
  //   return this.http.get<string[]>(`${this.url}lrns`); 
  // }
  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'student');
  }
  submitparent(parentData:any):Observable<any>{
    return this.http.post<any>(this.url + 'parentguardian',parentData)
  }
  updateParentGuardian(email: string, lrn: string[]): Observable<any> {
    const payload = { LRN: lrn }; // Wrap LRN in an object
    return this.http.patch(`${this.url}parentguardian/${email}`, payload);
  }
  removelrn(email: string, lrn: number): Observable<any> {
    return this.http.delete(`${this.url}parentguardian/${email}/remove`, {
      params: { LRN: lrn.toString() } // Send LRN as a query parameter
    });
  }

  // account 
  update(adminId: number, oldPassword: string, newData: any): Observable<any> {
    return this.http.put(`${this.url}update-password`, {
      admin_id: adminId,
      oldPassword: oldPassword,
      ...newData
    });
  }
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8000/api/upload-image', formData);
  }
  updateAdminPic(newImageUrl: string) {
    this.adminPicSubject.next(newImageUrl); // Emit new image URL
  }
}
