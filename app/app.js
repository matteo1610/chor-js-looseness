import ChorJSModeler from 'chor-js/lib/Modeler';
import PropertiesPanelModule from 'bpmn-js-properties-panel';

import Web3 from 'web3';
import { url, contractAbi, contractAddress } from './contract/contract';

import Reporter from './lib/validator/Validator.js';
import PropertiesProviderModule from './lib/provider'; // import custom properties provider

import tableValuesModdleDescriptor from './lib/descriptors/table-values';

import xml from './diagrams/emergency-response-plan/EmergencyResponePlan_none.bpmn';
// import xml from './diagrams/emergency-response-plan/EmergencyResponePlan_composition.bpmn';
import blankXml from './diagrams/newDiagram.bpmn';

let lastFile;
let isValidating = false;
let isDirty = false;

// create and configure a chor-js instance
const modeler = new ChorJSModeler({
  container: '#canvas',
  propertiesPanel: {
    parent: '#properties-panel'
  },
  additionalModules: [
    PropertiesPanelModule,
    PropertiesProviderModule
  ],
  keyboard: {
    bindTo: document
  },
  moddleExtensions: {
    tableValues : tableValuesModdleDescriptor
  }
});

// display the given model (XML representation)
async function renderModel(newXml) {
  await modeler.importXML(newXml);
  isDirty = false;
}

// returns the file name of the diagram currently being displayed
function diagramName() {
  if (lastFile) {
    return lastFile.name;
  }
  return 'diagram.bpmn';
}

// Function to get the current state of the contract
async function getCurrentState(contract) {
  try {
    console.log(contract);
    const state = await contract.methods.getCurrentState().call();
    console.log('Current State:', state);
    updateUI(state);
  } catch (error) {
    console.error('Error fetching state:', error);
  }
}

// Function to update the UI based on the state of the contract
function updateUI(state) {
  state[0].forEach(element => {
    const elementId = element.ID;
    let strokeColor, fillColor;
    console.log(element);
    switch (Number(element.status)) {
    case 0:
      strokeColor = 'red';
      fillColor = 'lightcoral';
      break;
    case 1:
      strokeColor = 'orange';
      fillColor = 'lightyellow';
      break;
    case 2:
      strokeColor = 'green';
      fillColor = 'lightgreen';
      break;
    default:
      strokeColor = 'gray';
      fillColor = 'lightgray';
    }

    setTaskColor(elementId, strokeColor, fillColor);
  });
}

// Function to set colors on BPMN elements
function setTaskColor(elementId, strokeColor, fillColor) {
  const elementRegistry = modeler.get('elementRegistry');
  const modeling = modeler.get('modeling');
  const element = elementRegistry.get(elementId);

  if (element) {
    modeling.setColor([element], {
      stroke: strokeColor,
      fill: fillColor
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Connect to the blockchain
  const { ethereum } = window;
  const web3 = new Web3(ethereum);
  console.log(web3);
  const contract = await new web3.eth.Contract(contractAbi, contractAddress);
  console.log(contract.events);

  // Event listener for functionDone events
  contract.events.functionDone()
    .on('data', async event => {
      console.log('Event received:', event);
      await getCurrentState(contract);
    });
  // .on('error', console.error);

  await getCurrentState(contract);

  // download diagram as XML
  const downloadLink = document.getElementById('js-download-diagram');
  downloadLink.addEventListener('click', async e => {
    const result = await modeler.saveXML({ format: true });
    downloadLink['href'] = 'data:application/bpmn20-xml;charset=UTF-8,' + encodeURIComponent(result.xml);
    downloadLink['download'] = diagramName();
    isDirty = false;
  });

  // download diagram as SVG
  const downloadSvgLink = document.getElementById('js-download-svg');
  downloadSvgLink.addEventListener('click', async e => {
    const result = await modeler.saveSVG();
    downloadSvgLink['href'] = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(result.svg);
    downloadSvgLink['download'] = diagramName() + '.svg';
  });

  // open file dialog
  document.getElementById('js-open-file').addEventListener('click', e => {
    document.getElementById('file-input').click();
  });

  // toggle side panels
  const panels = Array.prototype.slice.call(
    document.getElementById('panel-toggle').children
  );
  panels.forEach(panel => {
    panel.addEventListener('click', () => {
      panels.forEach(otherPanel => {
        if (panel === otherPanel && !panel.classList.contains('active')) {
          // show clicked panel if it is not already active, otherwise hide it as well
          panel.classList.add('active');
          document.getElementById(panel.dataset.togglePanel).classList.remove('hidden');
        } else {
          // hide all other panels
          otherPanel.classList.remove('active');
          document.getElementById(otherPanel.dataset.togglePanel).classList.add('hidden');
        }
      });
    });
  });

  // create new diagram
  const newDiagram = document.getElementById('js-new-diagram');
  newDiagram.addEventListener('click', async e => {
    await renderModel(blankXml);
    lastFile = false;
  });

  // load diagram from disk
  const loadDiagram = document.getElementById('file-input');
  loadDiagram.addEventListener('change', e => {
    const file = loadDiagram.files[0];
    if (file) {
      const reader = new FileReader();
      lastFile = file;
      reader.addEventListener('load', async () => {
        await renderModel(reader.result);
        loadDiagram.value = null; // allows reloading the same file
      }, false);
      reader.readAsText(file);
    }
  });

  // drag & drop file
  const dropZone = document.body;
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('is-dragover');
  });
  dropZone.addEventListener('dragleave', e => {
    e.preventDefault();
    dropZone.classList.remove('is-dragover');
  });
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('is-dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      lastFile = file;
      reader.addEventListener('load', () => {
        renderModel(reader.result);
      }, false);
      reader.readAsText(file);
    }
  });

  // validation logic and toggle
  const reporter = new Reporter(modeler);
  const validateButton = document.getElementById('js-validate');
  validateButton.addEventListener('click', e => {
    isValidating = !isValidating;
    if (isValidating) {
      reporter.validateDiagram();
      validateButton.classList.add('selected');
      validateButton['title'] = 'Disable checking';
    } else {
      reporter.clearAll();
      validateButton.classList.remove('selected');
      validateButton['title'] = 'Check diagram for problems';
    }
  });
  modeler.on('commandStack.changed', () => {
    if (isValidating) {
      reporter.validateDiagram();
    }
    isDirty = true;
  });
  modeler.on('import.render.complete', () => {
    if (isValidating) {
      reporter.validateDiagram();
    }
  });
});

// expose bpmnjs to window for debugging purposes
window.bpmnjs = modeler;

window.addEventListener('beforeunload', function(e) {
  if (isDirty) {
    // see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
    e.preventDefault();
    e.returnValue = '';
  }
});

renderModel(xml);
