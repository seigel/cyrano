import {HELLO_COMMAND, register} from "../src/commands/hello";

const EXAMPLE_DISP_TOKENS = [
    'RED'
];
const EMPTY_EXAMPLE_DISP_TOKENS = [];

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        const result = commandDictionary[HELLO_COMMAND];
        expect(
            typeof result
        ).toEqual(
            'function'
        );
    });
});

describe('#parse', () => {
    const parse = register({})[HELLO_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(["HI", "THERE", "MONKEY"]);
                }
            ).toThrowError("Incompatible command tokens for >HELLO<. Expected 0 or 1, Got: 3");
        });

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(null);
                }
            ).not.toThrowError("Incompatible command tokens for >HELLO<. Expected 0 or 1, Got: 3");
        });
    });

    describe("valid parameters", () => {
        describe("hello command with one parameter", () => {
            beforeEach(() => {
                const tokens = [...EXAMPLE_DISP_TOKENS];
                parsedResult = parse(tokens);
            });

            test('has the command in the result', () => {
                expect(
                    parsedResult['command']
                ).toEqual(
                    HELLO_COMMAND
                )
            });

            test('piste code', () => {
                expect(
                    parsedResult['pisteCode']
                ).toEqual(
                    "RED"
                )
            });
        });
        describe("hello command with no parameter", () => {
            beforeEach(() => {
                const tokens = [...EMPTY_EXAMPLE_DISP_TOKENS];
                parsedResult = parse(tokens);
            });

            test('has the command in the result', () => {
                expect(
                    parsedResult['command']
                ).toEqual(
                    HELLO_COMMAND
                )
            });

            test('piste code', () => {
                expect(
                    parsedResult['pisteCode']
                ).toEqual(
                    ""
                )
            });
        });
    });
});
