import * as tf from "@tensorflow/tfjs";
import Upscaler from "upscaler";

export const upscaler = new Upscaler({
    warmupSizes: [[128, 128]],
});

export const upscaleImage = async (src: string, callback: (progress: number) => void) => {
    await tf.nextFrame();
    const image = new Image();
    image.src = src;
    return upscaler.upscale(image, {
        output: 'base64',
        patchSize: 128,
        padding: 5,
        progress: (progress: number) => {
            callback(progress)
        }
    },
).then((upscaledImage: any) => {
        return upscaledImage;
    });
};
