import BpmnPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/bpmn/BpmnPropertiesProvider.js';
import inherits from 'inherits';

import selectionProps from './parts/SelectionProps';
import compositionProps from './parts/CompositionProps';
import executionProps from './parts/ExecutionProps';

function createLoosenessGroups(element, bpmnFactory, translate) {
  const executionGroup = {
    id: 'execution',
    label: 'Execution',
    entries: []
  };
  executionProps(executionGroup, element, bpmnFactory, translate);

  // Define a group with fields for selection degree
  const selectionGroup = {
    id: 'selection-degree',
    label: 'Selection Degree',
    entries: []
  };
  selectionProps(selectionGroup, element, bpmnFactory, translate);

  // Define a group with fields for composition degree
  const compositionGroup = {
    id: 'composition-degree',
    label: 'Composition Degree',
    entries: []
  };
  compositionProps(compositionGroup, element, bpmnFactory, translate);

  return [
    executionGroup,
    selectionGroup,
    compositionGroup
  ];
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