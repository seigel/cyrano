import {GETTEAM_COMMAND, register, registerBuilder, build} from "../../src/commands/getteam";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[GETTEAM_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[GETTEAM_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI"]); })
                .toThrow(`Incompatible command tokens for >${GETTEAM_COMMAND}<. Expected 2, Got: 1`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); })
                .toThrow(`Incompatible command tokens for >${GETTEAM_COMMAND}<. Expected 2, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        beforeEach(() => {
            parsedResult = parse(['RED', 'LEFT']);
        });
        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(GETTEAM_COMMAND);
        });
        test('reads the piste', () => {
            expect(parsedResult['piste']).toEqual('RED');
        });
        test('reads the side', () => {
            expect(parsedResult['side']).toEqual('LEFT');
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[GETTEAM_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command, piste and side', () => {
        expect(build({ piste: 'RED', side: 'LEFT' })).toEqual(['GETTEAM', 'RED', 'LEFT']);
    });
});
