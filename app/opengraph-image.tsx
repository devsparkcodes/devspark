import { ImageResponse } from "next/og";

export const alt = "DevSpark — Building AI Solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#f7f6f2",
          color: "#111111",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#f58220",
          }}
        />

        {/* Top brand header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#111111",
              display: "flex",
              alignItems: "center",
            }}
          >
            devspark
          </div>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#f58220",
            }}
          />
          <div
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#666666",
            }}
          >
            Building AI Solutions
          </div>
        </div>

        {/* Center main message */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#111111",
            }}
          >
            Intelligent systems for real-world problems.
          </div>
          <div
            style={{
              fontSize: "24px",
              lineHeight: 1.5,
              color: "#666666",
              maxWidth: "850px",
            }}
          >
            AI-powered solutions, workflow automation, custom software, and practical Generative AI engineering education.
          </div>
        </div>

        {/* Bottom footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #ddd9d0",
            paddingTop: "24px",
            width: "100%",
            fontSize: "18px",
            color: "#6e6e6e",
          }}
        >
          <div>devspark.codes</div>
          <div>Level 01 · Cohort 01</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
