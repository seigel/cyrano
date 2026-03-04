import {process, compose} from "../../src/protocol/cyrano";
import {ACK_COMMAND} from "../../src/commands/ack";
import {BOUTSTOP_COMMAND} from "../../src/commands/boutstop";
import {BROKEN_COMMAND} from "../../src/commands/broken";
import {DENY_COMMAND} from "../../src/commands/deny";
import {DISP_COMMAND} from "../../src/commands/disp";
import {GETTEAM_COMMAND} from "../../src/commands/getteam";
import {HELLO_COMMAND} from "../../src/commands/hello";
import {INFO_COMMAND} from "../../src/commands/info";
import {MSG_COMMAND} from "../../src/commands/msg";
import {NAK_COMMAND} from "../../src/commands/nak";
import {NEXT_COMMAND} from "../../src/commands/next";
import {PING_COMMAND} from "../../src/commands/ping";
import {PREV_COMMAND} from "../../src/commands/prev";
import {REPLACE_COMMAND} from "../../src/commands/replace";
import {STANDBY_COMMAND} from "../../src/commands/standby";
import {STOP_COMMAND} from "../../src/commands/stop";
import {TEAM_COMMAND} from "../../src/commands/team";
import {UPDATED_COMMAND} from "../../src/commands/updated";

const ACK_EXAMPLE       = "|EFP2|ACK|";
const BOUTSTOP_EXAMPLE  = "|EFP2|BOUTSTOP|RED|";
const BROKEN_EXAMPLE    = "|EFP2|BROKEN|3|";
const DENY_EXAMPLE      = "|EFP2|DENY|Piste does not exists|";
const DISP_EXAMPLE      = "|EFP2|DISP|RED|24|EIM|T32|1|32|14:45|3:00|33| IVANOV Sidor|CAN|||531|LIMON Jua|FRA|||";
const GETTEAM_EXAMPLE   = "|EFP2|GETTEAM|RED|LEFT|";
const HELLO_EXAMPLE     = "|EFP2|HELLO|RED|";
const INFO_EXAMPLE      = "|EFP2|INFO|RED|24|EIM|T32|1|1|32|14:45|3:00|F|0|N|0|0|0|0|0|0|33|IVANOV Sidor|RUS|||5|0|0|0|0|1|0|531|LIMON Jua|FRA|||3|1|0|0|1|0|0|";
const MSG_EXAMPLE       = "|EFP2|MSG|BLUE|Glove missing|";
const NAK_EXAMPLE       = "|EFP2|NAK|";
const NEXT_EXAMPLE      = "|EFP2|NEXT|RED|";
const PING_EXAMPLE      = "|EFP2|PING|";
const PREV_EXAMPLE      = "|EFP2|PREV|1|";
const REPLACE_EXAMPLE   = "|EFP2|REPLACE|RED|LEFT|1|";
const STANDBY_EXAMPLE   = "|EFP2|STANDBY|FINAL|";
const STOP_EXAMPLE      = "|EFP2|STOP|";
const TEAM_EXAMPLE      = "|EFP2|TEAM|RED|LEFT|234|IVANOV Fedor|542|PETROV Ivan|43|SIDOROV Evgeny|2|OH Semen|1|2|3|2|1|3|3|1|2|435533|";
const UPDATED_EXAMPLE   = "|EFP2|UPDATED|23|EIM|";

