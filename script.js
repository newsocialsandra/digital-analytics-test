document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const placeInput = document.getElementById("placeInput");
  const commentInput = document.getElementById("commentInput");
  const tipList = document.getElementById("tipList");

  // Ladda sparade tips
  let tips = JSON.parse(localStorage.getItem("tips")) || [];
  renderTips();

  // Lägg till tips
  addBtn.addEventListener("click", addTip);
  commentInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTip();
  });

  function addTip() {
    const place = placeInput.value.trim();
    const comment = commentInput.value.trim();
    if (place === "") return;

    const newTip = {
      place: place,
      comment: comment
    };

    tips.push(newTip);
    saveTips();
    renderTips();

    placeInput.value = "";
    commentInput.value = "";
    placeInput.focus();
  }

  function renderTips() {
    tipList.innerHTML = "";
    tips.forEach((tip, index) => {
      const li = document.createElement("li");

      const content = document.createElement("div");
      content.classList.add("tip-content");
      content.innerHTML = `<strong>${tip.place}</strong><br><small>${tip.comment || ""}</small>`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.classList.add("delete");
      deleteBtn.addEventListener("click", () => {
        tips.splice(index, 1);
        saveTips();
        renderTips();
      });

      li.appendChild(content);
      li.appendChild(deleteBtn);
      tipList.appendChild(li);
    });
  }

  function saveTips() {
    localStorage.setItem("tips", JSON.stringify(tips));
  }
});
