const ws = new WebSocket('ws://localhost:8081');

ws.onopen = () => {
  console.log('Connected to server');
};

/**
 * @param {MessageEvent} event 
 */
ws.onmessage = (event) => {
  // const messages = document.getElementById('messages');
  // const newMessage = document.createElement('div');

  // newMessage.textContent = event.data;
  // messages.appendChild(newMessage);

  console.log('event.data', event.data);
  const score = JSON.parse(event.data);

  if (typeof score === 'object') {
    // DEBUG:
    console.log(JSON.parse(event.data));

    const greenTeam = document.getElementById('green-team');
    const redTeam = document.getElementById('red-team');

    if (greenTeam) greenTeam.innerHTML = score.green;
    if (redTeam) redTeam.innerHTML = score.red;

    const path = document.getElementById('dynamicLine');

    if (path) {
      const offset = score.count;
      const startX = 410;
      const startY = 387;
      const endX = 535;
      const baseEndY = 387;
      const controlX = 460; 

       const currentEndY = baseEndY + offset;

      // Keep the control point near the original Y axis to create a smooth bend
      // Adjust the multiplier (e.g., 0.2) to change how sharply it curves
      const controlY = baseEndY + (offset * 0.1);

      // Update the SVG path 'd' attribute
      const d = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${currentEndY}`;
      path.setAttribute('d', d);
    }
  }
};

ws.onclose = () => {
  console.log('Disconnected from server');
};

// document.getElementById('send').addEventListener('click', () => {
//   const input = document.getElementById('message');
  
//   if (input.value) {
//     ws.send(input.value);
//     input.value = '';
//   } else {
//     console.log('please input something!');
//   }

// });

(() => {
  const greenButton = document.getElementById('green');
  const redButton = document.getElementById('red');

  /**
   * @param {HTMLElement} element 
   * @param {string} data 
   */
  const hook = (
    element,
    data
  ) => {
    if (element) {
      element.addEventListener('click', (event) => {
        event.preventDefault();

        ws.send(data);
      });
    }
  }

  hook(greenButton, 'green');
  hook(redButton, 'red');
})();