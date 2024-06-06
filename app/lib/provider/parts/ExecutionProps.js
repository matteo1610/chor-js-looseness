import { is, getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

/**
 * Adds execution properties to the properties panel group based on the type of BPMN element.
 *
 * @param {Object} group - The properties panel group.
 * @param {djs.model.Base|ModdleElement} element - The BPMN element.
 * @param {Object} bpmnFactory - Factory to create new BPMN elements.
 * @param {Function} translate - Function to translate labels and descriptions.
 */
export default function addExecutionProps(group, element, bpmnFactory, translate) {
  const businessObject = getBusinessObject(element);

  if (is(element, 'bpmn:Message')) {
    addMessageProps(group, businessObject, translate);
  }

  if (is(element, 'bpmn:Participant')) {
    addParticipantProps(group, businessObject, translate);
  }
}

function addMessageProps(group, businessObject, translate) {
  // Adding a select box for message items
  group.entries.push(entryFactory.selectBox(translate, {
    id: 'messageItem',
    label: translate('Select Message'),
    selectOptions: () => getMessageItems(businessObject),
    modelProperty: 'messageItem',
  }));

  // Adding a list of checkboxes for attributes
  const attributeItems = getParentChoreographyElement(businessObject).get('attributeItems');
  attributeItems.forEach((item, index) => {
    const modelProperty = 'attribute' + index + '_' + item.name;
    group.entries.push(entryFactory.checkbox(translate,{
      id: 'attribute' + index,
      label: item.name,
      modelProperty: modelProperty,
      hidden: () => hasMessageItems(businessObject),
      get: () => {
        const res = {};
        res[modelProperty] = hasMessageItems(businessObject)
          ? delete businessObject.$attrs[modelProperty]
          : businessObject.get(modelProperty);
        return res;
      }
    }));
  });
}

function getMessageItems(businessObject) {
  const messageItems = hasMessageItems(businessObject)
    ? businessObject.get('messageItems')
    : getParentChoreographyElement(businessObject).get('messageItems');

  return [{ name: '', value: '' }, ...messageItems.map(item => ({ name: item.name, value: item.name }))];
}

function hasMessageItems(businessObject) {
  return businessObject.get('messageItems').length > 0;
}

function getParentChoreographyElement(businessObject) {
  return businessObject.$parent.get('rootElements').find(e => e.$type === 'bpmn:Choreography');
}

function addParticipantProps(group, businessObject, translate) {
  // Adding a select box for participant items
  group.entries.push(entryFactory.selectBox(translate, {
    id: 'participantItem',
    label: translate('Select Participant'),
    selectOptions: () => getParticipantItems(businessObject),
    modelProperty: 'participantType'
  }));
}

function getParticipantItems(businessObject) {
  let participantItems = businessObject.get('participantItems');
  participantItems = participantItems.length > 0
    ? participantItems
    : businessObject.$parent.get('participantItems');

  return [{ name: '', value: '' }, ...participantItems.map(item => ({ name: item.name, value: item.name }))];
}