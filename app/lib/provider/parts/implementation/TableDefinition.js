import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';

export default function(element, bpmnFactory, translate, options) {
  const businessObjectProperty = options.businessObjectProperty;
  const modelProperties = 'name';

  return entryFactory.table(translate, {
    id: options.id,
    description: translate(options.description),
    modelProperties: [modelProperties],
    labels: [translate(options.labels)],
    addLabel: translate(options.addLabel),

    getElements: function(element) {
      console.log(element);
      if (Array.isArray(element.businessObject[businessObjectProperty])) {
        return element.businessObject[businessObjectProperty];
      }
      return [];
    },

    addElement: function(element) {
      const bo = element.businessObject;
      const object = bpmnFactory.create(options.type, { modelProperties: undefined });
      return cmdHelper.addElementsTolist(element, bo, businessObjectProperty, [ object ]);
    },

    removeElement: function(element, node, idx) {
      const bo = element.businessObject;
      const object = bo[businessObjectProperty][idx];
      return cmdHelper.removeElementsFromList(element, bo, businessObjectProperty, null, [ object ]);
    },

    updateElement: function(element, values, node, idx) {
      /*
      const bo = element.businessObject;
      bo[businessObjectProperty][idx][modelProperties] = values[modelProperties];
      return cmdHelper.updateBusinessObject(element, bo, { businessObjectProperty: bo[businessObjectProperty] });
       */
      const item = element.businessObject[businessObjectProperty][idx];
      return cmdHelper.updateBusinessObject(element, item, values);
    }
  });
}
