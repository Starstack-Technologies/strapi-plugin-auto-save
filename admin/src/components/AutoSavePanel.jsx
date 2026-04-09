import { Box, Typography, Flex, Badge } from "@strapi/design-system";
import {
  CheckCircle,
  Clock,
  CrossCircle,
  WarningCircle,
  ArrowClockwise,
} from "@strapi/icons";
import { unstable_useContentManagerContext } from "@strapi/content-manager/strapi-admin";
import { useAutoSave } from "../hooks/useAutoSave.js";

const STATUS_CONFIG = {
  idle: { label: "All changes saved", color: "success600", Icon: CheckCircle },
  unsaved: {
    label: "Unsaved changes",
    color: "warning600",
    Icon: WarningCircle,
  },
  saving: { label: "Saving...", color: "primary600", Icon: ArrowClockwise },
  saved: { label: "Saved", color: "success600", Icon: CheckCircle },
  error: { label: "Save failed", color: "danger600", Icon: CrossCircle },
};

function fmt(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getChangedFields(values, initialValues) {
  if (!values || !initialValues) return [];
  return Object.keys(values).filter((key) => {
    const current = values[key];
    const initial = initialValues[key];
    if (current === initial) return false;
    return JSON.stringify(current) !== JSON.stringify(initial);
  });
}

export function AutoSavePanel() {
  const { form } = unstable_useContentManagerContext();
  const { values, initialValues, modified: isModified } = form;

  const { status, lastSavedAt, saveError } = useAutoSave();

  const changedFields = isModified
    ? getChangedFields(values, initialValues)
    : [];
  const changedFieldCount = changedFields.length;

  const { label, color, Icon } = STATUS_CONFIG[status] ?? STATUS_CONFIG.idle;

  return (
    <Box padding={4} background="neutral0">
      <Flex
        alignItems="center"
        gap={2}
        marginBottom={
          lastSavedAt || (isModified && changedFieldCount > 0) ? 3 : 0
        }
      >
        <Icon width="16px" height="16px" fill={color} />
        <Typography variant="sigma" textColor={color}>
          {label}
        </Typography>
        {isModified && changedFieldCount > 0 && (
          <Badge>{changedFieldCount}</Badge>
        )}
      </Flex>

      {lastSavedAt && (
        <Flex alignItems="center" gap={1} marginBottom={isModified ? 3 : 0}>
          <Clock width="12px" height="12px" fill="neutral500" />
          <Typography variant="pi" textColor="neutral500">
            Last saved at {fmt(lastSavedAt)}
          </Typography>
        </Flex>
      )}

      {status === "error" && saveError && (
        <Box background="danger100" hasRadius padding={2} marginBottom={3}>
          <Typography variant="pi" textColor="danger600">
            {saveError}
          </Typography>
        </Box>
      )}

      {isModified && changedFieldCount > 0 && (
        <Box marginTop={3}>
          <Typography variant="pi" textColor="neutral600" fontWeight="semiBold">
            Modified fields:
          </Typography>
          <Flex gap={1} wrap="wrap" marginTop={2}>
            {changedFields.map((field) => (
              <Box
                key={field}
                background="warning100"
                hasRadius
                paddingTop={1}
                paddingBottom={1}
                paddingLeft={2}
                paddingRight={2}
              >
                <Typography variant="pi" textColor="warning700">
                  {field}
                </Typography>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}
