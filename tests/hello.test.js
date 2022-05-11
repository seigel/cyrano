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
