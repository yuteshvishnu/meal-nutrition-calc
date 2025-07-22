const foods = [
  { name: "White bread", cal: 264, pro: 9, fat: 3, carb: 49, chol: 0, fiber: 2, price: 10 },
  { name: "Brown bread", cal: 245, pro: 9, fat: 3, carb: 42, chol: 0, fiber: 4, price: 15 },
  { name: "Rice cake", cal: 387, pro: 7, fat: 1, carb: 81, chol: 0, fiber: 1, price: 20 },
  { name: "Oatmeal (cooked)", cal: 71, pro: 2.5, fat: 1.5, carb: 12, chol: 0, fiber: 1.7, price: 50 },
  { name: "Chicken (olive oil sautéed)", cal: 200, pro: 29, fat: 6, carb: 1, chol: 30, fiber: 0, price: 80 },
  { name: "Paneer (olive oil sautéed)", cal: 300, pro: 18, fat: 25, carb: 1, chol: 70, fiber: 0, price: 80 },
  { name: "Soya chunks (olive oil sautéed)", cal: 200, pro: 35, fat: 7, carb: 10, chol: 0, fiber: 5, price: 80 },
  { name: "Tofu (olive oil sautéed)", cal: 120, pro: 8, fat: 8, carb: 1.5, chol: 0, fiber: 1, price: 80 },
  { name: "Boiled egg", cal: 143, pro: 13, fat: 10, carb: 1, chol: 37, fiber: 0, price: 10 },
  { name: "Omelette", cal: 190, pro: 12, fat: 15, carb: 1, chol: 40, fiber: 0, price: 20 },
  { name: "White rice (olive oil)", cal: 160, pro: 2.6, fat: 4, carb: 35, chol: 0, fiber: 0.3, price: 50 },
  { name: "Brown rice (olive oil)", cal: 180, pro: 2.7, fat: 4.5, carb: 37, chol: 0, fiber: 1, price: 60 },
  { name: "Salad (carrot, beetroot, cucumber)", cal: 40, pro: 0.7, fat: 0.3, carb: 8, chol: 0, fiber: 1.2, price: 50 },
  { name: "Boiled rajma", cal: 130, pro: 8.5, fat: 5, carb: 19, chol: 0, fiber: 5, price: 50 },
  { name: "Boiled chickpeas", cal: 164, pro: 9, fat: 2.7, carb: 27, chol: 0, fiber: 8, price: 50 }
];

function renderFoodTable() {
  const body = document.getElementById("food-body");
  foods.forEach((f, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i+1}</td>
      <td>${f.name}</td>
      <td>${f.cal}</td><td>${f.pro}</td><td>${f.fat}</td>
      <td>${f.carb}</td><td>${f.chol}</td><td>${f.fiber}</td>
      <td>${f.price}</td>
    `;
    body.appendChild(row);
  });
}

function createItemSelector() {
  const div = document.createElement("div");
  div.className = "form-item";
  div.innerHTML = `
    <select>
      ${foods.map((f, i) => `<option value="${i}">${f.name}</option>`).join("")}
    </select>
    <input type="number" min="1" placeholder="Portions" />
  `;
  return div;
}

document.getElementById("add-item").addEventListener("click", () => {
  document.getElementById("item-list").appendChild(createItemSelector());
});

document.getElementById("meal-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll(".form-item");
  let total = { cal: 0, pro: 0, fat: 0, carb: 0, chol: 0, fiber: 0, price: 0 };

  inputs.forEach(div => {
    const idx = +div.querySelector("select").value;
    const portions = +div.querySelector("input").value || 0;
    const food = foods[idx];
    total.cal += food.cal * portions;
    total.pro += food.pro * portions;
    total.fat += food.fat * portions;
    total.carb += food.carb * portions;
    total.chol += food.chol * portions;
    total.fiber += food.fiber * portions;
    total.price += food.price * portions;
  });

  const result = `
    <h3>🍽️ Meal Summary:</h3>
    <p><strong>Calories:</strong> ${total.cal} kcal</p>
    <p><strong>Protein:</strong> ${total.pro.toFixed(2)} g</p>
    <p><strong>Fat:</strong> ${total.fat.toFixed(2)} g</p>
    <p><strong>Carbs:</strong> ${total.carb.toFixed(2)} g</p>
    <p><strong>Cholesterol:</strong> ${total.chol.toFixed(2)} mg</p>
    <p><strong>Fiber:</strong> ${total.fiber.toFixed(2)} g</p>
    <p><strong>Total Price:</strong> ₹${total.price}</p>
  `;

  document.getElementById("result").innerHTML = result;
});

window.onload = () => {
  renderFoodTable();
  document.getElementById("item-list").appendChild(createItemSelector());
};
