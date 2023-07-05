import { ImageResponse } from "next/server";

export const runtime = "edge";

export const alt = "Daniel Grant";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const getPalatino = () =>
  fetch(new URL("./Palatino.ttf", import.meta.url)).then((res) =>
    res.arrayBuffer()
  );

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Daniel Grant
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await getPalatino(),
        },
      ],
    }
  );
}
