export interface IStorageProvider {
  createPresignedUrlWithClient(name: string, type: string): Promise<string>;
  getObjectURL(name: string): Promise<string>;
  getObject(name: string): Promise<string | null>;
  deleteObject(name: string): Promise<boolean | null>;
  randomObjectKeyName(name: string): string;
} 
