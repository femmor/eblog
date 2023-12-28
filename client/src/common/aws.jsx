import axios from "axios";

const uploadImage = async (img) => {
  let imgUrl = null;

  await axios
    .get(`${import.meta.env.VITE_SERVER_DOMAIN}/post/image-upload-url`)
    .then(async ({ data: { uploadUrl } }) => {
      await axios({
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
        },
        url: uploadUrl,
        data: img,
      }).then(() => {
        imgUrl = uploadUrl.split("?")[0];
      });
    });

  return imgUrl;
};

export default uploadImage;
