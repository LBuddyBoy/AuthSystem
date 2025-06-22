// utility to turn the cropped area into a dataURL

export async function useCrop(imageSrc, pixelCrop) {
    const image = await new Promise((res, rej) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => res(img);
      img.onerror = (e) => rej(e);
    });
  
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
  
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    return canvas.toDataURL('image/png');
  }
  