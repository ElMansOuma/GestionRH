export interface Collaborateur {
    id?: number; // Optionnel si votre backend utilise un ID
    nom: string;
    prenom: string;
    cin: string;
    dateNaissance: string;
    lieuNaissance: string;
    adresseDomicile: string;
    cnss: string;
    origine: string;
    niveauEtude: string;
    specialite: string;
    dateEntretien: string;
    dateEmbauche: string;
    description: string;
    pieceJustificativeCin?: File; // Fichier CIN
    pieceJustificativeDiplome?: File; // Fichier diplôme
    autresPieces?: FileList; // Autres fichiers
}