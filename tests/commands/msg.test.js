import {MSG_COMMAND, register} from "../../src/commands/msg";
import {DISP_COMMAND} from "../../src/commands/disp";

const EXAMPLE_MSG_TOKENS = [
    'RED', 'Red table come home'
];

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        const result = commandDictionary[MSG_COMMAND];
        expect(
            typeof result
        ).toEqual(
            'function'
        );
    });
});

describe('#parse', () => {
    const parse = register({})[MSG_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(["HI", "THERE", "MONKEY", "Honey", "BUNCH"]);
                }
            ).toThrowError(`Incompatible command tokens for >${MSG_COMMAND}<. Expected 2, Got: 5`);
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
        describe("msg command with a piste and a message", () => {
            beforeEach(() => {
                const tokens = [...EXAMPLE_MSG_TOKENS];
                parsedResult = parse(tokens);
            });

            test('has the command in the result', () => {
                expect(
                    parsedResult['command']
                ).toEqual(
                    MSG_COMMAND
                )
            });

            test('reads the piste', () => {
                expect(
                    parsedResult['piste']
                ).toEqual(
                    "RED"
                )
            });
            test('reads the message received', () => {
                expect(
                    parsedResult['message']
                ).toEqual(
                    EXAMPLE_MSG_TOKENS[1]
                )
            });
        });
    });
});
