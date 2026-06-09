import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const UPLOAD_PATH = process.env.UPLOAD_PATH || "../STROAGE_BACKUP/UPLOADS/";

export { PORT, UPLOAD_PATH };