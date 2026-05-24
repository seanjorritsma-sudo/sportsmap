// ============================================================
// NORTH AMERICAN SPORTS MAP — script.js
// NBA, NHL, NFL: hardcoded 2024-25 final records (off-season)
// MLB: live from MLB Stats API (free), auto-refreshes every 5 min
// ============================================================
 
// ── Hardcoded 2025-26 final records ──────────────────────────
// Format: "LEAGUE_ABBR": "W-L"  (NHL uses W-L-OTL)

const STATIC_RECORDS = {
  // ── NBA 2025-26 ──────────────────────────────────────────
  "NBA_DET": "60-22", "NBA_BOS": "56-26", "NBA_NYK": "53-29",
  "NBA_CLE": "52-30", "NBA_TOR": "46-36", "NBA_ATL": "46-36",
  "NBA_PHI": "45-37", "NBA_ORL": "45-37", "NBA_CHA": "44-38",
  "NBA_MIA": "43-39", "NBA_MIL": "32-50", "NBA_CHI": "31-51",
  "NBA_BKN": "20-62", "NBA_IND": "19-63", "NBA_WAS": "17-65",
  "NBA_OKC": "64-18", "NBA_SAS": "62-20", "NBA_DEN": "54-28",
  "NBA_LAL": "53-29", "NBA_HOU": "52-30", "NBA_MIN": "49-33",
  "NBA_PHX": "45-37", "NBA_POR": "42-40", "NBA_LAC": "42-40",
  "NBA_GSW": "37-45", "NBA_NOP": "26-56", "NBA_DAL": "26-56",
  "NBA_MEM": "25-57", "NBA_SAC": "22-60", "NBA_UTA": "22-60",

  // ── NHL 2025-26 ──────────────────────────────────────────
  "NHL_CAR": "53-22-7",  "NHL_BUF": "50-23-9",  "NHL_TBL": "50-26-6",
  "NHL_MTL": "48-24-10", "NHL_BOS": "45-27-10", "NHL_OTT": "44-27-11",
  "NHL_PIT": "41-25-16", "NHL_PHI": "43-27-12", "NHL_WSH": "43-30-9",
  "NHL_DET": "41-31-10", "NHL_CBJ": "40-30-12", "NHL_NYI": "43-34-5",
  "NHL_NJD": "42-37-3",  "NHL_FLA": "40-38-4",  "NHL_TOR": "32-36-14",
  "NHL_NYR": "34-39-9",  "NHL_COL": "55-16-11", "NHL_DAL": "50-20-12",
  "NHL_MIN": "46-24-12", "NHL_UTA": "43-33-6",  "NHL_ANA": "43-33-6",
  "NHL_EDM": "41-30-11", "NHL_VGK": "39-26-17", "NHL_SJS": "39-35-8",
  "NHL_NSH": "38-34-10", "NHL_STL": "37-33-12", "NHL_LAK": "35-27-20",
  "NHL_WPG": "35-35-12", "NHL_SEA": "34-37-11", "NHL_CGY": "34-39-9",
  "NHL_CHI": "29-39-14", "NHL_VAN": "25-49-8",

  // ── NFL 2025 season ──────────────────────────────────────
  "NFL_NE":  "14-3",  "NFL_DEN": "14-3",  "NFL_DET": "14-3",
  "NFL_JAC": "13-4",  "NFL_HOU": "12-5",  "NFL_BUF": "12-5",
  "NFL_LAR": "12-5",  "NFL_SF":  "12-5",  "NFL_WSH": "12-5",
  "NFL_LAC": "11-6",  "NFL_CHI": "11-6",  "NFL_PHI": "11-6",
  "NFL_PIT": "10-7",  "NFL_GB":  "9-7-1", "NFL_MIN": "9-8",
  "NFL_IND": "8-9",   "NFL_BAL": "8-9",   "NFL_ATL": "8-9",
  "NFL_CAR": "8-9",   "NFL_SEA": "8-9",   "NFL_MIA": "7-10",
  "NFL_DAL": "7-10",  "NFL_CIN": "6-11",  "NFL_KC":  "6-11",
  "NFL_NO":  "5-12",  "NFL_CLE": "5-12",  "NFL_ARI": "4-13",
  "NFL_TB":  "4-13",  "NFL_LV":  "3-14",  "NFL_NYJ": "3-14",
  "NFL_TEN": "3-14",  "NFL_NYG": "3-14",
};
 
