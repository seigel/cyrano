import {STOP_COMMAND, register, registerBuilder, build} from "../../src/commands/stop";

describe('#register', () => {
    test('basic registration should work', () => {
        const commandDictionary = {};
        register(commandDictionary);
        expect(typeof commandDictionary[STOP_COMMAND]).toEqual('function');
    });
});

describe('#parse', () => {
    const parse = register({})[STOP_COMMAND];
    let parsedResult = null;

    describe('invalid length of tokens', function () {
        test('problem with token length for this parser', () => {
            expect(() => { parse(["HI", "THERE", "MONKEY"]); })
                .toThrow(`Incompatible command tokens for >${STOP_COMMAND}<. Expected 0, Got: 3`);
        });
        test('no issue with token length for this parser', () => {
            expect(() => { parse(null); }).not.toThrow("Anything");
        });
    });

    describe("valid parameters", () => {
        describe("stop command with no parameter", () => {
            beforeEach(() => {
                parsedResult = parse([]);
            });
            test('has the command in the result', () => {
                expect(parsedResult['command']).toEqual(STOP_COMMAND);
            });
        });
    });
});

describe('#registerBuilder', () => {
    test('basic registration should work', () => {
        const builderDictionary = {};
        registerBuilder(builderDictionary);
        expect(typeof builderDictionary[STOP_COMMAND]).toEqual('function');
    });
});

describe('#build', () => {
    test('returns token array with command only', () => {
        expect(build({})).toEqual(['STOP']);
    });
});
