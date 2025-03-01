import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collaborateur } from '../../../models/collaborateur.model';
import {CollaborateurService} from "../../../src/app/shared/services/collaborateur.service";

@Component({
    selector: 'app-collaborateur-form',
    templateUrl: './collaborateur-form.component.html',
    styleUrls: ['./collaborateur-form.component.scss']
})
export class CollaborateurFormComponent {
    collaborateurForm: FormGroup;
    isEditing: boolean;

    // Options pour les menus déroulants
    niveauxEtude: string[] = ['Bac+5', 'Bac+2', 'Doctorat', 'Autres'];
    specialites: string[] = ['Informatique', 'Gestion', 'Marketing', 'Ressources Humaines', 'Autres'];

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<CollaborateurFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { collaborateur: Collaborateur, isEditing: boolean },
        private collaborateurService: CollaborateurService
    ) {
        this.isEditing = data.isEditing;
        // Initialisation du formulaire avec des valeurs par défaut si pas de collaborateur
        this.collaborateurForm = this.fb.group({
            nom: [data.collaborateur?.nom || '', Validators.required],
            prenom: [data.collaborateur?.prenom || '', Validators.required],
            cin: [data.collaborateur?.cin || '', Validators.required],
            dateNaissance: [data.collaborateur?.dateNaissance || '', Validators.required],
            lieuNaissance: [data.collaborateur?.lieuNaissance || '', Validators.required],
            // Ajout des champs manquants pour correspondre au modèle
            adresseDomicile: [data.collaborateur?.adresseDomicile || ''],
            cnss: [data.collaborateur?.cnss || ''],
            origine: [data.collaborateur?.origine || ''],
            niveauEtude: [data.collaborateur?.niveauEtude || '', Validators.required],
            specialite: [data.collaborateur?.specialite || '', Validators.required],
            dateEntretien: [data.collaborateur?.dateEntretien || '', Validators.required],
            dateEmbauche: [data.collaborateur?.dateEmbauche || '', Validators.required],
            description: [data.collaborateur?.description || '']
        });
    }

    // Soumission du formulaire
    submitForm(): void {
        if (this.collaborateurForm.valid) {
            const collaborateurData: Collaborateur = this.collaborateurForm.value;
            if (this.isEditing && this.data.collaborateur?.id) {
                this.collaborateurService.updateCollaborateur(this.data.collaborateur.id.toString(), collaborateurData)
                    .subscribe({
                        next: (response) => {
                            console.log('Collaborateur mis à jour avec succès:', response);
                            this.dialogRef.close(response);
                        },
                        error: (error) => {
                            console.error('Erreur lors de la mise à jour:', error);
                        }
                    });
            } else {
                this.collaborateurService.addCollaborateur(collaborateurData)
                    .subscribe({
                        next: (response) => {
                            console.log('Collaborateur ajouté avec succès:', response);
                            this.dialogRef.close(response);
                        },
                        error: (error) => {
                            console.error('Erreur lors de l\'ajout:', error);
                        }
                    });
            }
        } else {
            // Marquer tous les champs comme touchés pour afficher les erreurs de validation
            this.markFormGroupTouched(this.collaborateurForm);
            console.log('Formulaire invalide:', this.collaborateurForm.errors);
        }
    }

    // Utilitaire pour marquer tous les champs comme touchés
    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}