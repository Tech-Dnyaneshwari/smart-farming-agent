"use client";

import { useState } from "react";

const initialZones = [
  {
    name: "Zone A",
    crop: "Wheat",
    moisture: 38,
    ph: 6.8,
    nitrogen: 72,
    phosphorus: 54,
    potassium: 68,
    status: "Needs Water",
  },
  {
    name: "Zone B",
    crop: "Tomatoes",
    moisture: 64,
    ph: 6.4,
    nitrogen: 65,
    phosphorus: 71,
    potassium: 76,
    status: "Healthy",
  },
  {
    name: "Zone C",
    crop: "Rice",
    moisture: 78,
    ph: 6.2,
    nitrogen: 81,
    phosphorus: 63,
    potassium: 70,
    status: "Healthy",
  },
];

const menuItems = [
  { icon: "▦", label: "Dashboard" },
  { icon: "⌖", label: "Field Map" },
  { icon: "◉", label: "Irrigation" },
  { icon: "♧", label: "Soil Analysis" },
  { icon: "☀", label: "Weather" },
  { icon: "▥", label: "Analytics" },
  { icon: "✧", label: "AI Agent" },
];

function MetricCard({
  icon,
  label,
  value,
  unit,
  trend,
  tone,
  footer,
}: {
  icon: string;
  label: string;
  value: string;
  unit: string;
  trend: string;
  tone: string;
  footer: string;
}) {
  return (
    <div className="metric-card">
      <div className="metric-topline">
        <span className={`metric-icon ${tone}`}>{icon}</span>
        <span className="metric-label">{label}</span>
      </div>

      <div className="metric-value-row">
        <strong>{value}</strong>
        <span>{unit}</span>
        <em className={`metric-trend ${tone}`}>{trend}</em>
      </div>

      <p>{footer}</p>
    </div>
  );
}

