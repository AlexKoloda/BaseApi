import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';



const base64Decode = async (base64Image: string, file: string) => {

  const data = new Uint8Array(Buffer.from(base64Image, 'base64'));
  writeFile(file, data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
}); 
};

export default base64Decode;





