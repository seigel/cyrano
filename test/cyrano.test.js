import {process} from "../src/protocol/cyrano";

const DISP_COMMAND_EXAMPLE = "|EFP2|DISP|RED|24|EIM|T32|1|32|14:45|3:00|33| IVANOV Sidor|CAN|||531|LIMON Jua|FRA|||";

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
            "DISP"
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
