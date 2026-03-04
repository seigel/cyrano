import {ACK_COMMAND, register, registerBuilder, build} from "../../src/commands/ack";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[ACK_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[ACK_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI"]); })
                .toThrow(`Incompatible command tokens for >${ACK_COMMAND}<. Expected 0, Got: 1`);
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
            expect(parsedResult['command']).toEqual(ACK_COMMAND);
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[ACK_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command only', () => {
        expect(build({})).toEqual(['ACK']);
    });
});
