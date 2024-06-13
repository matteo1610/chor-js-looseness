/**
 * Fetch the current state of the contract and update the UI.
 *
 * @param contract - The contract instance to fetch the state from.
 * @param modeler - The modeler instance to update the UI.
 */
export default async function updateUI(contract, modeler) {
  const state = await getCurrentState(contract);
  applyStateToUI(state, modeler);
}

async function getCurrentState(contract) {
  return await contract.methods.getCurrentState().call();
}

function applyStateToUI(state, modeler) {
  state[0].forEach(element => {
    const elementId = element.ID;
    let strokeColor, fillColor;
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

    setTaskColor(modeler, elementId, strokeColor, fillColor);
  });
}

/**
 * Utility function to set the color of a task in the diagram.
 *
 * @param modeler - The modeler instance.
 * @param elementId - The ID of the element to set the color for.
 * @param strokeColor - The stroke color to set.
 * @param fillColor - The fill color to set.
 */
function setTaskColor(modeler, elementId, strokeColor, fillColor) {
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