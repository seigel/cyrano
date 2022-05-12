import {process} from "../../src/protocol/cyrano";
import {DISP_COMMAND} from "../../src/commands/disp";
import {HELLO_COMMAND} from "../../src/commands/hello";
import {tokenize} from "../../src/protocol/cylex";

const DISP_COMMAND_EXAMPLE = "|EFP2|DISP|RED|24|EIM|T32|1|32|14:45|3:00|33| IVANOV Sidor|CAN|||531|LIMON Jua|FRA|||";
const HELLO_COMMAND_EXAMPLE = "|EFP2|HELLO|RED|";

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
