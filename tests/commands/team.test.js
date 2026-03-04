import {TEAM_COMMAND, register, registerBuilder, build} from "../../src/commands/team";

const EXAMPLE_TEAM_TOKENS = [
    'RED', 'LEFT',
    '234', 'IVANOV Fedor',
    '542', 'PETROV Ivan',
    '43', 'SIDOROV Evgeny',
    '2', 'OH Semen',
    '1', '2', '3', '2', '1', '3', '3', '1', '2',
    '435533'
];

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        const result = commandDictionary[TEAM_COMMAND];
        expect(
            typeof result
        ).toEqual(
            'function'
        );
    });
});

describe('#parse', () => {
    const parse = register({})[TEAM_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(["HI", "THERE"]);
                }
            ).toThrow(`Incompatible command tokens for >${TEAM_COMMAND}<. Expected 20, Got: 2`);
        });

        test('no issue with null tokens', () => {
            expect(
                () => {
                    parse(null);
                }
            ).toThrow(`Incompatible command tokens for >${TEAM_COMMAND}<. Expected 20, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        beforeEach(() => {
            const tokens = [...EXAMPLE_TEAM_TOKENS];
            parsedResult = parse(tokens);
        });

        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(TEAM_COMMAND);
        });

        test('reads the piste', () => {
            expect(parsedResult['piste']).toEqual('RED');
        });

        test('reads the side', () => {
            expect(parsedResult['side']).toEqual('LEFT');
        });

        describe('members', () => {
            test('member 1 id', () => {
                expect(parsedResult['members'][0]['id']).toEqual('234');
            });
            test('member 1 name', () => {
                expect(parsedResult['members'][0]['name']).toEqual('IVANOV Fedor');
            });
            test('member 2 id', () => {
                expect(parsedResult['members'][1]['id']).toEqual('542');
            });
            test('member 2 name', () => {
                expect(parsedResult['members'][1]['name']).toEqual('PETROV Ivan');
            });
            test('member 3 id', () => {
                expect(parsedResult['members'][2]['id']).toEqual('43');
            });
            test('member 3 name', () => {
                expect(parsedResult['members'][2]['name']).toEqual('SIDOROV Evgeny');
            });
            test('reserve id', () => {
                expect(parsedResult['members'][3]['id']).toEqual('2');
            });
            test('reserve name', () => {
                expect(parsedResult['members'][3]['name']).toEqual('OH Semen');
            });
        });

        describe('rounds', () => {
            test('has 9 round assignments', () => {
                expect(parsedResult['rounds'].length).toEqual(9);
            });
            test('round 1', () => {
                expect(parsedResult['rounds'][0]).toEqual('1');
            });
            test('round 9', () => {
                expect(parsedResult['rounds'][8]).toEqual('2');
            });
        });

        test('reads the unique id', () => {
            expect(parsedResult['uniqueId']).toEqual('435533');
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[TEAM_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with all 21 elements (command + 20 params)', () => {
        const result = build({
            piste: 'RED',
            side: 'LEFT',
            members: [
                { id: '234', name: 'IVANOV Fedor' },
                { id: '542', name: 'PETROV Ivan' },
                { id: '43',  name: 'SIDOROV Evgeny' },
                { id: '2',   name: 'OH Semen' },
            ],
            rounds: ['1', '2', '3', '2', '1', '3', '3', '1', '2'],
            uniqueId: '435533',
        });
        expect(result).toEqual([TEAM_COMMAND, ...EXAMPLE_TEAM_TOKENS]);
    });
});
