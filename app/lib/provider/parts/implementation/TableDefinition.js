import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';

/**
 * Creates a custom table entry in the BPMN properties panel.
 *
 * @param {djs.model.Base|ModdleElement} element - The BPMN element.
 * @param {Object} bpmnFactory - Factory to create new BPMN elements.
 * @param {Function} translate - Function to translate labels and descriptions.
 * @param {Object} options - Configuration options.
 * @param {string} options.businessObjectProperty - The property of the business object to be modified.
 * @param {string} options.id - The ID of the entry.
 * @param {string} options.description - The description of the entry.
 * @param {string} options.labels - The label of the entry.
 * @param {string} options.addLabel - The label for the add button.
 * @param {string} options.type - The type of the new BPMN element to be created.
 * @returns {Object} The custom property table entry.
 */
export default function createCustomTableEntry(element, bpmnFactory, translate, options) {
  const {
    businessObjectProperty,
    id,
    description,
    labels,
    addLabel,
    type
  } = options;
  const businessObject = getBusinessObject(element);

  return entryFactory.table(translate, {
    id,
    description: translate(description),
    modelProperties: ['name'],
    labels: [translate(labels)],
    addLabel: translate(addLabel),
    getElements: () => getBusinessObjectElements(businessObject, businessObjectProperty),
    addElement: element => addBusinessObjectElement(element, businessObject, bpmnFactory, businessObjectProperty, type),
    removeElement: (element, node, idx) => removeBusinessObjectElement(element, businessObject, idx,
      businessObjectProperty),
    updateElement: (element, values, node, idx) => updateBusinessObjectElement(element, businessObject, values, idx,
      businessObjectProperty)
  });
}

function getBusinessObjectElements(businessObject, businessObjectProperty) {
  return businessObject.get(businessObjectProperty);
}

function addBusinessObjectElement(element, businessObject, bpmnFactory, businessObjectProperty, type) {
  const newObject = bpmnFactory.create(type, { name: undefined });
  return cmdHelper.addElementsTolist(element, businessObject, businessObjectProperty, [newObject]);
}

function removeBusinessObjectElement(element, businessObject, idx, businessObjectProperty) {
  const objectToRemove = businessObject.get(businessObjectProperty)[idx];
  return cmdHelper.removeElementsFromList(element, businessObject, businessObjectProperty, null,
    [objectToRemove]);
}

function updateBusinessObjectElement(element, businessObject, values, idx, businessObjectProperty) {
  const itemToUpdate = businessObject.get(businessObjectProperty)[idx];
  return cmdHelper.updateBusinessObject(element, itemToUpdate, values);
}
