export const UploadImage = async (file, id) => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch(`https://article-manager-api.onrender.com/profile/user/${id}/upload/`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
  
      if (response.status === 400) {
        return { success: false, message: data.message };
      } else {
        return { success: true, data };
      }
    } catch (error) {
      return { success: false, message: 'הקובץ לא תקין' };
    }
  };