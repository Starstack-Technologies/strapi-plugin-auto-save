import { Box, Flex, Typography, Grid, Divider } from "@strapi/design-system";
import {
  CheckCircle,
  Clock,
  Shield,
  Feather,
  ArrowClockwise,
} from "@strapi/icons";

const FEATURES = [
  {
    Icon: ArrowClockwise,
    title: "Automatic Saving",
    desc: "Your content is saved automatically as you type, with no manual action needed.",
  },
  {
    Icon: Clock,
    title: "Smart Debounce",
    desc: "Saves are batched with a 2-second debounce to avoid excessive requests.",
  },
  {
    Icon: Shield,
    title: "Safe & Non-Intrusive",
    desc: "Works silently in the background without disruptive dialogs or page reloads.",
  },
  {
    Icon: Feather,
    title: "Lightweight",
    desc: "Zero external dependencies. Built entirely on Strapi's own APIs.",
  },
];

const HOW_IT_WORKS = [
  "You start editing any content entry.",
  "The plugin detects changes in the form fields.",
  "After a short pause (2 s), it auto-saves via the Strapi Document API.",
  "A subtle status indicator in the sidebar confirms the save.",
];

export function PluginPage() {
  return (
    <Box padding={10} background="neutral100" style={{ minHeight: "100vh" }}>
      <Box style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* ── Header ── */}
        <Flex direction="column" alignItems="center" gap={3} paddingBottom={6}>
          <Box
            background="primary100"
            hasRadius
            padding={3}
            style={{ display: "inline-flex", borderRadius: 12 }}
          >
            <ArrowClockwise width="32px" height="32px" fill="primary600" />
          </Box>

          <Typography
            variant="alpha"
            textColor="neutral800"
            style={{ textAlign: "center" }}
          >
            Auto Save
          </Typography>

          <Typography
            variant="omega"
            textColor="neutral600"
            style={{ textAlign: "center", lineHeight: 1.6, maxWidth: 520 }}
          >
            A lightweight Strapi plugin that automatically saves your content as
            you edit. No more lost work, every change is persisted in the
            background without interrupting your workflow.
          </Typography>
        </Flex>

        <Divider />

        {/* ── Features ── */}
        <Box paddingTop={6} paddingBottom={6}>
          <Typography
            variant="delta"
            textColor="neutral800"
            style={{ textAlign: "center", display: "block", marginBottom: 20 }}
          >
            Features
          </Typography>

          <Grid.Root gap={5}>
            {FEATURES.map(({ Icon, title, desc }) => (
              <Grid.Item key={title} col={6} s={12}>
                <Box
                  background="neutral0"
                  hasRadius
                  padding={5}
                  shadow="filterShadow"
                  style={{ height: "100%", width: "100%" }}
                >
                  <Flex direction="column" alignItems="center" gap={3}>
                    <Box
                      background="primary100"
                      hasRadius
                      padding={2}
                      style={{ display: "inline-flex", borderRadius: 8 }}
                    >
                      <Icon width="20px" height="20px" fill="primary600" />
                    </Box>
                    <Typography
                      variant="delta"
                      textColor="neutral800"
                      style={{ textAlign: "center" }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="pi"
                      textColor="neutral600"
                      style={{ textAlign: "center", lineHeight: 1.55 }}
                    >
                      {desc}
                    </Typography>
                  </Flex>
                </Box>
              </Grid.Item>
            ))}
          </Grid.Root>
        </Box>

        <Divider />

        {/* ── How it works ── */}
        <Box paddingTop={6} paddingBottom={6}>
          <Typography
            variant="delta"
            textColor="neutral800"
            style={{ textAlign: "center", display: "block", marginBottom: 20 }}
          >
            How It Works
          </Typography>

          <Box style={{ maxWidth: 480, margin: "0 auto" }}>
            {HOW_IT_WORKS.map((step, i) => (
              <Flex key={i} gap={3} alignItems="flex-start" paddingBottom={3}>
                <Box
                  background="primary600"
                  hasRadius
                  style={{
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    borderRadius: "50%",
                  }}
                >
                  <Typography
                    variant="pi"
                    textColor="neutral0"
                    fontWeight="bold"
                  >
                    {i + 1}
                  </Typography>
                </Box>
                <Typography
                  variant="omega"
                  textColor="neutral700"
                  style={{ lineHeight: 1.6, paddingTop: 3 }}
                >
                  {step}
                </Typography>
              </Flex>
            ))}
          </Box>
        </Box>

        <Divider />

        {/* ── Footer ── */}
        <Box paddingTop={5}>
          <Flex justifyContent="center" gap={2} alignItems="center">
            <CheckCircle width="14px" height="14px" fill="success600" />
            <Typography variant="pi" textColor="neutral500">
              Auto Save is active and running on all content types.
            </Typography>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default PluginPage;
