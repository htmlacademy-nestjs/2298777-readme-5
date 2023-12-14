import { FileType } from './file-vault.enum';

export interface FileVault {
  id?: string;
  imageUri: string;
  type: FileType;
}
