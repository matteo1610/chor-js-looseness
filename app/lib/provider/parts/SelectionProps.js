import { is } from 'bpmn-js/lib/util/ModelUtil';
import tableDefinition from './implementation/TableDefinition';

export default function(group, element, bpmnFactory, translate) {
  if (is(element, 'bpmn:Message')) {
    const options = {
      id: 'messageList',
      description: 'Message List',
      modelProperties: 'value',
      labels: 'Value',
      addLabel: 'Add Value'
    };
    group.entries.push(tableDefinition(element, bpmnFactory, translate, options));
  }

  if (is(element, 'bpmn:Participant')) {
    const options = {
      id: 'participantList',
      description: 'Participant List',
      modelProperties: 'value',
      labels: 'Value',
      addLabel: 'Add Value'
    };
    group.entries.push(tableDefinition(element, bpmnFactory, translate, options));
  }
}