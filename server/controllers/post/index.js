import { generateUploadUrl } from "../../helpers/aws.js";

/* 
    @title Image Upload Url
    @route GET /api/v1/post/image-upload-url
    @desc Gets the aws image upload url
    @access Public
*/
const getImageUploadUrl = async (req, res) => {
  await generateUploadUrl()
    .then((url) =>
      res.status(200).json({
        uploadUrl: url,
      })
    )
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({
        error: err.message,
      });
    });
};

export { getImageUploadUrl };
