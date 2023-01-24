const onnx = require("onnxjs");
const fs = require("fs");

async function preprocess_image(image_path) {
  const model = await onnx.load("path/to/model.onnx");
  const image = onnx.Tensor.fromImageFile(image_path);
  const output = await model.predict(image);
  return output;
}

function save_image(image, filename) {
  if (!(image instanceof onnx.Tensor)) {
    throw new Error("image must be an ONNX Tensor");
  }
  const data = image.data;
  fs.writeFileSync(`${filename}.jpg`, data);
  console.log(`Saved as ${filename}.jpg`);
}

export { preprocess_image, save_image };
