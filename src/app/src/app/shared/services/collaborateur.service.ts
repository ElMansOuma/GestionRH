import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Collaborateur } from '../../../../models/collaborateur.model';

@Injectable({
  providedIn: 'root',
})
export class CollaborateurService {
  private apiUrl = 'http://localhost:8080/api/collaborateurs'; // URL du backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les collaborateurs
  getCollaborateurs(): Observable<Collaborateur[]> {
    return this.http.get<Collaborateur[]>(this.apiUrl).pipe(
        catchError(this.handleError)
    );
  }

  // Ajouter un collaborateur (sans fichiers)
  addCollaborateur(collaborateur: Collaborateur): Observable<Collaborateur> {
    return this.http.post<Collaborateur>(this.apiUrl, collaborateur).pipe(
        catchError(this.handleError)
    );
  }


  // Mettre à jour un collaborateur
  updateCollaborateur(id: string, collaborateur: Collaborateur): Observable<Collaborateur> {
    return this.http.put<Collaborateur>(`${this.apiUrl}/${id}`, collaborateur).pipe(
        catchError(this.handleError)
    );

  }

  // Supprimer un collaborateur
  deleteCollaborateur(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
    );
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}