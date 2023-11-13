import { Request } from 'express';
import { join } from 'path';
import { mkdir } from 'fs';

export class MulterExcel {
  public static destination(
    // 參數設置
    request: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    // callback(null, join(__dirname, '../../upload/'));
    // 如果沒有資料夾能自動產生
    const uploadFolder = join(__dirname, '../../upload/excel/');
    mkdir(uploadFolder, { recursive: true }, (error) => {
      if (error) {
        callback(error, '');
      } else {
        callback(null, uploadFolder);
      }
    });
  }

  public static filenameHandler(
    request: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    // 處理中文亂碼問題
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    // const timestamp = new Date().toISOString();
    const { originalname } = file;
    // const extension = originalname.split('.').pop();
    // const filename = Date.now() + '.' + extension;
    // const fieldname = `${timestamp}-${originalname}`;
    const fieldname = `${originalname}`;
    callback(null, fieldname);
  }
}
