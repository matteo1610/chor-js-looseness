import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';

function getBusinessObjectElements(element, businessObjectProperty) {
  const { businessObject } = element;
  return Array.isArray(businessObject[businessObjectProperty]) ? businessObject[businessObjectProperty] : [];
}

function addBusinessObjectElement(element, bpmnFactory, businessObjectProperty, type) {
  const { businessObject } = element;
  const newObject = bpmnFactory.create(type, { name: undefined });
  return cmdHelper.addElementsTolist(element, businessObject, businessObjectProperty, [newObject]);
}

function removeBusinessObjectElement(element, idx, businessObjectProperty) {
  const { businessObject } = element;
  const objectToRemove = businessObject[businessObjectProperty][idx];
  return cmdHelper.removeElementsFromList(element, businessObject, businessObjectProperty, null,
    [objectToRemove]);
}

function updateBusinessObjectElement(element, values, idx, businessObjectProperty) {
  const { businessObject } = element;
  const itemToUpdate = businessObject[businessObjectProperty][idx];
  return cmdHelper.updateBusinessObject(element, itemToUpdate, values);
}

/**
 * Creates a custom table entry in the BPMN properties panel.
 *
 * @param {Object} element - The BPMN element.
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

  return entryFactory.table(translate, {
    id,
    description: translate(description),
    modelProperties: ['name'],
    labels: [translate(labels)],
    addLabel: translate(addLabel),
    getElements: element => getBusinessObjectElements(element, businessObjectProperty),
    addElement: element => addBusinessObjectElement(element, bpmnFactory, businessObjectProperty, type),
    removeElement: (element, node, idx) => removeBusinessObjectElement(element, idx, businessObjectProperty),
    updateElement: (element, values, node, idx) => updateBusinessObjectElement(element, values, idx,
      businessObjectProperty)
  });
}
