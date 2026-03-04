import {PREV_COMMAND, register, registerBuilder, build} from "../../src/commands/prev";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[PREV_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[PREV_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI", "THERE"]); })
                .toThrow(`Incompatible command tokens for >${PREV_COMMAND}<. Expected 1, Got: 2`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); })
                .toThrow(`Incompatible command tokens for >${PREV_COMMAND}<. Expected 1, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        beforeEach(() => {
            parsedResult = parse(['1']);
        });
        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(PREV_COMMAND);
        });
        test('reads the piste', () => {
            expect(parsedResult['piste']).toEqual('1');
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[PREV_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command and piste', () => {
        expect(build({ piste: '1' })).toEqual(['PREV', '1']);
    });
});
