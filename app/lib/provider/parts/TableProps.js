import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import { is } from 'bpmn-js/lib/util/ModelUtil';
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';

export default function(group, element, bpmnFactory, translate) {
  if (is(element, 'bpmn:Message')) {

    group.entries.push(entryFactory.table(translate, {
      id: 'messageList',
      description: translate('Message List'),
      modelProperties: [ 'value' ],
      labels: [ translate('Value') ],
      addLabel: translate('Add Value'),

      getElements: function(element) {
        console.log(element);
        if (Array.isArray(element.businessObject.items)) {
          return element.businessObject.items;
        }
        return [];
      },

      addElement: function(element) {
        const bo = element.businessObject;
        const object = bpmnFactory.create('camunda:Value', { value: undefined });
        return cmdHelper.addElementsTolist(element, bo, 'items', [ object ]);
      },

      removeElement: function(element, node, idx) {
        const bo = element.businessObject;
        const object = bo.items[idx];
        return cmdHelper.removeElementsFromList(element, bo, 'items', null,
          [ object ]);
      },

      updateElement: function(element, values, node, idx) {
        const bo = element.businessObject;
        bo.items[idx].value = values.value;
        return cmdHelper.updateBusinessObject(element, bo, { items: bo.items });
      },
    }));
  }
}