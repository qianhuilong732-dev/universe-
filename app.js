const symbols = {heart:"♡",star:"✦",moon:"☾",planet:"✧",dog:"♡"};
const emojis = {heart:"💚",star:"⭐",moon:"🌙",planet:"🪐",dog:"🐶"};
let selected = "heart";
const preview = document.getElementById("previewLantern");
const mark = document.getElementById("previewMark");
document.querySelectorAll(".shape").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".shape").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    selected = btn.dataset.shape;
    preview.dataset.shape = selected;
    mark.textContent = symbols[selected];
  });
});
const wall = document.getElementById("wishWall");
function loadWishes(){
  const wishes = JSON.parse(localStorage.getItem("yu-universe-wishes") || "[]");
  wall.innerHTML = "";
  if(!wishes.length){ wall.innerHTML = '<div class="empty">星海還很安靜，放出第一盞天燈吧 ✦</div>'; return; }
  wishes.slice().reverse().forEach(item => {
    const card = document.createElement("article");
    card.className = "wish-card";
    const emoji = document.createElement("div"); emoji.className = "emoji"; emoji.textContent = emojis[item.shape];
    const name = document.createElement("small"); name.textContent = "來自 " + item.name;
    const p = document.createElement("p"); p.textContent = item.wish;
    card.append(emoji,name,p); wall.append(card);
  });
}
document.getElementById("wishForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("nickname").value.trim();
  const wish = document.getElementById("wish").value.trim();
  if(!name || !wish) return;
  const wishes = JSON.parse(localStorage.getItem("yu-universe-wishes") || "[]");
  wishes.push({name,wish,shape:selected,createdAt:Date.now()});
  localStorage.setItem("yu-universe-wishes", JSON.stringify(wishes));
  e.target.reset();
  loadWishes();
  document.getElementById("sky").scrollIntoView({behavior:"smooth"});
});
document.getElementById("langBtn").addEventListener("click", () => {
  alert("目前提供繁體中文介面；其他語言版本可在後續加入。");
});
loadWishes();
