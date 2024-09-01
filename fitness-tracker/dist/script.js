let totalDuration = 0; // Variable to store total duration

document.getElementById('fitness-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get user input
  const exercise = document.getElementById('exercise').value;
  const duration = parseInt(document.getElementById('duration').value);

  // Check if input fields are not empty
  if (!exercise || !duration) {
    alert('Please enter both exercise and duration.');
    return;
  }

  // Update total duration
  totalDuration += duration;

  // Display result
  const entryDiv = document.createElement('div');
  entryDiv.classList.add('entry');
  entryDiv.innerHTML = `
    <span>${exercise}</span>
    <span>:</span>
    <span>${duration} min</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;

  document.getElementById('entries').appendChild(entryDiv);

  // Update total duration display
  updateTotalDurationDisplay();

  // Clear input fields
  document.getElementById('exercise').value = '';
  document.getElementById('duration').value = '';
});

// Event delegation for edit and delete buttons
document.getElementById('entries').addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('edit')) {
    const entry = target.parentElement;
    const exercise = entry.querySelector('span:first-child').textContent;
    const duration = parseInt(entry.querySelector('span:nth-child(3)').textContent);
    const exerciseInput = prompt('Edit exercise:', exercise);
    const durationInput = parseInt(prompt('Edit duration (minutes):', duration));
    if (exerciseInput && !isNaN(durationInput)) {
      // Update total duration
      totalDuration -= duration;
      totalDuration += durationInput;
      // Update entry
      entry.querySelector('span:first-child').textContent = exerciseInput;
      entry.querySelector('span:nth-child(3)').textContent = durationInput + " min";
      // Update total duration display
      updateTotalDurationDisplay();
    }
  } else if (target.classList.contains('delete')) {
    const entry = target.parentElement;
    const duration = parseInt(entry.querySelector('span:nth-child(3)').textContent);
    // Update total duration
    totalDuration -= duration;
    // Remove entry
    entry.remove();
    // Update total duration display
    updateTotalDurationDisplay();
  }
});

function updateTotalDurationDisplay() {
  document.getElementById('total-duration').textContent = `Total Workout Duration: ${totalDuration} min`;
}