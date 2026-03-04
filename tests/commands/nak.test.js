import {NAK_COMMAND, register, registerBuilder, build} from "../../src/commands/nak";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[NAK_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[NAK_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI"]); })
                .toThrowError(`Incompatible command tokens for >${NAK_COMMAND}<. Expected 0, Got: 1`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); }).not.toThrow();
        });
    });

    describe("valid parameters", () => {
        beforeEach(() => {
            parsedResult = parse([]);
        });
        test('has the command in the result', () => {
            expect(parsedResult['command']).toEqual(NAK_COMMAND);
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[NAK_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command only', () => {
        expect(build({})).toEqual(['NAK']);
    });
});
