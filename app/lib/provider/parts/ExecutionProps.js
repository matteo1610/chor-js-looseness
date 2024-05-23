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
  let messages = element.businessObject.messageItems || getParentChoreographyElement(element).messageItems;
  let attributes = getParentChoreographyElement(element).attributeItems;

  group.entries.push(entryFactory.selectBox(translate, {
    id: 'messageItem',
    label: translate('Select Message'),
    selectOptions: messages,
    modelProperty: 'messageType',
  }));

  group.entries.push(entryFactory.selectBox(translate, {
    id: 'attributeItem',
    label: translate('Select Attribute'),
    selectOptions: attributes,
    modelProperty: 'attributeType',
    hidden: () => !attributes
  }));
}

function addParticipantProps(group, element, translate) {
  let participants = element.businessObject.participantItems || element.businessObject.$parent.participantItems;

  group.entries.push(entryFactory.selectBox(translate, {
    id: 'participantItem',
    label: translate('Select Participant'),
    selectOptions: participants,
    modelProperty: 'participantType'
  }));
}

function getParentChoreographyElement(element) {
  return element.businessObject.$parent.rootElements.find(e => e.$type === 'bpmn:Choreography');
}
