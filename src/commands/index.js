import * as ack from "./ack.js";
import * as boutstop from "./boutstop.js";
import * as broken from "./broken.js";
import * as deny from "./deny.js";
import * as disp from "./disp.js";
import * as getteam from "./getteam.js";
import * as hello from "./hello.js";
import * as info from "./info.js";
import * as msg from "./msg.js";
import * as nak from "./nak.js";
import * as next from "./next.js";
import * as ping from "./ping.js";
import * as prev from "./prev.js";
import * as replace from "./replace.js";
import * as standby from "./standby.js";
import * as stop from "./stop.js";
import * as team from "./team.js";
import * as updated from "./updated.js";

const dictionary = {}
const builders = {}

const modules = [ack, boutstop, broken, deny, disp, getteam, hello, info, msg, nak, next, ping, prev, replace, standby, stop, team, updated];
for (const mod of modules) {
  mod.register(dictionary);
  mod.registerBuilder(builders);
}

export default dictionary;
export { builders };
