import dgram from 'dgram';
import {Buffer} from 'buffer';
import {tokenize} from "./src/protocol/cylex";
import {process} from "./src/protocol/cyrano";

const DEFAULT_UDP_PORT = 50100;
// ROUGH TESTING -- UDP testing
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: |${msg}| from ${rinfo.address}:${rinfo.port}`);
    console.log(`tokens: ${tokenize(msg)}`);
    console.log(`processing: ${process(msg)["command"]}`)
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(DEFAULT_UDP_PORT);

const message = Buffer.from('|EFP2|HELLO|');
const client = dgram.createSocket('udp4');
client.send(message, DEFAULT_UDP_PORT, 'localhost', (err) => {
    client.close();
});
