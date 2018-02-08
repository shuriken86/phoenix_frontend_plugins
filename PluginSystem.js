import logger from '../../app/components/logger/logger';

/**
 * Transform possibly uppercased list of names to lowercase.
 * @param {*} list - Any type of data (server can return array, or false for e.g.)
 * @private
 * @returns {Array}
 */
const normalizeNames = (list) => {
    // We suppose that data is wrong data end return empty array
    if (!_.isArray(list)) {
        return [];
    }

    return list.map(name => name.charAt(0).toLowerCase() + name.substr(1));
}

/**
 * @class PluginSystem
 * @classDesc Plugin system core module. Subscribes to outside events to modificate standart functionality behaviours
 * @param {Array} list - List of available plugins
 */
const PluginSystem = function(list) {
    this.__list = normalizeNames(list);
};

Object.assign(PluginSystem.prototype, Backbone.Events, {

    /**
     * @public
     * @returns {Promise}
     */
    initialize(list) {
        return Promise.all(this.__list.map(plugin => this.__load(plugin)));
    },

    /**
     * Load plugin based on name and create it's own instance
     * @param {string} name
     * @private
     * @returns {Promise}
     */
    __load(name) {
        return new Promise((resolve) => {
            // Destructurization to 'default' is used due to ES6 modules nature.
            // If you remove 'index.js' all 'components' folder will be bundled together. Don't do this
            try {
                require(`bundle-loader?lazy!components/pluginSystem/${name}/index.js`)(({default: Plugin}) => {
                    new Plugin(this);
                    resolve();
                });
            } catch (error) {
                logger.sendWarning(`PluginSystem: Cannot find module '${name}'`);
                // Don't stop application from bootrstapping.
                resolve();
            }
        });
    },

});

export default PluginSystem;
