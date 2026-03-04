import {REPLACE_COMMAND, register, registerBuilder, build} from "../../src/commands/replace";

const EXAMPLE_REPLACE_TOKENS = [
    'RED', 'LEFT', '1'
];

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        const result = commandDictionary[REPLACE_COMMAND];
        expect(
            typeof result
        ).toEqual(
            'function'
        );
    });
});

describe('#parse', () => {
    const parse = register({})[REPLACE_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(["HI", "THERE"]);
                }
            ).toThrowError(`Incompatible command tokens for >${REPLACE_COMMAND}<. Expected 3, Got: 2`);
        });

        test('no issue with null tokens', () => {
            expect(
                () => {
                    parse(null);
                }
            ).toThrowError(`Incompatible command tokens for >${REPLACE_COMMAND}<. Expected 3, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        describe("replace command with piste, side, and fencer number", () => {
            beforeEach(() => {
                const tokens = [...EXAMPLE_REPLACE_TOKENS];
                parsedResult = parse(tokens);
            });

            test('has the command in the result', () => {
                expect(
                    parsedResult['command']
                ).toEqual(
                    REPLACE_COMMAND
                )
            });

            test('reads the piste', () => {
                expect(
                    parsedResult['piste']
                ).toEqual(
                    'RED'
                )
            });

            test('reads the side', () => {
                expect(
                    parsedResult['side']
                ).toEqual(
                    'LEFT'
                )
            });

            test('reads the fencer number', () => {
                expect(
                    parsedResult['fencerNumber']
                ).toEqual(
                    '1'
                )
            });
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[REPLACE_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command, piste, side and fencerNumber', () => {
        expect(build({ piste: 'RED', side: 'LEFT', fencerNumber: '1' }))
            .toEqual(['REPLACE', 'RED', 'LEFT', '1']);
    });
});
