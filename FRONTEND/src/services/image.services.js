class FileService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

 getFileUrl(filePath) {
  if (!filePath) return null;

  const normalizedPath =
    filePath
      .replaceAll("\\", "/")
      .replace(
        "../STROAGE_BACKUP/UPLOADS",
        "/uploads"
      );

  return `${this.baseUrl}${normalizedPath}`;
}

  getImageUrl(filePath) {
    return this.getFileUrl(filePath);
  }
}

export default new FileService();