// ── Live MLB records (fetched from API) ───────────────────────
const mlbRecords = {};
 
// ── League colours ────────────────────────────────────────────
const leagueColors = {
  MLB: { bg: "#041E42", accent: "#BF0D3E" },
  NBA: { bg: "#17408B", accent: "#C9082A" },
  NHL: { bg: "#111111", accent: "#B9975B" },
  NFL: { bg: "#013369", accent: "#D50A0A" },
};
 
// ── All teams ─────────────────────────────────────────────────
const cities = [
  {
    name: "Toronto", lat: 43.6532, lng: -79.3832,
    teams: [
      { name: "Blue Jays",   league: "MLB", id: "TOR" },
      { name: "Raptors",     league: "NBA", id: "TOR" },
      { name: "Maple Leafs", league: "NHL", id: "TOR" },
    ]
  },
  {
    name: "Boston", lat: 42.3601, lng: -71.0589,
    teams: [
      { name: "Red Sox",  league: "MLB", id: "BOS" },
      { name: "Celtics",  league: "NBA", id: "BOS" },
      { name: "Bruins",   league: "NHL", id: "BOS" },
      { name: "Patriots", league: "NFL", id: "NE"  },
    ]
  },
  {
    name: "New York", lat: 40.7128, lng: -74.0060,
    teams: [
      { name: "Yankees",   league: "MLB", id: "NYY" },
      { name: "Mets",      league: "MLB", id: "NYM" },
      { name: "Knicks",    league: "NBA", id: "NYK" },
      { name: "Nets",      league: "NBA", id: "BKN" },
      { name: "Rangers",   league: "NHL", id: "NYR" },
      { name: "Islanders", league: "NHL", id: "NYI" },
      { name: "Devils",    league: "NHL", id: "NJD" },
      { name: "Giants",    league: "NFL", id: "NYG" },
      { name: "Jets",      league: "NFL", id: "NYJ" },
    ]
  },
  {
    name: "Philadelphia", lat: 39.9526, lng: -75.1652,
    teams: [
      { name: "Phillies", league: "MLB", id: "PHI" },
      { name: "76ers",    league: "NBA", id: "PHI" },
      { name: "Flyers",   league: "NHL", id: "PHI" },
      { name: "Eagles",   league: "NFL", id: "PHI" },
    ]
  },
  {
    name: "Baltimore", lat: 39.2904, lng: -76.6122,
    teams: [
      { name: "Orioles", league: "MLB", id: "BAL" },
      { name: "Ravens",  league: "NFL", id: "BAL" },
    ]
  },
  {
    name: "Washington", lat: 38.9072, lng: -77.0369,
    teams: [
      { name: "Nationals",  league: "MLB", id: "WSH" },
      { name: "Wizards",    league: "NBA", id: "WAS" },
      { name: "Capitals",   league: "NHL", id: "WSH" },
      { name: "Commanders", league: "NFL", id: "WSH" },
    ]
  },
  {
    name: "Pittsburgh", lat: 40.4406, lng: -79.9959,
    teams: [
      { name: "Pirates",  league: "MLB", id: "PIT" },
      { name: "Penguins", league: "NHL", id: "PIT" },
      { name: "Steelers", league: "NFL", id: "PIT" },
    ]
  },
  {
    name: "Cleveland", lat: 41.4993, lng: -81.6944,
    teams: [
      { name: "Guardians", league: "MLB", id: "CLE" },
      { name: "Cavaliers", league: "NBA", id: "CLE" },
      { name: "Browns",    league: "NFL", id: "CLE" },
    ]
  },
  {
    name: "Detroit", lat: 42.3314, lng: -83.0458,
    teams: [
      { name: "Tigers",    league: "MLB", id: "DET" },
      { name: "Pistons",   league: "NBA", id: "DET" },
      { name: "Red Wings", league: "NHL", id: "DET" },
      { name: "Lions",     league: "NFL", id: "DET" },
    ]
  },
  {
    name: "Chicago", lat: 41.8781, lng: -87.6298,
    teams: [
      { name: "Cubs",       league: "MLB", id: "CHC" },
      { name: "White Sox",  league: "MLB", id: "CWS" },
      { name: "Bulls",      league: "NBA", id: "CHI" },
      { name: "Blackhawks", league: "NHL", id: "CHI" },
      { name: "Bears",      league: "NFL", id: "CHI" },
    ]
  },
  {
    name: "Milwaukee", lat: 43.0389, lng: -87.9065,
    teams: [
      { name: "Brewers", league: "MLB", id: "MIL" },
      { name: "Bucks",   league: "NBA", id: "MIL" },
    ]
  },
  {
    name: "Minneapolis", lat: 44.9778, lng: -93.2650,
    teams: [
      { name: "Twins",        league: "MLB", id: "MIN" },
      { name: "Timberwolves", league: "NBA", id: "MIN" },
      { name: "Wild",         league: "NHL", id: "MIN" },
      { name: "Vikings",      league: "NFL", id: "MIN" },
    ]
  },
  {
    name: "Kansas City", lat: 39.0997, lng: -94.5786,
    teams: [
      { name: "Royals", league: "MLB", id: "KC"  },
      { name: "Chiefs", league: "NFL", id: "KC"  },
    ]
  },
  {
    name: "St. Louis", lat: 38.6270, lng: -90.1994,
    teams: [
      { name: "Cardinals", league: "MLB", id: "STL" },
      { name: "Blues",     league: "NHL", id: "STL" },
    ]
  },
  {
    name: "Cincinnati", lat: 39.1031, lng: -84.5120,
    teams: [
      { name: "Reds",    league: "MLB", id: "CIN" },
      { name: "Bengals", league: "NFL", id: "CIN" },
    ]
  },
  {
    name: "Indianapolis", lat: 39.7684, lng: -86.1581,
    teams: [
      { name: "Pacers", league: "NBA", id: "IND" },
      { name: "Colts",  league: "NFL", id: "IND" },
    ]
  },
  {
    name: "Nashville", lat: 36.1627, lng: -86.7816,
    teams: [
      { name: "Predators", league: "NHL", id: "NSH" },
      { name: "Titans",    league: "NFL", id: "TEN" },
    ]
  },
  {
    name: "Atlanta", lat: 33.7490, lng: -84.3880,
    teams: [
      { name: "Braves",  league: "MLB", id: "ATL" },
      { name: "Hawks",   league: "NBA", id: "ATL" },
      { name: "Falcons", league: "NFL", id: "ATL" },
    ]
  },
  {
    name: "Charlotte", lat: 35.2271, lng: -80.8431,
    teams: [
      { name: "Hornets",  league: "NBA", id: "CHA" },
      { name: "Panthers", league: "NFL", id: "CAR" },
    ]
  },
  {
    name: "Miami", lat: 25.7617, lng: -80.1918,
    teams: [
      { name: "Marlins",   league: "MLB", id: "MIA" },
      { name: "Heat",      league: "NBA", id: "MIA" },
      { name: "Panthers",  league: "NHL", id: "FLA" },
      { name: "Dolphins",  league: "NFL", id: "MIA" },
    ]
  },
  {
    name: "Tampa Bay", lat: 27.9506, lng: -82.4572,
    teams: [
      { name: "Rays",       league: "MLB", id: "TB"  },
      { name: "Lightning",  league: "NHL", id: "TBL" },
      { name: "Buccaneers", league: "NFL", id: "TB"  },
    ]
  },
  {
    name: "Orlando", lat: 28.5383, lng: -81.3792,
    teams: [
      { name: "Magic", league: "NBA", id: "ORL" },
    ]
  },
  {
    name: "Jacksonville", lat: 30.3322, lng: -81.6557,
    teams: [
      { name: "Jaguars", league: "NFL", id: "JAC" },
    ]
  },
  {
    name: "New Orleans", lat: 29.9511, lng: -90.0715,
    teams: [
      { name: "Pelicans", league: "NBA", id: "NOP" },
      { name: "Saints",   league: "NFL", id: "NO"  },
    ]
  },
  {
    name: "Memphis", lat: 35.1495, lng: -90.0490,
    teams: [
      { name: "Grizzlies", league: "NBA", id: "MEM" },
    ]
  },
  {
    name: "Dallas", lat: 32.7767, lng: -96.7970,
    teams: [
      { name: "Rangers",   league: "MLB", id: "TEX" },
      { name: "Mavericks", league: "NBA", id: "DAL" },
      { name: "Stars",     league: "NHL", id: "DAL" },
      { name: "Cowboys",   league: "NFL", id: "DAL" },
    ]
  },
  {
    name: "Houston", lat: 29.7604, lng: -95.3698,
    teams: [
      { name: "Astros",  league: "MLB", id: "HOU" },
      { name: "Rockets", league: "NBA", id: "HOU" },
      { name: "Texans",  league: "NFL", id: "HOU" },
    ]
  },
  {
    name: "San Antonio", lat: 29.4241, lng: -98.4936,
    teams: [
      { name: "Spurs", league: "NBA", id: "SAS" },
    ]
  },
  {
    name: "Oklahoma City", lat: 35.4676, lng: -97.5164,
    teams: [
      { name: "Thunder", league: "NBA", id: "OKC" },
    ]
  },
  {
    name: "Denver", lat: 39.7392, lng: -104.9903,
    teams: [
      { name: "Rockies",   league: "MLB", id: "COL" },
      { name: "Nuggets",   league: "NBA", id: "DEN" },
      { name: "Avalanche", league: "NHL", id: "COL" },
      { name: "Broncos",   league: "NFL", id: "DEN" },
    ]
  },
  {
    name: "Salt Lake City", lat: 40.7608, lng: -111.8910,
    teams: [
      { name: "Jazz",    league: "NBA", id: "UTA" },
      { name: "Mammoth", league: "NHL", id: "UTA" },
    ]
  },
  {
    name: "Phoenix", lat: 33.4484, lng: -112.0740,
    teams: [
      { name: "Diamondbacks", league: "MLB", id: "ARI" },
      { name: "Suns",         league: "NBA", id: "PHX" },
      { name: "Cardinals",    league: "NFL", id: "ARI" },
    ]
  },
  {
    name: "Los Angeles", lat: 34.0522, lng: -118.2437,
    teams: [
      { name: "Dodgers",  league: "MLB", id: "LAD" },
      { name: "Angels",   league: "MLB", id: "LAA" },
      { name: "Lakers",   league: "NBA", id: "LAL" },
      { name: "Clippers", league: "NBA", id: "LAC" },
      { name: "Kings",    league: "NHL", id: "LAK" },
      { name: "Ducks",    league: "NHL", id: "ANA" },
      { name: "Rams",     league: "NFL", id: "LAR" },
      { name: "Chargers", league: "NFL", id: "LAC" },
    ]
  },
  {
    name: "San Diego", lat: 32.7157, lng: -117.1611,
    teams: [
      { name: "Padres", league: "MLB", id: "SD" },
    ]
  },
  {
    name: "San Francisco", lat: 37.7749, lng: -122.4194,
    teams: [
      { name: "Giants",    league: "MLB", id: "SF"  },
      { name: "Athletics", league: "MLB", id: "OAK" },
      { name: "Warriors",  league: "NBA", id: "GSW" },
      { name: "Sharks",    league: "NHL", id: "SJS" },
      { name: "49ers",     league: "NFL", id: "SF"  },
    ]
  },
  {
    name: "Seattle", lat: 47.6062, lng: -122.3321,
    teams: [
      { name: "Mariners", league: "MLB", id: "SEA" },
      { name: "Kraken",   league: "NHL", id: "SEA" },
      { name: "Seahawks", league: "NFL", id: "SEA" },
    ]
  },
  {
    name: "Portland", lat: 45.5231, lng: -122.6765,
    teams: [
      { name: "Trail Blazers", league: "NBA", id: "POR" },
    ]
  },
  {
    name: "Sacramento", lat: 38.5816, lng: -121.4944,
    teams: [
      { name: "Kings", league: "NBA", id: "SAC" },
    ]
  },
  {
    name: "Las Vegas", lat: 36.1699, lng: -115.1398,
    teams: [
      { name: "Golden Knights", league: "NHL", id: "VGK" },
      { name: "Raiders",        league: "NFL", id: "LV"  },
    ]
  },
  {
    name: "Buffalo", lat: 42.8864, lng: -78.8784,
    teams: [
      { name: "Sabres", league: "NHL", id: "BUF" },
      { name: "Bills",  league: "NFL", id: "BUF" },
    ]
  },
  {
    name: "Green Bay", lat: 44.5133, lng: -88.0133,
    teams: [
      { name: "Packers", league: "NFL", id: "GB" },
    ]
  },
  {
    name: "Ottawa", lat: 45.4215, lng: -75.6972,
    teams: [
      { name: "Senators", league: "NHL", id: "OTT" },
    ]
  },
  {
    name: "Montreal", lat: 45.5017, lng: -73.5673,
    teams: [
      { name: "Canadiens", league: "NHL", id: "MTL" },
    ]
  },
  {
    name: "Winnipeg", lat: 49.8951, lng: -97.1384,
    teams: [
      { name: "Jets", league: "NHL", id: "WPG" },
    ]
  },
  {
    name: "Calgary", lat: 51.0447, lng: -114.0719,
    teams: [
      { name: "Flames", league: "NHL", id: "CGY" },
    ]
  },
  {
    name: "Edmonton", lat: 53.5461, lng: -113.4938,
    teams: [
      { name: "Oilers", league: "NHL", id: "EDM" },
    ]
  },
  {
    name: "Vancouver", lat: 49.2827, lng: -123.1207,
    teams: [
      { name: "Canucks", league: "NHL", id: "VAN" },
    ]
  },
  {
    name: "Raleigh", lat: 35.7796, lng: -78.6382,
    teams: [
      { name: "Hurricanes", league: "NHL", id: "CAR" },
    ]
  },
  {
    name: "Columbus", lat: 39.9612, lng: -82.9988,
    teams: [
      { name: "Blue Jackets", league: "NHL", id: "CBJ" },
    ]
  },
  {
    name: "San Jose", lat: 37.3382, lng: -121.8863,
    teams: [
      { name: "Sharks", league: "NHL", id: "SJS" },
    ]
  },
];
 
