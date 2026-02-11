import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { AboutData } from '@/features/about/models';

const ABOUT_DATA_URL = 'about/about-data.json';

@Injectable()
export class AboutDataService {
  private readonly http = inject(HttpClient);

  getData(): Observable<AboutData> {
    return this.http.get<AboutData>(ABOUT_DATA_URL);
  }
}
