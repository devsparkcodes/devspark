const steps = [
  { index: "01", title: "Problem", detail: "A real-world need, with context" },
  { index: "02", title: "Intelligence", detail: "Data, models and evaluation" },
  { index: "03", title: "Build", detail: "Automation and software" },
  { index: "04", title: "Outcome", detail: "Working software in people's hands" },
];

const NODE_WIDTH = 368;
const NODE_HEIGHT = 68;
const GAP = 44;
const START_Y = 8;

function nodeY(index: number) {
  return START_Y + index * (NODE_HEIGHT + GAP);
}

/**
 * The one purposeful visual concept for V1: a static, readable blueprint of how
 * a project moves from problem to working software, with a single animated
 * pulse travelling along the connectors (disabled under reduced motion).
 */
export function HeroBlueprint() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-card border border-accent/40 sm:translate-x-4 sm:translate-y-4"
      />
      <div className="relative rounded-card border border-hairline bg-surface p-5 shadow-panel sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <p className="label text-label text-secondary">Solution blueprint</p>
          <p className="flex items-center gap-2 text-body-sm text-secondary">
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            4 steps
          </p>
        </div>

        <svg
          viewBox={`0 0 400 ${nodeY(3) + NODE_HEIGHT + 22}`}
          role="img"
          aria-labelledby="blueprint-title blueprint-desc"
          className="mt-5 h-auto w-full"
        >
          <title id="blueprint-title">From problem to working software</title>
          <desc id="blueprint-desc">
            A four-step flow: a real-world problem becomes intelligence from data
            and models, is built into automation and software, and ends as
            working software in people&apos;s hands.
          </desc>

          <defs>
            <marker
              id="blueprint-arrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M0,0 L10,5 L0,10 z"
                style={{ fill: "var(--color-hairline)" }}
              />
            </marker>
          </defs>

          {steps.map((step, index) => {
            const y = nodeY(index);
            const isLast = index === steps.length - 1;
            const nextY = nodeY(index + 1);

            return (
              <g key={step.index}>
                {!isLast ? (
                  <>
                    <line
                      x1={200}
                      y1={y + NODE_HEIGHT + 4}
                      x2={200}
                      y2={nextY - 10}
                      strokeWidth="2"
                      markerEnd="url(#blueprint-arrow)"
                      style={{ stroke: "var(--color-hairline)" }}
                    />
                    <line
                      x1={200}
                      y1={y + NODE_HEIGHT + 4}
                      x2={200}
                      y2={nextY - 10}
                      strokeWidth="2"
                      className="flow-pulse"
                      style={{ stroke: "var(--color-accent)" }}
                    />
                  </>
                ) : null}

                <rect
                  x={16}
                  y={y}
                  width={NODE_WIDTH}
                  height={NODE_HEIGHT}
                  rx={10}
                  strokeWidth="1.5"
                  style={{
                    fill: "var(--color-background)",
                    stroke: "var(--color-hairline)",
                  }}
                />
                <rect
                  x={36}
                  y={y + 24}
                  width={20}
                  height={20}
                  rx={5}
                  style={{ fill: "var(--color-accent)" }}
                />
                <text
                  x={72}
                  y={y + 30}
                  fontSize="15"
                  fontWeight="600"
                  style={{
                    fill: "var(--color-text)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {step.title}
                </text>
                <text
                  x={72}
                  y={y + 50}
                  fontSize="11.5"
                  style={{
                    fill: "var(--color-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {step.detail}
                </text>
                <text
                  x={364}
                  y={y + 32}
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="end"
                  letterSpacing="0.12em"
                  style={{
                    fill: "var(--color-secondary)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {step.index}
                </text>
              </g>
            );
          })}
        </svg>

        <p className="mt-4 border-t border-border pt-4 text-body-sm text-secondary">
          One path, end to end: a real problem → software people use.
        </p>
      </div>
    </div>
  );
}
