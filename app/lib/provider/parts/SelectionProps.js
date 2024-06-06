import { addTableDefinition } from './helper/TableDefinitionHelper';

/**
 * Adds selection properties for the specified BPMN element to the properties group.
 *
 * @param {Object} group - The properties panel group.
 * @param {djs.model.Base|ModdleElement} element - The BPMN element.
 * @param {Object} bpmnFactory - Factory to create new BPMN elements.
 * @param {Function} translate - Function to translate labels and descriptions.
 */
export default function addSelectionProps(group, element, bpmnFactory, translate) {
  const messageOptions = {
    id: 'messageList',
    description: 'Message List',
    labels: 'Message',
    addLabel: 'Add Message',
    businessObjectProperty: 'messageItems',
    type: 'value:MessageValue'
  };

  const participantOptions = {
    id: 'participantList',
    description: 'Participant List',
    labels: 'Participant',
    addLabel: 'Add Participant',
    businessObjectProperty: 'participantItems',
    type: 'value:ParticipantValue'
  };

  addTableDefinition(group, element, bpmnFactory, translate, 'bpmn:Message', messageOptions);
  addTableDefinition(group, element, bpmnFactory, translate, 'bpmn:Participant', participantOptions);
}