export default function Home() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [language, setLanguage] = useState("English");
  const [irrigationOn, setIrrigationOn] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { question: string; answer: string }[]
  >([]);
  const [zones, setZones] = useState(initialZones);
  const [cropName, setCropName] = useState("Wheat");

  function sendMessage() {
    const question = chatInput.trim();

    if (!question) return;

    let answer =
      "I’m your Farm Bot AI demo assistant. Check your soil moisture, local weather forecast, and crop growth stage before making farming decisions.";

    const q = question.toLowerCase();

    if (q.includes("water") || q.includes("irrigation")) {
      answer =
        "Zone A currently has 38% soil moisture in this demo. Check your crop’s moisture requirements and actual field conditions before irrigating.";
    } else if (q.includes("soil") || q.includes("ph")) {
      answer =
        "The demo soil pH values are 6.8, 6.4, and 6.2 for Zones A, B, and C. Test a representative soil sample to confirm your field’s actual pH.";
    } else if (q.includes("weather") || q.includes("rain")) {
      answer =
        "This dashboard does not yet have a live weather connection. Check a trusted local forecast before spraying or irrigating.";
    } else if (q.includes("crop") || q.includes("plant")) {
      answer =
        "Crop suitability depends on soil, season, water availability, and local climate. Share your location, soil test results, and season for more tailored guidance.";
    }

    setChatMessages((previous) => [
      ...previous,
      { question, answer },
    ]);

    setChatInput("");
  }

  function updateMoisture(index: number, value: number) {
    setZones((previous) =>
      previous.map((zone, i) => {
        if (i !== index) return zone;

        return {
          ...zone,
          moisture: value,
          status:
            value < 40
              ? "Needs Water"
              : value > 85
                ? "Too Wet"
                : "Healthy",
        };
      }),
    );
  }

  const navTo = (label: string) => setActivePage(label);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🌱</div>

          <div>
            <h2>SmartFarm</h2>
            <span>INTELLIGENT AGRICULTURE</span>
          </div>
        </div>

        <div className="farm-switcher">
          <div className="farm-avatar">🌾</div>

          <div className="farm-details">
            <strong>Green Valley Farm</strong>
            <span>Demo farm · 12.5 acres</span>
          </div>

          <span className="switch-arrow">⌄</span>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <nav className="side-nav">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`nav-item ${
                activePage === item.label ? "active" : ""
              }`}
              onClick={() => navTo(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>

              {item.label === "AI Agent" && (
                <span className="new-tag">AI</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">✦</div>

            <strong>Need farming advice?</strong>

            <p>Ask Farm Bot for guidance about your farm.</p>

            <button
              type="button"
              onClick={() => navTo("AI Agent")}
            >
              Ask Farm Bot ↗
            </button>
          </div>

          <button
            type="button"
            className="nav-item settings-link"
            onClick={() => navTo("Settings")}
          >
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </button>

          <div className="profile">
            <div className="profile-avatar">DR</div>

            <div className="profile-text">
              <strong>Farm Manager</strong>
              <span>Farm Administrator</span>
            </div>

            <span className="profile-menu">•••</span>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span className="crumb-slash">/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="top-actions">
            <span className="demo-badge">
              <span />
              Demo data
            </span>

            <select
              aria-label="Select language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="language-select"
            >
              <option>English</option>
              <option>मराठी</option>
              <option>हिन्दी</option>
            </select>

            <button
              type="button"
              className="icon-button"
              aria-label="Notifications"
            >
              ♧
              <span className="notification-dot" />
            </button>

            <div className="top-avatar">DR</div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="welcome-row">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                SUNDAY, OCTOBER 25, 2026
              </div>

              <h1>
                {activePage === "Dashboard"
                  ? "Good afternoon, Farmer"
                  : activePage}
                <span className="wave"> 👋</span>
              </h1>

              <p className="page-subtitle">
                Here&apos;s what&apos;s happening on your farm today.
              </p>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => navTo("Field Map")}
            >
              <span>＋</span> Explore your fields
            </button>
          </div>

          {activePage === "Settings" ? (
            <section className="content-card settings-card">
              <div className="section-heading">
                <div>
                  <h2>Farm Settings</h2>
                  <p>Manage your demo farm preferences.</p>
                </div>
              </div>

              <label className="setting-row">
                <span>
                  <strong>Dashboard language</strong>
                  <small>Choose your preferred language.</small>
                </span>

                <select
                  value={language}
                  onChange={(event) =>
                    setLanguage(event.target.value)
                  }
                >
                  <option>English</option>
                  <option>मराठी</option>
                  <option>हिन्दी</option>
                </select>
              </label>

              <label className="setting-row">
                <span>
                  <strong>Farm name</strong>
                  <small>Currently shown in the dashboard.</small>
                </span>

                <input defaultValue="Green Valley Farm" />
              </label>

              <p className="notice">
                Language selection is available, but full translation
                and saved settings are not connected yet.
              </p>
            </section>
          ) : activePage === "AI Agent" ? (
            <section className="content-card chat-card">
              <div className="section-heading">
                <div>
                  <div className="section-kicker">
                    YOUR FARMING COPILOT
                  </div>

                  <h2>
                    Meet Farm Bot AI{" "}
                    <span className="ai-pill">AI ASSISTANT</span>
                  </h2>

                  <p>
                    Ask questions about irrigation, soil, crops, and
                    farm management.
                  </p>
                </div>

                <div className="bot-avatar">✦</div>
              </div>

              <div className="chat-window">
                <div className="bot-message">
                  <div className="bot-small-avatar">✦</div>

                  <div>
                    <strong>
                      Farm Bot <span>Just now</span>
                    </strong>

                    <p>
                      Hello! I&apos;m Farm Bot. I can help you
                      understand the demo farm data. What would you
                      like to know?
                    </p>
                  </div>
                </div>

                {chatMessages.map((message, index) => (
                  <div key={index} className="chat-exchange">
                    <div className="user-message">
                      {message.question}
                    </div>

                    <div className="bot-message">
                      <div className="bot-small-avatar">✦</div>

                      <div>
                        <strong>Farm Bot</strong>
                        <p>{message.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form
                className="chat-input-row"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  value={chatInput}
                  onChange={(event) =>
                    setChatInput(event.target.value)
                  }
                  placeholder="Ask about soil, crops, irrigation..."
                  aria-label="Message Farm Bot"
                />

                <button type="submit">Send ↗</button>
              </form>

              <p className="notice">
                Farm Bot currently uses demo rules, not a connected AI
                model or live farm sensors.
              </p>
            </section>
          ) : activePage === "Field Map" ? (
            <section className="content-card map-card">
              <div className="section-heading">
                <div>
                  <div className="section-kicker">
                    FIELD OVERVIEW
                  </div>

                  <h2>Your farm zones</h2>

                  <p>
                    A conceptual map of the three demo zones.
                  </p>
                </div>

                <span className="status-chip healthy-chip">
                  ● 2 healthy zones
                </span>
              </div>

              <div className="field-map">
                <div className="map-label">
                  GREEN VALLEY FARM · NOT A GPS MAP
                </div>

                <div className="map-zone zone-one">
                  <span>ZONE A</span>
                  <strong>🌾 Wheat</strong>
                  <small>Moisture {zones[0].moisture}%</small>
                </div>

                <div className="map-zone zone-two">
                  <span>ZONE B</span>
                  <strong>🍅 Tomatoes</strong>
                  <small>Moisture {zones[1].moisture}%</small>
                </div>

                <div className="map-zone zone-three">
                  <span>ZONE C</span>
                  <strong>🌱 Rice</strong>
                  <small>Moisture {zones[2].moisture}%</small>
                </div>

                <div className="map-road">FARM ACCESS ROAD</div>
              </div>

              <p className="notice">
                This illustration is not based on surveyed field
                boundaries or GPS coordinates.
              </p>
            </section>
          ) : activePage === "Irrigation" ? (
            <section className="content-card irrigation-card">
              <div className="section-heading">
                <div>
                  <div className="section-kicker">
                    WATER MANAGEMENT
                  </div>

                  <h2>Irrigation control</h2>

                  <p>
                    Demo controls only; no physical pump is connected.
                  </p>
                </div>

                <span
                  className={`status-chip ${
                    irrigationOn ? "healthy-chip" : "warning-chip"
                  }`}
                >
                  ●{" "}
                  {irrigationOn
                    ? "Demo irrigation ON"
                    : "Demo irrigation OFF"}
                </span>
              </div>

              <div className="irrigation-control">
                <div className="water-icon">💧</div>

                <div className="irrigation-copy">
                  <h3>Main irrigation system</h3>
                  <p>
                    Use this switch to preview the dashboard
                    interaction.
                  </p>
                </div>

                <button
                  type="button"
                  className={`toggle-switch ${
                    irrigationOn ? "toggle-on" : ""
                  }`}
                  aria-label="Toggle demo irrigation"
                  aria-pressed={irrigationOn}
                  onClick={() =>
                    setIrrigationOn(!irrigationOn)
                  }
                >
                  <span />
                </button>
              </div>

              <div className="irrigation-zones">
                {zones.map((zone) => (
                  <div key={zone.name} className="irrigation-zone">
                    <span>{zone.name}</span>
                    <strong>{zone.crop}</strong>

                    <div className="progress-track">
                      <div
                        style={{
                          width: `${zone.moisture}%`,
                        }}
                      />
                    </div>

                    <small>{zone.moisture}% moisture</small>
                  </div>
                ))}
              </div>

              <p className="notice">
                Do not use this demo switch to operate real irrigation
                equipment.
              </p>
            </section>
          ) : activePage === "Soil Analysis" ? (
            <section className="content-card soil-card">
              <div className="section-heading">
                <div>
                  <div className="section-kicker">SOIL HEALTH</div>

                  <h2>Soil analysis</h2>

                  <p>
                    Explore demo nutrient readings for each zone.
                  </p>
                </div>

                <span className="status-chip healthy-chip">
                  Demo readings
                </span>
              </div>

              <div className="zone-selector">
                {zones.map((zone) => (
                  <button
                    key={zone.name}
                    type="button"
                    className={`zone-select ${
                      cropName === zone.crop
                        ? "zone-selected"
                        : ""
                    }`}
                    onClick={() => setCropName(zone.crop)}
                  >
                    <span>{zone.name}</span>
                    <strong>{zone.crop}</strong>
                  </button>
                ))}
              </div>

              {zones
                .filter((zone) => zone.crop === cropName)
                .map((zone) => (
                  <div key={zone.name} className="soil-details">
                    <div className="ph-circle">
                      <span>SOIL pH</span>
                      <strong>{zone.ph}</strong>
                      <small>Demo value</small>
                    </div>

                    <div className="nutrient-list">
                      {[
                        ["Nitrogen (N)", zone.nitrogen],
                        ["Phosphorus (P)", zone.phosphorus],
                        ["Potassium (K)", zone.potassium],
                      ].map(([name, value]) => (
                        <div
                          className="nutrient-row"
                          key={name}
                        >
                          <div>
                            <span>{name}</span>
                            <strong>{value}%</strong>
                          </div>

                          <div className="progress-track">
                            <div
                              style={{
                                width: `${value}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              <p className="notice">
                These values are illustrative, not laboratory soil
                results. Confirm nutrient levels with a soil test.
              </p>
            </section>
          ) : activePage === "Weather" ? (
            <section className="content-card weather-card">
              <div className="section-heading">
                <div>
                  <div className="section-kicker">
                    WEATHER MONITORING
                  </div>

                  <h2>Weather outlook</h2>

                  <p>
                    Illustrative forecast cards; live weather is not
                    connected.
                  </p>
                </div>

                <span className="weather-location">
                  📍 Green Valley Farm · Demo
                </span>
              </div>

              <div className="weather-current">
                <div>
                  <span>DEMO CONDITIONS</span>
                  <h3>
                    ☀️ 28°<small>C</small>
                  </h3>
                  <p>Partly cloudy · Illustrative only</p>
                </div>

                <div className="weather-stat">
                  <span>Humidity</span>
                  <strong>62%</strong>
                </div>

                <div className="weather-stat">
                  <span>Wind</span>
                  <strong>12 km/h</strong>
                </div>

                <div className="weather-stat">
                  <span>Rainfall</span>
                  <strong>0 mm</strong>
                </div>
              </div>

              <h3 className="forecast-title">
                7-day forecast preview
              </h3>

              <div className="forecast-grid">
                {[
                  ["Mon", "☀️", "29°", "18°"],
                  ["Tue", "🌤️", "28°", "19°"],
                  ["Wed", "🌧️", "26°", "18°"],
                  ["Thu", "⛅", "27°", "17°"],
                  ["Fri", "☀️", "30°", "19°"],
                  ["Sat", "🌤️", "29°", "18°"],
                  ["Sun", "☀️", "31°", "20°"],
                ].map(([day, icon, high, low]) => (
                  <div className="forecast-day" key={day}>
                    <span>{day}</span>
                    <strong>{icon}</strong>
                    <b>{high}</b>
                    <small>{low}</small>
                  </div>
                ))}
              </div>

              <p className="notice">
                Forecast values are examples only. Check a live local
                forecast before making farm decisions.
              </p>
            </section>
          ) : activePage === "Analytics" ? (
            <section className="content-card analytics-card">
              <div className="section-heading">
                <div>
                  <div className="section-kicker">
                    FARM PERFORMANCE
                  </div>

                  <h2>Farm analytics</h2>

                  <p>
                    Visualize the illustrative moisture readings by
                    zone.
                  </p>
                </div>
              </div>

              <div className="chart-panel">
                <div className="chart-axis">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                <div className="bar-chart">
                  {zones.map((zone) => (
                    <div
                      className="bar-column"
                      key={zone.name}
                    >
                      <div className="bar-value">
                        {zone.moisture}%
                      </div>

                      <div className="bar-track">
                        <div
                          style={{
                            height: `${zone.moisture}%`,
                          }}
                        />
                      </div>

                      <strong>{zone.name}</strong>
                      <small>{zone.crop}</small>
                    </div>
                  ))}
                </div>
              </div>

              <p className="notice">
                Analytics are calculated from editable demo values,
                not live sensor readings.
              </p>
            </section>
          ) : null}

          {activePage === "Dashboard" && (
            <>
              <section className="metrics-grid">
                <MetricCard
                  icon="☀"
                  label="Temperature"
                  value="28.4"
                  unit="°C"
                  trend="+1.2°"
                  tone="orange"
                  footer="Compared with yesterday"
                />

                <MetricCard
                  icon="◌"
                  label="Air humidity"
                  value="62"
                  unit="%"
                  trend="−3%"
                  tone="blue"
                  footer="Compared with yesterday"
                />

                <MetricCard
                  icon="♧"
                  label="Soil moisture"
                  value="58"
                  unit="%"
                  trend="−5%"
                  tone="green"
                  footer="Across demo zones"
                />

                <MetricCard
                  icon="☂"
                  label="Today's rainfall"
                  value="0.0"
                  unit="mm"
                  trend="No rain"
                  tone="purple"
                  footer="Illustrative daily total"
                />
              </section>

              <section className="middle-grid">
                <div className="content-card field-card">
                  <div className="section-heading">
                    <div>
                      <div className="section-kicker">
                        FIELD OVERVIEW
                      </div>

                      <h2>Crop health by zone</h2>

                      <p>
                        Monitor moisture and crop status.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="text-button"
                      onClick={() => navTo("Field Map")}
                    >
                      View map ↗
                    </button>
                  </div>

                  <div className="zone-list">
                    {zones.map((zone, index) => (
                      <div className="zone-row" key={zone.name}>
                        <div
                          className={`crop-icon crop-icon-${index}`}
                        >
                          {index === 0
                            ? "🌾"
                            : index === 1
                              ? "🍅"
                              : "🌱"}
                        </div>

                        <div className="zone-info">
                          <strong>
                            {zone.name}{" "}
                            <span className="zone-separator">
                              ·
                            </span>{" "}
                            {zone.crop}
                          </strong>

                          <span>Soil moisture</span>

                          <div className="progress-track">
                            <div
                              style={{
                                width: `${zone.moisture}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="zone-percent">
                          {zone.moisture}%
                        </div>

                        <span
                          className={`status-chip ${
                            zone.status === "Healthy"
                              ? "healthy-chip"
                              : zone.status === "Too Wet"
                                ? "warning-chip"
                                : "danger-chip"
                          }`}
                        >
                          {zone.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="field-footer">
                    <span>
                      <i className="legend-dot green-dot" />
                      Healthy
                    </span>

                    <span>
                      <i className="legend-dot orange-dot" />
                      Needs attention
                    </span>

                    <button
                      type="button"
                      onClick={() => navTo("Soil Analysis")}
                    >
                      View soil report →
                    </button>
                  </div>
                </div>

                <div className="content-card weather-card-small">
                  <div className="section-heading">
                    <div>
                      <div className="section-kicker">
                        LOCAL CONDITIONS
                      </div>

                      <h2>Weather today</h2>
                    </div>

                    <button
                      type="button"
                      className="dots-button"
                      aria-label="Weather options"
                    >
                      •••
                    </button>
                  </div>

                  <div className="weather-hero">
                    <div>
                      <span>DEMO WEATHER</span>
                      <h3>
                        28°<small>C</small>
                      </h3>
                      <p>Partly cloudy</p>
                    </div>

                    <div className="weather-illustration">
                      🌤️
                    </div>
                  </div>

                  <div className="weather-details">
                    <div>
                      <span>💧 Humidity</span>
                      <strong>62%</strong>
                    </div>

                    <div>
                      <span>💨 Wind</span>
                      <strong>12 km/h</strong>
                    </div>

                    <div>
                      <span>🌧 Rainfall</span>
                      <strong>0.0 mm</strong>
                    </div>

                    <div>
                      <span>☀ UV index</span>
                      <strong>Moderate</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="weather-link"
                    onClick={() => navTo("Weather")}
                  >
                    View 7-day forecast ↗
                  </button>
                </div>
              </section>

              <section className="bottom-grid">
                <div className="content-card irrigation-summary">
                  <div className="section-heading">
                    <div>
                      <div className="section-kicker">
                        SMART WATERING
                      </div>

                      <h2>Irrigation overview</h2>

                      <p>
                        Review moisture levels and preview controls.
                      </p>
                    </div>

                    <div className="water-icon-small">💧</div>
                  </div>

                  <div className="irrigation-summary-body">
                    <div className="irrigation-number">
                      <strong>
                        {irrigationOn ? "ON" : "OFF"}
                      </strong>

                      <span>Demo system status</span>
                    </div>

                    <button
                      type="button"
                      className={`toggle-switch ${
                        irrigationOn ? "toggle-on" : ""
                      }`}
                      aria-label="Toggle demo irrigation"
                      aria-pressed={irrigationOn}
                      onClick={() =>
                        setIrrigationOn(!irrigationOn)
                      }
                    >
                      <span />
                    </button>
                  </div>

                  <div className="irrigation-tip">
                    <span>✦</span>

                    <p>
                      <strong>Smart tip</strong>
                      <br />

                      {zones[0].moisture < 40
                        ? "Zone A may need irrigation. Verify field conditions before watering."
                        : "Review soil moisture regularly and adjust irrigation to crop needs."}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="card-link"
                    onClick={() => navTo("Irrigation")}
                  >
                    Manage irrigation →
                  </button>
                </div>

                <div className="content-card alerts-card">
                  <div className="section-heading">
                    <div>
                      <div className="section-kicker">
                        FARM ACTIVITY
                      </div>

                      <h2>Alerts &amp; recommendations</h2>
                    </div>

                    <span className="alert-count">
                      {zones.filter((zone) => zone.moisture < 40)
                        .length + 1}
                    </span>
                  </div>

                  <div className="alert-row">
                    <div className="alert-icon alert-orange">
                      !
                    </div>

                    <div>
                      <strong>
                        Soil moisture needs attention
                      </strong>

                      <p>
                        Zone A is below 40% moisture. Check field
                        conditions before irrigating.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </section>
    </main>
  );
}