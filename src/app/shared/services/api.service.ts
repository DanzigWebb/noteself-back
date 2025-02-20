import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from "@core/config";
import { UserDto, UserLoginDto, UserRegistrationDto } from "@models/user.interface";
import { Observable } from "rxjs";
import { NoteSubjectCreateDto, NoteSubjectDto } from "@models/subject.interface";
import { CreatedNoteDto, NoteCreateDto, NoteDto, NoteUpdateDto } from "@models/note.interface";
import { USER_STORAGE, UserStorage } from "@shared/storages/user.storage";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  get url(): string {
    return this.config.host;
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    @Inject(USER_STORAGE) private userStorage: UserStorage,
    private http: HttpClient,
  ) {
  }

  login(dto: UserLoginDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.url}auth/login`, dto);
  }

  getSubjects(): Observable<NoteSubjectDto[]> {
    const headers = this.createHeader();
    return this.http.get<NoteSubjectDto[]>(`${this.url}subject`, {headers});
  }

  createSubject(dto: NoteSubjectCreateDto): Observable<NoteSubjectDto> {
    const headers = this.createHeader();
    return this.http.post<NoteSubjectDto>(`${this.url}subject`, {...dto}, {headers});
  }

  deleteSubject(id: number): Observable<object> {
    const headers = this.createHeader();
    return this.http.delete<NoteSubjectDto>(`${this.url}subject/${id}`, {headers});
  }

  getNotes(): Observable<NoteDto[]> {
    const headers = this.createHeader();
    return this.http.get<NoteDto[]>(`${this.url}note`, {headers});
  }

  createNote(dto: NoteCreateDto): Observable<CreatedNoteDto> {
    const headers = this.createHeader();
    return this.http.post<CreatedNoteDto>(`${this.url}note`, {...dto}, {headers});
  }

  deleteNote(id: number): Observable<object> {
    const headers = this.createHeader();
    return this.http.delete<NoteDto>(`${this.url}note/${id}`, {headers});
  }

  updateNote(dto: NoteUpdateDto, id: number): Observable<NoteDto> {
    const headers = this.createHeader();
    return this.http.put<NoteDto>(`${this.url}note/${id}`, {...dto}, {headers});
  }

  // Todo: перенести в AuthInterceptors
  private createHeader(): HttpHeaders {
    const token = this.userStorage.getItem('accessToken');

    return new HttpHeaders()
      .append('Authorization', `Bearer ${token}`);
  }

  registration(dto: UserRegistrationDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.url}user`, dto);
  }
}
