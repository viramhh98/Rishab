class FileService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  getFileUrl(filePath) {
    if (!filePath) return null;

    return `${this.baseUrl}${filePath.replace(
      "../STROAGE_BACKUP/UPLOADS",
      "/uploads"
    )}`;
  }

  getImageUrl(filePath) {
    return this.getFileUrl(filePath);
  }
}

export default new FileService();