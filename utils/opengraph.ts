import { ImageResponseOptions } from "next/server";

export const ogSize = { width: 1200, height: 630 };

export async function getOgImageOptions(): Promise<ImageResponseOptions> {
  return {
    ...ogSize,
    fonts: [
      {
        name: "Roboto",
        data: await fetch(
          new URL("../data/assets/Roboto-Medium.ttf", import.meta.url)
        ).then((res) => res.arrayBuffer()),
        style: "normal",
        weight: 600,
      },
    ],
  };
}
