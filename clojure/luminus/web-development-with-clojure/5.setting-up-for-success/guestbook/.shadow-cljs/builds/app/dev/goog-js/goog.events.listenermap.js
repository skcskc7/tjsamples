["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/events/listenermap.js"],"~:js","goog.provide(\"goog.events.ListenerMap\");\ngoog.require(\"goog.array\");\ngoog.require(\"goog.events.Listener\");\ngoog.require(\"goog.object\");\ngoog.events.ListenerMap = function(src) {\n  this.src = src;\n  this.listeners = {};\n  this.typeCount_ = 0;\n};\ngoog.events.ListenerMap.prototype.getTypeCount = function() {\n  return this.typeCount_;\n};\ngoog.events.ListenerMap.prototype.getListenerCount = function() {\n  var count = 0;\n  for (var type in this.listeners) {\n    count += this.listeners[type].length;\n  }\n  return count;\n};\ngoog.events.ListenerMap.prototype.add = function(type, listener, callOnce, opt_useCapture, opt_listenerScope) {\n  var typeStr = type.toString();\n  var listenerArray = this.listeners[typeStr];\n  if (!listenerArray) {\n    listenerArray = this.listeners[typeStr] = [];\n    this.typeCount_++;\n  }\n  var listenerObj;\n  var index = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);\n  if (index > -1) {\n    listenerObj = listenerArray[index];\n    if (!callOnce) {\n      listenerObj.callOnce = false;\n    }\n  } else {\n    listenerObj = new goog.events.Listener(listener, null, this.src, typeStr, !!opt_useCapture, opt_listenerScope);\n    listenerObj.callOnce = callOnce;\n    listenerArray.push(listenerObj);\n  }\n  return listenerObj;\n};\ngoog.events.ListenerMap.prototype.remove = function(type, listener, opt_useCapture, opt_listenerScope) {\n  var typeStr = type.toString();\n  if (!(typeStr in this.listeners)) {\n    return false;\n  }\n  var listenerArray = this.listeners[typeStr];\n  var index = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, opt_useCapture, opt_listenerScope);\n  if (index > -1) {\n    var listenerObj = listenerArray[index];\n    listenerObj.markAsRemoved();\n    goog.array.removeAt(listenerArray, index);\n    if (listenerArray.length == 0) {\n      delete this.listeners[typeStr];\n      this.typeCount_--;\n    }\n    return true;\n  }\n  return false;\n};\ngoog.events.ListenerMap.prototype.removeByKey = function(listener) {\n  var type = listener.type;\n  if (!(type in this.listeners)) {\n    return false;\n  }\n  var removed = goog.array.remove(this.listeners[type], listener);\n  if (removed) {\n    listener.markAsRemoved();\n    if (this.listeners[type].length == 0) {\n      delete this.listeners[type];\n      this.typeCount_--;\n    }\n  }\n  return removed;\n};\ngoog.events.ListenerMap.prototype.removeAll = function(opt_type) {\n  var typeStr = opt_type && opt_type.toString();\n  var count = 0;\n  for (var type in this.listeners) {\n    if (!typeStr || type == typeStr) {\n      var listenerArray = this.listeners[type];\n      for (var i = 0; i < listenerArray.length; i++) {\n        ++count;\n        listenerArray[i].markAsRemoved();\n      }\n      delete this.listeners[type];\n      this.typeCount_--;\n    }\n  }\n  return count;\n};\ngoog.events.ListenerMap.prototype.getListeners = function(type, capture) {\n  var listenerArray = this.listeners[type.toString()];\n  var rv = [];\n  if (listenerArray) {\n    for (var i = 0; i < listenerArray.length; ++i) {\n      var listenerObj = listenerArray[i];\n      if (listenerObj.capture == capture) {\n        rv.push(listenerObj);\n      }\n    }\n  }\n  return rv;\n};\ngoog.events.ListenerMap.prototype.getListener = function(type, listener, capture, opt_listenerScope) {\n  var listenerArray = this.listeners[type.toString()];\n  var i = -1;\n  if (listenerArray) {\n    i = goog.events.ListenerMap.findListenerIndex_(listenerArray, listener, capture, opt_listenerScope);\n  }\n  return i > -1 ? listenerArray[i] : null;\n};\ngoog.events.ListenerMap.prototype.hasListener = function(opt_type, opt_capture) {\n  var hasType = opt_type !== undefined;\n  var typeStr = hasType ? opt_type.toString() : \"\";\n  var hasCapture = opt_capture !== undefined;\n  return goog.object.some(this.listeners, function(listenerArray, type) {\n    for (var i = 0; i < listenerArray.length; ++i) {\n      if ((!hasType || listenerArray[i].type == typeStr) && (!hasCapture || listenerArray[i].capture == opt_capture)) {\n        return true;\n      }\n    }\n    return false;\n  });\n};\ngoog.events.ListenerMap.findListenerIndex_ = function(listenerArray, listener, opt_useCapture, opt_listenerScope) {\n  for (var i = 0; i < listenerArray.length; ++i) {\n    var listenerObj = listenerArray[i];\n    if (!listenerObj.removed && listenerObj.listener == listener && listenerObj.capture == !!opt_useCapture && listenerObj.handler == opt_listenerScope) {\n      return i;\n    }\n  }\n  return -1;\n};\n","~:source","// Copyright 2013 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview A map of listeners that provides utility functions to\n * deal with listeners on an event target. Used by\n * `goog.events.EventTarget`.\n *\n * WARNING: Do not use this class from outside goog.events package.\n */\n\ngoog.provide('goog.events.ListenerMap');\n\ngoog.require('goog.array');\ngoog.require('goog.events.Listener');\ngoog.require('goog.object');\n\n\n\n/**\n * Creates a new listener map.\n * @param {EventTarget|goog.events.Listenable} src The src object.\n * @constructor\n * @final\n */\ngoog.events.ListenerMap = function(src) {\n  /** @type {EventTarget|goog.events.Listenable} */\n  this.src = src;\n\n  /**\n   * Maps of event type to an array of listeners.\n   * @type {!Object<string, !Array<!goog.events.Listener>>}\n   */\n  this.listeners = {};\n\n  /**\n   * The count of types in this map that have registered listeners.\n   * @private {number}\n   */\n  this.typeCount_ = 0;\n};\n\n\n/**\n * @return {number} The count of event types in this map that actually\n *     have registered listeners.\n */\ngoog.events.ListenerMap.prototype.getTypeCount = function() {\n  return this.typeCount_;\n};\n\n\n/**\n * @return {number} Total number of registered listeners.\n */\ngoog.events.ListenerMap.prototype.getListenerCount = function() {\n  var count = 0;\n  for (var type in this.listeners) {\n    count += this.listeners[type].length;\n  }\n  return count;\n};\n\n\n/**\n * Adds an event listener. A listener can only be added once to an\n * object and if it is added again the key for the listener is\n * returned.\n *\n * Note that a one-off listener will not change an existing listener,\n * if any. On the other hand a normal listener will change existing\n * one-off listener to become a normal listener.\n *\n * @param {string|!goog.events.EventId} type The listener event type.\n * @param {!Function} listener This listener callback method.\n * @param {boolean} callOnce Whether the listener is a one-off\n *     listener.\n * @param {boolean=} opt_useCapture The capture mode of the listener.\n * @param {Object=} opt_listenerScope Object in whose scope to call the\n *     listener.\n * @return {!goog.events.ListenableKey} Unique key for the listener.\n */\ngoog.events.ListenerMap.prototype.add = function(\n    type, listener, callOnce, opt_useCapture, opt_listenerScope) {\n  var typeStr = type.toString();\n  var listenerArray = this.listeners[typeStr];\n  if (!listenerArray) {\n    listenerArray = this.listeners[typeStr] = [];\n    this.typeCount_++;\n  }\n\n  var listenerObj;\n  var index = goog.events.ListenerMap.findListenerIndex_(\n      listenerArray, listener, opt_useCapture, opt_listenerScope);\n  if (index > -1) {\n    listenerObj = listenerArray[index];\n    if (!callOnce) {\n      // Ensure that, if there is an existing callOnce listener, it is no\n      // longer a callOnce listener.\n      listenerObj.callOnce = false;\n    }\n  } else {\n    listenerObj = new goog.events.Listener(\n        listener, null, this.src, typeStr, !!opt_useCapture, opt_listenerScope);\n    listenerObj.callOnce = callOnce;\n    listenerArray.push(listenerObj);\n  }\n  return listenerObj;\n};\n\n\n/**\n * Removes a matching listener.\n * @param {string|!goog.events.EventId} type The listener event type.\n * @param {!Function} listener This listener callback method.\n * @param {boolean=} opt_useCapture The capture mode of the listener.\n * @param {Object=} opt_listenerScope Object in whose scope to call the\n *     listener.\n * @return {boolean} Whether any listener was removed.\n */\ngoog.events.ListenerMap.prototype.remove = function(\n    type, listener, opt_useCapture, opt_listenerScope) {\n  var typeStr = type.toString();\n  if (!(typeStr in this.listeners)) {\n    return false;\n  }\n\n  var listenerArray = this.listeners[typeStr];\n  var index = goog.events.ListenerMap.findListenerIndex_(\n      listenerArray, listener, opt_useCapture, opt_listenerScope);\n  if (index > -1) {\n    var listenerObj = listenerArray[index];\n    listenerObj.markAsRemoved();\n    goog.array.removeAt(listenerArray, index);\n    if (listenerArray.length == 0) {\n      delete this.listeners[typeStr];\n      this.typeCount_--;\n    }\n    return true;\n  }\n  return false;\n};\n\n\n/**\n * Removes the given listener object.\n * @param {!goog.events.ListenableKey} listener The listener to remove.\n * @return {boolean} Whether the listener is removed.\n */\ngoog.events.ListenerMap.prototype.removeByKey = function(listener) {\n  var type = listener.type;\n  if (!(type in this.listeners)) {\n    return false;\n  }\n\n  var removed = goog.array.remove(this.listeners[type], listener);\n  if (removed) {\n    /** @type {!goog.events.Listener} */ (listener).markAsRemoved();\n    if (this.listeners[type].length == 0) {\n      delete this.listeners[type];\n      this.typeCount_--;\n    }\n  }\n  return removed;\n};\n\n\n/**\n * Removes all listeners from this map. If opt_type is provided, only\n * listeners that match the given type are removed.\n * @param {string|!goog.events.EventId=} opt_type Type of event to remove.\n * @return {number} Number of listeners removed.\n */\ngoog.events.ListenerMap.prototype.removeAll = function(opt_type) {\n  var typeStr = opt_type && opt_type.toString();\n  var count = 0;\n  for (var type in this.listeners) {\n    if (!typeStr || type == typeStr) {\n      var listenerArray = this.listeners[type];\n      for (var i = 0; i < listenerArray.length; i++) {\n        ++count;\n        listenerArray[i].markAsRemoved();\n      }\n      delete this.listeners[type];\n      this.typeCount_--;\n    }\n  }\n  return count;\n};\n\n\n/**\n * Gets all listeners that match the given type and capture mode. The\n * returned array is a copy (but the listener objects are not).\n * @param {string|!goog.events.EventId} type The type of the listeners\n *     to retrieve.\n * @param {boolean} capture The capture mode of the listeners to retrieve.\n * @return {!Array<!goog.events.ListenableKey>} An array of matching\n *     listeners.\n */\ngoog.events.ListenerMap.prototype.getListeners = function(type, capture) {\n  var listenerArray = this.listeners[type.toString()];\n  var rv = [];\n  if (listenerArray) {\n    for (var i = 0; i < listenerArray.length; ++i) {\n      var listenerObj = listenerArray[i];\n      if (listenerObj.capture == capture) {\n        rv.push(listenerObj);\n      }\n    }\n  }\n  return rv;\n};\n\n\n/**\n * Gets the goog.events.ListenableKey for the event or null if no such\n * listener is in use.\n *\n * @param {string|!goog.events.EventId} type The type of the listener\n *     to retrieve.\n * @param {!Function} listener The listener function to get.\n * @param {boolean} capture Whether the listener is a capturing listener.\n * @param {Object=} opt_listenerScope Object in whose scope to call the\n *     listener.\n * @return {goog.events.ListenableKey} the found listener or null if not found.\n */\ngoog.events.ListenerMap.prototype.getListener = function(\n    type, listener, capture, opt_listenerScope) {\n  var listenerArray = this.listeners[type.toString()];\n  var i = -1;\n  if (listenerArray) {\n    i = goog.events.ListenerMap.findListenerIndex_(\n        listenerArray, listener, capture, opt_listenerScope);\n  }\n  return i > -1 ? listenerArray[i] : null;\n};\n\n\n/**\n * Whether there is a matching listener. If either the type or capture\n * parameters are unspecified, the function will match on the\n * remaining criteria.\n *\n * @param {string|!goog.events.EventId=} opt_type The type of the listener.\n * @param {boolean=} opt_capture The capture mode of the listener.\n * @return {boolean} Whether there is an active listener matching\n *     the requested type and/or capture phase.\n */\ngoog.events.ListenerMap.prototype.hasListener = function(\n    opt_type, opt_capture) {\n  var hasType = (opt_type !== undefined);\n  var typeStr = hasType ? opt_type.toString() : '';\n  var hasCapture = (opt_capture !== undefined);\n\n  return goog.object.some(this.listeners, function(listenerArray, type) {\n    for (var i = 0; i < listenerArray.length; ++i) {\n      if ((!hasType || listenerArray[i].type == typeStr) &&\n          (!hasCapture || listenerArray[i].capture == opt_capture)) {\n        return true;\n      }\n    }\n\n    return false;\n  });\n};\n\n\n/**\n * Finds the index of a matching goog.events.Listener in the given\n * listenerArray.\n * @param {!Array<!goog.events.Listener>} listenerArray Array of listener.\n * @param {!Function} listener The listener function.\n * @param {boolean=} opt_useCapture The capture flag for the listener.\n * @param {Object=} opt_listenerScope The listener scope.\n * @return {number} The index of the matching listener within the\n *     listenerArray.\n * @private\n */\ngoog.events.ListenerMap.findListenerIndex_ = function(\n    listenerArray, listener, opt_useCapture, opt_listenerScope) {\n  for (var i = 0; i < listenerArray.length; ++i) {\n    var listenerObj = listenerArray[i];\n    if (!listenerObj.removed && listenerObj.listener == listener &&\n        listenerObj.capture == !!opt_useCapture &&\n        listenerObj.handler == opt_listenerScope) {\n      return i;\n    }\n  }\n  return -1;\n};\n","~:compiled-at",1633159619875,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.events.listenermap.js\",\n\"lineCount\":134,\n\"mappings\":\"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\",\n\"sources\":[\"goog/events/listenermap.js\"],\n\"sourcesContent\":[\"// Copyright 2013 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview A map of listeners that provides utility functions to\\n * deal with listeners on an event target. Used by\\n * `goog.events.EventTarget`.\\n *\\n * WARNING: Do not use this class from outside goog.events package.\\n */\\n\\ngoog.provide('goog.events.ListenerMap');\\n\\ngoog.require('goog.array');\\ngoog.require('goog.events.Listener');\\ngoog.require('goog.object');\\n\\n\\n\\n/**\\n * Creates a new listener map.\\n * @param {EventTarget|goog.events.Listenable} src The src object.\\n * @constructor\\n * @final\\n */\\ngoog.events.ListenerMap = function(src) {\\n  /** @type {EventTarget|goog.events.Listenable} */\\n  this.src = src;\\n\\n  /**\\n   * Maps of event type to an array of listeners.\\n   * @type {!Object<string, !Array<!goog.events.Listener>>}\\n   */\\n  this.listeners = {};\\n\\n  /**\\n   * The count of types in this map that have registered listeners.\\n   * @private {number}\\n   */\\n  this.typeCount_ = 0;\\n};\\n\\n\\n/**\\n * @return {number} The count of event types in this map that actually\\n *     have registered listeners.\\n */\\ngoog.events.ListenerMap.prototype.getTypeCount = function() {\\n  return this.typeCount_;\\n};\\n\\n\\n/**\\n * @return {number} Total number of registered listeners.\\n */\\ngoog.events.ListenerMap.prototype.getListenerCount = function() {\\n  var count = 0;\\n  for (var type in this.listeners) {\\n    count += this.listeners[type].length;\\n  }\\n  return count;\\n};\\n\\n\\n/**\\n * Adds an event listener. A listener can only be added once to an\\n * object and if it is added again the key for the listener is\\n * returned.\\n *\\n * Note that a one-off listener will not change an existing listener,\\n * if any. On the other hand a normal listener will change existing\\n * one-off listener to become a normal listener.\\n *\\n * @param {string|!goog.events.EventId} type The listener event type.\\n * @param {!Function} listener This listener callback method.\\n * @param {boolean} callOnce Whether the listener is a one-off\\n *     listener.\\n * @param {boolean=} opt_useCapture The capture mode of the listener.\\n * @param {Object=} opt_listenerScope Object in whose scope to call the\\n *     listener.\\n * @return {!goog.events.ListenableKey} Unique key for the listener.\\n */\\ngoog.events.ListenerMap.prototype.add = function(\\n    type, listener, callOnce, opt_useCapture, opt_listenerScope) {\\n  var typeStr = type.toString();\\n  var listenerArray = this.listeners[typeStr];\\n  if (!listenerArray) {\\n    listenerArray = this.listeners[typeStr] = [];\\n    this.typeCount_++;\\n  }\\n\\n  var listenerObj;\\n  var index = goog.events.ListenerMap.findListenerIndex_(\\n      listenerArray, listener, opt_useCapture, opt_listenerScope);\\n  if (index > -1) {\\n    listenerObj = listenerArray[index];\\n    if (!callOnce) {\\n      // Ensure that, if there is an existing callOnce listener, it is no\\n      // longer a callOnce listener.\\n      listenerObj.callOnce = false;\\n    }\\n  } else {\\n    listenerObj = new goog.events.Listener(\\n        listener, null, this.src, typeStr, !!opt_useCapture, opt_listenerScope);\\n    listenerObj.callOnce = callOnce;\\n    listenerArray.push(listenerObj);\\n  }\\n  return listenerObj;\\n};\\n\\n\\n/**\\n * Removes a matching listener.\\n * @param {string|!goog.events.EventId} type The listener event type.\\n * @param {!Function} listener This listener callback method.\\n * @param {boolean=} opt_useCapture The capture mode of the listener.\\n * @param {Object=} opt_listenerScope Object in whose scope to call the\\n *     listener.\\n * @return {boolean} Whether any listener was removed.\\n */\\ngoog.events.ListenerMap.prototype.remove = function(\\n    type, listener, opt_useCapture, opt_listenerScope) {\\n  var typeStr = type.toString();\\n  if (!(typeStr in this.listeners)) {\\n    return false;\\n  }\\n\\n  var listenerArray = this.listeners[typeStr];\\n  var index = goog.events.ListenerMap.findListenerIndex_(\\n      listenerArray, listener, opt_useCapture, opt_listenerScope);\\n  if (index > -1) {\\n    var listenerObj = listenerArray[index];\\n    listenerObj.markAsRemoved();\\n    goog.array.removeAt(listenerArray, index);\\n    if (listenerArray.length == 0) {\\n      delete this.listeners[typeStr];\\n      this.typeCount_--;\\n    }\\n    return true;\\n  }\\n  return false;\\n};\\n\\n\\n/**\\n * Removes the given listener object.\\n * @param {!goog.events.ListenableKey} listener The listener to remove.\\n * @return {boolean} Whether the listener is removed.\\n */\\ngoog.events.ListenerMap.prototype.removeByKey = function(listener) {\\n  var type = listener.type;\\n  if (!(type in this.listeners)) {\\n    return false;\\n  }\\n\\n  var removed = goog.array.remove(this.listeners[type], listener);\\n  if (removed) {\\n    /** @type {!goog.events.Listener} */ (listener).markAsRemoved();\\n    if (this.listeners[type].length == 0) {\\n      delete this.listeners[type];\\n      this.typeCount_--;\\n    }\\n  }\\n  return removed;\\n};\\n\\n\\n/**\\n * Removes all listeners from this map. If opt_type is provided, only\\n * listeners that match the given type are removed.\\n * @param {string|!goog.events.EventId=} opt_type Type of event to remove.\\n * @return {number} Number of listeners removed.\\n */\\ngoog.events.ListenerMap.prototype.removeAll = function(opt_type) {\\n  var typeStr = opt_type && opt_type.toString();\\n  var count = 0;\\n  for (var type in this.listeners) {\\n    if (!typeStr || type == typeStr) {\\n      var listenerArray = this.listeners[type];\\n      for (var i = 0; i < listenerArray.length; i++) {\\n        ++count;\\n        listenerArray[i].markAsRemoved();\\n      }\\n      delete this.listeners[type];\\n      this.typeCount_--;\\n    }\\n  }\\n  return count;\\n};\\n\\n\\n/**\\n * Gets all listeners that match the given type and capture mode. The\\n * returned array is a copy (but the listener objects are not).\\n * @param {string|!goog.events.EventId} type The type of the listeners\\n *     to retrieve.\\n * @param {boolean} capture The capture mode of the listeners to retrieve.\\n * @return {!Array<!goog.events.ListenableKey>} An array of matching\\n *     listeners.\\n */\\ngoog.events.ListenerMap.prototype.getListeners = function(type, capture) {\\n  var listenerArray = this.listeners[type.toString()];\\n  var rv = [];\\n  if (listenerArray) {\\n    for (var i = 0; i < listenerArray.length; ++i) {\\n      var listenerObj = listenerArray[i];\\n      if (listenerObj.capture == capture) {\\n        rv.push(listenerObj);\\n      }\\n    }\\n  }\\n  return rv;\\n};\\n\\n\\n/**\\n * Gets the goog.events.ListenableKey for the event or null if no such\\n * listener is in use.\\n *\\n * @param {string|!goog.events.EventId} type The type of the listener\\n *     to retrieve.\\n * @param {!Function} listener The listener function to get.\\n * @param {boolean} capture Whether the listener is a capturing listener.\\n * @param {Object=} opt_listenerScope Object in whose scope to call the\\n *     listener.\\n * @return {goog.events.ListenableKey} the found listener or null if not found.\\n */\\ngoog.events.ListenerMap.prototype.getListener = function(\\n    type, listener, capture, opt_listenerScope) {\\n  var listenerArray = this.listeners[type.toString()];\\n  var i = -1;\\n  if (listenerArray) {\\n    i = goog.events.ListenerMap.findListenerIndex_(\\n        listenerArray, listener, capture, opt_listenerScope);\\n  }\\n  return i > -1 ? listenerArray[i] : null;\\n};\\n\\n\\n/**\\n * Whether there is a matching listener. If either the type or capture\\n * parameters are unspecified, the function will match on the\\n * remaining criteria.\\n *\\n * @param {string|!goog.events.EventId=} opt_type The type of the listener.\\n * @param {boolean=} opt_capture The capture mode of the listener.\\n * @return {boolean} Whether there is an active listener matching\\n *     the requested type and/or capture phase.\\n */\\ngoog.events.ListenerMap.prototype.hasListener = function(\\n    opt_type, opt_capture) {\\n  var hasType = (opt_type !== undefined);\\n  var typeStr = hasType ? opt_type.toString() : '';\\n  var hasCapture = (opt_capture !== undefined);\\n\\n  return goog.object.some(this.listeners, function(listenerArray, type) {\\n    for (var i = 0; i < listenerArray.length; ++i) {\\n      if ((!hasType || listenerArray[i].type == typeStr) &&\\n          (!hasCapture || listenerArray[i].capture == opt_capture)) {\\n        return true;\\n      }\\n    }\\n\\n    return false;\\n  });\\n};\\n\\n\\n/**\\n * Finds the index of a matching goog.events.Listener in the given\\n * listenerArray.\\n * @param {!Array<!goog.events.Listener>} listenerArray Array of listener.\\n * @param {!Function} listener The listener function.\\n * @param {boolean=} opt_useCapture The capture flag for the listener.\\n * @param {Object=} opt_listenerScope The listener scope.\\n * @return {number} The index of the matching listener within the\\n *     listenerArray.\\n * @private\\n */\\ngoog.events.ListenerMap.findListenerIndex_ = function(\\n    listenerArray, listener, opt_useCapture, opt_listenerScope) {\\n  for (var i = 0; i < listenerArray.length; ++i) {\\n    var listenerObj = listenerArray[i];\\n    if (!listenerObj.removed && listenerObj.listener == listener &&\\n        listenerObj.capture == !!opt_useCapture &&\\n        listenerObj.handler == opt_listenerScope) {\\n      return i;\\n    }\\n  }\\n  return -1;\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"events\",\"ListenerMap\",\"goog.events.ListenerMap\",\"src\",\"listeners\",\"typeCount_\",\"prototype\",\"getTypeCount\",\"goog.events.ListenerMap.prototype.getTypeCount\",\"getListenerCount\",\"goog.events.ListenerMap.prototype.getListenerCount\",\"count\",\"type\",\"length\",\"add\",\"goog.events.ListenerMap.prototype.add\",\"listener\",\"callOnce\",\"opt_useCapture\",\"opt_listenerScope\",\"typeStr\",\"toString\",\"listenerArray\",\"listenerObj\",\"index\",\"findListenerIndex_\",\"Listener\",\"push\",\"remove\",\"goog.events.ListenerMap.prototype.remove\",\"markAsRemoved\",\"array\",\"removeAt\",\"removeByKey\",\"goog.events.ListenerMap.prototype.removeByKey\",\"removed\",\"removeAll\",\"goog.events.ListenerMap.prototype.removeAll\",\"opt_type\",\"i\",\"getListeners\",\"goog.events.ListenerMap.prototype.getListeners\",\"capture\",\"rv\",\"getListener\",\"goog.events.ListenerMap.prototype.getListener\",\"hasListener\",\"goog.events.ListenerMap.prototype.hasListener\",\"opt_capture\",\"hasType\",\"undefined\",\"hasCapture\",\"object\",\"some\",\"goog.events.ListenerMap.findListenerIndex_\",\"handler\"]\n}\n"]