'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * @ModifiedOnly by viktor.luft@freiheit.com
 *
 * The SpyRegistry is a class to handle the
 * correct restoration of spied objects.
 *
 * You may push an objects information about
 * a spied method to store it and be able to
 * restore it at any time.
 * Consider the SpyRegistry as information storage
 * for spied objects.
 *
 */
var SpyRegistry = exports.SpyRegistry = function () {

    /**
     * @constructor
     */
    function SpyRegistry() {
        if (!(this instanceof SpyRegistry)) {
            throw new Error('\n\nPlease make sure to use this constructor only with "new" keyword.\n\n');
        }
        this.register = {};
        this.registerCount = 0;
    }

    /**
     * If called, the SypRegistry will be resetting to its initial state.
     * Exception: the unique register count will not be touched.
     * Meaning that all stored object information will be restored
     * to their individual previous state.
     */
    SpyRegistry.prototype.restoreAll = function restoreAll() {
        for (var key in this.register) {
            if (this.register.hasOwnProperty(key)) {
                var _register$key = this.register[key],
                    obj = _register$key.obj,
                    method = _register$key.method,
                    methodName = _register$key.methodName;

                if (obj) {
                    obj[methodName] = method;
                }
            }
        }
        this.register = {};
    };

    /**
     * If called, the SpyRegistry will restore the object,
     * which was registered at given index and is getting lose
     * of the stored information.
     *
     * If the registry entry for the given index does not exist,
     * nothing will happen.
     *
     * @param index:number -> the unique identifier of stored information.
     */
    SpyRegistry.prototype.restore = function restore(index) {
        var entry = this.register[index];
        if (entry) {
            var obj = entry.obj,
                method = entry.method,
                methodName = entry.methodName;

            if (obj) {
                obj[methodName] = method;
            }
            delete this.register[index];
        }
    };

    /**
     * If called, the SpyRegistry will store the given information.
     * The unique identifier index will be returned.
     *
     * @param obj:Object -> The related object, which will be spied.
     * @param methodName:string -> The name of the mocked method.
     * @returns {number} -> The unique store index.
     */
    SpyRegistry.prototype.push = function (obj, methodName) {
        this.registerCount++;
        this.register[this.registerCount] = { obj: obj, method: obj[methodName], methodName: methodName };
        return this.registerCount;
    };

    /**
     * If called, the stored method for the corresponding index
     * will be returned. If the registry entry does not exist,
     * undefined will be returned.
     *
     * @param index:number -> the unique identifier of stored information.
     * @returns {any} -> Any stored information can be returned.
     *                   BUT: Usually this method returns a function or
     *                        undefined.
     */
    SpyRegistry.prototype.getOriginalMethod = function getOriginalMethod(index) {
        var entry = this.register[index];
        if (entry) {
            return entry.method;
        }
    };

    return SpyRegistry;
}();