export const ogSize = { width: 1200, height: 630 };

export async function getOgImageOptions() {
  return {
    ...ogSize,
    fonts: [
      {
        name: "Palatino",
        data: await fetch(
          new URL("../data/assets/Palatino.ttf", import.meta.url)
        ).then((res) => res.arrayBuffer()),
      },
    ],
  };
}
