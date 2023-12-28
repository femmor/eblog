import { generateUploadUrl } from "../../helpers/aws.js";

/* 
    @title Image Upload Url
    @route GET /api/post/image-upload-url
    @desc Gets the aws image upload url
    @access Public
*/
const getImageUploadUrl = (req, res) => {
  generateUploadUrl()
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
