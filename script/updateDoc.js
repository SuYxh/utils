const fs = require('fs');
const path = require('path');

// 定义要修改的文件夹路径
const folderPath = '/doc';

// 递归遍历文件夹
function processFiles(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      // 检查文件的状态
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        if (stats.isFile()) {
          // 是文件，进行内容修改
          processFile(filePath);
        } else if (stats.isDirectory()) {
          // 是文件夹，递归处理
          processFiles(filePath);
        }
      });
    });
  });
}

// 修改单个文件的内容
function processFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // 在这里对文件内容进行修改
    const modifiedData1 = data.replace('function', '');
    const modifiedData = modifiedData1.replace('declare ', '');

    // 将修改后的内容写入文件
    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`${filePath} 的内容已成功修改。`);
    });
  });
}

// 启动处理
processFiles(path.resolve() + folderPath);
