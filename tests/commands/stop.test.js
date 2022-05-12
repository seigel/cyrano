import {STOP_COMMAND, register} from "../../src/commands/stop";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        const result = commandDictionary[STOP_COMMAND];
        expect(
            typeof result
        ).toEqual(
            'function'
        );
    });
});

describe('#parse', () => {
    const parse = register({})[STOP_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(["HI", "THERE", "MONKEY"]);
                }
            ).toThrowError(`Incompatible command tokens for >${STOP_COMMAND}<. Expected 0, Got: 3`);
        });

        test('no issue with token length for this parser', () => {
            expect(
                () => {
                    parse(null);
                }
            ).not.toThrowError("Anything");
        });
    });

    describe("valid parameters", () => {
        describe("stop command with no parameter", () => {
            beforeEach(() => {
                const tokens = [];
                parsedResult = parse(tokens);
            });

            test('has the command in the result', () => {
                expect(
                    parsedResult['command']
                ).toEqual(
                    STOP_COMMAND
                )
            });
        });
    });
});
