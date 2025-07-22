const foods = [
  { name: "White bread", calories: 2.64, protein: 0.09, fat: 0.03, carbs: 0.49, cholesterol: 0.0, fiber: 0.02, price: 10 },
  { name: "Brown bread", calories: 2.45, protein: 0.09, fat: 0.03, carbs: 0.42, cholesterol: 0.0, fiber: 0.04, price: 15 },
  { name: "Rice cake", calories: 3.87, protein: 0.07, fat: 0.01, carbs: 0.81, cholesterol: 0.0, fiber: 0.01, price: 20 },
  { name: "Oatmeal (cooked)", calories: 0.71, protein: 0.025, fat: 0.015, carbs: 0.12, cholesterol: 0.0, fiber: 0.017, price: 50 },
  { name: "Chicken (olive oil sautéed)", calories: 2.00, protein: 0.29, fat: 0.06, carbs: 0.01, cholesterol: 0.3, fiber: 0.0, price: 80 },
  // Add more items from your list...
];

const foodList = document.getElementById("food-list");
foods.forEach((food, index) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <label>
      ${food.name} (per 100g):
      <input type="number" min="0" value="0" data-index="${index}" /> portions
    </label>
  `;
  foodList.appendChild(div);
});

document.getElementById("meal-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let total = {
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    cholesterol: 0,
    fiber: 0,
    price: 0,
  };

  document.querySelectorAll("input[type='number']").forEach(input => {
    const index = parseInt(input.dataset.index);
    const portions = parseFloat(input.value);

    if (portions > 0) {
      const food = foods[index];
      const grams = portions * 100;

      total.calories += food.calories * grams;
      total.protein += food.protein * grams;
      total.fat += food.fat * grams;
      total.carbs += food.carbs * grams;
      total.cholesterol += food.cholesterol * grams;
      total.fiber += food.fiber * grams;
      total.price += food.price * portions;
    }
  });

  const res = document.getElementById("results");
  res.innerHTML = `
    <h2>Total Nutrition Summary</h2>
    <p>Calories: ${total.calories.toFixed(2)} kcal</p>
    <p>Protein: ${total.protein.toFixed(2)} g</p>
    <p>Fat: ${total.fat.toFixed(2)} g</p>
    <p>Carbs: ${total.carbs.toFixed(2)} g</p>
    <p>Cholesterol: ${total.cholesterol.toFixed(2)} mg</p>
    <p>Fiber: ${total.fiber.toFixed(2)} g</p>
    <p>Total Price: ₹${total.price.toFixed(2)}</p>
  `;
});
