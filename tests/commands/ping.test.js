import {PING_COMMAND, register} from "../../src/commands/ping";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        const result = commandDictionary[PING_COMMAND];
        expect(
            typeof result
        ).toEqual(
            'function'
        );
    });
});

describe('#parse', () => {
    const parse = register({})[PING_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(["HI", "THERE", "MONKEY"]);
                }
            ).toThrowError(`Incompatible command tokens for >${PING_COMMAND}<. Expected 0, Got: 3`);
        });

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(null);
                }
            ).not.toThrowError("Anything");
        });
    });

    describe("valid parameters", () => {
        describe("ping command with no parameter", () => {
            beforeEach(() => {
                const tokens = [];
                parsedResult = parse(tokens);
            });

            test('has the command in the result', () => {
                expect(
                    parsedResult['command']
                ).toEqual(
                    PING_COMMAND
                )
            });
        });
    });
});
