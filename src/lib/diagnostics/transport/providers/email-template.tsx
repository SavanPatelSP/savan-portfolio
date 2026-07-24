import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { DiagnosticsReport } from "../../types/report";
import { SEVERITY_LABELS, CATEGORY_LABELS } from "../../constants";

function severityColor(severity: string): string {
  switch (severity) {
    case "critical":
      return "#EF4444";
    case "transient":
      return "#F59E0B";
    case "recoverable":
      return "#10B981";
    default:
      return "#6B7280";
  }
}

function severityBg(severity: string): string {
  switch (severity) {
    case "critical":
      return "rgba(239,68,68,0.1)";
    case "transient":
      return "rgba(245,158,11,0.1)";
    case "recoverable":
      return "rgba(16,185,129,0.1)";
    default:
      return "rgba(107,114,128,0.1)";
  }
}

function fieldLabelStyle() {
  return {
    color: "rgba(255,255,255,0.4)",
    fontSize: "12px" as const,
    fontWeight: "500" as const,
    margin: "0 0 4px 0",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
  };
}

function fieldValueStyle() {
  return {
    color: "#ffffff",
    fontSize: "14px" as const,
    margin: "0",
    lineHeight: "1.4",
  };
}

function sectionCard(children: React.ReactNode, marginBottom = "20px") {
  return (
    <Section
      style={{
        backgroundColor: "#0E0E11",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "28px",
        marginBottom,
      }}
    >
      {children}
    </Section>
  );
}

function sectionTitle(text: string) {
  return (
    <Text
      style={{
        color: "#3B82F6",
        fontSize: "11px",
        fontWeight: "600",
        margin: "0 0 20px 0",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
      }}
    >
      {text}
    </Text>
  );
}

function fieldRow(label: string, value: string) {
  return (
    <Section style={{ marginBottom: "14px" }}>
      <Text style={fieldLabelStyle()}>{label}</Text>
      <Text style={fieldValueStyle()}>{value}</Text>
    </Section>
  );
}

function inlineFieldRow(
  fields: Array<{ label: string; value: string }>
) {
  return (
    <Section style={{ marginBottom: "0" }}>
      {fields.map((field, i) => (
        <Section
          key={i}
          style={{
            display: "inline-block",
            marginRight: i < fields.length - 1 ? "24px" : "0",
            marginBottom: "0",
            verticalAlign: "top",
          }}
        >
          <Text style={fieldLabelStyle()}>{field.label}</Text>
          <Text style={fieldValueStyle()}>{field.value}</Text>
        </Section>
      ))}
    </Section>
  );
}

function listItem(text: string) {
  return (
    <Section style={{ marginBottom: "6px" }}>
      <Text
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "14px",
          lineHeight: "1.5",
          margin: 0,
          paddingLeft: "12px",
        }}
      >
        {"\u2022"} {text}
      </Text>
    </Section>
  );
}

export interface DiagnosticsEmailProps {
  report: DiagnosticsReport;
}

