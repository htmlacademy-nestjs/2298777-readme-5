export interface FileVault {
  id?: string;
  originalName: string;
  size: number;
  mimetype: string;
  hashName: string;
  directory: string;
  path: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StoredFile {
  fileName: string;
  fileExtension: string;
  directory: string;
  path: string;
}