describe('#process', () => {
    test('unsupported protocol', () => {
        expect(
            () => { process("|JAMES|DISP|NOT RELEVANT"); }
        ).toThrowError("Unsupported protocol >JAMES<");
    });

    test('unknown command throws', () => {
        expect(
            () => { process("|EFP2|FOOBAR|"); }
        ).toThrow();
    });

    test('extract command name for ACK', () => {
        expect(process(ACK_EXAMPLE)["command"]).toEqual(ACK_COMMAND);
    });

    test('extract command name for BOUTSTOP', () => {
        expect(process(BOUTSTOP_EXAMPLE)["command"]).toEqual(BOUTSTOP_COMMAND);
    });

    test('extract command name for BROKEN', () => {
        expect(process(BROKEN_EXAMPLE)["command"]).toEqual(BROKEN_COMMAND);
    });

    test('extract command name for DENY', () => {
        expect(process(DENY_EXAMPLE)["command"]).toEqual(DENY_COMMAND);
    });

    test('extract command name for DISP', () => {
        expect(process(DISP_EXAMPLE)["command"]).toEqual(DISP_COMMAND);
    });

    test('extract command name for GETTEAM', () => {
        expect(process(GETTEAM_EXAMPLE)["command"]).toEqual(GETTEAM_COMMAND);
    });

    test('extract command name for HELLO', () => {
        expect(process(HELLO_EXAMPLE)["command"]).toEqual(HELLO_COMMAND);
    });

    test('extract command name for INFO', () => {
        expect(process(INFO_EXAMPLE)["command"]).toEqual(INFO_COMMAND);
    });

    test('extract command name for MSG', () => {
        expect(process(MSG_EXAMPLE)["command"]).toEqual(MSG_COMMAND);
    });

    test('extract command name for NAK', () => {
        expect(process(NAK_EXAMPLE)["command"]).toEqual(NAK_COMMAND);
    });

    test('extract command name for NEXT', () => {
        expect(process(NEXT_EXAMPLE)["command"]).toEqual(NEXT_COMMAND);
    });

    test('extract command name for PING', () => {
        expect(process(PING_EXAMPLE)["command"]).toEqual(PING_COMMAND);
    });

    test('extract command name for PREV', () => {
        expect(process(PREV_EXAMPLE)["command"]).toEqual(PREV_COMMAND);
    });

    test('extract command name for REPLACE', () => {
        expect(process(REPLACE_EXAMPLE)["command"]).toEqual(REPLACE_COMMAND);
    });

    test('extract command name for STANDBY', () => {
        expect(process(STANDBY_EXAMPLE)["command"]).toEqual(STANDBY_COMMAND);
    });

    test('extract command name for STOP', () => {
        expect(process(STOP_EXAMPLE)["command"]).toEqual(STOP_COMMAND);
    });

    test('extract command name for TEAM', () => {
        expect(process(TEAM_EXAMPLE)["command"]).toEqual(TEAM_COMMAND);
    });

    test('extract command name for UPDATED', () => {
        expect(process(UPDATED_EXAMPLE)["command"]).toEqual(UPDATED_COMMAND);
    });
});

describe('#compose', () => {
    test('throws for unknown command', () => {
        expect(() => { compose({ command: 'FOOBAR' }); })
            .toThrowError("No builder registered for command >FOOBAR<");
    });

    describe('ACK round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(ACK_EXAMPLE))).toEqual(ACK_EXAMPLE);
        });
    });

    describe('BOUTSTOP round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(BOUTSTOP_EXAMPLE))).toEqual(BOUTSTOP_EXAMPLE);
        });
    });

    describe('BROKEN round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(BROKEN_EXAMPLE))).toEqual(BROKEN_EXAMPLE);
        });
    });

    describe('DENY round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(DENY_EXAMPLE))).toEqual(DENY_EXAMPLE);
        });
    });

    describe('DISP round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(DISP_EXAMPLE))).toEqual(DISP_EXAMPLE);
        });
    });

    describe('GETTEAM round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(GETTEAM_EXAMPLE))).toEqual(GETTEAM_EXAMPLE);
        });
    });

    describe('HELLO round-trip', () => {
        test('with piste code', () => {
            expect(compose(process(HELLO_EXAMPLE))).toEqual(HELLO_EXAMPLE);
        });

        test('without piste code', () => {
            const bare = '|EFP2|HELLO|';
            expect(compose(process(bare))).toEqual(bare);
        });
    });

    describe('INFO round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(INFO_EXAMPLE))).toEqual(INFO_EXAMPLE);
        });
    });

    describe('MSG round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(MSG_EXAMPLE))).toEqual(MSG_EXAMPLE);
        });
    });

    describe('NAK round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(NAK_EXAMPLE))).toEqual(NAK_EXAMPLE);
        });
    });

    describe('NEXT round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(NEXT_EXAMPLE))).toEqual(NEXT_EXAMPLE);
        });
    });

    describe('PING round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(PING_EXAMPLE))).toEqual(PING_EXAMPLE);
        });
    });

    describe('PREV round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(PREV_EXAMPLE))).toEqual(PREV_EXAMPLE);
        });
    });

    describe('REPLACE round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(REPLACE_EXAMPLE))).toEqual(REPLACE_EXAMPLE);
        });
    });

    describe('STANDBY round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(STANDBY_EXAMPLE))).toEqual(STANDBY_EXAMPLE);
        });
    });

    describe('STOP round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(STOP_EXAMPLE))).toEqual(STOP_EXAMPLE);
        });
    });

    describe('TEAM round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(TEAM_EXAMPLE))).toEqual(TEAM_EXAMPLE);
        });
    });

    describe('UPDATED round-trip', () => {
        test('round-trips correctly', () => {
            expect(compose(process(UPDATED_EXAMPLE))).toEqual(UPDATED_EXAMPLE);
        });
    });
});
