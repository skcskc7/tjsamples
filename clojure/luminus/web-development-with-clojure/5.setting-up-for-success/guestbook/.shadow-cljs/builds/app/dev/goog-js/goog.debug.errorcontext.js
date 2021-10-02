["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/debug/errorcontext.js"],"~:js","goog.provide(\"goog.debug.errorcontext\");\ngoog.debug.errorcontext.addErrorContext = function(err, contextKey, contextValue) {\n  if (!err[goog.debug.errorcontext.CONTEXT_KEY_]) {\n    err[goog.debug.errorcontext.CONTEXT_KEY_] = {};\n  }\n  err[goog.debug.errorcontext.CONTEXT_KEY_][contextKey] = contextValue;\n};\ngoog.debug.errorcontext.getErrorContext = function(err) {\n  return err[goog.debug.errorcontext.CONTEXT_KEY_] || {};\n};\ngoog.debug.errorcontext.CONTEXT_KEY_ = \"__closure__error__context__984382\";\n","~:source","// Copyright 2017 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Provides methods dealing with context on error objects.\n */\n\ngoog.provide('goog.debug.errorcontext');\n\n\n/**\n * Adds key-value context to the error.\n * @param {!Error} err The error to add context to.\n * @param {string} contextKey Key for the context to be added.\n * @param {string} contextValue Value for the context to be added.\n */\ngoog.debug.errorcontext.addErrorContext = function(\n    err, contextKey, contextValue) {\n  if (!err[goog.debug.errorcontext.CONTEXT_KEY_]) {\n    err[goog.debug.errorcontext.CONTEXT_KEY_] = {};\n  }\n  err[goog.debug.errorcontext.CONTEXT_KEY_][contextKey] = contextValue;\n};\n\n\n/**\n * @param {!Error} err The error to get context from.\n * @return {!Object<string, string>} The context of the provided error.\n */\ngoog.debug.errorcontext.getErrorContext = function(err) {\n  return err[goog.debug.errorcontext.CONTEXT_KEY_] || {};\n};\n\n\n// TODO(user): convert this to a Symbol once goog.debug.ErrorReporter is\n// able to use ES6.\n/** @private @const {string} */\ngoog.debug.errorcontext.CONTEXT_KEY_ = '__closure__error__context__984382';\n","~:compiled-at",1633159619863,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.debug.errorcontext.js\",\n\"lineCount\":12,\n\"mappings\":\"AAkBAA,IAAA,CAAKC,OAAL,CAAa,yBAAb,CAAA;AASAD,IAAA,CAAKE,KAAL,CAAWC,YAAX,CAAwBC,eAAxB,GAA0CC,QAAQ,CAC9CC,GAD8C,EACzCC,UADyC,EAC7BC,YAD6B,CACf;AACjC,MAAI,CAACF,GAAA,CAAIN,IAAJ,CAASE,KAAT,CAAeC,YAAf,CAA4BM,YAA5B,CAAL;AACEH,OAAA,CAAIN,IAAJ,CAASE,KAAT,CAAeC,YAAf,CAA4BM,YAA5B,CAAA,GAA4C,EAA5C;AADF;AAGAH,KAAA,CAAIN,IAAJ,CAASE,KAAT,CAAeC,YAAf,CAA4BM,YAA5B,CAAA,CAA0CF,UAA1C,CAAA,GAAwDC,YAAxD;AAJiC,CADnC;AAaAR,IAAA,CAAKE,KAAL,CAAWC,YAAX,CAAwBO,eAAxB,GAA0CC,QAAQ,CAACL,GAAD,CAAM;AACtD,SAAOA,GAAA,CAAIN,IAAJ,CAASE,KAAT,CAAeC,YAAf,CAA4BM,YAA5B,CAAP,IAAoD,EAApD;AADsD,CAAxD;AAQAT,IAAA,CAAKE,KAAL,CAAWC,YAAX,CAAwBM,YAAxB,GAAuC,mCAAvC;;\",\n\"sources\":[\"goog/debug/errorcontext.js\"],\n\"sourcesContent\":[\"// Copyright 2017 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Provides methods dealing with context on error objects.\\n */\\n\\ngoog.provide('goog.debug.errorcontext');\\n\\n\\n/**\\n * Adds key-value context to the error.\\n * @param {!Error} err The error to add context to.\\n * @param {string} contextKey Key for the context to be added.\\n * @param {string} contextValue Value for the context to be added.\\n */\\ngoog.debug.errorcontext.addErrorContext = function(\\n    err, contextKey, contextValue) {\\n  if (!err[goog.debug.errorcontext.CONTEXT_KEY_]) {\\n    err[goog.debug.errorcontext.CONTEXT_KEY_] = {};\\n  }\\n  err[goog.debug.errorcontext.CONTEXT_KEY_][contextKey] = contextValue;\\n};\\n\\n\\n/**\\n * @param {!Error} err The error to get context from.\\n * @return {!Object<string, string>} The context of the provided error.\\n */\\ngoog.debug.errorcontext.getErrorContext = function(err) {\\n  return err[goog.debug.errorcontext.CONTEXT_KEY_] || {};\\n};\\n\\n\\n// TODO(user): convert this to a Symbol once goog.debug.ErrorReporter is\\n// able to use ES6.\\n/** @private @const {string} */\\ngoog.debug.errorcontext.CONTEXT_KEY_ = '__closure__error__context__984382';\\n\"],\n\"names\":[\"goog\",\"provide\",\"debug\",\"errorcontext\",\"addErrorContext\",\"goog.debug.errorcontext.addErrorContext\",\"err\",\"contextKey\",\"contextValue\",\"CONTEXT_KEY_\",\"getErrorContext\",\"goog.debug.errorcontext.getErrorContext\"]\n}\n"]