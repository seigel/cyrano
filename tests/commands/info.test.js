import {INFO_COMMAND, register, registerBuilder, build} from "../../src/commands/info";

const EXAMPLE_INFO_TOKENS = [
    'RED',          // piste
    '24',           // eventId
    'EIM',          // competitionCode
    'T32',          // competitionPhase
    '1',            // boutOrderInPhase
    '1',            // roundNumber
    '32',           // boutId
    '14:45',        // beginTime
    '3:00',         // stopwatch
    'F',            // state (Fencing)
    '0',            // refereeRemoteControl
    'N',            // priority
    '0',            // callTechnician
    '0',            // callVideoEngineer
    '0',            // callDoctor
    '0',            // callDT
    '0',            // reverse
    '0',            // standby
    '33',           // right id
    'IVANOV Sidor', // right name
    'RUS',          // right teamInfo
    '',             // right teamMemberId
    '',             // right teamMemberName
    '5',            // right score
    '0',            // right yellowCard
    '0',            // right redCards
    '0',            // right blackCard
    '0',            // right usedVideo
    '1',            // right lamp
    '0',            // right whiteLamp
    '531',          // left id
    'LIMON Jua',    // left name
    'FRA',          // left teamInfo
    '',             // left teamMemberId
    '',             // left teamMemberName
    '3',            // left score
    '1',            // left yellowCard
    '0',            // left redCards
    '0',            // left blackCard
    '1',            // left usedVideo
    '0',            // left lamp
    '0',            // left whiteLamp
];

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[INFO_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[INFO_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI", "THERE"]); })
                .toThrow(`Incompatible command tokens for >${INFO_COMMAND}<. Expected 42, Got: 2`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); })
                .toThrow(`Incompatible command tokens for >${INFO_COMMAND}<. Expected 42, Got: 0`);
        });
    });

    describe("valid tokens", () => {
        beforeEach(() => {
            parsedResult = parse([...EXAMPLE_INFO_TOKENS]);
        });

        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(INFO_COMMAND);
        });
        test('reads the piste', () => {
            expect(parsedResult['piste']).toEqual('RED');
        });
        test('reads the event id', () => {
            expect(parsedResult['eventId']).toEqual('24');
        });
        test('reads the competition code', () => {
            expect(parsedResult['competitionCode']).toEqual('EIM');
        });
        test('reads the competition phase', () => {
            expect(parsedResult['competitionPhase']).toEqual('T32');
        });
        test('reads the bout order in phase', () => {
            expect(parsedResult['boutOrderInPhase']).toEqual('1');
        });
        test('reads the round number', () => {
            expect(parsedResult['roundNumber']).toEqual('1');
        });
        test('reads the bout id', () => {
            expect(parsedResult['boutId']).toEqual('32');
        });
        test('reads the begin time', () => {
            expect(parsedResult['beginTime']).toEqual('14:45');
        });
        test('reads the stopwatch', () => {
            expect(parsedResult['stopwatch']).toEqual('3:00');
        });
        test('reads the state', () => {
            expect(parsedResult['state']).toEqual('F');
        });
        test('reads the referee remote control', () => {
            expect(parsedResult['refereeRemoteControl']).toEqual('0');
        });
        test('reads the priority', () => {
            expect(parsedResult['priority']).toEqual('N');
        });
        test('reads call technician', () => {
            expect(parsedResult['callTechnician']).toEqual('0');
        });
        test('reads call video engineer', () => {
            expect(parsedResult['callVideoEngineer']).toEqual('0');
        });
        test('reads call doctor', () => {
            expect(parsedResult['callDoctor']).toEqual('0');
        });
        test('reads call DT', () => {
            expect(parsedResult['callDT']).toEqual('0');
        });
        test('reads reverse', () => {
            expect(parsedResult['reverse']).toEqual('0');
        });
        test('reads standby', () => {
            expect(parsedResult['standby']).toEqual('0');
        });

        describe('right fencer', () => {
            let rightFencer = null;
            beforeEach(() => { rightFencer = parsedResult['rightFencer']; });

            test('id', () => { expect(rightFencer['id']).toEqual('33'); });
            test('name', () => { expect(rightFencer['name']).toEqual('IVANOV Sidor'); });
            test('team info', () => { expect(rightFencer['teamInfo']).toEqual('RUS'); });
            test('team member id', () => { expect(rightFencer['teamMemberId']).toEqual(''); });
            test('team member name', () => { expect(rightFencer['teamMemberName']).toEqual(''); });
            test('score', () => { expect(rightFencer['score']).toEqual('5'); });
            test('yellow card', () => { expect(rightFencer['yellowCard']).toEqual('0'); });
            test('red cards', () => { expect(rightFencer['redCards']).toEqual('0'); });
            test('black card', () => { expect(rightFencer['blackCard']).toEqual('0'); });
            test('used video', () => { expect(rightFencer['usedVideo']).toEqual('0'); });
            test('lamp', () => { expect(rightFencer['lamp']).toEqual('1'); });
            test('white lamp', () => { expect(rightFencer['whiteLamp']).toEqual('0'); });
        });

        describe('left fencer', () => {
            let leftFencer = null;
            beforeEach(() => { leftFencer = parsedResult['leftFencer']; });

            test('id', () => { expect(leftFencer['id']).toEqual('531'); });
            test('name', () => { expect(leftFencer['name']).toEqual('LIMON Jua'); });
            test('team info', () => { expect(leftFencer['teamInfo']).toEqual('FRA'); });
            test('team member id', () => { expect(leftFencer['teamMemberId']).toEqual(''); });
            test('team member name', () => { expect(leftFencer['teamMemberName']).toEqual(''); });
            test('score', () => { expect(leftFencer['score']).toEqual('3'); });
            test('yellow card', () => { expect(leftFencer['yellowCard']).toEqual('1'); });
            test('red cards', () => { expect(leftFencer['redCards']).toEqual('0'); });
            test('black card', () => { expect(leftFencer['blackCard']).toEqual('0'); });
            test('used video', () => { expect(leftFencer['usedVideo']).toEqual('1'); });
            test('lamp', () => { expect(leftFencer['lamp']).toEqual('0'); });
            test('white lamp', () => { expect(leftFencer['whiteLamp']).toEqual('0'); });
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[INFO_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with all 43 elements (command + 42 params)', () => {
        const result = build({
            piste: 'RED', eventId: '24', competitionCode: 'EIM', competitionPhase: 'T32',
            boutOrderInPhase: '1', roundNumber: '1', boutId: '32', beginTime: '14:45', stopwatch: '3:00',
            state: 'F', refereeRemoteControl: '0', priority: 'N',
            callTechnician: '0', callVideoEngineer: '0', callDoctor: '0', callDT: '0',
            reverse: '0', standby: '0',
            rightFencer: { id: '33', name: 'IVANOV Sidor', teamInfo: 'RUS', teamMemberId: '', teamMemberName: '', score: '5', yellowCard: '0', redCards: '0', blackCard: '0', usedVideo: '0', lamp: '1', whiteLamp: '0' },
            leftFencer:  { id: '531', name: 'LIMON Jua', teamInfo: 'FRA', teamMemberId: '', teamMemberName: '', score: '3', yellowCard: '1', redCards: '0', blackCard: '0', usedVideo: '1', lamp: '0', whiteLamp: '0' },
        });
        expect(result).toEqual([INFO_COMMAND, ...EXAMPLE_INFO_TOKENS]);
    });
});
