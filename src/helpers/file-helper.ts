import fs from 'fs';

interface RemoveAllArgs {
  base?: string;
  paths: (string | undefined)[];
}

class FileHelper {

  removeAll = ({ base = '', paths }: RemoveAllArgs): boolean => {
    try {
      paths.forEach((path) => {
        if (path) {
          fs.unlinkSync(base + path);
        }
      });
      return true;
    } catch (err) {
      console.error('Error while removing files:', err);
      return false;
    }
  };

}

export default new FileHelper
