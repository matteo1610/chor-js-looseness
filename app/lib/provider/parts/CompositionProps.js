import { is } from 'bpmn-js/lib/util/ModelUtil';
import tableDefinition from './implementation/TableDefinition';

export default function(group, element, bpmnFactory, translate) {
  if (is(element, 'bpmn:Choreography')) {

    const options1 = {
      id: 'messageList',
      description: 'Message List',
      labels: 'Message',
      addLabel: 'Add Message',
      businessObjectProperty: 'messageItems',
      type: 'value:MessageValue'
    };
    group.entries.push(tableDefinition(element, bpmnFactory, translate, options1));

    const options2 = {
      id: 'attributeList',
      description: 'Attribute List',
      labels: 'Attribute',
      addLabel: 'Add Attribute',
      businessObjectProperty: 'attributeItems',
      type: 'value:AttributeValue'
    };
    group.entries.push(tableDefinition(element, bpmnFactory, translate, options2));

    const options3 = {
      id: 'participantList',
      description: 'Participant List',
      labels: 'Participant',
      addLabel: 'Add Participant',
      businessObjectProperty: 'participantItems',
      type: 'value:ParticipantValue'
    };
    group.entries.push(tableDefinition(element, bpmnFactory, translate, options3));
  }
}