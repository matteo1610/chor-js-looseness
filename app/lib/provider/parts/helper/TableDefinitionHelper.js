import { is } from 'bpmn-js/lib/util/ModelUtil';
import tableDefinition from '../implementation/TableDefinition';

/**
 * Adds a table definition to the group if the element matches the specified type.
 *
 * @param {Object} group - The properties panel group.
 * @param {djs.model.Base} element - The BPMN element.
 * @param {Object} bpmnFactory - Factory to create new BPMN elements.
 * @param {Function} translate - Function to translate labels and descriptions.
 * @param {string} elementType - The BPMN element type to check against.
 * @param {Object} options - Configuration options for the table definition.
 */
export function addTableDefinition(group, element, bpmnFactory, translate, elementType,
    options) {
  if (is(element, elementType)) {
    group.entries.push(tableDefinition(element, bpmnFactory, translate, options));
  }
}