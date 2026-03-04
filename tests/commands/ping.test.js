import {PING_COMMAND, register, registerBuilder, build} from "../../src/commands/ping";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[PING_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[PING_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI", "THERE", "MONKEY"]); })
                .toThrow(`Incompatible command tokens for >${PING_COMMAND}<. Expected 0, Got: 3`);
        });
        test('no issue with null tokens', () => {
            expect(() => { parse(null); }).not.toThrow("Anything");
        });
    });

    describe("valid parameters", () => {
        describe("ping command with no parameter", () => {
            beforeEach(() => {
                parsedResult = parse([]);
            });
            test('has the command in the result', () => {
                expect(parsedResult['command']).toEqual(PING_COMMAND);
            });
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[PING_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command only', () => {
        expect(build({})).toEqual(['PING']);
    });
});
