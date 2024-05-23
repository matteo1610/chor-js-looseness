import { addTableDefinition } from './helper/TableDefinitionHelper';

/**
 * Adds composition properties for the specified BPMN element to the properties group.
 *
 * @param {Object} group - The properties panel group.
 * @param {djs.model.Base} element - The BPMN element.
 * @param {Object} bpmnFactory - Factory to create new BPMN elements.
 * @param {Function} translate - Function to translate labels and descriptions.
 */
export default function addCompositionProps(group, element, bpmnFactory, translate) {
  const messageOptions = {
    id: 'messageList',
    description: 'Message List',
    labels: 'Message',
    addLabel: 'Add Message',
    businessObjectProperty: 'messageItems',
    type: 'value:MessageValue'
  };

  const attributeOptions = {
    id: 'attributeList',
    description: 'Attribute List',
    labels: 'Attribute',
    addLabel: 'Add Attribute',
    businessObjectProperty: 'attributeItems',
    type: 'value:AttributeValue'
  };

  const participantOptions = {
    id: 'participantList',
    description: 'Participant List',
    labels: 'Participant',
    addLabel: 'Add Participant',
    businessObjectProperty: 'participantItems',
    type: 'value:ParticipantValue'
  };

  addTableDefinition(group, element, bpmnFactory, translate, 'bpmn:Choreography', messageOptions);
  addTableDefinition(group, element, bpmnFactory, translate, 'bpmn:Choreography', attributeOptions);
  addTableDefinition(group, element, bpmnFactory, translate, 'bpmn:Choreography', participantOptions);
}
