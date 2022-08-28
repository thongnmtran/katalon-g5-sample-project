var commonjsGlobal =
  typeof globalThis !== "undefined"
    ? globalThis
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : typeof self !== "undefined"
    ? self
    : {};

function getAugmentedNamespace(n) {
  var f = n.default;
  if (typeof f == "function") {
    var a = function () {
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function (k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(
      a,
      k,
      d.get
        ? d
        : {
            enumerable: true,
            get: function () {
              return n[k];
            },
          }
    );
  });
  return a;
}

var lib$2 = {};

var constants = {};

var CommonEvent$1 = {};

Object.defineProperty(CommonEvent$1, "__esModule", { value: true });
var CommonEvent;
(function (CommonEvent) {
  CommonEvent["MESSAGE"] = "message";
  CommonEvent["ERROR"] = "error";
  CommonEvent["OPEN"] = "open";
  CommonEvent["REQUEST"] = "request";
  CommonEvent["RESPONSE"] = "response";
  CommonEvent["CONNECTION"] = "connection";
})(CommonEvent || (CommonEvent = {}));
CommonEvent$1.default = CommonEvent;

var TransporterType$1 = {};

Object.defineProperty(TransporterType$1, "__esModule", { value: true });
var TransporterType;
(function (TransporterType) {
  TransporterType["CHROME_RUNTIME"] = "chrome_runtime";
  TransporterType["WEBSOCKET"] = "websocket";
  TransporterType["WEB_WORKER_CLIENT"] = "web_worker_client";
  TransporterType["WEB_WORKER_HOST"] = "web_worker_host";
})(TransporterType || (TransporterType = {}));
TransporterType$1.default = TransporterType;

var ChromePortChannel$1 = {};

Object.defineProperty(ChromePortChannel$1, "__esModule", { value: true });
const ChromePortChannel = {
  EXECUTION: "port.katalon.execution",
  RECORDING: "port.katalon.recording",
};
ChromePortChannel$1.default = ChromePortChannel;

(function (exports) {
  var __importDefault =
    (commonjsGlobal && commonjsGlobal.__importDefault) ||
    function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ChromePortChannel =
    exports.TransporterType =
    exports.CommonEvent =
      void 0;
  var CommonEvent_1 = CommonEvent$1;
  Object.defineProperty(exports, "CommonEvent", {
    enumerable: true,
    get: function () {
      return __importDefault(CommonEvent_1).default;
    },
  });
  var TransporterType_1 = TransporterType$1;
  Object.defineProperty(exports, "TransporterType", {
    enumerable: true,
    get: function () {
      return __importDefault(TransporterType_1).default;
    },
  });
  var ChromePortChannel_1 = ChromePortChannel$1;
  Object.defineProperty(exports, "ChromePortChannel", {
    enumerable: true,
    get: function () {
      return __importDefault(ChromePortChannel_1).default;
    },
  });
})(constants);

var transporters = {};

var BaseMessageTransporter$1 = {};

var events$1 = { exports: {} };

var R$1 = typeof Reflect === "object" ? Reflect : null;
var ReflectApply$1 =
  R$1 && typeof R$1.apply === "function"
    ? R$1.apply
    : function ReflectApply(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };

var ReflectOwnKeys$1;
if (R$1 && typeof R$1.ownKeys === "function") {
  ReflectOwnKeys$1 = R$1.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys$1 = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(
      Object.getOwnPropertySymbols(target)
    );
  };
} else {
  ReflectOwnKeys$1 = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning$1(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN$1 =
  Number.isNaN ||
  function NumberIsNaN(value) {
    return value !== value;
  };

function EventEmitter$1() {
  EventEmitter$1.init.call(this);
}
events$1.exports = EventEmitter$1;
events$1.exports.once = once$1;

// Backwards-compat with node 0.10.x
EventEmitter$1.EventEmitter = EventEmitter$1;

EventEmitter$1.prototype._events = undefined;
EventEmitter$1.prototype._eventsCount = 0;
EventEmitter$1.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners$1 = 10;

function checkListener$1(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' +
        typeof listener
    );
  }
}

Object.defineProperty(EventEmitter$1, "defaultMaxListeners", {
  enumerable: true,
  get: function () {
    return defaultMaxListeners$1;
  },
  set: function (arg) {
    if (typeof arg !== "number" || arg < 0 || NumberIsNaN$1(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          arg +
          "."
      );
    }
    defaultMaxListeners$1 = arg;
  },
});

EventEmitter$1.init = function () {
  if (
    this._events === undefined ||
    this._events === Object.getPrototypeOf(this)._events
  ) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter$1.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== "number" || n < 0 || NumberIsNaN$1(n)) {
    throw new RangeError(
      'The value of "n" is out of range. It must be a non-negative number. Received ' +
        n +
        "."
    );
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners$1(that) {
  if (that._maxListeners === undefined)
    return EventEmitter$1.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter$1.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners$1(this);
};

EventEmitter$1.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === "error";

  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;
  else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error(
      "Unhandled error." + (er ? " (" + er.message + ")" : "")
    );
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined) return false;

  if (typeof handler === "function") {
    ReflectApply$1(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone$1(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply$1(listeners[i], this, args);
  }

  return true;
};

function _addListener$1(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener$1(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit(
        "newListener",
        type,
        listener.listener ? listener.listener : listener
      );

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend
        ? [listener, existing]
        : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners$1(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error(
        "Possible EventEmitter memory leak detected. " +
          existing.length +
          " " +
          String(type) +
          " listeners " +
          "added. Use emitter.setMaxListeners() to " +
          "increase limit"
      );
      w.name = "MaxListenersExceededWarning";
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning$1(w);
    }
  }

  return target;
}

EventEmitter$1.prototype.addListener = function addListener(type, listener) {
  return _addListener$1(this, type, listener, false);
};

EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener;

EventEmitter$1.prototype.prependListener = function prependListener(
  type,
  listener
) {
  return _addListener$1(this, type, listener, true);
};

function onceWrapper$1() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap$1(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener,
  };
  var wrapped = onceWrapper$1.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter$1.prototype.once = function once(type, listener) {
  checkListener$1(listener);
  this.on(type, _onceWrap$1(this, type, listener));
  return this;
};

EventEmitter$1.prototype.prependOnceListener = function prependOnceListener(
  type,
  listener
) {
  checkListener$1(listener);
  this.prependListener(type, _onceWrap$1(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter$1.prototype.removeListener = function removeListener(
  type,
  listener
) {
  var list, events, position, i, originalListener;

  checkListener$1(listener);

  events = this._events;
  if (events === undefined) return this;

  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);
    else {
      delete events[type];
      if (events.removeListener)
        this.emit("removeListener", type, list.listener || listener);
    }
  } else if (typeof list !== "function") {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (position === 0) list.shift();
    else {
      spliceOne$1(list, position);
    }

    if (list.length === 1) events[type] = list[0];

    if (events.removeListener !== undefined)
      this.emit("removeListener", type, originalListener || listener);
  }

  return this;
};

EventEmitter$1.prototype.off = EventEmitter$1.prototype.removeListener;

EventEmitter$1.prototype.removeAllListeners = function removeAllListeners(
  type
) {
  var listeners, events, i;

  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);
      else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === "removeListener") continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners("removeListener");
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === "function") {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners$1(target, type, unwrap) {
  var events = target._events;

  if (events === undefined) return [];

  var evlistener = events[type];
  if (evlistener === undefined) return [];

  if (typeof evlistener === "function")
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap
    ? unwrapListeners$1(evlistener)
    : arrayClone$1(evlistener, evlistener.length);
}

EventEmitter$1.prototype.listeners = function listeners(type) {
  return _listeners$1(this, type, true);
};

EventEmitter$1.prototype.rawListeners = function rawListeners(type) {
  return _listeners$1(this, type, false);
};

EventEmitter$1.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === "function") {
    return emitter.listenerCount(type);
  } else {
    return listenerCount$1.call(emitter, type);
  }
};

