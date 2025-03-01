import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collaborateur } from '../../../models/collaborateur.model';

@Component({
    selector: 'app-collaborateur-form',
    templateUrl: './collaborateur-form.component.html',
    styleUrls: ['./collaborateur-form.component.scss']
})
export class CollaborateurFormComponent {
    collaborateurForm: FormGroup;
    isEditing: boolean;

    // Options pour les menus déroulants
    niveauxEtude: string[] = ['Bac+5', 'Bac+2', 'Doctorat', 'Autres']; // Correction de l'option Bac+5 répétée
    specialites: string[] = ['Informatique', 'Gestion', 'Marketing', 'Ressources Humaines', 'Autres'];

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<CollaborateurFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { collaborateur: Collaborateur, isEditing: boolean }
    ) {
        this.isEditing = data.isEditing;
        // Initialisation du formulaire avec des valeurs par défaut si pas de collaborateur
        this.collaborateurForm = this.fb.group({
            nom: [data.collaborateur?.nom || '', Validators.required],
            prenom: [data.collaborateur?.prenom || '', Validators.required],
            cin: [data.collaborateur?.cin || '', Validators.required],
            dateNaissance: [data.collaborateur?.dateNaissance || '', Validators.required],
            lieuNaissance: [data.collaborateur?.lieuNaissance || '', Validators.required],
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
            this.onSubmit();
        } else {
            console.log('Formulaire invalide:', this.collaborateurForm.errors);
        }
    }

    // Envoi des données et fermeture de la boîte de dialogue
    onSubmit(): void {
        console.log('Données du formulaire:', this.collaborateurForm.value);
        this.dialogRef.close(this.collaborateurForm.value);
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
