import { v2 as cloudinary } from "cloudinary";

const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function hasSignature(
  bytes: Uint8Array,
  signature: number[],
  offset = 0
) {
  return signature.every(
    (byte, index) => bytes[offset + index] === byte
  );
}

function detectImageType(bytes: Uint8Array) {
  // PNG
  if (
    hasSignature(bytes, [
      0x89,
      0x50,
      0x4e,
      0x47,
      0x0d,
      0x0a,
      0x1a,
      0x0a,
    ])
  ) {
    return "image/png";
  }

  // JPEG
  if (hasSignature(bytes, [0xff, 0xd8, 0xff])) {
    return "image/jpeg";
  }

  // GIF
  if (
    hasSignature(bytes, [
      0x47,
      0x49,
      0x46,
      0x38,
      0x37,
      0x61,
    ]) ||
    hasSignature(bytes, [
      0x47,
      0x49,
      0x46,
      0x38,
      0x39,
      0x61,
    ])
  ) {
    return "image/gif";
  }

  // WEBP
  if (
    hasSignature(bytes, [0x52, 0x49, 0x46, 0x46]) &&
    hasSignature(bytes, [0x57, 0x45, 0x42, 0x50], 8)
  ) {
    return "image/webp";
  }

  // AVIF
  if (
    hasSignature(bytes, [0x66, 0x74, 0x79, 0x70], 4) &&
    (
      hasSignature(bytes, [0x61, 0x76, 0x69, 0x66], 8) ||
      hasSignature(bytes, [0x61, 0x76, 0x69, 0x73], 8)
    )
  ) {
    return "image/avif";
  }

  return null;
}

export const uploadImage = async (file: File) => {
  // Check that it is actually a File
  if (!(file instanceof File)) {
    throw new Error("Image file required");
  }

  // Check empty file
  if (file.size === 0) {
    throw new Error("Image file required");
  }

  // Check size
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Image file is too large");
  }

  // Check MIME type
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Unsupported image type");
  }

  // Check actual file signature
  const headerBytes = new Uint8Array(
    await file.slice(0, 12).arrayBuffer()
  );

  const detectedType = detectImageType(headerBytes);

  if (detectedType !== file.type) {
    throw new Error("Invalid image file");
  }

  // Convert File → Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Cloudinary
  const uploadResult = await new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "DevEvent",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(
            new Error("Cloudinary returned no upload result")
          );
        }

        resolve(result);
      }
    ).end(buffer);
  });

  return {
    secure_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  };
};