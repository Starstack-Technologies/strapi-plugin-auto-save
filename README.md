# Auto Save - Strapi Plugin

> Automatically saves your Strapi v5 content entries as you type. No manual saves, no lost work.

---

## Overview

Auto Save is a lightweight Strapi v5 plugin that silently saves content entries in the background while you edit. It works across all content types, handles both new and existing entries, and shows a live status indicator in the sidebar, all with zero configuration.

---

## Features

- **Automatic saving** - saves as you type, with no manual action needed
- **Smart debounce** - batches saves with a 2-second delay to avoid excessive API calls
- **New entry support** - auto-creates new entries once you start typing real content
- **Live status panel** - shows save state, last saved time, and modified fields in the sidebar
- **Safe & non-intrusive** - works silently in the background, no dialogs or page reloads
- **Zero dependencies** - built entirely on Strapi's own APIs and design system

---

## Requirements

- Strapi v5.0.0 or higher
- Node.js 18 or higher
- React 18

---

## Installation

```bash
npm install @starstack/strapi-plugin-auto-save
```

Then register the plugin in your Strapi config:

```js
// config/plugins.js
module.exports = {
  "auto-save": {
    enabled: true,
    resolve: "./node_modules/@starstack/strapi-plugin-auto-save",
  },
};
```

Restart your Strapi server. The plugin activates automatically, no further configuration needed.

---

## How It Works

1. You open any content entry in the Strapi admin
2. The plugin detects changes in the form fields
3. After a 2-second pause in typing, it saves automatically via the Strapi Document API
4. A status panel in the sidebar confirms the save with a timestamp

---

## Sidebar Panel

The Auto Save panel appears in the right sidebar of every content entry. It shows:

- Current save status (saving, saved, unsaved changes, error)
- Timestamp of the last successful save
- A list of fields that have been modified since the last save
- Error message if a save fails

---

## Contributing

Issues and pull requests are welcome at [github.com/Starstack-Technologies/strapi-plugin-auto-save](https://github.com/Starstack-Technologies/strapi-plugin-auto-save).

---

## License

MIT © [Starstack](https://starstacktech.com)
