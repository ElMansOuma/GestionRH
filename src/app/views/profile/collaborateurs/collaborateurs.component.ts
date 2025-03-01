import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Collaborateur } from '../../../models/collaborateur.model';
import { CollaborateurService } from '../../../src/app/shared/services/collaborateur.service';
import {CollaborateurFormComponent} from "../collaborateur-form/collaborateur-form.component";

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.scss']
})
export class CollaborateursComponent implements OnInit {
  collaborateurs: Collaborateur[] = [];

  constructor(
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
      private collaborateurService: CollaborateurService
  ) {}

  ngOnInit(): void {
    this.loadCollaborateurs();
  }

  loadCollaborateurs(): void {
    this.collaborateurService.getCollaborateurs().subscribe(
        (data) => (this.collaborateurs = data),
        (error) => {
          this.showError('Erreur lors du chargement des collaborateurs');
          console.error('Erreur :', error);
        }
    );
  }

    openDialog(collaborateur?: Collaborateur): void {
        const dialogRef = this.dialog.open(CollaborateurFormComponent, {
            width: '600px',
            data: { collaborateur: collaborateur || {}, isEditing: !!collaborateur }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (collaborateur && collaborateur.id !== undefined) {
                    // Ensure the ID is properly cast to the expected type (e.g., string or number)
                    const id = String(collaborateur.id); // Convert to string if required
                    this.collaborateurService.updateCollaborateur(id, result).subscribe(
                        () => {
                            this.showSuccess('Collaborateur mis à jour avec succès');
                            this.loadCollaborateurs();
                        },
                        (error) => {
                            this.showError('Erreur lors de la mise à jour du collaborateur');
                            console.error('Erreur :', error);
                        }
                    );
                } else {
                    this.collaborateurService.addCollaborateur(result).subscribe(
                        () => {
                            this.showSuccess('Collaborateur ajouté avec succès');
                            this.loadCollaborateurs();
                        },
                        (error) => {
                            this.showError('Erreur lors de l\'ajout du collaborateur');
                            console.error('Erreur :', error);
                        }
                    );
                }
            }
        });
    }
    deleteCollaborateur(id: number): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce collaborateur ?')) {
            // Ensure the ID is properly cast to the expected type (e.g., string or number)
            const formattedId = String(id); // Convert to string if required
            this.collaborateurService.deleteCollaborateur(formattedId).subscribe(
                () => {
                    this.showSuccess('Collaborateur supprimé avec succès');
                    this.loadCollaborateurs();
                },
                (error) => {
                    this.showError('Erreur lors de la suppression du collaborateur');
                    console.error('Erreur :', error);
                }
            );
        }
    }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000 });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3000, panelClass: ['error-snackbar'] });
  }
}