import { Body, Button, Column, Container, Head, Heading, Hr, Html, Link, Preview, Row, Section, Tailwind, Text } from "react-email";

export type RegistrationConfirmationEmailProps = {
  actionUrl: string;
  name: string;
  priority: boolean;
};

const chapterUrl = "https://gdg.community.dev/gdg-on-campus-university-of-california-santa-cruz-santa-cruz-united-states/";
const discordUrl = "https://discord.gg/sSPYYYJ6Wq";
const linkedInUrl = "https://www.linkedin.com/company/gdg-at-ucsc/";

function RegistrationConfirmationEmail({ actionUrl, name, priority }: RegistrationConfirmationEmailProps) {
  return (
    <Html lang="en">
      <Tailwind>
        <Head />
        <Preview>{priority ? "Priority review — " : ""}We received your application for Google DevFest 2026.</Preview>
        <Body className="m-0 px-3 py-10 font-sans text-[#202124]">
          <Container className="mx-auto w-full max-w-[620px] overflow-hidden rounded-[24px] border border-zinc-200">
            <Section>
              <Row>
                <Column className="h-1.5 w-1/4 bg-[#4285F4]" />
                <Column className="h-1.5 w-1/4 bg-[#EA4335]" />
                <Column className="h-1.5 w-1/4 bg-[#FBBC05]" />
                <Column className="h-1.5 w-1/4 bg-[#34A853]" />
              </Row>
            </Section>

            <Section className="bg-[#0d1117] px-7 py-8 sm:px-10">
              <Row>
                <Column>
                  <Text className="m-0 font-bold text-[15px] text-white tracking-[-0.2px]">Google Developer Groups</Text>
                  <Text className="m-0 mt-1 text-[#9aa0a6] text-[12px]">UC Santa Cruz</Text>
                </Column>
                <Column align="right">
                  <Text className="m-0 inline-block rounded-full border border-[#34A853] bg-[#173c27] px-3 py-1 font-bold text-[#81c995] text-[10px] uppercase tracking-[1.4px]">
                    Application received
                  </Text>
                </Column>
              </Row>

              <Section className="mt-8 rounded-2xl border border-[#30363d] bg-[#161b22] p-5">
                <Row>
                  <Column>
                    <Text className="m-0 font-mono text-[#8b949e] text-[11px]">devfest_application.ts</Text>
                  </Column>
                </Row>
                <Hr className="my-2 border-[#30363d]" />
                <Text className="m-0 font-mono text-[#c9d1d9] text-[13px] leading-6">
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

            <Section className="px-7 py-9 sm:px-10">
              <Text className="m-0 font-bold text-[#4285F4] text-[12px] uppercase tracking-[1.6px]">Application received</Text>
              <Heading className="m-0 mt-2 font-extrabold text-[#202124] text-[32px] leading-[38px] tracking-[-1px]">
                Thanks, {name}. Your {priority ? "priority" : ""} application is now under review.
              </Heading>
              <Text className="m-0 mt-5 text-[#5f6368] text-[16px] leading-7">
                We’ve received your application for Google DevFest 2026 @ UC Santa Cruz. This confirms that your submission reached our team!
              </Text>

              <Section className="mt-8">
                <Text className="m-0 font-extrabold text-[#202124] text-[18px]">What happens next?</Text>

                <Row className="mt-5">
                  <Column className="w-12 align-top">
                    <Text className="m-0 inline-block rounded-xl bg-[#e8f0fe] px-3 py-2 font-extrabold text-[#1a73e8] text-[13px]">01</Text>
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 font-bold text-[#202124] text-[14px]">We review your application</Text>
                    <Text className="m-0 mt-1 text-[#5f6368] text-[13px] leading-5">
                      Our team will read your responses and consider your application alongside the rest of the applicant pool.
                    </Text>
                  </Column>
                </Row>

                <Row className="mt-5">
                  <Column className="w-12 align-top">
                    <Text className="m-0 inline-block rounded-xl bg-[#fce8e6] px-3 py-2 font-extrabold text-[#d93025] text-[13px]">02</Text>
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 font-bold text-[#202124] text-[14px]">We email your decision</Text>
                    <Text className="m-0 mt-1 text-[#5f6368] text-[13px] leading-5">
                      Keep an eye on your inbox. We’ll send your application outcome and any relevant next steps as soon as decisions are ready.
                    </Text>
                  </Column>
                </Row>

                <Row className="mt-5">
                  <Column className="w-12 align-top">
                    <Text className="m-0 inline-block rounded-xl bg-[#e6f4ea] px-3 py-2 font-extrabold text-[#1e8e3e] text-[13px]">03</Text>
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 font-bold text-[#202124] text-[14px]">If you’re selected</Text>
                    <Text className="m-0 mt-1 text-[#5f6368] text-[13px] leading-5">
                      Your acceptance email will include a confirmation step, team matching, day-of schedule info, venue details, and your very
                      own DevFest Hacker Pass 🔥
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Section className="mt-8 text-center">
                <Button
                  href={actionUrl}
                  className="box-border inline-block rounded-xl bg-[#1a73e8] px-7 py-4 font-bold text-[14px] text-white no-underline shadow-md"
                >
                  Review your application →
                </Button>
                <Text className="m-0 mt-4 text-[#80868b] text-[12px] leading-5">
                  Questions, accessibility needs, or changes we should know? Just reply to this email. The organizing team will get back to you.
                </Text>
              </Section>
            </Section>

            <Section className="border-[#e8eaed] border-t bg-[#f8f9fa] px-7 py-7 text-center sm:px-10">
              <Text className="m-0 font-bold text-[#3c4043] text-[13px]">Stay in the loop with GDG UCSC</Text>
              <Text className="m-0 mt-3 text-[12px]">
                <Link href={chapterUrl} className="font-semibold text-[#1a73e8] no-underline">
                  Chapter
                </Link>
                <span className="px-3 text-[#bdc1c6]">•</span>
                <Link href={discordUrl} className="font-semibold text-[#1a73e8] no-underline">
                  Discord
                </Link>
                <span className="px-3 text-[#bdc1c6]">•</span>
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

RegistrationConfirmationEmail.PreviewProps = {
  actionUrl: "http://localhost:3000",
  name: "Sammy",
  priority: true,
} satisfies RegistrationConfirmationEmailProps;

export default RegistrationConfirmationEmail;
