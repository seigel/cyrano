import {tokenize} from "../../src/protocol/cylex";

describe('#tokenize', () => {
    test('break input part using protocol divider |', () => {
        expect(tokenize("hi|there")).toEqual(["hi", "there"]);
    });
    test('break input part using protocol divider | with one entry', () => {
        expect(tokenize("hi")).toEqual(["hi"]);
    });

    test('break input part using protocol divider | ignores case, preserves spaces', () => {
        expect(tokenize("hi|there|third one|CASE")).toEqual(["hi", "there", "third one", "CASE"]);
    });

    test('something that is closer to cyrano preserving case and spaces', () => {
        expect(
            tokenize("|EFP2|DISP|RED|24|EIM|T32|1|32|14:45|3:00|33| IVANOV Sidor|CAN|||531|LIMON Jua|FRA|||")
        ).toEqual(
            [
                "",
                "EFP2",
                "DISP",
                "RED",
                "24",
                "EIM",
                "T32",
                "1",
                "32",
                "14:45",
                "3:00",
                "33",
                " IVANOV Sidor",
                "CAN",
                "",
                "",
                "531",
                "LIMON Jua",
                "FRA",
                "",
                "",
                ""
            ]
        );
    });

    describe("#with-validator", () => {
        const validator = (token) => {
            const VALID_TOKENS = ['HELLO', "THERE"];
            return VALID_TOKENS.includes(token);
        };

        test.skip('sample validator works', () => {
            expect(validator("hello")).toBeFalsy();
            expect(validator("THERE")).toBe(true);
        });

        test.skip('success when tokens are valid', () => {
            expect(tokenize("HELLO", validator)).toEqual(["HELLO"]);
        });

        test.skip('fail when tokens are valid', () => {
            expect(() => {
                tokenize("HELLO|there", validator)
            }).toThrow("Invalid token there at index 1");
        });

    });
});
