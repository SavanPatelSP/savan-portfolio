import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
}

export default function ContactEmail({
  name,
  email,
  message,
  date,
  time,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New website enquiry from {name}</Preview>
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
          <Section
            style={{
              backgroundColor: "#0E0E11",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "32px",
              marginBottom: "24px",
            }}
          >
            <Heading
              style={{
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "700",
                margin: "0 0 4px 0",
                letterSpacing: "-0.02em",
              }}
            >
              SP NET
            </Heading>
            <Text
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "13px",
                fontWeight: "500",
                margin: "0 0 24px 0",
                letterSpacing: "0.05em",
                textTransform: "uppercase" as const,
              }}
            >
              Portfolio Contact
            </Text>
            <Hr
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                margin: "0 0 24px 0",
              }}
            />
            <Text
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "15px",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              New website enquiry received
            </Text>
          </Section>

          {/* Information */}
          <Section
            style={{
              backgroundColor: "#0E0E11",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "32px",
              marginBottom: "24px",
            }}
          >
            <Text
              style={{
                color: "#3B82F6",
                fontSize: "11px",
                fontWeight: "600",
                margin: "0 0 16px 0",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}
            >
              Visitor
            </Text>

            <Section style={{ marginBottom: "16px" }}>
              <Text
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "12px",
                  fontWeight: "500",
                  margin: "0 0 4px 0",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {name}
              </Text>
            </Section>

            <Section style={{ marginBottom: "0" }}>
              <Text
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "12px",
                  fontWeight: "500",
                  margin: "0 0 4px 0",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
                }}
              >
                Email
              </Text>
              <Link
                href={`mailto:${email}`}
                style={{
                  color: "#3B82F6",
                  fontSize: "15px",
                  textDecoration: "none",
                  lineHeight: "1.4",
                }}
              >
                {email}
              </Link>
            </Section>
          </Section>

          {/* Submission Details */}
          <Section
            style={{
              backgroundColor: "#0E0E11",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "32px",
              marginBottom: "24px",
            }}
          >
            <Text
              style={{
                color: "#3B82F6",
                fontSize: "11px",
                fontWeight: "600",
                margin: "0 0 16px 0",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}
            >
              Submission
            </Text>

            <Section
              style={{
                display: "inline-block",
                marginRight: "24px",
                marginBottom: "0",
                verticalAlign: "top",
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "12px",
                  fontWeight: "500",
                  margin: "0 0 4px 0",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
                }}
              >
                Date
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {date}
              </Text>
            </Section>

            <Section
              style={{
                display: "inline-block",
                marginBottom: "0",
                verticalAlign: "top",
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "12px",
                  fontWeight: "500",
                  margin: "0 0 4px 0",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.05em",
                }}
              >
                Time
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {time}
              </Text>
            </Section>
          </Section>

          {/* Message */}
          <Section
            style={{
              backgroundColor: "#0E0E11",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "32px",
              marginBottom: "24px",
            }}
          >
            <Text
              style={{
                color: "#3B82F6",
                fontSize: "11px",
                fontWeight: "600",
                margin: "0 0 16px 0",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}
            >
              Message
            </Text>
            <Section
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "20px",
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  margin: 0,
                  whiteSpace: "pre-wrap" as const,
                  wordBreak: "break-word" as const,
                }}
              >
                {message}
              </Text>
            </Section>
          </Section>

          {/* Reply Button */}
          <Section
            style={{
              textAlign: "center" as const,
              marginBottom: "32px",
            }}
          >
            <Button
              href={`mailto:${email}`}
              style={{
                backgroundColor: "#3B82F6",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "600",
                textDecoration: "none",
                textAlign: "center" as const,
                display: "inline-block",
                padding: "14px 32px",
              }}
            >
              Reply to Visitor
            </Button>
          </Section>

          {/* Footer */}
          <Section
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: "24px",
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
              This message was generated automatically by the SP NET Portfolio
              contact form.
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
              &copy; SP NET INC
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

ContactEmail.PreviewProps = {
  name: "John Doe",
  email: "john@example.com",
  message:
    "Hi, I would like to discuss a potential collaboration on a web development project. I'm looking for a modern, responsive design with a focus on performance.",
  date: "July 17, 2026",
  time: "2:30 PM",
} as ContactEmailProps;
