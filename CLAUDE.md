# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cyrano is a Node.js service implementing the **EFP2 (Ethernet Fencing Protocol 2)** — a UDP-based protocol for networked fencing scoring machines. It bridges scoring machines (Masters) with competition management software (Managers), results servers, and display clients.

## Commands

```bash
npm test                    # Run all tests (requires --experimental-vm-modules)
npm test -- tests/path/to/file.test.js   # Run a single test file
npm test -- --testNamePattern="pattern"  # Run tests matching a name
npm run coverage            # Run tests with coverage report
npm run build               # Bundle with esbuild → build/
npm start                   # Run built app
npm run clean               # Remove node_modules and reinstall
```

## Architecture

**Entry point:** `index.js` — UDP server on port 50100

**Protocol pipeline:** `cylex.js` (tokenizer) → `cyrano.js` (processor) → `commands/` (handlers)

- `src/protocol/cyranoTokens.js` — Protocol constants (`EFP2`, `|` separator)
- `src/protocol/cylex.js` — Splits raw messages by `|` into token arrays
- `src/protocol/cyrano.js` — Validates EFP2 header, dispatches to command handlers
- `src/commands/index.js` — Auto-loads all command handlers from the `commands/` directory
- `src/commands/*.js` — Individual command handlers (HELLO, PING, STOP, MSG, DISP)

## EFP2 Protocol Reference

**Message format:** `|EFP2|COMMAND|param1|param2|...|`  (ASCII, fields delimited by `|`)

### Network Topology

| Node | IP | Ports |
|------|----|-------|
| Scoring machines Server | 172.20.0.1 | 50100 (from Masters), 50103 (from Managers) |
| Backup Scoring machines Server | 172.20.0.2 | same as primary |
| Master (piste x) | 172.20.x.1 (x=1..60) | 50100 (from Servers), 50101 (from Additional devices) |
| Additional devices (piste x) | 172.20.x.y (y=1..255) | any |
| Manager | 172.20.0.y (y=9..32) | any |
| Server of the Results | 172.20.0.8 | 50100 (from Servers), 50103 (from Managers), 50104 (from Clients) |
| Clients | 172.20.129–254.x | any |

### All Commands

| Command | Description | Params |
|---------|-------------|--------|
| `HELLO` | Node is online | 0–1 (optional piste code) |
| `PING` | Check node presence; recipient must reply `\|EFP2\|HELLO\|\|` | 0 |
| `STOP` | Disconnect / stop receiving | 0 |
| `DISP` | Set new bout on piste | 18 (see below) |
| `INFO` | Piste state (score, time, lights, cards, etc.) | ~40 fields |
| `ACK` | Bout result accepted | 0 |
| `NAK` | Bout result rejected | 0 |
| `NEXT` | Referee requests next match | 1 (piste code) |
| `PREV` | Referee requests previous match | 1 (piste code) |
| `TEAM` | Team member list for one side | 19 (piste, side, 3 members + reserve, 9 round assignments, unique ID) |
| `GETTEAM` | Request team list from Server of Results | 2 (piste code, side) |
| `REPLACE` | Team member substitution | 3 (piste code, side, fencer number 1–3) |
| `BOUTSTOP` | Cancel current DISP / clear piste | 1 (piste code) |
| `MSG` | Text message to display | 2 (piste code or `ALL`, message text ≤128 chars) |
| `STANDBY` | Switch apparatus to sleep mode | 1 (piste code) |
| `BROKEN` | Lost contact with piste | 1 (piste code) |
| `DENY` | Deny a request | reason string |
| `UPDATED` | XML competition data updated | 2 (event ID, competition code) |

### TEAM structure (20 tokens)
`members` is an array of 4: indices 0–2 are the active fencers, index 3 is the reserve.
`rounds` is a 9-element array of fencer numbers (1, 2, or 3) indicating who fences each round.

### DISP fields (fields 3–20)
PisteCode, EventID, CompetitionCode, Phase, Order, BoutID, TimeBegin, Stopwatch,
Right ID, Right Name, Right Nation, Right MemberID, Right MemberName,
Left ID, Left Name, Left Nation, Left MemberID, Left MemberName

### Piste codes
Numeric `1`–`59` for standard pistes; named `BLUE`, `YELLOW`, `GREEN`, `RED`, `FINAL` for final area pistes.

### Competition codes
`EIM`/`EIW`/`ETM`/`ETW` (épée), `FIM`/`FIW`/`FTM`/`FTW` (foil), `SIM`/`SIW`/`STM`/`STW` (sabre), `MIX`

### Master state machine
States: `Standalone` → `Indefinite` → `Not active` → `Halt`/`Fencing`/`Pause`/`Waiting`/`Ending`
- Enters `Not active` only on receiving `DISP`
- Enters `Ending` on manual bout deactivation; sends `INFO` every second for up to 4s awaiting `ACK`/`NAK`
- `ACK` → `Not active`; `NAK` or timeout → `Waiting`

## Testing

Tests mirror the `src/` structure under `tests/`. Jest runs with ES module support (`--experimental-vm-modules`). No transpilation is needed for tests — the project uses native ES modules.
