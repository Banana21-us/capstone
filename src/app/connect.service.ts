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


  // basics
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
  getInquiries(){
    return this.http.get(this.url + 'getInquiries')
  }
  getdashStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'allstudents'); // Fetch data from the API
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
    return this.http.get<Teacher[]>(`${this.url}getAdminsteacher?role=Teacher`); 
  }
  deleteClass(classId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}classes/${classId}`);
  }
  createClass(classData: any): Observable<any> {
    return this.http.post(`${this.url}storeClass`, classData);
  }
  updateClass(classData: any): Observable<any> {
    return this.http.put(`${this.url}classes/${classData.class_id}`, classData);
  }
  


  // Subjects section
  postsubject(subjectData:any):Observable<any>{
    return this.http.post<any>(this.url + 'postsubjects',subjectData)
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
    return this.http.get<any[]>(this.url + 'getAdminsteacher'); 
  }
  deleteteacher(admin_id: number): Observable<any> {
    return this.http.delete(`${this.url}admins/${admin_id}`);
  }
  updateAdmin(admin: any): Observable<any> {
    return this.http.put(`${this.url}admins/${admin.admin_id}`, admin);
  }
 

  
  // announcement 
  getannouncement(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'announcements'); 
  }
  submitannouncement(announcementData:any):Observable<any>{
    return this.http.post<any>(this.url + 'postAnnouncements',announcementData)
  }
  getupdateannouncement(ancmnt_id: number): Observable<any> {
    return this.http.get<any>(`${this.url}announcements/${ancmnt_id}`); // Adjust the endpoint as necessary
  }
  updateannouncement(ancmnt_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}updateAnnouncements/${ancmnt_id}`, data);
  }
  deleteAnnouncement(ancmnt_id: number): Observable<any> {
    return this.http.delete(`${this.url}destroyannouncements/${ancmnt_id}`);
  }



  // section section
  postsection(sectionData:any):Observable<any>{
    return this.http.post<any>(this.url + 'postsections',sectionData)
  }
  getsection(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'sections'); 
  }
  updateSectionsByGrade(gradeLevel: number, strand: string, sectionData: any): Observable<any> {
    return this.http.put(`${this.url}sections/${gradeLevel}/${strand}`, sectionData);
  }
  deleteSectionsByGrade(gradeLevel: number, strand: string): Observable<any> {
    return this.http.delete(`${this.url}sections/${gradeLevel}/${strand}`); 
  }
  removeSection(id: number): Observable<any> {
    return this.http.delete(`${this.url}section/removesection/${id}`);
  }
  

  
  // parent section
  getparent(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'parentguardian'); 
  }
  getStudentByLRN(lrn: string): Observable<any> {
    return this.http.get<any>(`${this.url}student/${lrn}`); 
  } //add to create
  submitparent(parentData:any):Observable<any>{
    return this.http.post<any>(this.url + 'postparentguardian',parentData)
  } 
  getAllStudents(): Observable<any[]> { 
    return this.http.get<any[]>(this.url + 'student');
  }//add to update
  updateParentGuardian(email: string, lrn: string[]): Observable<any> {
    const payload = { LRN: lrn }; // Wrap LRN in an object
    return this.http.patch(`${this.url}parentguardian/${email}`, payload);
  }
  removelrn(email: string, lrn: number): Observable<any> {
    return this.http.delete(`${this.url}parentguardian/${email}/remove`, {
      params: { LRN: lrn.toString() } // Send LRN as a query parameter
    });
  }
  deleteParent(email: string): Observable<void> {
    return this.http.delete<void>(`${this.url}parentguardian/${email}`);
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



  // message
  getMessages(uid: any){
    return this.http.get(this.url + 'getMessages', {params: {uid: uid}});
  }
  getConvo(sid: any, uid: any){
    return this.http.get(this.url + 'getConvo/' + sid , {params: {uid: uid}});
  }
  sendMessage(mdata: any){
    return this.http.post(this.url + 'sendMessage', mdata );
  }
  getRecipients(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'getrecepeints');
  }
  composeMessage(messageData: any): Observable<any> {
    return this.http.post(this.url + 'composemessage', messageData);
  }
  getStudentParents(){
    return this.http.get(this.url + 'getStudentParents');
  }
  
}
