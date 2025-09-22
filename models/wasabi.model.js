const { PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const wasabi = require("../services/wasabi");

const bucketName = "mariage-photobooth";

const wasabiModel = {
  // ============================================================================== //
  // Upload picture on wasabi & his datas //
  // ============================================================================== //
  uploadToWasabi: async (buffer, key, contentType = "image/jpeg") => {
    await wasabi.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );

    const signedUrl = await getSignedUrl(
      wasabi,
      new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
      { expiresIn: 3600 }
    );

    return {
      key,
      url: signedUrl,
    };
  },

  // ============================================================================== //
  // Delete picture with her key in the bucket //
  // ============================================================================== //
  deleteFromWasabi: async (key) => {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await wasabi.send(command);
  },

  // ============================================================================== //
  // Picture name formater //
  // ============================================================================== //
  getFormattedPictureName: async () => {
    const count = await countFilesInBucket();
    return `picture-${count}.jpg`;
  },

  // ============================================================================== //
  // Get the number of onjetcs in bucket and return it //
  // ============================================================================== //
  countFilesInBucket: async () => {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    const result = await wasabi.send(command);
    return result.Contents ? result.Contents.length : 0;
  },
};

const { countFilesInBucket } = wasabiModel;

module.exports = wasabiModel;
