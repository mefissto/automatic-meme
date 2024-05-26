import { Injectable } from '@angular/core';

import { environment } from '@environments/envronment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  get apiVersion(): string {
    return environment.version;
  }

  get apiBase(): string {
    return environment.apiBase;
  }

  getApiUrl(): string {
    return `${this.apiBase}${this.apiVersion}`;
  }
}
