import { Body, Button, Column, Container, Head, Hr, Html, Link, Preview, Row, Section, Tailwind, Text } from "react-email";

export type RegistrationConfirmationEmailProps = {
  actionUrl: string;
  name: string;
  priority: boolean;
};

RegistrationConfirmationEmail.PreviewProps = {
  actionUrl: "http://localhost:3000",
  name: "Sammy",
  priority: true,
} satisfies RegistrationConfirmationEmailProps;

const instagramURL = "https://www.instagram.com/gdgc_ucsc/";
const discordUrl = "https://discord.gg/sSPYYYJ6Wq";
const linkedInUrl = "https://www.linkedin.com/company/gdg-at-ucsc/";

function RegistrationConfirmationEmail({ actionUrl, name, priority }: RegistrationConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Tailwind>
        <Head>
          <meta name="color-scheme" content="light" />
          <meta name="supported-color-schemes" content="light" />
          <style>{`
            :root {
              color-scheme: light !important;
              supported-color-schemes: light !important;
            }

            body,
            #email-body {
              background-color: #eef2f7 !important;
              color: #202124 !important;
              forced-color-adjust: none !important;
            }

            #email-card,
            #email-content {
              background-color: #ffffff !important;
            }

            #email-footer {
              background-color: #f8f9fa !important;
            }

            #email-body,
            #email-body * {
              forced-color-adjust: none !important;
            }

            #email-body [style*=";color:rgb(32,33,36)"],
            body[data-applied-color-inversion] [data-original-color="rgb(32, 33, 36)"] {
              color: #202124 !important;
            }

            #email-body [style*=";color:rgb(255,255,255)"],
            body[data-applied-color-inversion] [data-original-color="rgb(255, 255, 255)"] {
              color: #ffffff !important;
            }

            #email-body [style*=";color:rgb(154,160,166)"],
            body[data-applied-color-inversion] [data-original-color="rgb(154, 160, 166)"] {
              color: #9aa0a6 !important;
            }

            #email-body [style*=";color:rgb(129,201,149)"],
            body[data-applied-color-inversion] [data-original-color="rgb(129, 201, 149)"] {
              color: #81c995 !important;
            }

            #email-body [style*=";color:rgb(139,148,158)"],
            body[data-applied-color-inversion] [data-original-color="rgb(139, 148, 158)"] {
              color: #8b949e !important;
            }

            #email-body [style*=";color:rgb(201,209,217)"],
            body[data-applied-color-inversion] [data-original-color="rgb(201, 209, 217)"] {
              color: #c9d1d9 !important;
            }

            #email-body [style*=";color:rgb(255,123,114)"],
            body[data-applied-color-inversion] [data-original-color="rgb(255, 123, 114)"] {
              color: #ff7b72 !important;
            }

            #email-body [style*=";color:rgb(210,168,255)"],
            body[data-applied-color-inversion] [data-original-color="rgb(210, 168, 255)"] {
              color: #d2a8ff !important;
            }

            #email-body [style*=";color:rgb(121,192,255)"],
            body[data-applied-color-inversion] [data-original-color="rgb(121, 192, 255)"] {
              color: #79c0ff !important;
            }

            #email-body [style*=";color:rgb(126,231,135)"],
            body[data-applied-color-inversion] [data-original-color="rgb(126, 231, 135)"] {
              color: #7ee787 !important;
            }

            #email-body [style*=";color:rgb(165,214,255)"],
            body[data-applied-color-inversion] [data-original-color="rgb(165, 214, 255)"] {
              color: #a5d6ff !important;
            }

            #email-body [style*=";color:rgb(66,133,244)"],
            body[data-applied-color-inversion] [data-original-color="rgb(66, 133, 244)"] {
              color: #4285f4 !important;
            }

            #email-body [style*=";color:rgb(95,99,104)"],
            body[data-applied-color-inversion] [data-original-color="rgb(95, 99, 104)"] {
              color: #5f6368 !important;
            }

            #email-body [style*=";color:rgb(26,115,232)"],
            body[data-applied-color-inversion] [data-original-color="rgb(26, 115, 232)"] {
              color: #1a73e8 !important;
            }

            #email-body [style*=";color:rgb(217,48,37)"],
            body[data-applied-color-inversion] [data-original-color="rgb(217, 48, 37)"] {
              color: #d93025 !important;
            }

            #email-body [style*=";color:rgb(30,142,62)"],
            body[data-applied-color-inversion] [data-original-color="rgb(30, 142, 62)"] {
              color: #1e8e3e !important;
            }

            #email-body [style*=";color:rgb(128,134,139)"],
            body[data-applied-color-inversion] [data-original-color="rgb(128, 134, 139)"] {
              color: #80868b !important;
            }

            #email-body [style*=";color:rgb(60,64,67)"],
            body[data-applied-color-inversion] [data-original-color="rgb(60, 64, 67)"] {
              color: #3c4043 !important;
            }

            #email-body [style*=";color:rgb(189,193,198)"],
            body[data-applied-color-inversion] [data-original-color="rgb(189, 193, 198)"] {
              color: #bdc1c6 !important;
            }

            #email-body [style*="background-color:rgb(238,242,247)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(238, 242, 247)"] {
              background-color: #eef2f7 !important;
            }

            #email-body [style*="background-color:rgb(255,255,255)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(255, 255, 255)"] {
              background-color: #ffffff !important;
            }

            #email-body [style*="background-color:rgb(66,133,244)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(66, 133, 244)"] {
              background-color: #4285f4 !important;
            }

            #email-body [style*="background-color:rgb(234,67,53)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(234, 67, 53)"] {
              background-color: #ea4335 !important;
            }

            #email-body [style*="background-color:rgb(251,188,5)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(251, 188, 5)"] {
              background-color: #fbbc05 !important;
            }

            #email-body [style*="background-color:rgb(52,168,83)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(52, 168, 83)"] {
              background-color: #34a853 !important;
            }

            #email-body [style*="background-color:rgb(13,17,23)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(13, 17, 23)"] {
              background-color: #0d1117 !important;
            }

            #email-body [style*="background-color:rgb(23,60,39)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(23, 60, 39)"] {
              background-color: #173c27 !important;
            }

            #email-body [style*="background-color:rgb(22,27,34)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(22, 27, 34)"] {
              background-color: #161b22 !important;
            }

            #email-body [style*="background-color:rgb(232,240,254)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(232, 240, 254)"] {
              background-color: #e8f0fe !important;
            }

            #email-body [style*="background-color:rgb(252,232,230)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(252, 232, 230)"] {
              background-color: #fce8e6 !important;
            }

            #email-body [style*="background-color:rgb(230,244,234)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(230, 244, 234)"] {
              background-color: #e6f4ea !important;
            }

            #email-body [style*="background-color:rgb(26,115,232)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(26, 115, 232)"] {
              background-color: #1a73e8 !important;
            }

            #email-body [style*="background-color:rgb(248,249,250)"],
            body[data-applied-color-inversion] [data-original-backgroundcolor="rgb(248, 249, 250)"] {
              background-color: #f8f9fa !important;
            }

            #email-body [style*="border-color:rgb(228,228,231)"],
            body[data-applied-color-inversion] [data-original-bordercolor="rgb(228, 228, 231)"] {
              border-color: #e4e4e7 !important;
            }

            #email-body [style*="border-color:rgb(52,168,83)"],
            body[data-applied-color-inversion] [data-original-bordercolor="rgb(52, 168, 83)"] {
              border-color: #34a853 !important;
            }

            #email-body [style*="border-color:rgb(48,54,61)"],
            body[data-applied-color-inversion] [data-original-bordercolor*="rgb(48, 54, 61)"] {
              border-color: #30363d !important;
            }

            #email-body [style*="border-color:rgb(232,234,237)"],
            body[data-applied-color-inversion] [data-original-bordercolor="rgb(232, 234, 237)"] {
              border-color: #e8eaed !important;
            }
          `}</style>
        </Head>
        <Preview>{priority ? "Priority review — " : ""}We received your application for Google DevFest 2026.</Preview>
        <Body id="email-body" className="m-0 bg-[#eef2f7] px-2 py-4 font-sans text-[#202124] sm:px-3 sm:py-10">
          <Container
            id="email-card"
            className="mx-auto w-full max-w-[620px] overflow-hidden rounded-2xl border border-zinc-200 bg-white sm:rounded-[24px]"
          >
            <Section>
              <Row>
                <Column className="h-1.5 w-1/4 bg-[#4285F4]" />
                <Column className="h-1.5 w-1/4 bg-[#EA4335]" />
                <Column className="h-1.5 w-1/4 bg-[#FBBC05]" />
                <Column className="h-1.5 w-1/4 bg-[#34A853]" />
              </Row>
            </Section>

            <Section className="bg-[#0d1117] px-5 py-6 sm:px-10 sm:py-8">
              <Row>
                <Column className="block w-full sm:table-cell sm:w-auto">
                  <Text className="m-0 font-bold text-[15px] text-white tracking-[-0.2px]">Google Developer Groups</Text>
                  <Text className="m-0 mt-1 text-[#9aa0a6] text-[12px]">UC Santa Cruz</Text>
                </Column>
                <Column className="block w-full pt-4 text-left sm:table-cell sm:w-auto sm:pt-0 sm:text-right">
                  <Text className="m-0 inline-block whitespace-nowrap rounded-full border border-[#34A853] bg-[#173c27] px-3 py-1 font-bold text-[#81c995] text-[10px] uppercase tracking-[1.4px]">
                    Application received
                  </Text>
                </Column>
              </Row>

              <Section className="mt-6 rounded-2xl border border-[#30363d] bg-[#161b22] p-4 sm:mt-8 sm:p-5">
                <Row>
                  <Column>
                    <Text className="m-0 font-mono text-[#8b949e] text-[11px]">devfest_application.ts</Text>
                  </Column>
                </Row>
                <Hr className="my-2 border-[#30363d]" />
                <Text className="m-0 font-mono text-[#c9d1d9] text-[11px] leading-5 sm:text-[13px] sm:leading-6">
                  <span className="text-[#ff7b72]">const</span> future = <span className="text-[#d2a8ff]">await</span>{" "}
                  <span className="text-[#79c0ff]">DevFest</span>.<span className="text-[#7ee787]">build</span>({"{"}
                  <br />
                  &nbsp;&nbsp;innovator: <span className="text-[#a5d6ff]">&quot;{name}&quot;</span>,
                  <br />
                  &nbsp;&nbsp;status: <span className="text-[#a5d6ff]">&quot;under_review&quot;</span>
                  <br />
                  {"}"});
                </Text>
              </Section>
            </Section>

            <Section id="email-content" className="bg-white px-5 py-7 sm:px-10 sm:py-9">
              <Text className="m-0 font-bold text-[#4285F4] text-[12px] uppercase tracking-[1.6px]">Application received</Text>
              <Text className="m-0 mt-2 font-extrabold text-[#202124] text-[26px] leading-[32px] tracking-[-0.6px] sm:text-[32px] sm:leading-[38px] sm:tracking-[-1px]">
                Thanks, {name}!
              </Text>
              <Text className="m-0 font-normal text-[#202124] text-[18px] leading-7 sm:text-[20px] sm:leading-[38px]">
                Your {priority ? "priority" : ""} application is now under review.
              </Text>
              <Text className="m-0 mt-3 text-[#5f6368] text-[15px] leading-6 sm:text-[16px] sm:leading-7">
                We’ve received your application for Google DevFest 2026 @ UC Santa Cruz. This confirms that your submission reached our team!
              </Text>

              <Section className="mt-8">
                <Text className="m-0 font-extrabold text-[#202124] text-[18px]">What happens next?</Text>

                <Row className="mt-5">
                  <Column className="w-10 align-top sm:w-12">
                    <Text className="m-0 inline-block rounded-xl bg-[#e8f0fe] px-3 py-2 font-extrabold text-[#1a73e8] text-[13px]">01</Text>
                  </Column>
                  <Column className="pl-2 sm:pl-3">
                    <Text className="m-0 font-bold text-[#202124] text-[14px]">We'll review your application</Text>
                    <Text className="m-0 mt-1 text-[#5f6368] text-[13px] leading-5">
                      Our team will read your responses and consider your application alongside the rest of the applicant pool.
                    </Text>
                  </Column>
                </Row>

                <Row className="mt-5">
                  <Column className="w-10 align-top sm:w-12">
                    <Text className="m-0 inline-block rounded-xl bg-[#fce8e6] px-3 py-2 font-extrabold text-[#d93025] text-[13px]">02</Text>
                  </Column>
                  <Column className="pl-2 sm:pl-3">
                    <Text className="m-0 font-bold text-[#202124] text-[14px]">We'll email your decision</Text>
                    <Text className="m-0 mt-1 text-[#5f6368] text-[13px] leading-5">
                      Keep an eye on your inbox. We’ll send your application outcome and any relevant next steps as soon as decisions are ready.
                    </Text>
                  </Column>
                </Row>

                <Row className="mt-5">
                  <Column className="w-10 align-top sm:w-12">
                    <Text className="m-0 inline-block rounded-xl bg-[#e6f4ea] px-3 py-2 font-extrabold text-[#1e8e3e] text-[13px]">03</Text>
                  </Column>
                  <Column className="pl-2 sm:pl-3">
                    <Text className="m-0 font-bold text-[#202124] text-[14px]">We'll send you the next steps</Text>
                    <Text className="m-0 mt-1 text-[#5f6368] text-[13px] leading-5">
                      Your acceptance email will include a confirmation step, team matching, day-of schedule info, venue details, and your very
                      own DevFest Hacker Pass.
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Section className="mt-10 text-center">
                <Button
                  href={actionUrl}
                  className="box-border block w-full rounded-xl bg-[#1a73e8] px-7 py-4 text-center font-bold text-[14px] text-white no-underline shadow-md sm:inline-block sm:w-auto"
                >
                  Review your application →
                </Button>
                <Text className="m-0 mt-10 text-[#80868b] text-[12px] leading-5">
                  Questions, accessibility needs, or changes we should know? Just reply to this email. The organizing team will get back to you.
                </Text>
              </Section>
            </Section>

            <Section id="email-footer" className="border-[#e8eaed] border-t bg-[#f8f9fa] px-5 py-6 text-center sm:px-10 sm:py-7">
              <Text className="m-0 font-bold text-[#3c4043] text-[13px]">Stay in the loop with GDG UCSC</Text>
              <Text className="m-0 mt-3 text-[12px]">
                <Link href={instagramURL} className="font-semibold text-[#1a73e8] no-underline">
                  Instagram
                </Link>
                <span className="px-2 text-[#bdc1c6] sm:px-3">•</span>
                <Link href={discordUrl} className="font-semibold text-[#1a73e8] no-underline">
                  Discord
                </Link>
                <span className="px-2 text-[#bdc1c6] sm:px-3">•</span>
                <Link href={linkedInUrl} className="font-semibold text-[#1a73e8] no-underline">
                  LinkedIn
                </Link>
              </Text>
              <Text className="m-0 mt-5 text-[#9aa0a6] text-[11px] leading-5">
                Google Developer Groups on Campus · UC Santa Cruz
                <br />
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default RegistrationConfirmationEmail;
