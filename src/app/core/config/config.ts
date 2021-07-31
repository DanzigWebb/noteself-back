import { InjectionToken } from "@angular/core";

export interface AppConfig {
  host: string
}

export const APP_CONFIG = new InjectionToken<AppConfig>('Config properties', {
  providedIn: 'root',
  factory: (): AppConfig => ({
    host: '/api/',
  }),
});
