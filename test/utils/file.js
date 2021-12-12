const fs = require('fs');
const path = require('path');

/**
 * Get files with relative paths.
 * @param {string} dir
 * @param {boolean} returnAbsolutePath If is false then return relative paths by dir.
 * @return {[]}
 */
export const readDirRecursiveSync = function (dir = './', returnAbsolutePath = true) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  dir = path.resolve(dir);

  // get files within the current directory and add a path key to the file objects
  const files = entries.filter((file) => !file.isDirectory()).map((file) => path.join(dir, file.name));
  // get folders within the current directory
  const folders = entries.filter((folder) => folder.isDirectory());

  for (const folder of folders) {
    files.push(...readDirRecursiveSync(path.join(dir, folder.name)));
  }

  return returnAbsolutePath ? files : files.map((file) => file.replace(path.join(dir, '/'), ''));
};