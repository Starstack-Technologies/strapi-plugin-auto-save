import { AutoSaveHeaderAction } from "./components/AutoSaveHeaderAction.jsx";
import { AutoSavePanel } from "./components/AutoSavePanel.jsx";
import { createAutoSaveUpdateAction } from "./components/AutoSaveUpdateAction.jsx";
import { ArrowClockwise } from "@strapi/icons";

const PLUGIN_ID = "auto-save";

const register = (app) => {
  app.registerPlugin({
    id: PLUGIN_ID,
    name: PLUGIN_ID,
  });

  app.addMenuLink({
    to: `plugins/${PLUGIN_ID}`,
    icon: ArrowClockwise,
    intlLabel: {
      id: `${PLUGIN_ID}.plugin.name`,
      defaultMessage: "Auto Save",
    },
    Component: () => import("./pages/PluginPage.jsx"),
    position: 4,
  });
};

const bootstrap = (app) => {
  const contentManager = app.getPlugin("content-manager");
  if (!contentManager) return;

  if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.setAttribute("data-auto-save", "sticky-panel");
    style.textContent = `
      /* Widen the sidebar by overriding the parent grid's column template */
      div:has(> div:has(> aside[aria-labelledby="additional-information"])) {
        grid-template-columns: 1fr 320px !important;
      }

      /* Sticky: sidebar wrapper stays in view while the form scrolls */
      div:has(> aside[aria-labelledby="additional-information"]) {
        position: sticky !important;
        top: 0 !important;
        align-self: start !important;
        max-height: 100vh !important;
        overflow-y: auto !important;
        min-width: 300px !important;
      }

      /* Give the aside itself more internal padding so content breathes */
      aside[aria-labelledby="additional-information"] {
        min-width: 280px !important;
        padding: 16px !important;
        gap: 12px !important;
      }

      /* Make Publish/Save buttons full width and a comfortable height */
      aside[aria-labelledby="additional-information"] button {
        min-height: 40px !important;
        font-size: 14px !important;
      }

      /* Row containing Publish button + 3-dots: let Publish grow, pin 3-dots */
      aside[aria-labelledby="additional-information"] > div > div,
      aside[aria-labelledby="additional-information"] div[class*="Flex"] {
        width: 100% !important;
      }

      /* The Publish button itself should stretch; the 3-dots button stays small */
      aside[aria-labelledby="additional-information"] button[aria-haspopup],
      aside[aria-labelledby="additional-information"] button[aria-expanded] {
        flex: 0 0 auto !important;
        width: auto !important;
        min-width: 36px !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
      }

      /* Primary action button (Publish) takes all remaining space */
      aside[aria-labelledby="additional-information"] button[type="button"]:not([aria-haspopup]):not([aria-expanded]):not([aria-label]) {
        flex: 1 1 auto !important;
        width: auto !important;
      }

      /* Flex row that wraps Publish + 3-dots together */
      aside[aria-labelledby="additional-information"] div:has(> button + button) {
        display: flex !important;
        flex-direction: row !important;
        width: 100% !important;
        gap: 4px !important;
      }
    `;
    document.head.appendChild(style);
  }

  contentManager.apis.addDocumentHeaderAction([AutoSaveHeaderAction]);

  contentManager.apis.addDocumentAction((actions) =>
    actions.map((action) =>
      action.type === "update" ? createAutoSaveUpdateAction(action) : action,
    ),
  );

  contentManager.apis.addEditViewSidePanel([AutoSavePanel]);
};

export default { register, bootstrap };
