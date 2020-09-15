import fs from 'fs'

export const imageUpload = (filePath: string, targetPath: string) => {
    return new Promise((resolve, reject) => {
        const reader = fs.createReadStream(filePath, { highWaterMark: 14 });
        // 创建可写流
        const upStream = fs.createWriteStream(targetPath, { highWaterMark: 14 });

        reader.on('error', function (error) {
            console.log(error);
            reject()
        });

        upStream.on('finish', function () {
            console.log('文件上传完毕');
            resolve()
        });
        reader.pipe(upStream);
    })
}