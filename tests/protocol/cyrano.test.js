import {process} from "../../src/protocol/cyrano";
import {DISP_COMMAND} from "../../src/commands/disp";
import {HELLO_COMMAND} from "../../src/commands/hello";
import {PING_COMMAND} from "../../src/commands/ping";
import {STOP_COMMAND} from "../../src/commands/stop";
import {MSG_COMMAND} from "../../src/commands/msg";

const DISP_COMMAND_EXAMPLE = "|EFP2|DISP|RED|24|EIM|T32|1|32|14:45|3:00|33| IVANOV Sidor|CAN|||531|LIMON Jua|FRA|||";
const HELLO_COMMAND_EXAMPLE = "|EFP2|HELLO|RED|";
const PING_COMMAND_EXAMPLE = "|EFP2|PING|";
const STOP_COMMAND_EXAMPLE = "|EFP2|STOP|";
const MSG_COMMAND_EXAMPLE = "|EFP2|MSG|BLUE|Glove missing|";

describe('#process', () => {
    test('unsupported protocol', () => {
        expect(
            () => {
                process("|JAMES|DISP|NOT RELEVANT");
            }
        ).toThrowError("Unsupported protocol >JAMES<");
    });

    test('extract command name', () => {
        expect(
            process(DISP_COMMAND_EXAMPLE)["command"]
        ).toEqual(
            DISP_COMMAND
        );
    });

    test('extract command name for hello', () => {
        expect(
            process(HELLO_COMMAND_EXAMPLE)["command"]
        ).toEqual(
            HELLO_COMMAND
        );
    });

    test('extract command name for ping', () => {
        expect(
            process(PING_COMMAND_EXAMPLE)["command"]
        ).toEqual(
            PING_COMMAND
        );
    });

    test('extract command name for ping', () => {
        expect(
            process(STOP_COMMAND_EXAMPLE)["command"]
        ).toEqual(
            STOP_COMMAND
        );
    });

    test('extract command name for ping', () => {
        expect(
            process(MSG_COMMAND_EXAMPLE)["command"]
        ).toEqual(
            MSG_COMMAND
        );
    });

    test.skip('test display function', () => {
        expect(
            process(DISP_COMMAND_EXAMPLE)
        ).toEqual(
            {
                "command": "DISP",
                "piste": "RED",
                "eventId": "24",
                "competitionCode": "EIM",
                "competitionPhase": "T32",
                "red": {
                    "fencer": "bob"
                }
            }
        );
    });
});
