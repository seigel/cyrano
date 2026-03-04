import {BOUTSTOP_COMMAND, register, registerBuilder, build} from "../../src/commands/boutstop";

const EXAMPLE_BOUTSTOP_TOKENS = [
    'RED'
];

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        const result = commandDictionary[BOUTSTOP_COMMAND];
        expect(
            typeof result
        ).toEqual(
            'function'
        );
    });
});

describe('#parse', () => {
    const parse = register({})[BOUTSTOP_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(["HI", "THERE"]);
                }
            ).toThrow(`Incompatible command tokens for >${BOUTSTOP_COMMAND}<. Expected 1, Got: 2`);
        });

        test('no issue with null tokens', () => {
            expect(
                () => {
                    parse(null);
                }
            ).toThrow(`Incompatible command tokens for >${BOUTSTOP_COMMAND}<. Expected 1, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        describe("boutstop command with a piste code", () => {
            beforeEach(() => {
                const tokens = [...EXAMPLE_BOUTSTOP_TOKENS];
                parsedResult = parse(tokens);
            });

            test('has the command in the result', () => {
                expect(
                    parsedResult['command']
                ).toEqual(
                    BOUTSTOP_COMMAND
                )
            });

            test('reads the piste', () => {
                expect(
                    parsedResult['piste']
                ).toEqual(
                    'RED'
                )
            });
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[BOUTSTOP_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command and piste', () => {
        expect(build({ piste: 'RED' })).toEqual(['BOUTSTOP', 'RED']);
    });
});
