import BpmnPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/bpmn/BpmnPropertiesProvider';
import inherits from 'inherits';

import selectionProps from './parts/SelectionProps';
import compositionProps from './parts/CompositionProps';
import executionProps from './parts/ExecutionProps';

function createModelingGroups(element, bpmnFactory, translate) {
  const selectionGroup = {
    id: 'selection-degree',
    label: 'Selection Degree',
    entries: []
  };
  selectionProps(selectionGroup, element, bpmnFactory, translate);

  const compositionGroup = {
    id: 'composition-degree',
    label: 'Composition Degree',
    entries: []
  };
  compositionProps(compositionGroup, element, bpmnFactory, translate);

  return [selectionGroup, compositionGroup];
}

function createExecutionGroups(element, bpmnFactory, translate) {
  const executionGroup = {
    id: 'execution',
    label: 'Execution',
    entries: []
  };
  executionProps(executionGroup, element, bpmnFactory, translate);

  return [executionGroup];
}

/**
 * Custom properties provider for Looseness properties.
 *
 * @param {Object} injector - The dependency injector.
 * @param {Object} bpmnFactory - Factory to create new BPMN elements.
 * @param {Function} translate - Function to translate labels and descriptions.
 */
export default function LoosenessPropertiesProvider(injector, bpmnFactory, translate) {
  injector.invoke(BpmnPropertiesProvider, this);

  const superGetTabs = this.getTabs;

  this.getTabs = function(element) {
    let generalTab = superGetTabs.call(this, element);

    const modellingTab = {
      id: 'modeling',
      label: 'Modeling',
      groups: createModelingGroups(element, bpmnFactory, translate)
    };

    const executionTab = {
      id: 'execution',
      label: 'Execution',
      groups: createExecutionGroups(element, bpmnFactory, translate)
    };

    generalTab.push(modellingTab);
    generalTab.push(executionTab);

    return generalTab;
  };
}

inherits(LoosenessPropertiesProvider, BpmnPropertiesProvider);
LoosenessPropertiesProvider.$inject = ['injector', 'bpmnFactory', 'translate'];