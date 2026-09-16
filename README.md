# Portfolio

A comprehensive **_portfolio_** demonstrating **_educational background_** and **_technical expertise_** deployed as a **_webpage_** using **_React_** and **_Vite_**. This site showcases **_core proficiencies_** in **_front-end development_** and **_responsive design principles_**, establishing a **_public-facing resource_** for professional engagement and **_global accessibility_** via **_Github Pages_**.

## Features

- **_Responsive design_** ensuring **_cross-device compatibility_** across **_desktop_**, **_tablet_**, and **_mobile_** environments.
- **_Clean_** and **_semantic React component architecture_**, ensuring **_logical content hierarchy_** for **_maximal accessibility compliance_**.
- **_Dynamic liturgical theme engine_** integrating real-time liturgical calendar metadata via external REST API integration.
- **_Modular CSS styling_** promoting **_maintainability_** and **_scalability_** of the codebase.

## LitCal API Integration

The application integrates with the **_Catholic Liturgical Calendar API_** ([`litcal.johnromanodorazio.com`](https://litcal.johnromanodorazio.com)), developed by **_Father John R. D'Orazio_** ([@JohnRDOrazio](https://github.com/JohnRDOrazio)), to programmatically retrieve calendar metadata based on the current date:

- Programmatically fetches real-time **_liturgical seasons_**, **_primary celebrations_**, and **_associated colors_** from the **_API_**.
- Dynamically updates **_global color palettes_**, **_background accents_**, and **_theme tokens_** based on the active season.
- Implements **_local fallback logic_** to guarantee **_seamless UI rendering_** during **_API latency_** or **_network failure_**.

## Project Execution

Run the development server:

```cmd
npm run dev
```

> [!NOTE]
> `npm install` must be executed before the first run to install necessary dependencies.
