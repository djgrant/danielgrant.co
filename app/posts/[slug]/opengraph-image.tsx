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
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 70,
            paddingTop: 100,
            background: "white",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 26,
                fontFamily: "Roboto",
                marginBottom: 53,
                color: "#4E9086",
              }}
            >
              danielgrant.co/posts
            </div>
            <div
              style={{
                color: "black",
                fontFamily: "Palatino",
                fontWeight: "semibold",
                fontSize: 76,
                marginBottom: 12,
              }}
            >
              {post.title}
            </div>
            <div
              style={{
                display: "flex",
                color: "#808080",
                fontSize: 28,
                fontFamily: "Roboto",
              }}
            >
              {post.minutes} minute read
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                width="90"
                height="90"
                src={`https://github.com/djgrant.png`}
                style={{ borderRadius: "50%", marginRight: 24 }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    fontSize: 24,
                    fontFamily: "Roboto",
                    color: "#808080",
                    marginBottom: 6,
                  }}
                >
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    color: "#4E9086",
                    fontFamily: "Roboto",
                    fontWeight: "semibold",
                  }}
                >
                  twitter.com/djgrant_
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 20, background: "#4E9086" }}></div>
      </div>
    ),
    await getOgImageOptions()
  );
}