EventEmitter$1.prototype.listenerCount = listenerCount$1;
function listenerCount$1(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter$1.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys$1(this._events) : [];
};

function arrayClone$1(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}

function spliceOne$1(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners$1(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once$1(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === "function") {
        emitter.removeListener("error", errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener$1(emitter, name, resolver, { once: true });
    if (name !== "error") {
      addErrorHandlerIfEventEmitter$1(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter$1(emitter, handler, flags) {
  if (typeof emitter.on === "function") {
    eventTargetAgnosticAddListener$1(emitter, "error", handler, flags);
  }
}

function eventTargetAgnosticAddListener$1(emitter, name, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError(
      'The "emitter" argument must be of type EventEmitter. Received type ' +
        typeof emitter
    );
  }
}

var __importDefault$6 =
  (commonjsGlobal && commonjsGlobal.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(BaseMessageTransporter$1, "__esModule", { value: true });
const events_1$2 = events$1.exports;
const CommonEvent_1$2 = __importDefault$6(CommonEvent$1);
class BaseMessageTransporter {
  emitter = new events_1$2.EventEmitter();
  constructor() {
    this.emitter.setMaxListeners(100);
    this.handleMessage = this.handleMessage.bind(this);
  }
  async connect(...args) {
    this.setupListeners();
  }
  disconnect(...args) {
    this.detachListeners();
  }
  sendMessage(message) {
    throw new Error("Method not implemented.");
  }
  addMessageListener(listener) {
    this.emitter.addListener(CommonEvent_1$2.default.MESSAGE, listener);
  }
  removeMessageListener(listener) {
    this.emitter.removeListener(CommonEvent_1$2.default.MESSAGE, listener);
  }
  setupListeners() {
    this.detachListeners();
    this.attachListeners();
  }
  attachListeners() {
    // Sub class can override this method
  }
  detachListeners() {
    // Sub class can override this method
  }
  handleMessage(message) {
    this.dispatchMessage(message);
  }
  dispatchMessage(message) {
    this.emitter.emit(CommonEvent_1$2.default.MESSAGE, message);
  }
}
BaseMessageTransporter$1.default = BaseMessageTransporter;

var MessageTransporter = {};

Object.defineProperty(MessageTransporter, "__esModule", { value: true });

var ChromeRuntimeTransporter$1 = {};

var __importDefault$5 =
  (commonjsGlobal && commonjsGlobal.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(ChromeRuntimeTransporter$1, "__esModule", {
  value: true,
});
const BaseMessageTransporter_1$4 = __importDefault$5(BaseMessageTransporter$1);
class ChromeRuntimeTransporter extends BaseMessageTransporter_1$4.default {
  port;
  extensionId;
  name;
  constructor(extensionIdOrPort, name) {
    super();
    this.name = name;
    if (typeof extensionIdOrPort === "string") {
      this.extensionId = extensionIdOrPort;
    }
    if (typeof extensionIdOrPort === "object") {
      this.port = extensionIdOrPort;
    }
  }
  async connect() {
    if (!chrome.runtime) {
      throw new Error("Chrome.runtime is undefined in this context");
    }
    if (this.extensionId) {
      this.port = chrome.runtime.connect(this.extensionId, {
        name: this.name,
      });
    }
    if (!this.port) {
      throw new Error("Unable to establish a connection");
    }
    await super.connect();
  }
  attachListeners() {
    this.port?.onMessage.addListener(this.handleMessage);
  }
  detachListeners() {
    this.port?.onMessage.removeListener(this.handleMessage);
  }
  handleMessage(message) {
    super.handleMessage(message);
  }
  disconnect() {
    this.port?.disconnect();
    super.disconnect();
    this.port = undefined;
  }
  sendMessage(message) {
    if (!this.port) {
      throw new Error("Invalid connection!");
    }
    this.port.postMessage(message);
  }
}
ChromeRuntimeTransporter$1.default = ChromeRuntimeTransporter;

var WebSocketTransporter$1 = {};

var __importDefault$4 =
  (commonjsGlobal && commonjsGlobal.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(WebSocketTransporter$1, "__esModule", { value: true });
const constants_1$2 = constants;
const BaseMessageTransporter_1$3 = __importDefault$4(BaseMessageTransporter$1);
class WebSocketTransporter extends BaseMessageTransporter_1$3.default {
  serverUrl;
  socket;
  constructor(serverUrl) {
    super();
    this.serverUrl = serverUrl;
  }
  async connect() {
    await new Promise((resolve, reject) => {
      this.socket = new WebSocket(this.serverUrl);
      this.socket.addEventListener(constants_1$2.CommonEvent.OPEN, () => {
        resolve(this);
      });
      this.socket.addEventListener(constants_1$2.CommonEvent.ERROR, (error) => {
        reject(error);
      });
    });
    await super.connect();
  }
  attachListeners() {
    this.socket?.addEventListener(
      constants_1$2.CommonEvent.MESSAGE,
      this.handleMessage
    );
  }
  detachListeners() {
    this.socket?.addEventListener(
      constants_1$2.CommonEvent.MESSAGE,
      this.handleMessage
    );
  }
  handleMessage(rawMessage) {
    const message = rawMessage;
    super.handleMessage(JSON.parse(message.data));
  }
  disconnect() {
    this.socket?.close();
    super.disconnect();
    this.socket = undefined;
  }
  sendMessage(message) {
    if (!this.socket) {
      throw new Error("The transporter is not connected");
    }
    this.socket.send(JSON.stringify(message));
  }
}
WebSocketTransporter$1.default = WebSocketTransporter;

var WorkerClientTransporter$1 = {};

var __importDefault$3 =
  (commonjsGlobal && commonjsGlobal.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(WorkerClientTransporter$1, "__esModule", { value: true });
const CommonEvent_1$1 = __importDefault$3(CommonEvent$1);
const BaseMessageTransporter_1$2 = __importDefault$3(BaseMessageTransporter$1);
const _addEventListener = globalThis.addEventListener;
const _removeEventListener = globalThis.removeEventListener;
const _postMessage = globalThis.postMessage;
class WorkerClientTransporter extends BaseMessageTransporter_1$2.default {
  connected = false;
  async connect() {
    this.connected = true;
    await super.connect();
  }
  attachListeners() {
    _addEventListener.call(
      globalThis,
      CommonEvent_1$1.default.MESSAGE,
      this.handleMessage
    );
  }
  detachListeners() {
    _removeEventListener.call(
      globalThis,
      CommonEvent_1$1.default.MESSAGE,
      this.handleMessage
    );
  }
  handleMessage(rawMessage) {
    const message = rawMessage;
    super.handleMessage(message.data);
  }
  disconnect() {
    this.connected = false;
    super.disconnect();
  }
  sendMessage(message) {
    if (!this.connected) {
      throw new Error("The transporter is not connected");
    }
    _postMessage.call(globalThis, message);
  }
}
WorkerClientTransporter$1.default = WorkerClientTransporter;

var WorkerHostTransporter$1 = {};

var __importDefault$2 =
  (commonjsGlobal && commonjsGlobal.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(WorkerHostTransporter$1, "__esModule", { value: true });
const BaseMessageTransporter_1$1 = __importDefault$2(BaseMessageTransporter$1);
const CommonEvent_1 = __importDefault$2(CommonEvent$1);
class WorkerHostTransporter extends BaseMessageTransporter_1$1.default {
  worker;
  connected = false;
  constructor(worker) {
    super();
    this.worker = worker;
  }
  async connect() {
    this.connected = true;
    await super.connect();
  }
  attachListeners() {
    this.worker.addEventListener(
      CommonEvent_1.default.MESSAGE,
      this.handleMessage
    );
  }
  detachListeners() {
    this.worker.removeEventListener(
      CommonEvent_1.default.MESSAGE,
      this.handleMessage
    );
  }
  handleMessage(rawMessage) {
    const message = rawMessage;
    super.handleMessage(message.data);
  }
  disconnect() {
    this.connected = false;
    super.disconnect();
  }
  sendMessage(message) {
    if (!this.connected) {
      throw new Error("The transporter is not connected");
    }
    this.worker.postMessage(message);
  }
}
WorkerHostTransporter$1.default = WorkerHostTransporter;

var SynchronousTransporter = {};

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues =
      (typeof crypto !== "undefined" &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)) ||
      (typeof msCrypto !== "undefined" &&
        typeof msCrypto.getRandomValues === "function" &&
        msCrypto.getRandomValues.bind(msCrypto));

    if (!getRandomValues) {
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    }
  }

  return getRandomValues(rnds8);
}

var REGEX =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (
    byteToHex[arr[offset + 0]] +
    byteToHex[arr[offset + 1]] +
    byteToHex[arr[offset + 2]] +
    byteToHex[arr[offset + 3]] +
    "-" +
    byteToHex[arr[offset + 4]] +
    byteToHex[arr[offset + 5]] +
    "-" +
    byteToHex[arr[offset + 6]] +
    byteToHex[arr[offset + 7]] +
    "-" +
    byteToHex[arr[offset + 8]] +
    byteToHex[arr[offset + 9]] +
    "-" +
    byteToHex[arr[offset + 10]] +
    byteToHex[arr[offset + 11]] +
    byteToHex[arr[offset + 12]] +
    byteToHex[arr[offset + 13]] +
    byteToHex[arr[offset + 14]] +
    byteToHex[arr[offset + 15]]
  ).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }

  return uuid;
}

//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time

var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = (buf && offset) || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1],
        seedBytes[2],
        seedBytes[3],
        seedBytes[4],
        seedBytes[5],
      ];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.

  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = (clockseq + 1) & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval

  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested

  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = (tl >>> 24) & 0xff;
  b[i++] = (tl >>> 16) & 0xff;
  b[i++] = (tl >>> 8) & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
  b[i++] = (tmh >>> 8) & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = ((tmh >>> 24) & 0xf) | 0x10; // include version

  b[i++] = (tmh >>> 16) & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = (clockseq >>> 8) | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || stringify(b);
}

function parse(uuid) {
  if (!validate(uuid)) {
    throw TypeError("Invalid UUID");
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = (v >>> 16) & 0xff;
  arr[2] = (v >>> 8) & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff;
  arr[11] = (v / 0x100000000) & 0xff;
  arr[12] = (v >>> 24) & 0xff;
  arr[13] = (v >>> 16) & 0xff;
  arr[14] = (v >>> 8) & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }

    if (typeof namespace === "string") {
      namespace = parse(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError(
        "Namespace must be array-like (16 iterable integer values, 0-255)"
      );
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`

    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return stringify(bytes);
  } // Function#name is not settable on some platforms (#270)

  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support

  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(
    wordsToMd5(bytesToWords(bytes), bytes.length * 8)
  );
}
/*
 * Convert an array of little-endian words to an array of bytes
 */

function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = "0123456789abcdef";

  for (var i = 0; i < length32; i += 8) {
    var x = (input[i >> 5] >>> i % 32) & 0xff;
    var hex = parseInt(
      hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f),
      16
    );
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */

function getOutputLength(inputLength8) {
  return (((inputLength8 + 64) >>> 9) << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */

function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */

function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */

function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */

function bitRotateLeft(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */

function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn((b & c) | (~b & d), a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var v3 = v35("v3", 0x30, md5);
var v3$1 = v3;

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return (x & y) ^ (~x & z);

    case 1:
      return x ^ y ^ z;

    case 2:
      return (x & y) ^ (x & z) ^ (y & z);

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return (x << n) | (x >>> (32 - n));
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === "string") {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] =
        (bytes[_i * 64 + j * 4] << 24) |
        (bytes[_i * 64 + j * 4 + 1] << 16) |
        (bytes[_i * 64 + j * 4 + 2] << 8) |
        bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = ((bytes.length - 1) * 8) / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = ((bytes.length - 1) * 8) & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = (ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2]) >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
  }

  return [
    (H[0] >> 24) & 0xff,
    (H[0] >> 16) & 0xff,
    (H[0] >> 8) & 0xff,
    H[0] & 0xff,
    (H[1] >> 24) & 0xff,
    (H[1] >> 16) & 0xff,
    (H[1] >> 8) & 0xff,
    H[1] & 0xff,
    (H[2] >> 24) & 0xff,
    (H[2] >> 16) & 0xff,
    (H[2] >> 8) & 0xff,
    H[2] & 0xff,
    (H[3] >> 24) & 0xff,
    (H[3] >> 16) & 0xff,
    (H[3] >> 8) & 0xff,
    H[3] & 0xff,
    (H[4] >> 24) & 0xff,
    (H[4] >> 16) & 0xff,
    (H[4] >> 8) & 0xff,
    H[4] & 0xff,
  ];
}

var v5 = v35("v5", 0x50, sha1);
var v5$1 = v5;

var nil = "00000000-0000-0000-0000-000000000000";

function version(uuid) {
  if (!validate(uuid)) {
    throw TypeError("Invalid UUID");
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var esmBrowser = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  v1: v1,
  v3: v3$1,
  v4: v4,
  v5: v5$1,
  NIL: nil,
  version: version,
  validate: validate,
  stringify: stringify,
  parse: parse,
});

var require$$2 = /*@__PURE__*/ getAugmentedNamespace(esmBrowser);

var ErrorUtils$1 = {};

Object.defineProperty(ErrorUtils$1, "__esModule", { value: true });
class ErrorUtils {
  static getError(rawError) {
    const error = rawError;
    if (!error) {
      return undefined;
    }
    return {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause && this.getError(error.cause),
    };
  }
}
ErrorUtils$1.default = ErrorUtils;

(function (exports) {
  var __importDefault =
    (commonjsGlobal && commonjsGlobal.__importDefault) ||
    function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MatchableMessageType = exports.VOLATIVE_MESSAGE_ID = void 0;
  const CommonEvent_1 = __importDefault(CommonEvent$1);
  const BaseMessageTransporter_1 = __importDefault(BaseMessageTransporter$1);
  const uuid_1 = require$$2;
  const ErrorUtils_1 = __importDefault(ErrorUtils$1);
  exports.VOLATIVE_MESSAGE_ID = "";
  var MatchableMessageType;
  (function (MatchableMessageType) {
    MatchableMessageType["REQUEST"] = "request";
    MatchableMessageType["RESPONSE"] = "response";
  })(
    (MatchableMessageType =
      exports.MatchableMessageType || (exports.MatchableMessageType = {}))
  );
  const generateRequestId = () => (0, uuid_1.v4)();
  class SynchronousTransporter extends BaseMessageTransporter_1.default {
    transporter;
    constructor(transporter) {
      super();
      this.transporter = transporter;
      this.handleMessage = this.handleMessage.bind(this);
    }
    async connect() {
      await this.transporter.connect();
      await super.connect();
    }
    attachListeners() {
      this.transporter.addMessageListener(this.handleMessage);
    }
    detachListeners() {
      this.transporter.removeMessageListener(this.handleMessage);
    }
    handleMessage(rawMessage) {
      const message = rawMessage;
      this.dispatchMessage(message.data);
      if (message.type === MatchableMessageType.REQUEST) {
        this.emitter.emit(CommonEvent_1.default.REQUEST, message);
      } else if (message.type === MatchableMessageType.RESPONSE) {
        this.emitter.emit(CommonEvent_1.default.RESPONSE, message.data);
      }
    }
    disconnect() {
      this.transporter.disconnect();
      super.disconnect();
    }
    async sendVolativeRequest(request) {
      this.sendRawMessage({
        id: exports.VOLATIVE_MESSAGE_ID,
        type: MatchableMessageType.REQUEST,
        data: request,
      });
    }
    async sendRequest(request) {
      return new Promise((resolve, reject) => {
        const id = generateRequestId();
        const matchableMessage = {
          id,
          type: MatchableMessageType.REQUEST,
          data: request,
        };
        this.sendRawMessage(matchableMessage);
        const waitForResponse = async (response) => {
          if (response.id === id) {
            this.transporter.removeMessageListener(waitForResponse);
            if (response.error) {
              reject(response.error);
              return;
            }
            resolve(response.data);
          }
        };
        this.transporter.addMessageListener(waitForResponse);
      });
    }
    sendResponse(resonse, { id, request }, error) {
      const requestId = id || request?.id;
      if (!requestId) {
        throw new Error("Request Id must be set");
      }
      const responseMessage = {
        id: requestId,
        type: MatchableMessageType.RESPONSE,
        data: resonse,
        error: ErrorUtils_1.default.getError(error),
      };
      this.sendRawMessage(responseMessage);
    }
    sendMessage(message) {
      this.sendVolativeRequest(message);
    }
    sendRawMessage(message) {
      this.transporter.sendMessage(message);
    }
    addRequestListener(listener) {
      this.emitter.addListener(CommonEvent_1.default.REQUEST, listener);
    }
    removeRequestListener(listener) {
      this.emitter.removeListener(CommonEvent_1.default.REQUEST, listener);
    }
    addResponseListener(listener) {
      this.emitter.addListener(CommonEvent_1.default.RESPONSE, listener);
    }
    removeResponseListener(listener) {
      this.emitter.removeListener(CommonEvent_1.default.RESPONSE, listener);
    }
  }
  exports.default = SynchronousTransporter;
})(SynchronousTransporter);

var ProxyTransporter$1 = {};

var __importDefault$1 =
  (commonjsGlobal && commonjsGlobal.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(ProxyTransporter$1, "__esModule", { value: true });
const BaseMessageTransporter_1 = __importDefault$1(BaseMessageTransporter$1);
const SynchronousTransporter_1 = SynchronousTransporter;
const ErrorUtils_1$1 = __importDefault$1(ErrorUtils$1);
class ProxyTransporter extends BaseMessageTransporter_1.default {
  downstream;
  upstream;
  constructor(downstream, upstream) {
    super();
    this.downstream = downstream;
    this.upstream = upstream;
    this.forwardToDownstream = this.forwardToDownstream.bind(this);
    this.forwardToUpstream = this.forwardToUpstream.bind(this);
  }
  async connect() {
    this.upstream.addRequestListener(this.forwardToDownstream);
    this.downstream.addRequestListener(this.forwardToUpstream);
  }
  async forwardToDownstream(request) {
    await this.forwardRequest(this.upstream, this.downstream, request);
  }
  async forwardToUpstream(request) {
    await this.forwardRequest(this.downstream, this.upstream, request);
  }
  async forwardRequest(from, to, request) {
    if (request.id === SynchronousTransporter_1.VOLATIVE_MESSAGE_ID) {
      try {
        to.sendVolativeRequest(request.data);
      } catch (error) {
        console.warn(
          "Uncaught exception while sending volative message",
          ErrorUtils_1$1.default.getError(error)
        );
      }
    } else {
      try {
        const response = await to.sendRequest(request.data);
        from.sendResponse(response, { request });
      } catch (error) {
        from.sendResponse(
          undefined,
          { request },
          ErrorUtils_1$1.default.getError(error)
        );
      }
    }
  }
  disconnect() {
    this.upstream.removeRequestListener(this.forwardToDownstream);
    this.downstream.removeRequestListener(this.forwardToUpstream);
    super.disconnect();
  }
}
ProxyTransporter$1.default = ProxyTransporter;

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  var __importDefault =
    (commonjsGlobal && commonjsGlobal.__importDefault) ||
    function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ProxyTransporter =
    exports.SynchronousTransporter =
    exports.WorkerHostTransporter =
    exports.WorkerClientTransporter =
    exports.WebSocketTransporter =
    exports.ChromeRuntimeTransporter =
    exports.BaseMessageTransporter =
      void 0;
  var BaseMessageTransporter_1 = BaseMessageTransporter$1;
  Object.defineProperty(exports, "BaseMessageTransporter", {
    enumerable: true,
    get: function () {
      return __importDefault(BaseMessageTransporter_1).default;
    },
  });
  __exportStar(MessageTransporter, exports);
  __exportStar(ChromeRuntimeTransporter$1, exports);
  var ChromeRuntimeTransporter_1 = ChromeRuntimeTransporter$1;
  Object.defineProperty(exports, "ChromeRuntimeTransporter", {
    enumerable: true,
    get: function () {
      return __importDefault(ChromeRuntimeTransporter_1).default;
    },
  });
  __exportStar(WebSocketTransporter$1, exports);
  var WebSocketTransporter_1 = WebSocketTransporter$1;
  Object.defineProperty(exports, "WebSocketTransporter", {
    enumerable: true,
    get: function () {
      return __importDefault(WebSocketTransporter_1).default;
    },
  });
  __exportStar(WorkerClientTransporter$1, exports);
  var WorkerClientTransporter_1 = WorkerClientTransporter$1;
  Object.defineProperty(exports, "WorkerClientTransporter", {
    enumerable: true,
    get: function () {
      return __importDefault(WorkerClientTransporter_1).default;
    },
  });
  __exportStar(WorkerHostTransporter$1, exports);
  var WorkerHostTransporter_1 = WorkerHostTransporter$1;
  Object.defineProperty(exports, "WorkerHostTransporter", {
    enumerable: true,
    get: function () {
      return __importDefault(WorkerHostTransporter_1).default;
    },
  });
  __exportStar(SynchronousTransporter, exports);
  var SynchronousTransporter_1 = SynchronousTransporter;
  Object.defineProperty(exports, "SynchronousTransporter", {
    enumerable: true,
    get: function () {
      return __importDefault(SynchronousTransporter_1).default;
    },
  });
  __exportStar(ProxyTransporter$1, exports);
  var ProxyTransporter_1 = ProxyTransporter$1;
  Object.defineProperty(exports, "ProxyTransporter", {
    enumerable: true,
    get: function () {
      return __importDefault(ProxyTransporter_1).default;
    },
  });
})(transporters);

var transportServer = {};

var TransportServer = {};

Object.defineProperty(TransportServer, "__esModule", { value: true });

var AbstractTransportServer$1 = {};

Object.defineProperty(AbstractTransportServer$1, "__esModule", { value: true });
AbstractTransportServer$1.AbstractTransportServer = void 0;
const events_1$1 = events$1.exports;
const constants_1$1 = constants;
class AbstractTransportServer {
  emitter = new events_1$1.EventEmitter();
  addConnectionListener(handler) {
    this.emitter.addListener(constants_1$1.CommonEvent.CONNECTION, handler);
  }
  removeConnectionListener(handler) {
    this.emitter.removeListener(constants_1$1.CommonEvent.CONNECTION, handler);
  }
}
AbstractTransportServer$1.AbstractTransportServer = AbstractTransportServer;

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(TransportServer, exports);
  __exportStar(AbstractTransportServer$1, exports);
})(transportServer);

var TransporterFactory$1 = {};

Object.defineProperty(TransporterFactory$1, "__esModule", { value: true });
TransporterFactory$1.TransporterFactory = void 0;
const constants_1 = constants;
const transporters_1 = transporters;
class TransporterFactory {
  static getSynchronousTransporter(options) {
    const transporter = this.getTransporter(options);
    return new transporters_1.SynchronousTransporter(transporter);
  }
  static getTransporter({
    transporterType,
    extensionId,
    port,
    portName,
    serverUrl,
    worker,
  }) {
    if (!transporterType) {
      transporterType = extensionId
        ? constants_1.TransporterType.CHROME_RUNTIME
        : constants_1.TransporterType.WEBSOCKET;
    }
    switch (transporterType) {
      case constants_1.TransporterType.CHROME_RUNTIME: {
        const target = extensionId || port;
        if (!target) {
          throw new Error(
            "One of Chrome extension Id or chrome.runtime.Port must be specified"
          );
        }
        return this.ChromeRuntime(target, portName);
      }
      case constants_1.TransporterType.WEBSOCKET:
        if (!serverUrl) {
          throw new Error("Invalid websocket server URL");
        }
        return this.WebSocket(serverUrl);
      case constants_1.TransporterType.WEB_WORKER_CLIENT:
        return this.WorkerClient();
      case constants_1.TransporterType.WEB_WORKER_HOST:
        if (!worker) {
          throw new Error("Invalid worker argument");
        }
        return this.WorkerHost(worker);
      default:
        throw new Error(
          "Cannot create an appropriate transporter with the provided arguments"
        );
    }
  }
  static ChromeRuntime(extensionIdOrPort, name) {
    return new transporters_1.ChromeRuntimeTransporter(extensionIdOrPort, name);
  }
  static WebSocket(serverUrl) {
    return new transporters_1.WebSocketTransporter(serverUrl);
  }
  static WorkerHost(worker) {
    return new transporters_1.WorkerHostTransporter(worker);
  }
  static WorkerClient() {
    return new transporters_1.WorkerClientTransporter();
  }
  static SynchronousChromeRuntime(extensionIdOrPort, name) {
    return this.toSynchronous(this.ChromeRuntime(extensionIdOrPort, name));
  }
  static SynchronousWebSocket(serverUrl) {
    return this.toSynchronous(this.WebSocket(serverUrl));
  }
  static SynchronousWorkerHost(worker) {
    return this.toSynchronous(this.WorkerHost(worker));
  }
  static SynchronousWorkerClient() {
    return this.toSynchronous(this.WorkerClient());
  }
  static toSynchronous(transporter) {
    return new transporters_1.SynchronousTransporter(transporter);
  }
  static Proxy(downstream, upstream) {
    return new transporters_1.ProxyTransporter(downstream, upstream);
  }
}
TransporterFactory$1.TransporterFactory = TransporterFactory;

var RemoteObjectHelper$1 = {};

var __importDefault =
  (commonjsGlobal && commonjsGlobal.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(RemoteObjectHelper$1, "__esModule", { value: true });
const ErrorUtils_1 = __importDefault(ErrorUtils$1);
class RemoteObjectHelper {
  static attachToClient(target, transporter) {
    return new Proxy(target, {
      get(target, property, receiver) {
        return async (...args) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          return transporter.sendRequest({
            method: property,
            args,
          });
        };
      },
    });
  }
  static createServer(target, transporter) {
    transporter.addRequestListener(async (request) => {
      const rpcPayload = request.data;
      if (!request.id) {
        return;
      }
      if (rpcPayload.method in target) {
        try {
          const result = await target[rpcPayload.method]?.(...rpcPayload.args);
          transporter.sendResponse(result, { request });
        } catch (error) {
          console.error(error);
          transporter.sendResponse(
            undefined,
            { request },
            ErrorUtils_1.default.getError(error)
          );
        }
      } else {
        transporter.sendResponse(undefined, { request });
      }
    });
    return target;
  }
}
RemoteObjectHelper$1.default = RemoteObjectHelper;

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  var __importDefault =
    (commonjsGlobal && commonjsGlobal.__importDefault) ||
    function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RemoteObjectHelper = void 0;
  __exportStar(constants, exports);
  __exportStar(transporters, exports);
  __exportStar(transportServer, exports);
  __exportStar(TransporterFactory$1, exports);
  __exportStar(RemoteObjectHelper$1, exports);
  var RemoteObjectHelper_1 = RemoteObjectHelper$1;
  Object.defineProperty(exports, "RemoteObjectHelper", {
    enumerable: true,
    get: function () {
      return __importDefault(RemoteObjectHelper_1).default;
    },
  });
})(lib$2);

var lib$1 = {};

var project = {};

var TestProject = {};

(function (exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ExecutionEvent = void 0;
  (function (ExecutionEvent) {
    ExecutionEvent["COMPLETE"] = "complete";
  })(exports.ExecutionEvent || (exports.ExecutionEvent = {}));
})(TestProject);

var BaseTestProject$1 = {};

var events = { exports: {} };

var R = typeof Reflect === "object" ? Reflect : null;
var ReflectApply =
  R && typeof R.apply === "function"
    ? R.apply
    : function ReflectApply(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };

var ReflectOwnKeys;
if (R && typeof R.ownKeys === "function") {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(
      Object.getOwnPropertySymbols(target)
    );
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN =
  Number.isNaN ||
  function NumberIsNaN(value) {
    return value !== value;
  };

function EventEmitter() {
  EventEmitter.init.call(this);
}
events.exports = EventEmitter;
events.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' +
        typeof listener
    );
  }
}

Object.defineProperty(EventEmitter, "defaultMaxListeners", {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
          arg +
          "."
      );
    }
    defaultMaxListeners = arg;
  },
});

EventEmitter.init = function () {
  if (
    this._events === undefined ||
    this._events === Object.getPrototypeOf(this)._events
  ) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
    throw new RangeError(
      'The value of "n" is out of range. It must be a non-negative number. Received ' +
        n +
        "."
    );
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === "error";

  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;
  else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error(
      "Unhandled error." + (er ? " (" + er.message + ")" : "")
    );
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined) return false;

  if (typeof handler === "function") {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit(
        "newListener",
        type,
        listener.listener ? listener.listener : listener
      );

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === "function") {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend
        ? [listener, existing]
        : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error(
        "Possible EventEmitter memory leak detected. " +
          existing.length +
          " " +
          String(type) +
          " listeners " +
          "added. Use emitter.setMaxListeners() to " +
          "increase limit"
      );
      w.name = "MaxListenersExceededWarning";
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(
  type,
  listener
) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener,
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(
  type,
  listener
) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(
  type,
  listener
) {
  var list, events, position, i, originalListener;

  checkListener(listener);

  events = this._events;
  if (events === undefined) return this;

  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);
    else {
      delete events[type];
      if (events.removeListener)
        this.emit("removeListener", type, list.listener || listener);
    }
  } else if (typeof list !== "function") {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (position === 0) list.shift();
    else {
      spliceOne(list, position);
    }

    if (list.length === 1) events[type] = list[0];

    if (events.removeListener !== undefined)
      this.emit("removeListener", type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;

  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);
      else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === "removeListener") continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners("removeListener");
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === "function") {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined) return [];

  var evlistener = events[type];
  if (evlistener === undefined) return [];

  if (typeof evlistener === "function")
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap
    ? unwrapListeners(evlistener)
    : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === "function") {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === "function") {
        emitter.removeListener("error", errorListener);
      }
      resolve([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== "error") {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === "function") {
    eventTargetAgnosticAddListener(emitter, "error", handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError(
      'The "emitter" argument must be of type EventEmitter. Received type ' +
        typeof emitter
    );
  }
}

var EngineFactory$1 = {};

Object.defineProperty(EngineFactory$1, "__esModule", { value: true });
EngineFactory$1.EngineFactory = void 0;
class EngineFactory {
  webEngineProvider;
  webEngine(...args) {
    if (!this.webEngineProvider) {
      throw new Error("No engine provider has been set");
    }
    return this.webEngineProvider(...args);
  }
}
EngineFactory$1.EngineFactory = EngineFactory;

Object.defineProperty(BaseTestProject$1, "__esModule", { value: true });
BaseTestProject$1.BaseTestProject = void 0;
const events_1 = events.exports;
const EngineFactory_1 = EngineFactory$1;
const TestProject_1 = TestProject;
const getError = (rawError) => {
  const error = rawError;
  return {
    message: error.message,
    stack: error.stack,
  };
};
const importTestCase = (testCase, rootDir) => {
  const testCaseFile = testCase + ".test.ts";
  return import("file://" + rootDir + "/" + testCaseFile)
    .then((promise) => {
      if (!promise.default) {
        console.warn(`> Invalid test case: "${testCase}"`);
      }
      return promise.default;
    })
    .catch((error) => {
      console.warn(`> Cannot import test case: "${testCase}"`);
      console.warn(error.message);
    });
};
class BaseTestProject {
  emitter = new events_1.EventEmitter();
  testObjects = [];
  engineFactory = new EngineFactory_1.EngineFactory();
  local = {
    cachedValue: "local context cached value",
  };
  disableTestCaseRun() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.testCaseRunDisabled = true;
  }
  enableTestCaseRun() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.testCaseRunDisabled = false;
  }
  get isTestCaseRunDisabled() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!globalThis.testCaseRunDisabled;
  }
  testSuite(name, testCases, rootDir) {
    return {
      name,
      testCases,
      rootDir,
    };
  }
  async runTestSuite({ name, testCases, rootDir }) {
    console.log(`> Run test suite: "${name}"`);
    this.disableTestCaseRun();
    const testCaseInfos = (
      await Promise.all(
        testCases.map((testCaseI) => importTestCase(testCaseI, rootDir))
      )
    ).filter((testCaseFnI) => testCaseFnI);
    console.log("> Test cases", testCaseInfos);
    const web = this.engineFactory.webEngine();
    const testCaseContext = {
      local: this.local,
      web: web,
    };
    let hasError = false;
    for (const testCaseI of testCaseInfos) {
      try {
        await testCaseI.fn(testCaseContext);
        console.warn(`> Test case passed: "${testCaseI.name}"`);
      } catch (error) {
        console.warn(`> Test case failed: "${testCaseI.name}"`);
        console.warn(error.message);
        hasError = true;
        break;
      }
    }
    try {
      await web.closeBrowser();
    } catch {
      // Just skip
    }
    if (hasError) {
      throw new Error("> Some test case has been failed");
    }
  }
  async testCase(name, fn) {
    const testCaseInfo = {
      name,
      fn,
    };
    if (!this.isTestCaseRunDisabled) {
      try {
        const testCaseContext = {
          local: this.local,
          web: this.engineFactory.webEngine(),
        };
        await fn(testCaseContext);
      } catch (error) {
        console.error(getError(error));
      } finally {
        this.notifyComplete();
      }
    }
    return testCaseInfo;
  }
  debugger(stepIndex) {
    throw new Error("Method not implemented.");
  }
  webTestObject(webTestObject) {
    this.testObjects.push(webTestObject);
  }
  addEventListener(type, listener) {
    this.emitter.addListener(type, listener);
  }
  notifyComplete() {
    this.emit(TestProject_1.ExecutionEvent.COMPLETE);
  }
  emit(type, event) {
    this.emitter.emit(type, event);
  }
}
BaseTestProject$1.BaseTestProject = BaseTestProject;

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(TestProject, exports);
  __exportStar(BaseTestProject$1, exports);
})(project);

var engine = {};

var atom = {};

var WebAtom = {};

Object.defineProperty(WebAtom, "__esModule", { value: true });

var AbstractWebAtom$1 = {};

Object.defineProperty(AbstractWebAtom$1, "__esModule", { value: true });
AbstractWebAtom$1.AbstractWebAtom = void 0;
const timeout = 3 * 1000;
class AbstractWebAtom {
  async findElement(selector) {
    let startTime = -1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const element = await this.findElementWithoutRetry(selector);
        if (element !== null) {
          return element;
        }
      } catch (error) {
        console.error(error);
      }
      if (startTime <= 0) startTime = Date.now();
      const spentTimeout = Date.now() - startTime;
      if (spentTimeout >= timeout) {
        throw new Error("Timeout");
      }
    }
  }
}
AbstractWebAtom$1.AbstractWebAtom = AbstractWebAtom;

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(WebAtom, exports);
  __exportStar(AbstractWebAtom$1, exports);
})(atom);

var keywords$1 = {};

var OpenBrowserKeyword$1 = {};

Object.defineProperty(OpenBrowserKeyword$1, "__esModule", { value: true });
OpenBrowserKeyword$1.OpenBrowserKeyword = void 0;
class OpenBrowserKeyword {
  engineAtom;
  url;
  constructor(engineAtom, url) {
    this.engineAtom = engineAtom;
    this.url = url;
  }
  async openBrowser() {
    await this.engineAtom.openBrowser(this.url);
  }
}
OpenBrowserKeyword$1.OpenBrowserKeyword = OpenBrowserKeyword;

var CloseBrowserKeyword$1 = {};

Object.defineProperty(CloseBrowserKeyword$1, "__esModule", { value: true });
CloseBrowserKeyword$1.CloseBrowserKeyword = void 0;
class CloseBrowserKeyword {
  engineAtom;
  constructor(engineAtom) {
    this.engineAtom = engineAtom;
  }
  async closeBrowser() {
    await this.engineAtom.closeBrowser();
  }
}
CloseBrowserKeyword$1.CloseBrowserKeyword = CloseBrowserKeyword;

var ClickKeyword$1 = {};

Object.defineProperty(ClickKeyword$1, "__esModule", { value: true });
ClickKeyword$1.ClickKeyword = void 0;
class ClickKeyword {
  engineAtom;
  selector;
  constructor(engineAtom, selector) {
    this.engineAtom = engineAtom;
    this.selector = selector;
  }
  async click() {
    const element = await this.engineAtom.findElement(this.selector);
    await this.engineAtom.click(element);
  }
}
ClickKeyword$1.ClickKeyword = ClickKeyword;

var DoubleClickKeyword$1 = {};

Object.defineProperty(DoubleClickKeyword$1, "__esModule", { value: true });
DoubleClickKeyword$1.DoubleClickKeyword = void 0;
class DoubleClickKeyword {
  engineAtom;
  selector;
  constructor(engineAtom, selector) {
    this.engineAtom = engineAtom;
    this.selector = selector;
  }
  async doubleClick() {
    const element = await this.engineAtom.findElement(this.selector);
    await this.engineAtom.doubleClick(element);
  }
}
DoubleClickKeyword$1.DoubleClickKeyword = DoubleClickKeyword;

var RightClickKeyword$1 = {};

Object.defineProperty(RightClickKeyword$1, "__esModule", { value: true });
RightClickKeyword$1.RightClickKeyword = void 0;
class RightClickKeyword {
  engineAtom;
  selector;
  constructor(engineAtom, selector) {
    this.engineAtom = engineAtom;
    this.selector = selector;
  }
  async rightClick() {
    const element = await this.engineAtom.findElement(this.selector);
    await this.engineAtom.rightClick(element);
  }
}
RightClickKeyword$1.RightClickKeyword = RightClickKeyword;

var SendKeysKeyword$1 = {};

Object.defineProperty(SendKeysKeyword$1, "__esModule", { value: true });
SendKeysKeyword$1.SendKeysKeyword = void 0;
class SendKeysKeyword {
  engineAtom;
  selector;
  value;
  constructor(engineAtom, selector, value) {
    this.engineAtom = engineAtom;
    this.selector = selector;
    this.value = value;
  }
  async sendKeys() {
    const element = await this.engineAtom.findElement(this.selector);
    await this.engineAtom.sendKeys(element, this.value);
  }
}
SendKeysKeyword$1.SendKeysKeyword = SendKeysKeyword;

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(OpenBrowserKeyword$1, exports);
  __exportStar(CloseBrowserKeyword$1, exports);
  __exportStar(ClickKeyword$1, exports);
  __exportStar(DoubleClickKeyword$1, exports);
  __exportStar(RightClickKeyword$1, exports);
  __exportStar(SendKeysKeyword$1, exports);
})(keywords$1);

var WebEngine = {};

Object.defineProperty(WebEngine, "__esModule", { value: true });

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(atom, exports);
  __exportStar(keywords$1, exports);
  __exportStar(WebEngine, exports);
  __exportStar(EngineFactory$1, exports);
})(engine);

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(project, exports);
  __exportStar(engine, exports);
})(lib$1);

var lib = {};

var Project = {};

Object.defineProperty(Project, "__esModule", { value: true });

var keywords = {};

var WebKeyword$1 = {};

Object.defineProperty(WebKeyword$1, "__esModule", { value: true });
var WebKeyword;
(function (WebKeyword) {
  WebKeyword["OPEN_BROWSER"] = "openBrowser";
  WebKeyword["CLOSE_BROWSER"] = "closeBrowser";
  WebKeyword["CLICK"] = "click";
  WebKeyword["SET_TEXT"] = "setText";
  WebKeyword["DOUBLE_CLICK"] = "doubleClick";
  WebKeyword["RIGHT_CLICK"] = "rightClick";
  WebKeyword["SEND_KEYS"] = "sendKeys";
  WebKeyword["DRAG_AND_DROP"] = "dragAndDropByOffset";
})(WebKeyword || (WebKeyword = {}));
WebKeyword$1.default = WebKeyword;

var MobileKeyword = {};

Object.defineProperty(MobileKeyword, "__esModule", { value: true });
var MobileKeywords;
(function (MobileKeywords) {
  MobileKeywords["OPEN"] = "open";
  MobileKeywords["CLOSE"] = "close";
  MobileKeywords["TAP"] = "tap";
  MobileKeywords["SET_TEXT"] = "setText";
})(MobileKeywords || (MobileKeywords = {}));
MobileKeyword.default = MobileKeywords;

(function (exports) {
  var __importDefault =
    (commonjsGlobal && commonjsGlobal.__importDefault) ||
    function (mod) {
      return mod && mod.__esModule ? mod : { default: mod };
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MobileKeyword = exports.WebKeyword = void 0;
  var WebKeyword_1 = WebKeyword$1;
  Object.defineProperty(exports, "WebKeyword", {
    enumerable: true,
    get: function () {
      return __importDefault(WebKeyword_1).default;
    },
  });
  var MobileKeyword_1 = MobileKeyword;
  Object.defineProperty(exports, "MobileKeyword", {
    enumerable: true,
    get: function () {
      return __importDefault(MobileKeyword_1).default;
    },
  });
})(keywords);

var messaging = {};

var RecordingMessages = {};

(function (exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CommandToKeywordMap =
    exports.BrowserCommand =
    exports.PageRecorderCommandMessageType =
    exports.RecordedDataMessageType =
    exports.RecorderStatusMessageType =
    exports.RecorderCommandMessageType =
      void 0;
  const index_1 = keywords;
  (function (RecorderCommandMessageType) {
    RecorderCommandMessageType["START"] = "recorder.command.start";
    RecorderCommandMessageType["STOP"] = "recorder.command.stop";
  })(
    exports.RecorderCommandMessageType ||
      (exports.RecorderCommandMessageType = {})
  );
  (function (RecorderStatusMessageType) {
    RecorderStatusMessageType["STARTED"] = "recorder.status.started";
    RecorderStatusMessageType["STOPPED"] = "recorder.status.stopped";
  })(
    exports.RecorderStatusMessageType ||
      (exports.RecorderStatusMessageType = {})
  );
  (function (RecordedDataMessageType) {
    RecordedDataMessageType["WEB_ACTION"] = "recorder.recordeddata.web_action";
  })(exports.RecordedDataMessageType || (exports.RecordedDataMessageType = {}));
  (function (PageRecorderCommandMessageType) {
    PageRecorderCommandMessageType["START"] = "page.recorder.command.start";
    PageRecorderCommandMessageType["STOP"] = "page.recorder.command.stop";
  })(
    exports.PageRecorderCommandMessageType ||
      (exports.PageRecorderCommandMessageType = {})
  );
  var BrowserCommand;
  (function (BrowserCommand) {
    BrowserCommand["OPEN"] = "open";
    BrowserCommand["CLICK"] = "click";
    BrowserCommand["CLOSE"] = "close";
    BrowserCommand["DOUBLE_CLICK"] = "doubleClick";
    BrowserCommand["RIGHT_CLICK"] = "rightClick";
    BrowserCommand["SEND_KEYS"] = "sendKeys";
    BrowserCommand["DRAG_AND_DROP"] = "dragAndDropByOffset";
  })(
    (BrowserCommand = exports.BrowserCommand || (exports.BrowserCommand = {}))
  );
  exports.CommandToKeywordMap = {
    [BrowserCommand.OPEN]: index_1.WebKeyword.OPEN_BROWSER,
    [BrowserCommand.CLOSE]: index_1.WebKeyword.CLOSE_BROWSER,
    [BrowserCommand.CLICK]: index_1.WebKeyword.CLICK,
    [BrowserCommand.DOUBLE_CLICK]: index_1.WebKeyword.DOUBLE_CLICK,
    [BrowserCommand.RIGHT_CLICK]: index_1.WebKeyword.RIGHT_CLICK,
    [BrowserCommand.SEND_KEYS]: index_1.WebKeyword.SEND_KEYS,
    [BrowserCommand.DRAG_AND_DROP]: index_1.WebKeyword.DRAG_AND_DROP,
  };
})(RecordingMessages);

var ExecutionMessages = {};

(function (exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ExecutionMessageType = void 0;
  (function (ExecutionMessageType) {
    ExecutionMessageType["START"] = "run.start";
    ExecutionMessageType["STOP"] = "run.stop";
    ExecutionMessageType["STARTED"] = "run.started";
    ExecutionMessageType["STOPPED"] = "run.stopped";
    ExecutionMessageType["LOGS"] = "run.logs";
  })(exports.ExecutionMessageType || (exports.ExecutionMessageType = {}));
})(ExecutionMessages);

var ExtensionMessages = {};

Object.defineProperty(ExtensionMessages, "__esModule", { value: true });

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(RecordingMessages, exports);
  __exportStar(ExecutionMessages, exports);
  __exportStar(ExtensionMessages, exports);
})(messaging);

var testObjects = {};

var BasicTestObject = {};

Object.defineProperty(BasicTestObject, "__esModule", { value: true });

var Selector = {};

Object.defineProperty(Selector, "__esModule", { value: true });

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(BasicTestObject, exports);
  __exportStar(Selector, exports);
})(testObjects);

(function (exports) {
  var __createBinding =
    (commonjsGlobal && commonjsGlobal.__createBinding) ||
    (Object.create
      ? function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (
            !desc ||
            ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
          ) {
            desc = {
              enumerable: true,
              get: function () {
                return m[k];
              },
            };
          }
          Object.defineProperty(o, k2, desc);
        }
      : function (o, m, k, k2) {
          if (k2 === undefined) k2 = k;
          o[k2] = m[k];
        });
  var __exportStar =
    (commonjsGlobal && commonjsGlobal.__exportStar) ||
    function (m, exports) {
      for (var p in m)
        if (
          p !== "default" &&
          !Object.prototype.hasOwnProperty.call(exports, p)
        )
          __createBinding(exports, m, p);
    };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(Project, exports);
  __exportStar(keywords, exports);
  __exportStar(messaging, exports);
  __exportStar(testObjects, exports);
})(lib);

class WorkerTestProject extends lib$1.BaseTestProject {
  targetSteps;
  currentStep;
  async testCase(name, fn) {
    this.startDevServer();
    return super.testCase(name, fn);
  }
  shouldRunThisStep(stepIndex) {
    if (!this.targetSteps) {
      return null;
    }
    const shouldSkip =
      this.targetSteps.from >= 0 && stepIndex < this.targetSteps.from;
    if (shouldSkip) {
      return false;
    }
    const isInRunRange =
      this.targetSteps.from <= stepIndex && stepIndex <= this.targetSteps.to;
    return isInRunRange ? true : null; // Null mean wait to run
  }
  debugger(stepIndex) {
    const shouldRunThisStep = this.shouldRunThisStep(stepIndex);
    if (shouldRunThisStep != null) {
      return Promise.resolve(shouldRunThisStep);
    }
    const promise = new Promise((resolve, reject) => {
      this.currentStep = {
        stepIndex: stepIndex,
        resolve,
        reject,
      };
    });
    return promise;
  }
  async startDevServer() {
    const transporter = lib$2.TransporterFactory.SynchronousWorkerClient();
    transporter.connect();
    transporter.addRequestListener((request) => {
      if (request.id === lib$2.VOLATIVE_MESSAGE_ID) {
        const message = request.data;
        switch (message.messageType) {
          case lib.ExecutionMessageType.START:
            {
              const targetSteps = message.content;
              this.targetSteps = {
                from: targetSteps.from,
                to: targetSteps.to,
              };
              if (!this.currentStep) {
                return;
              }
              const shouldRunThisStep = this.shouldRunThisStep(
                this.currentStep.stepIndex
              );
              if (shouldRunThisStep != null) {
                this.currentStep.resolve(shouldRunThisStep);
              }
            }
            break;
          case lib.ExecutionMessageType.STOP:
            this.notifyComplete();
            break;
        }
      }
    });
  }
}

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
const transporter = lib$2.TransporterFactory.SynchronousWorkerClient();
transporter.connect();
const engineFactory = new lib$1.EngineFactory();
engineFactory.webEngineProvider = () => {
  const web = lib$2.RemoteObjectHelper.attachToClient({}, transporter);
  return web;
};
const katalon = new WorkerTestProject();
katalon.addEventListener(lib$1.ExecutionEvent.COMPLETE, () => {
  transporter.sendMessage("Done");
});
katalon.engineFactory = engineFactory;
setupSandbox();

export { katalon as default, engineFactory };
//# sourceMappingURL=katalon.js.map
