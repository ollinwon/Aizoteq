// // cropImage.js
// import { createImage } from 'image-crop-library';

// export const generateCroppedImg = async (imageSrc, crop) => {
//     const image = await createImage(imageSrc);
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     canvas.width = crop.width;
//     canvas.height = crop.height;

//     ctx.drawImage(
//         image,
//         crop.x,
//         crop.y,
//         crop.width,
//         crop.height,
//         0,
//         0,
//         crop.width,
//         crop.height
//     );

//     return new Promise((resolve, reject) => {
//         canvas.toBlob((blob) => {
//             if (!blob) {
//                 reject(new Error('Canvas is empty'));
//                 return;
//             }
//             resolve(blob);
//         }, 'image/jpeg');
//     });
// };
