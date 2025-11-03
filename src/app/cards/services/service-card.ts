import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CardResponse } from '../models/card-response.interface';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Card } from '../models/card.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceCard {

  private http = inject(HttpClient);

   constructor() {
    this.getAllCards();
  }

  public getAllCards(): Observable<CardResponse[]> {
    return this.http.get<CardResponse[]>(`${environment.serverUrl}/cards`);
  }

  public createCard(card: Card): Observable<CardResponse> {
     return this.http.post<CardResponse>(`${environment.serverUrl}/cards`, card);
  }
  
}
