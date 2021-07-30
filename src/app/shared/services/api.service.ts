import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig } from "@core/config";
import { UserDto, UserLoginDto } from "@models/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  get url(): string {
    return this.config.host;
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient,
  ) {
  }

  login(dto: UserLoginDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.url}auth/login`, dto);
  }
}
