const PROTOCOL = "EFP2";
export const PROTOCOL_SEPERATOR = "|";
const TOKENS = [
    PROTOCOL,

]

// IDEAS.  create individual elements that know their length and valid next options and then
// can walk the array to test the tokens and each element can `shift()` the array while parsing
// TOKENS will register with the token array

// all sentences start and end with and empty token (based on our tokenizer) "|EFP2"
// not sure if the protocol specs that there is one command per datagram or not

