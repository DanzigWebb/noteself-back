import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '@core/config';
import { UserDto, UserLoginDto, UserRegistrationDto } from '@models/user.interface';
import { Observable } from 'rxjs';
import { NoteSubjectDto } from '@models/subject.interface';
import { NoteDto } from '@models/note.interface';
import { USER_STORAGE, UserStorage } from '@shared/storages/user.storage';

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

  getNotes(): Observable<NoteDto[]> {
    const headers = this.createHeader();
    return this.http.get<NoteDto[]>(`${this.url}note`, {headers});
  }

  // Todo: перенести в AuthInterceptors
  createHeader(): HttpHeaders {
    const token = this.userStorage.getItem('accessToken');

    return new HttpHeaders()
      .append('Authorization', `Bearer ${token}`);
  }

  registration(dto: UserRegistrationDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.url}user`, dto);
  }
}
