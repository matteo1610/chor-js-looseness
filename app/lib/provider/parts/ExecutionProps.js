import { is } from 'bpmn-js/lib/util/ModelUtil';
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

export default function(group, element, bpmnFactory, translate) {
  if (is(element, 'bpmn:Choreography')) {
    group.entries.push(entryFactory.checkbox(translate, {
      id: 'status',
      label: translate('Runtime'),
      modelProperty: 'QWERTYUIOP'
    }));
    console.log(element);
  }
}