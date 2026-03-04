/**
 * EFP2 Demo — Bout Lifecycle
 *
 * Simulates a Server (competition software) and a Master (scoring machine)
 * communicating over UDP on loopback, following the EFP2 protocol spec.
 *
 * Network topology (loopback):
 *   Server  127.0.0.1:50100  — listens for Masters, manages bouts
 *   Master  127.0.0.1:50101  — piste RED scoring machine
 *
 * Lifecycle demonstrated:
 *   1. Master  → HELLO RED          (comes online)
 *   2. Server  → DISP RED …         (assigns a bout)
 *   3. Master  → INFO … state=A     (Not active, waiting for referee)
 *   4. Master  → INFO … state=F     (Fencing, score advances each tick)
 *   5. Master  → INFO … state=E ×n  (Ending, sends every 1 s for up to 4 s)
 *   6. Server  → ACK                (accepts the result)
 *   7. Master  → INFO … state=A     (returns to Not active)
 *
 * State codes used in the INFO 'state' field:
 *   'A' — Not active   (DISP received, bout not yet started)
 *   'F' — Fencing      (bout in progress)
 *   'E' — Ending       (referee deactivated, awaiting ACK/NAK)
 */

import dgram  from 'dgram';
import { compose, process } from '../src/protocol/cyrano.js';

const SERVER_PORT = 50100;
const MASTER_PORT = 50101;
const HOST        = '127.0.0.1';
const PISTE       = 'RED';

// ── Colour helpers ────────────────────────────────────────────────────────────
const reset  = s => `\x1b[0m${s}\x1b[0m`;
const dim    = s => `\x1b[2m${s}\x1b[0m`;
const bold   = s => `\x1b[1m${s}\x1b[0m`;
const cyan   = s => `\x1b[36m${s}\x1b[0m`;
const yellow = s => `\x1b[33m${s}\x1b[0m`;
const green  = s => `\x1b[32m${s}\x1b[0m`;
const red    = s => `\x1b[31m${s}\x1b[0m`;

