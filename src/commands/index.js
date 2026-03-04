const dictionary = {}
const builders = {}
require("./ack").register(dictionary);
require("./boutstop").register(dictionary);
require("./broken").register(dictionary);
require("./deny").register(dictionary);
require("./disp").register(dictionary);
require("./getteam").register(dictionary);
require("./hello").register(dictionary);
require("./hello").registerBuilder(builders);
require("./info").register(dictionary);
require("./msg").register(dictionary);
require("./nak").register(dictionary);
require("./next").register(dictionary);
require("./ping").register(dictionary);
require("./prev").register(dictionary);
require("./replace").register(dictionary);
require("./standby").register(dictionary);
require("./stop").register(dictionary);
require("./team").register(dictionary);
require("./updated").register(dictionary);
export default dictionary;
export { builders };
