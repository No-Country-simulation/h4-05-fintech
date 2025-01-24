type FileFormats = 'image/jpeg' | 'image/png' | 'image/gif';

export interface IFileRequirements {
  fieldName: string;
  fileSize: number;
  formats: FileFormats[];
  folder: string;
  error: string;
}
