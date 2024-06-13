/**
 * This module initializes the LoosenessPropertiesProvider for use with bpmn-js. It defines the dependency injection
 * configuration for the provider.
 */

import LoosenessPropertiesProvider from './LoosenessPropertiesProvider';

module.exports = {
  __init__: [ 'propertiesProvider' ],
  propertiesProvider: [ 'type', LoosenessPropertiesProvider]
};