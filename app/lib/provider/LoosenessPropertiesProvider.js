import tableProps from './parts/TableProps';
import BpmnPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/bpmn/BpmnPropertiesProvider.js';
import inherits from 'inherits';

function createLoosenessGroups(element, bpmnFactory, translate) {
  const messagesGroup = {
    id: 'messages',
    label: 'Messages',
    entries: []
  };
  tableProps(messagesGroup, element, bpmnFactory, translate);

  return [messagesGroup];
}

export default function LoosenessPropertiesProvider(injector, bpmnFactory, translate) {

  injector.invoke(BpmnPropertiesProvider, this);

  const superGetTabs = this.getTabs;

  this.getTabs = function(element) {
    let generalTab = superGetTabs.call(this, element);

    const loosenessTab = {
      id: 'looseness',
      label: 'Looseness',
      groups: createLoosenessGroups(element, bpmnFactory, translate)
    };
    generalTab.push(loosenessTab);

    return generalTab;
  };
}

inherits(LoosenessPropertiesProvider, BpmnPropertiesProvider);
LoosenessPropertiesProvider.$inject = [ 'injector', 'bpmnFactory', 'translate'];