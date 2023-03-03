import { diskStorage } from 'multer';
import { parse } from 'path';

// export const multerConfig = {
//   storage: diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, 'public/images');
//     },
//     filename: (req, file, callback) => {
//       const name = file.originalname.split('.')[0];
//       const fileExtName = extname(file.originalname);
//       const randomName = Array(4)
//         .fill(null)
//         .map(() => Math.round(Math.random() * 16).toString(16))
//         .join('');
//       callback(null, `${name}-${randomName}${fileExtName}`);
//     },
//   }),
// };

export const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    const extensionFile = parse(file.originalname).ext;
    cb(null, file.fieldname + '_' + uniqueSuffix + extensionFile);
  },
});
