import fs from 'fs';

interface RemoveAllArgs {
  base?: string;
  paths: (string | undefined)[];
}

class FileHelper {

  removeAll = ({ base = '', paths }: RemoveAllArgs): boolean => {
    paths.forEach((path) => {
      if (path) {
        fs.unlinkSync(base + path);
      }
    });
    return true;
  };

  
}

export default new FileHelper