export default function DiagnosticsEmail({ report }: DiagnosticsEmailProps) {
  const severityLabel =
    SEVERITY_LABELS[report.classification.severity] ||
    report.classification.severity;
  const categoryLabel =
    CATEGORY_LABELS[report.classification.category] ||
    report.classification.category;

  return (
    <Html>
      <Head />
      <Preview>
        {report.classification.label} — {report.errorId}
      </Preview>
      <Body
        style={{
          backgroundColor: "#050505",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            backgroundColor: "#050505",
            margin: "0 auto",
            padding: "40px 20px",
            maxWidth: "600px",
          }}
        >
          {/* Header */}
          {sectionCard(
            <>
              <Heading
                style={{
                  color: "#ffffff",
                  fontSize: "20px",
                  fontWeight: "700",
                  margin: "0 0 4px 0",
                  letterSpacing: "-0.02em",
                }}
              >
                SP NET Diagnostics Platform
              </Heading>
              <Text
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                  fontWeight: "500",
                  margin: "0 0 20px 0",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase" as const,
                }}
              >
                Error Report
              </Text>
              <Hr
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  margin: "0 0 20px 0",
                }}
              />
              <Section style={{ marginBottom: "16px" }}>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "15px",
                    lineHeight: "1.5",
                    margin: "0 0 12px 0",
                  }}
                >
                  {report.classification.summary}
                </Text>
              </Section>
              <Section>
                <Section
                  style={{
                    display: "inline-block",
                    backgroundColor: severityBg(report.classification.severity),
                    borderRadius: "6px",
                    padding: "6px 14px",
                    marginRight: "10px",
                    marginBottom: "0",
                    verticalAlign: "middle",
                  }}
                >
                  <Text
                    style={{
                      color: severityColor(report.classification.severity),
                      fontSize: "12px",
                      fontWeight: "600",
                      margin: 0,
                    }}
                  >
                    {severityLabel}
                  </Text>
                </Section>
                <Section
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgba(59,130,246,0.1)",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    marginBottom: "0",
                    verticalAlign: "middle",
                  }}
                  >
                  <Text
                    style={{
                      color: "#60A5FA",
                      fontSize: "12px",
                      fontWeight: "600",
                      margin: 0,
                    }}
                  >
                    {categoryLabel}
                  </Text>
                </Section>
              </Section>
            </>
          )}

          {/* Error Summary */}
          {sectionCard(
            <>
              {sectionTitle("Error Details")}
              {fieldRow("Error ID", report.errorId)}
              {fieldRow("Timestamp", report.timestamp)}
              {fieldRow("Route", report.route)}
              {fieldRow("Error Type", report.classification.label)}
              {fieldRow("Severity", severityLabel)}
            </>
          )}

          {/* Device Information */}
          {sectionCard(
            <>
              {sectionTitle("Device Information")}
              {inlineFieldRow([
                { label: "Browser", value: report.environment.browser },
                { label: "Browser Version", value: report.environment.browserVersion },
              ])}
              <Section style={{ marginTop: "14px" }} />
              {inlineFieldRow([
                { label: "Operating System", value: report.environment.os },
                { label: "Device", value: report.environment.device },
              ])}
              <Section style={{ marginTop: "14px" }} />
              {inlineFieldRow([
                {
                  label: "Viewport",
                  value: `${report.environment.viewport.width}x${report.environment.viewport.height}`,
                },
                {
                  label: "Screen",
                  value: `${report.environment.viewport.screenWidth}x${report.environment.viewport.screenHeight}`,
                },
              ])}
              <Section style={{ marginTop: "14px" }} />
              {inlineFieldRow([
                { label: "Pixel Ratio", value: String(report.environment.viewport.pixelRatio) },
                { label: "Language", value: report.environment.viewport.language },
              ])}
              <Section style={{ marginTop: "14px" }} />
              {fieldRow("Timezone", report.environment.viewport.timezone)}
            </>
          )}

          {/* Application Information */}
          {sectionCard(
            <>
              {sectionTitle("Application Information")}
              {fieldRow("Framework", report.environment.runtime.framework)}
              {fieldRow("User Agent", report.environment.environment.userAgent)}
              {fieldRow("SDK Version", report.metadata.sdkVersion)}
            </>
          )}

          {/* Diagnostics */}
          {sectionCard(
            <>
              {sectionTitle("Diagnostics")}
              {fieldRow("Summary", report.classification.summary)}

              {report.classification.likelyCauses.length > 0 && (
                <Section style={{ marginBottom: "14px" }}>
                  <Text style={fieldLabelStyle()}>Likely Causes</Text>
                  {report.classification.likelyCauses.map((cause, _i) => (
                    <Section key={_i} style={{ marginBottom: "6px" }}>
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "14px",
                          lineHeight: "1.5",
                          margin: 0,
                          paddingLeft: "12px",
                        }}
                      >
                        {"\u2022"} {cause}
                      </Text>
                    </Section>
                  ))}
                </Section>
              )}
            </>
          )}

          {/* Suggested Resolution */}
          {sectionCard(
            <>
              {sectionTitle("Suggested Resolution")}
              {report.classification.suggestedResolution.map((step) =>
                listItem(step)
              )}
            </>
          )}

          {/* Technical Details */}
          {sectionCard(
            <>
              {sectionTitle("Technical Details")}
              {inlineFieldRow([
                { label: "Session ID", value: report.session.sessionId },
                { label: "Session Started", value: report.session.startedAt },
              ])}
              <Section style={{ marginTop: "14px" }} />
              {inlineFieldRow([
                {
                  label: "Errors This Session",
                  value: String(report.session.errorsThisSession),
                },
                {
                  label: "Session Duration",
                  value: `${Math.round(report.session.duration / 1000)}s`,
                },
              ])}
              <Section style={{ marginTop: "14px" }} />
              {inlineFieldRow([
                {
                  label: "Recovered",
                  value: report.session.recovered ? "Yes" : "No",
                },
                {
                  label: "Recovery Attempts",
                  value: String(report.session.recoveryAttempts),
                },
              ])}
            </>
          )}

          {/* Stack Trace */}
          {report.error.stack && (
            <Section
              style={{
                backgroundColor: "#0E0E11",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "28px",
                marginBottom: "20px",
              }}
            >
              {sectionTitle("Stack Trace")}
              <Section
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "16px",
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "12px",
                    fontFamily:
                      '"SF Mono", SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
                    lineHeight: "1.6",
                    margin: 0,
                    whiteSpace: "pre-wrap" as const,
                    wordBreak: "break-all" as const,
                  }}
                >
                  {report.error.stack}
                </Text>
              </Section>
            </Section>
          )}

          {/* Footer */}
          <Section
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "24px",
              marginTop: "12px",
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "12px",
                lineHeight: "1.5",
                margin: "0 0 4px 0",
                textAlign: "center" as const,
              }}
            >
              Generated automatically by the SP NET Diagnostics Platform
            </Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: "12px",
                lineHeight: "1.5",
                margin: 0,
                textAlign: "center" as const,
              }}
            >
              {"\u00A9"} SP NET INC
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
