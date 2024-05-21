import { is } from 'bpmn-js/lib/util/ModelUtil';
import tableDefinition from './implementation/TableDefinition';
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

export default function(group, element, bpmnFactory, translate) {
  if (is(element, 'bpmn:Message')) {

    const options = {
      id: 'messageList',
      description: 'Message List',
      labels: 'Message',
      addLabel: 'Add Message',
      businessObjectProperty: 'messageItems',
      type: 'value:MessageValue'
    };
    group.entries.push(tableDefinition(element, bpmnFactory, translate, options));

    group.entries.push(entryFactory.selectBox(translate, {
      id: 'messageType',
      label: translate('Message Type'),
      selectOptions: element.businessObject[options.businessObjectProperty],
      modelProperty: 'messageType'
    }));

  }

  if (is(element, 'bpmn:Participant')) {
    const options = {
      id: 'participantList',
      description: 'Participant List',
      labels: 'Participant',
      addLabel: 'Add Participant',
      businessObjectProperty: 'participantItems',
      type: 'value:ParticipantValue'
    };
    group.entries.push(tableDefinition(element, bpmnFactory, translate, options));
  }
}