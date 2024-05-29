import { is } from 'bpmn-js/lib/util/ModelUtil';
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

/**
 * Adds execution properties to the properties panel group based on the type of BPMN element.
 *
 * @param {Object} group - The properties panel group.
 * @param {djs.model.Base} element - The BPMN element.
 * @param {Object} bpmnFactory - Factory to create new BPMN elements.
 * @param {Function} translate - Function to translate labels and descriptions.
 */
export default function addExecutionProps(group, element, bpmnFactory, translate) {
  if (is(element, 'bpmn:Message')) {
    addMessageProps(group, element, translate);
  }

  if (is(element, 'bpmn:Participant')) {
    addParticipantProps(group, element, translate);
  }
}

function addMessageProps(group, element, translate) {
  // Adding a select box for message items
  group.entries.push(entryFactory.selectBox(translate, {
    id: 'messageItem',
    label: translate('Select Message'),
    selectOptions: () => getMessageItems(element),
    modelProperty: 'messageType'
  }));

  // Adding a list of checkboxes for attributes
  // TODO: improve this implementation
  const attributeItems = getParentChoreographyElement(element).attributeItems;
  attributeItems.forEach((item, index) => {
    group.entries.push(entryFactory.checkbox(translate,{
      id: 'attribute' + index,
      label: item.name,
      modelProperty: 'attr_' + item.name,
      hidden: () => hasMessageItems(element)
    }));
  });
}

function addParticipantProps(group, element, translate) {
  // Adding a select box for participant items
  group.entries.push(entryFactory.selectBox(translate, {
    id: 'participantItem',
    label: translate('Select Participant'),
    selectOptions: () => getParticipantItems(element),
    modelProperty: 'participantType'
  }));
}

function getMessageItems(element) {
  const messageItems = hasMessageItems(element)
    ? element.businessObject.messageItems
    : getParentChoreographyElement(element).messageItems;
  return [{ name: '', value: '' }, ...messageItems.map(item => ({ name: item.name, value: item.name }))];
}

function getParentChoreographyElement(element) {
  return element.businessObject.$parent.rootElements.find(e => e.$type === 'bpmn:Choreography');
}

function hasMessageItems(element) {
  return element.businessObject.messageItems && element.businessObject.messageItems.length > 0;
}

function getParticipantItems(element) {
  const participantItems = hasParticipantItems(element)
    ? element.businessObject.participantItems
    : element.businessObject.$parent.participantItems;
  return [{ name: '', value: '' }, ...participantItems];
}

function hasParticipantItems(element) {
  return element.businessObject.participantItems && element.businessObject.participantItems.length > 0;
}