// Deduplicate San Jose Sharks (appears in both SF and SJ entries)
// Keep it only in San Jose, remove from SF
cities.find(c => c.name === "San Francisco").teams =
  cities.find(c => c.name === "San Francisco").teams.filter(t => t.id !== "SJS");
 
// ── Emojis by league ─────────────────────────────────────────
const leagueEmoji = { MLB: "⚾", NBA: "🏀", NHL: "🏒", NFL: "🏈" };
 
// ── Record lookup ─────────────────────────────────────────────
function getRecord(team) {
  if (team.league === "MLB") {
    return mlbRecords[`MLB_${team.id}`] || "—";
  }
  return STATIC_RECORDS[`${team.league}_${team.id}`] || "—";
}
 
function isMLBActive() {
  // MLB season runs roughly April–October
  const m = new Date().getMonth() + 1;
  return m >= 4 && m <= 10;
}
 
// ── MAP ───────────────────────────────────────────────────────
const map = L.map('map', { center: [43, -97], zoom: 4 });
 
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 20,
}).addTo(map);
 
// ── ICONS ─────────────────────────────────────────────────────
function makeIcon(count) {
  const size  = count === 1 ? 14 : count <= 3 ? 16 : 20;
  const pulse = count >= 4;
  return L.divIcon({
    className: '',
    html: `<div class="dot${pulse ? ' dot-pulse' : ''}" style="width:${size}px;height:${size}px;"></div>`,
    iconSize:   [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}
 
// ── POPUP ─────────────────────────────────────────────────────
function buildPopup(city) {
  const rows = city.teams.map(team => {
    const lc     = leagueColors[team.league];
    const record = getRecord(team);
    const isLive = team.league === "MLB" && isMLBActive();
    const tag    = record !== "—"
      ? `<span class="season-tag ${isLive ? 'live' : 'last'}">${isLive ? 'LIVE' : "'25-26"}</span>`
      : "";
 
    return `
      <div class="team-row">
        <span class="league-badge" style="background:${lc.bg};border-left:3px solid ${lc.accent};">${team.league}</span>
        <span class="team-logo">${leagueEmoji[team.league]}</span>
        <span class="team-name">
          ${team.name}
          <span class="record">${record !== "—" ? `(${record})` : ""}</span>
          ${tag}
        </span>
      </div>`;
  }).join("");
 
  return `
    <div class="popup-inner">
      <div class="popup-city">${city.name}</div>
      <div class="popup-count">${city.teams.length} Team${city.teams.length !== 1 ? "s" : ""}</div>
      ${rows}
    </div>`;
}
 
// ── MLB API ───────────────────────────────────────────────────
// MLB Stats API returns team.id only (no abbreviation field)
const MLB_ID_TO_ABBR = {
  108: "LAA", 109: "ARI", 110: "BAL", 111: "BOS", 112: "CHC",
  113: "CIN", 114: "CLE", 115: "COL", 116: "DET", 117: "HOU",
  118: "KC",  119: "LAD", 120: "WSH", 121: "NYM", 133: "OAK",
  134: "PIT", 135: "SD",  136: "SEA", 137: "SF",  138: "STL",
  139: "TB",  140: "TEX", 141: "TOR", 142: "MIN", 143: "PHI",
  144: "ATL", 145: "CWS", 146: "MIA", 147: "NYY", 158: "MIL",
};

async function fetchMLBStandings() {
  try {
    const res = await fetch("https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=2026");
    if (!res.ok) return;
    const data = await res.json();
    (data.records || []).forEach(division => {
      (division.teamRecords || []).forEach(entry => {
        const abbr = MLB_ID_TO_ABBR[entry.team?.id];
        if (!abbr) return;
        const w = entry.wins   ?? 0;
        const l = entry.losses ?? 0;
        mlbRecords[`MLB_${abbr}`] = `${w}-${l}`;
      });
    });
  } catch (err) {
    console.warn("[MLB standings] fetch failed:", err);
  }
}
 
// ── MARKER LAYER ──────────────────────────────────────────────
let clusterLayer;
 
function buildMarkers() {
  if (clusterLayer) map.removeLayer(clusterLayer);
  clusterLayer = L.markerClusterGroup({ showCoverageOnHover: false });
 
  cities.forEach(city => {
    if (!city.teams?.length) return;
    const marker = L.marker([city.lat, city.lng], { icon: makeIcon(city.teams.length) });
    marker.bindPopup(buildPopup(city), { className: "sports-popup", maxWidth: 360 });
    marker.on("popupopen", () => marker.getPopup().setContent(buildPopup(city)));
    clusterLayer.addLayer(marker);
  });
 
  map.addLayer(clusterLayer);
}
 
// ── STATUS BAR ────────────────────────────────────────────────
function setStatus(loading) {
  const el = document.getElementById("status-bar");
  if (!el) return;
  if (loading) {
    el.textContent = "Fetching live MLB records…";
    el.classList.add("loading");
  } else {
    const t = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    el.textContent = `MLB records updated: ${t} · NBA, NHL, NFL show 2025-26 final standings`;
    el.classList.remove("loading");
  }
}
 
// ── INIT ──────────────────────────────────────────────────────
async function init() {
  setStatus(true);
  await fetchMLBStandings();
  buildMarkers();
  setStatus(false);
}
 
init();
 
// Refresh MLB every 5 minutes
setInterval(async () => {
  setStatus(true);
  await fetchMLBStandings();
  buildMarkers();
  setStatus(false);
}, 5 * 60 * 1000);