import { ImageResponse } from "next/server";
import { getPost } from "@/models/posts.model";
import { ogSize, getOgImageOptions } from "@/utils/opengraph";
import { Props } from "./page";

export const runtime = "edge";
export const size = ogSize;
export const contentType = "image/png";
export const revalidate = "force-cache";

export default async function Image(props: Props) {
  const post = await getPost(props.params.slug);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: 70,
          background:
            "linear-gradient(90deg, rgba(106,171,149,1) 0%, rgba(109,158,163,1) 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "white", fontSize: 72, marginBottom: "14" }}>
            {post.title}
          </div>
          <div style={{ display: "flex", color: "#006858", fontSize: 38 }}>
            {post.minutes} minute read
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 70,
            bottom: 70,
            fontSize: 40,
            color: "white",
          }}
        >
          danielgrant.co
        </div>
      </div>
    ),
    await getOgImageOptions()
  );
}