function log(actor, dir, summary, wire = null) {
    const label  = actor === 'SERVER' ? cyan(bold('SERVER')) : yellow(bold('MASTER'));
    const arrow  = dir === 'tx' ? '→' : '←';
    const detail = wire ? `  ${dim(wire.trim())}` : '';
    console.log(`  ${label}  ${arrow}  ${summary}${detail}`);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Send a command object as a UDP datagram ───────────────────────────────────
function send(socket, commandObj, toPort, toHost = HOST) {
    const wire = compose(commandObj);
    const buf  = Buffer.from(wire, 'ascii');
    return new Promise((resolve, reject) =>
        socket.send(buf, toPort, toHost, err => err ? reject(err) : resolve(wire))
    );
}

// ── Fixture data (matches the cyrano.test.js examples) ───────────────────────
const RIGHT_FENCER = {
    id:           '33',
    name:         'IVANOV Sidor',
    teamInfo:     'RUS',
    teamMemberId: '',
    teamMemberName: '',
};
const LEFT_FENCER = {
    id:           '531',
    name:         'LIMON Jua',
    teamInfo:     'FRA',
    teamMemberId: '',
    teamMemberName: '',
};

const BOUT_HEADER = {
    piste:            PISTE,
    eventId:          '24',
    competitionCode:  'EIM',
    competitionPhase: 'T32',
    boutOrderInPhase: '1',
    roundNumber:      '1',
    boutId:           '32',
    beginTime:        '14:45',
    stopwatch:        '3:00',
    refereeRemoteControl: '0',
    priority:         'N',
    callTechnician:   '0',
    callVideoEngineer:'0',
    callDoctor:       '0',
    callDT:           '0',
    reverse:          '0',
    standby:          '0',
};

/** Build an INFO command object for the given state and scores. */
function makeInfo(state, rightScore, leftScore, rightLamp = '0', leftLamp = '0') {
    return {
        command: 'INFO',
        ...BOUT_HEADER,
        state,
        rightFencer: {
            ...RIGHT_FENCER,
            score:      String(rightScore),
            yellowCard: '0',
            redCards:   '0',
            blackCard:  '0',
            usedVideo:  '0',
            lamp:       rightLamp,
            whiteLamp:  '0',
        },
        leftFencer: {
            ...LEFT_FENCER,
            score:      String(leftScore),
            yellowCard: '0',
            redCards:   '0',
            blackCard:  '0',
            usedVideo:  '0',
            lamp:       leftLamp,
            whiteLamp:  '0',
        },
    };
}

/** Build a DISP command object for the bout assignment. */
function makeDisp() {
    return {
        command:          'DISP',
        piste:            PISTE,
        eventId:          '24',
        competitionCode:  'EIM',
        competitionPhase: 'T32',
        boutOrderInPhase: '1',
        boutId:           '32',
        beginTime:        '14:45',
        stopwatch:        '3:00',
        rightFencer: {
            id:             RIGHT_FENCER.id,
            name:           RIGHT_FENCER.name,
            teamInfo:       RIGHT_FENCER.teamInfo,
            teamId:         '',
            teamMemberName: '',
        },
        leftFencer: {
            id:             LEFT_FENCER.id,
            name:           LEFT_FENCER.name,
            teamInfo:       LEFT_FENCER.teamInfo,
            teamId:         '',
            teamMemberName: '',
        },
    };
}

// ── SERVER ────────────────────────────────────────────────────────────────────
async function startServer() {
    const socket = dgram.createSocket('udp4');

    socket.on('message', async (raw) => {
        const wire = raw.toString('ascii');
        const obj  = process(wire);

        switch (obj.command) {

            case 'HELLO': {
                log('SERVER', 'rx', `${bold('HELLO')}  piste=${obj.pisteCode}`, wire);
                // Assign a bout to this piste
                await delay(400);
                const disp = makeDisp();
                const sent = await send(socket, disp, MASTER_PORT);
                log('SERVER', 'tx',
                    `${bold('DISP')}  ${obj.pisteCode} — ` +
                    `${RIGHT_FENCER.name} (${RIGHT_FENCER.teamInfo}) ` +
                    `vs ${LEFT_FENCER.name} (${LEFT_FENCER.teamInfo})`, sent);
                break;
            }

            case 'INFO': {
                const rs = obj.rightFencer.score;
                const ls = obj.leftFencer.score;
                const st = obj.state;

                const stateLabel = { A: 'Not active', F: 'Fencing', E: 'Ending' }[st] ?? st;
                log('SERVER', 'rx',
                    `${bold('INFO')}  state=${bold(stateLabel)}  ` +
                    `${cyan(RIGHT_FENCER.name + ' ' + rs)} ${dim('–')} ${yellow(LEFT_FENCER.name + ' ' + ls)}`,
                    wire);

                if (st === 'E') {
                    // Accept the bout result
                    await delay(700);
                    const sent = await send(socket, { command: 'ACK' }, MASTER_PORT);
                    log('SERVER', 'tx', `${bold('ACK')}  ${green('result accepted')}`, sent);
                }
                break;
            }
        }
    });

    await new Promise(resolve => socket.bind(SERVER_PORT, HOST, resolve));
    console.log(cyan(`  Server  bound  ${HOST}:${SERVER_PORT}`));
    return socket;
}

// ── MASTER ────────────────────────────────────────────────────────────────────
async function startMaster(serverSocket) {
    const socket = dgram.createSocket('udp4');
    let endingTimer = null;

    socket.on('message', async (raw) => {
        const wire = raw.toString('ascii');
        const obj  = process(wire);

        switch (obj.command) {

            case 'DISP': {
                log('MASTER', 'rx', `${bold('DISP')}  bout assigned`, wire);

                // Transition to Not active — send initial INFO
                const infoA = makeInfo('A', 0, 0);
                const sentA = await send(socket, infoA, SERVER_PORT);
                log('MASTER', 'tx', `${bold('INFO')}  state=Not active  score=0–0`, sentA);

                // Short pause then referee starts the bout
                await delay(500);
                simulateFencing(socket);
                break;
            }

            case 'ACK': {
                log('MASTER', 'rx', `${bold('ACK')}`, wire);
                clearInterval(endingTimer);
                endingTimer = null;

                // Return to Not active with final score
                const infoFinal = makeInfo('A', 5, 3);
                const sentFinal = await send(socket, infoFinal, SERVER_PORT);
                log('MASTER', 'tx',
                    `${bold('INFO')}  state=Not active  score=5–3  ${green('(bout complete)')}`,
                    sentFinal);

                await delay(300);
                console.log('\n' + green(bold('  ✓  Bout lifecycle complete')) + '\n');
                socket.close();
                serverSocket.close();
                break;
            }

            case 'NAK': {
                log('MASTER', 'rx', `${bold('NAK')}  ${red('result rejected — entering Waiting')}`, wire);
                clearInterval(endingTimer);
                socket.close();
                serverSocket.close();
                break;
            }
        }
    });

    /** Score progression for a 5–3 bout (right wins).
     *  Each step: [rightScore, leftScore, rightLamp, leftLamp] */
    const SCORE_STEPS = [
        [1, 0, '1', '0'],
        [1, 1, '0', '1'],
        [2, 1, '1', '0'],
        [3, 1, '1', '0'],
        [3, 2, '0', '1'],
        [4, 2, '1', '0'],
        [4, 3, '0', '1'],
        [5, 3, '1', '0'],   // final touch — right wins
    ];

    async function simulateFencing(socket) {
        console.log(dim('\n  ── Fencing ──────────────────────────────'));
        for (const [rs, ls, rl, ll] of SCORE_STEPS) {
            await delay(600);
            const info = makeInfo('F', rs, ls, rl, ll);
            const sent = await send(socket, info, SERVER_PORT);
            log('MASTER', 'tx',
                `${bold('INFO')}  state=Fencing  score=${cyan(rs)}–${yellow(ls)}`,
                sent);
        }

        // Referee deactivates bout — enter Ending state
        console.log(dim('\n  ── Ending (awaiting ACK/NAK) ────────────'));
        let endingCount = 0;
        endingTimer = setInterval(async () => {
            endingCount++;
            const info = makeInfo('E', 5, 3);
            const sent = await send(socket, info, SERVER_PORT);
            log('MASTER', 'tx',
                `${bold('INFO')}  state=Ending  score=5–3  ${dim(`(${endingCount}/4)`)}`,
                sent);

            if (endingCount >= 4) {
                // Timeout — no ACK received, transition to Waiting
                clearInterval(endingTimer);
                log('MASTER', 'tx',
                    `${red(bold('timeout'))}  no ACK after 4 s — would enter Waiting state`);
                socket.close();
                serverSocket.close();
            }
        }, 1000);
    }

    await new Promise(resolve => socket.bind(MASTER_PORT, HOST, resolve));
    console.log(yellow(`  Master  bound  ${HOST}:${MASTER_PORT}`) +
                dim(`  (piste ${PISTE})`));
    return socket;
}

// ── Entry point ───────────────────────────────────────────────────────────────
async function main() {
    console.log(bold('\n  ══════════════════════════════════════'));
    console.log(bold('   EFP2 Demo — Bout Lifecycle           '));
    console.log(bold('  ══════════════════════════════════════\n'));

    const serverSocket = await startServer();
    const masterSocket = await startMaster(serverSocket);

    // Master initiates contact
    console.log(dim('\n  ── Handshake ─────────────────────────'));
    await delay(100);
    const helloWire = await send(masterSocket, { command: 'HELLO', pisteCode: PISTE }, SERVER_PORT);
    log('MASTER', 'tx', `${bold('HELLO')}  pisteCode=${PISTE}`, helloWire);
}

main().catch(err => {
    console.error(red(bold('Fatal: ')) + err.message);
    process.exit(1);
});
