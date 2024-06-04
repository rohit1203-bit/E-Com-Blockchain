function convertToBase64(buffer, mimetype) {
  return new Promise((resolve, reject) => {
    const base64 = `data:${mimetype};base64,${buffer.toString("base64")}`;
    resolve(base64);
  });
}

module.exports = { convertToBase64 }