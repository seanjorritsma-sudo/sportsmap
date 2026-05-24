# North American Sports Map

An interactive map showing every major professional sports team in North America. Click any city to see its teams and their current records.

## How to Open

1. Download or clone this repository
2. Open `index.html` in any web browser — no server or installation required

## Features

- **Interactive map** — click any dot to see the teams in that city
- **Live MLB records** — fetched automatically from the MLB Stats API and refreshed every 5 minutes during the season
- **2025–26 standings** for NBA, NHL, and NFL (final regular season records)
- Covers all 30 MLB, 30 NBA, 32 NHL, and 32 NFL teams
- Dark theme with color-coded league badges

## Data Sources

| League | Source |
|--------|--------|
| MLB | [MLB Stats API](https://statsapi.mlb.com) — live, free, no key required |
| NBA | ESPN (2025–26 regular season final) |
| NHL | ESPN (2025–26 regular season final) |
| NFL | ESPN (2025 regular season final) |

## Technologies

- [Leaflet.js](https://leafletjs.com/) — interactive map
- [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) — marker grouping
- [CARTO dark basemap](https://carto.com/basemaps/) — map tiles
- Vanilla HTML, CSS, and JavaScript — no frameworks or build tools
