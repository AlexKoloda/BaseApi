import fs = require('fs');

const base64Decode = (base64Image: string, file: string) => {
  const buff = Buffer.from(base64Image, 'base64');
  fs.writeFileSync(file, buff);
  console.log('User photo saved');
};
export default base64Decode;
