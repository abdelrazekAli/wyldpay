import axios from "axios";

export const uploadImage = async (
  imageBlob: Blob | string,
  preset: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", imageBlob);
  formData.append("upload_preset", preset);

  const response = await axios.post(
    process.env.REACT_APP_CLOUDINARY_LINK!,
    formData
  );
  return response.data.url;
};
