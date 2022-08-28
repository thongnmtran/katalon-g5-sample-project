"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.engineFactory = void 0;
const common_messaging_1 = require("@katalon-g5/common-messaging");
const engine_1 = require("@katalon-g5/engine");
const WorkerTestProject_1 = require("./WorkerTestProject");
const exposeApi = (name, object) => {
    Object.defineProperty(globalThis, name, {
        value: object,
        writable: false,
        configurable: false,
        enumerable: false,
    });
};
const hideApi = (api) => {
    exposeApi(api, () => {
        throw new Error(`${api} is forbidden`);
    });
};
function setupSandbox() {
    // Prevent users from sending arbitrary message to our web app or listening to our messages
    hideApi("postMessage");
    hideApi("addEventListener");
}
const transporter = common_messaging_1.TransporterFactory.SynchronousWorkerClient();
transporter.connect();
exports.engineFactory = new engine_1.EngineFactory();
exports.engineFactory.webEngineProvider = () => {
    const web = common_messaging_1.RemoteObjectHelper.attachToClient({}, transporter);
    return web;
};
const katalon = new WorkerTestProject_1.WorkerTestProject();
katalon.addEventListener(engine_1.ExecutionEvent.COMPLETE, () => {
    transporter.sendMessage("Done");
});
katalon.engineFactory = exports.engineFactory;
exports.default = katalon;
setupSandbox();
//# sourceMappingURL=WorkerSideload.js.map