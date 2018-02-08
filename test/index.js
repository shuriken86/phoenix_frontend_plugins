/**
 * @class PluginTest
 * @classDesc Test plugin. Have no usage in real life.
 * @todo When at least one plugin will be created - remove this one
 */
export default class PluginTest {

    /**
     * @param {Object} pluginSystem
     */
    constructor(pluginSystem) {
        this.__attachListeners(pluginSystem);
    }

    /**
     * @param {Object} pluginSystem
     * @private
     */
    __attachListeners(pluginSystem) {
        pluginSystem.on('beforeControllerRun', ({name}) => {
            console.warn(`[pluginSystem] Caught: beforeControllerRun on ${name}`);
        })
    }
}
