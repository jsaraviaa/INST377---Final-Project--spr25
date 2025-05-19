const USER_ID = 'demo-user-123'; // Replace or make dynamic later

async function logMeal() {
  const query = document.getElementById('foodInput').value;
  if (!query) return alert("Please enter a food!");

  // Fetch nutrition data
  const response = await fetch(`/api/nutrition?query=${query}`);
  const data = await response.json();

  if (data.error) return alert(data.error);

  // Display it
  document.getElementById('nutritionInfo').innerHTML = `
    <p><strong>${data.food}</strong> - ${data.calories} kcal</p>
    <ul>
      <li>Protein: ${data.protein}g</li>
      <li>Carbs: ${data.carbs}g</li>
      <li>Fat: ${data.fat}g</li>
    </ul>
  `;

  // Save to Supabase
  await fetch('/api/meals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: USER_ID, ...data })
  });

  // Refresh chart
  getMeals();
}

async function getMeals() {
  const res = await fetch(`/api/meals?userId=${USER_ID}`);
  const meals = await res.json();

  const labels = meals.map((m) => m.food);
  const calories = meals.map((m) => m.calories);
  const proteins = meals.map((m) => m.protein);
  const carbs = meals.map((m) => m.carbs);
  const fats = meals.map((m) => m.fat);

  drawChart(labels, calories, proteins, carbs, fats);
}

function drawChart(labels, calories, proteins, carbs, fats) {
  const ctx = document.getElementById('nutritionChart').getContext('2d');
  if (window.myChart) window.myChart.destroy(); // Reset chart if exists

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Calories', data: calories, backgroundColor: 'rgba(255, 99, 132, 0.6)' },
        { label: 'Protein (g)', data: proteins, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
        { label: 'Carbs (g)', data: carbs, backgroundColor: 'rgba(255, 206, 86, 0.6)' },
        { label: 'Fat (g)', data: fats, backgroundColor: 'rgba(75, 192, 192, 0.6)' }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

// Load meals on page load
getMeals();
