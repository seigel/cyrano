# EFP2 Demo — Bout Lifecycle

Demonstrates a **Server** (competition software) and a **Master** (scoring machine) communicating over real UDP packets on loopback, using the full EFP2 protocol stack built in this repository.

## Run it

```
npm run demo
```

This bundles `demo/run.js` with esbuild and executes it. No external dependencies, no separate processes — both actors run in the same Node.js process on two UDP sockets.

---

## Network topology

```
Server   127.0.0.1:50100   Competition software — manages bouts, accepts results
Master   127.0.0.1:50101   Scoring machine on piste RED
```

This mirrors the real EFP2 topology defined in the spec:

| Node | IP | Port |
|------|----|------|
| Server | 172.20.0.1 | 50100 (from Masters) |
| Master (piste x) | 172.20.x.1 | 50101 (from Additional devices) |

---

## Bout fixture

The demo uses real competition data from the protocol examples:

| Field | Value |
|-------|-------|
| Piste | `RED` |
| Event ID | `24` |
| Competition | `EIM` (Épée Individual Men) |
| Phase | `T32` (Table of 32) |
| Bout ID | `32` |
| Right fencer | IVANOV Sidor — `RUS` — ID `33` |
| Left fencer | LIMON Jua — `FRA` — ID `531` |
| Final score | **5 – 3** (right wins) |

---

## Lifecycle walkthrough

### 1. Handshake

The Master comes online and announces itself with `HELLO`. The Server receives it and responds by assigning a bout with `DISP`.

```
MASTER  →  HELLO  pisteCode=RED
             |EFP2|HELLO|RED|

SERVER  →  DISP   RED — IVANOV Sidor (RUS) vs LIMON Jua (FRA)
             |EFP2|DISP|RED|24|EIM|T32|1|32|14:45|3:00|33|IVANOV Sidor|RUS|||531|LIMON Jua|FRA|||
```

### 2. Not active

On receiving `DISP` the Master transitions to **Not active** and sends an `INFO` confirming that state, with score 0–0.

```
MASTER  →  INFO  state=Not active  score=0–0
             |EFP2|INFO|RED|24|EIM|T32|1|1|32|14:45|3:00|A|0|N|0|0|0|0|0|0|
             33|IVANOV Sidor|RUS|||0|0|0|0|0|0|0|
             531|LIMON Jua|FRA|||0|0|0|0|0|0|0|
```

The `INFO` state field encodes the Master's current state. State codes used in this demo:

| Code | State |
|------|-------|
| `A` | Not active — bout assigned, waiting for referee to start |
| `F` | Fencing — bout in progress |
| `E` | Ending — referee deactivated, awaiting `ACK` or `NAK` |

### 3. Fencing

The referee starts the bout. The Master sends an `INFO` for each touch, advancing the score. The lamp fields (`1`/`0`) indicate which fencer triggered the scoring.

```
MASTER  →  INFO  state=Fencing  score=1–0   (right scores)
MASTER  →  INFO  state=Fencing  score=1–1   (left scores)
MASTER  →  INFO  state=Fencing  score=2–1
MASTER  →  INFO  state=Fencing  score=3–1
MASTER  →  INFO  state=Fencing  score=3–2
MASTER  →  INFO  state=Fencing  score=4–2
MASTER  →  INFO  state=Fencing  score=4–3
MASTER  →  INFO  state=Fencing  score=5–3   (right wins — final touch)
```

Each wire message carries the full bout context. For example, the final touch:

```
|EFP2|INFO|RED|24|EIM|T32|1|1|32|14:45|3:00|F|0|N|0|0|0|0|0|0|
33|IVANOV Sidor|RUS|||5|0|0|0|0|1|0|
531|LIMON Jua|FRA|||3|0|0|0|0|0|0|
```

### 4. Ending

The referee deactivates the bout. The Master enters the **Ending** state and broadcasts `INFO` once per second for up to 4 seconds, waiting for an `ACK` or `NAK` from the Server.

```
MASTER  →  INFO  state=Ending  score=5–3  (1/4)
             |EFP2|INFO|RED|24|EIM|T32|1|1|32|14:45|3:00|E|...|5|...|3|...|
```

### 5. ACK — result accepted

The Server receives the `Ending` INFO and sends `ACK` to accept the result. The Master clears its ending timer and transitions back to **Not active**.

```
SERVER  →  ACK
             |EFP2|ACK|

MASTER  →  INFO  state=Not active  score=5–3  (bout complete)
```

---

## Timeout path (NAK / no response)

If the Server sends `NAK`, or if no `ACK`/`NAK` arrives within 4 seconds (4 Ending broadcasts), the Master gives up and would transition to **Waiting** state. The demo logs this path:

```
MASTER  →  INFO  state=Ending  score=5–3  (4/4)
           timeout — no ACK after 4 s — would enter Waiting state
```

To trigger it, comment out the `ACK` send in `demo/run.js` inside the `'E'` state handler.

---

## How it uses the protocol stack

Every message in the demo flows through the same code used in production:

| Direction | Function | File |
|-----------|----------|------|
| Build outgoing wire bytes | `compose(commandObject)` | `src/protocol/cyrano.js` |
| Parse incoming wire bytes | `process(rawMessage)` | `src/protocol/cyrano.js` |
| Tokenise raw string | `tokenize(raw)` | `src/protocol/cylex.js` |
| Per-command serialise | `build(obj)` | `src/commands/*.js` |
| Per-command deserialise | `parse(tokens)` | `src/commands/*.js` |

The demo does not reach into command files directly — it only calls `compose()` and `process()` at the protocol layer, the same API any real integration would use.
