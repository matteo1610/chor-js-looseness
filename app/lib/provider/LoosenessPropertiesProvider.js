import BpmnPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/bpmn/BpmnPropertiesProvider.js';
import inherits from 'inherits';

import selectionProps from './parts/SelectionProps';

function createLoosenessGroups(element, bpmnFactory, translate) {
  const messagesGroup = {
    id: 'selection-degree',
    label: 'Selection Degree',
    entries: []
  };
  selectionProps(messagesGroup, element, bpmnFactory, translate);

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