import {DISP_COMMAND, register, registerBuilder, build} from "../../src/commands/disp";

const EXAMPLE_DISP_TOKENS = [
        'RED', '24', 'EIM', 'T32', '1', '32', "14:45", "3:00",
        "33", " IVANOV Sidor", 'CAN', 'rightTeamId', 'rightTeamMemberName',
        '531', 'LIMON Jua', 'FRA', 'leftTeamId', 'leftTeamMemberName'
    ]
;

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        const result = commandDictionary[DISP_COMMAND];
        expect(
            typeof result
        ).toEqual(
            'function'
        );
    });
});
describe('#parse', () => {
    const parse = register({})[DISP_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {

        test('problem with token length for this parser', () => {
            expect(
                () => {
                    parse(["HI", "THERE"]);
                }
            ).toThrowError("Incompatible command tokens for >DISP<. Expected 18, Got: 2");
        });

        test('no tokens provided', () => {
            expect(
                () => {
                    parse(null);
                }
            ).toThrowError("Incompatible command tokens for >DISP<. Expected 18, Got: 0");
        });
    });

    describe("valid tokens", () => {
        beforeEach(() => {
            const tokens = [...EXAMPLE_DISP_TOKENS];
            parsedResult = parse(tokens);
        });

        test('has the command in the result', () => {
            expect(
                parsedResult['command']
            ).toEqual(
                DISP_COMMAND
            )
        });

        test('reads the piste', () => {
            expect(
                parsedResult['piste']
            ).toEqual(
                "RED"
            )
        });
        test('reads the event identifier', () => {
            expect(
                parsedResult['eventId']
            ).toEqual(
                "24"
            )
        });

        test('reads the competition code', () => {
            expect(
                parsedResult['competitionCode']
            ).toEqual(
                "EIM"
            )
        });

        test('reads the competition phase', () => {
            expect(
                parsedResult['competitionPhase']
            ).toEqual(
                "T32"
            )
        });

        test('Bout order in Phase', () => {
            expect(
                parsedResult['boutOrderInPhase']
            ).toEqual(
                "1"
            )
        });

        test('bout Id', () => {
            expect(
                parsedResult['boutId']
            ).toEqual(
                "32"
            )
        });

        test('begin time', () => {
            expect(
                parsedResult['beginTime']
            ).toEqual(
                "14:45"
            )
        });

        test('stopwatch', () => {
            expect(
                parsedResult['stopwatch']
            ).toEqual(
                "3:00"
            )
        });

        describe('right fencer', () => {
            let rightFencer = null;
            beforeEach(() => {
                rightFencer = parsedResult['rightFencer'];
            });

            test('right fencer id', () => {
                expect(rightFencer["id"]).toEqual("33")
            });
            test('name', () => {
                expect(rightFencer["name"]).toEqual(" IVANOV Sidor")
            });
            test('team info', () => {
                expect(rightFencer["teamInfo"]).toEqual("CAN")
            });
            test('team id', () => {
                expect(rightFencer["teamId"]).toEqual("rightTeamId")
            });
            test('team Member Name', () => {
                expect(rightFencer["teamMemberName"]).toEqual("rightTeamMemberName")
            });
        });
        describe('left fencer', () => {
            let leftFencer = null;
            beforeEach(() => {
                leftFencer = parsedResult['leftFencer'];
            });

            test('fencer id', () => {
                expect(leftFencer["id"]).toEqual("531")
            });
            test('name', () => {
                expect(leftFencer["name"]).toEqual("LIMON Jua")
            });
            test('team info', () => {
                expect(leftFencer["teamInfo"]).toEqual("FRA")
            });
            test('team id', () => {
                expect(leftFencer["teamId"]).toEqual("leftTeamId")
            });
            test('team Member Name', () => {
                expect(leftFencer["teamMemberName"]).toEqual("leftTeamMemberName")
            });
        });
    });
})

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[DISP_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with all 19 elements (command + 18 params)', () => {
        const result = build({
            piste: 'RED', eventId: '24', competitionCode: 'EIM', competitionPhase: 'T32',
            boutOrderInPhase: '1', boutId: '32', beginTime: '14:45', stopwatch: '3:00',
            rightFencer: { id: '33', name: ' IVANOV Sidor', teamInfo: 'CAN', teamId: 'rightTeamId', teamMemberName: 'rightTeamMemberName' },
            leftFencer:  { id: '531', name: 'LIMON Jua', teamInfo: 'FRA', teamId: 'leftTeamId', teamMemberName: 'leftTeamMemberName' },
        });
        expect(result).toEqual([DISP_COMMAND, ...EXAMPLE_DISP_TOKENS]);
    });
});
