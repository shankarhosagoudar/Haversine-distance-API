# 🌎 Haversine Distance API

Project Status: Version 1.0 (Live)

Author: Shankar

Purpose: To provide high-precision geographic distance calculations with a human-centric, relatable context.

# Summary
The Quirky-Dist API is a microservice that calculates the Haversine distance between two sets of GPS coordinates. While the core engine provides high-precision data (meters), the unique selling point (USP) is the "Cognitive Scaling" engine, which translates abstract distances into relatable American cultural objects (e.g., Hot Dogs, Football Fields).

# Target Personas
The Recreational Runner: Wants to share "fun" stats on social media.

The Logistics Manager: Needs a quick gut-check on how close a driver is to a loading dock.

The Frontend Developer: Needs a reliable, pre-formatted API to power proximity features in a UI.

# Specific Use Cases & Implementation Examples
**Case A: The "Fun" UX (Using American Comparisons)**
Context: A "Scavenger Hunt" AR Game.

Point 1 (Fixed): The Hidden Treasure Chest (40.7484, -73.9857).

Point 2 (Mobile): The User's current GPS location.

The Experience: As the user walks, the API tells them: "You're getting close! Only 12 more Tractors to go!"

USP: Engagement and gamification.

**Case B: The Precision UX (Standard Distance USP)**
Context: Drone Delivery Landing Zone Safety.

Point 1 (Fixed): The Drone Landing Pad (34.0522, -118.2437).

Point 2 (Sensor): A moving obstacle detected by the drone.

The Experience: The API returns raw distance_meters. If the distance is < 2.0, the drone triggers an emergency hover.

USP: Safety and automation. Note: In this case, the american_comparison field is ignored or used only in administrative logs for human review.

**Case C: Real Estate "Walkability" Score**
Context: A Property Listing App.

Point 1: The Apartment for Rent.

Point 2: The nearest Starbucks or Subway Station.

The Experience: The app displays: "Commuter's Dream: The Subway is only 4 Basketball Fields away!"

USP: Helping a renter visualize the walk before they visit the property.

## ✨ Features

- **🏈 Quirky Comparisons** — Distances in hot dogs, fridges, tractors, basketball courts, and football fields
- **⚡ Blazing Fast** — Built with Fastify, because there is no fun in waiting
- **🛡️ Validated** — We check your coordinates so you don't accidentally measure the distance to Narnia
- **📖 Documented** — Swagger UI included, because we're not savages
- **🚦 Rate Limited** — 10 requests/minute, to keep the hot dog counters from overheating
Earth Radius ($R$): $6,371,000$ meters.
- **Precision** - API will round off inputs with more than 5 decimal points to prevent "coordinate jitter" in floating-point math.
- **Scalability** - The API is stateless, allowing it to be deployed in a Docker container or as a Serverless Function (AWS Lambda/Google Cloud Functions).

## Quick Start

Quick Start
1. Prerequisites
Ensure you have Node.js (v18+) and npm installed. If you are on a Mac and see command not found, please refer to our Installation Guide (referencing the NVM setup we performed).

2. Installation
Bash
git clone https://github.com/your-username/haversine-distance-api.git
cd haversine-distance-api
npm install

3. Run the Server
Bash
npm start

4. Test it

Bash
curl -X POST http://localhost:3000/distance \
  -H "Content-Type: application/json" \
  -d '{
    "point1": { "lat": 51.5074, "lon": -0.1278 },
    "point2": { "lat": 48.8566, "lon": 2.3522 }
  }'

```

#🏈 The American Conversion Chart

| Distance | Unit | Because... |
|----------|------|------------|
| < 1m | 🌭 Hot Dogs (6") | Everything starts with hot dogs |
| 1m - 10m | 🧊 Fridges | The universal American measuring stick |
| 10m - 100m | 🚜 Tractors | For when fridges just won't cut it |
| 100m - 1km | 🏀 Basketball Courts | Now we're getting sporty |
| > 1km | 🏈 Football Fields | The gold standard of American distance |

### `GET /health`

Returns `{ "status": "ok" }`. Riveting stuff.

### `GET /docs`

Swagger UI. Click buttons. See what happens.

## 🧪 Testing

```bash
npm test
```

15 tests. All passing. We checked.

## 🛠️ Tech Stack

| What | Why |
|------|-----|
| **Node.js 20+** | Because we're not living in the past |
| **Fastify** | Express, but faster and with better hair |
| **TypeScript** | JavaScript, but with trust issues |
| **Vitest** | Jest, but it actually works with ESM |

## 🔒 Production Features

- **Rate Limiting** — 10 req/min per IP (configurable)
- **Graceful Shutdown** — SIGTERM/SIGINT handling
- **Structured Errors** — JSON errors with codes and request IDs
- **Request Tracing** — X-Request-ID headers on every response

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `HOST` | 0.0.0.0 | Server host |
| `LOG_LEVEL` | info | Logging verbosity |
| `RATE_LIMIT_MAX` | 10 | Max requests per window |
| `RATE_LIMIT_WINDOW` | 60000 | Window in ms |

## 📜 License

MIT — Do whatever you want, just don't blame us if your hot dog calculations are off.

## Contributing
1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request