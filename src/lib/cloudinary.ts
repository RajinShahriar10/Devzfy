import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: string,
): Promise<string> {
  const result = await cloudinary.uploader.upload(file, {
    folder: "devzfy",
    resource_type: "auto",
  });
  return result.secure_url;
}

export async function deleteFromCloudinary(url: string): Promise<void> {
  const segments = url.split("/");
  const publicId = segments.slice(segments.indexOf("devzfy")).join("/").split(".")[0];
  await cloudinary.uploader.destroy(publicId);
}

export { cloudinary };
