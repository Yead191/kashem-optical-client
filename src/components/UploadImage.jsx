export const uploadToImgbb = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const key = import.meta.env.VITE_IMGBB_API;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    return data.data;
};
