import multer from "multer";
import { Storage } from "@google-cloud/storage";

const upload = multer({
  dest: "uploads/",
  // storage: multer.memoryStorage(),
  // limits: {
  //   fileSize: 5 * 2048 * 2048
  // }
});

// const bucketName = "gs://dublincommunity-55071.appspot.com";

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const { file } = req;
  // storage.bucket(bucketName).upload(file.filename, {
  //   gzip: true,
  //   metadata: {
  //     cacheControl: "public, max-age=31536000"
  //   }
  // });
  console.log(req.file);
  res.json(file);
};
