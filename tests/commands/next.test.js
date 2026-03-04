import {NEXT_COMMAND, register, registerBuilder, build} from "../../src/commands/next";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[NEXT_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[NEXT_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI", "THERE"]); })
                .toThrowError(`Incompatible command tokens for >${NEXT_COMMAND}<. Expected 1, Got: 2`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); })
                .toThrowError(`Incompatible command tokens for >${NEXT_COMMAND}<. Expected 1, Got: 0`);
        });
    });

    describe("valid parameters", () => {
        beforeEach(() => {
            parsedResult = parse(['RED']);
        });
        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(NEXT_COMMAND);
        });
        test('reads the piste', () => {
            expect(parsedResult['piste']).toEqual('RED');
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[NEXT_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command and piste', () => {
        expect(build({ piste: 'RED' })).toEqual(['NEXT', 'RED']);
    });
});
