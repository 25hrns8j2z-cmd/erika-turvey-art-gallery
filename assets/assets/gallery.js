const ART_KEY = "et_artworks";
const SETTINGS_KEY = "et_settings";

const artGrid = document.getElementById("artGrid");
const emptyMessage = document.getElementById("emptyMessage");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalInfo = document.getElementById("modalInfo");
const enquiryMessage = document.getElementById("enquiryMessage");
const emailBtn = document.getElementById("emailBtn");
const waBtn = document.getElementById("waBtn");
const closeModal = document.getElementById("closeModal");

const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
  email: "example@email.com",
  whatsapp: "+27000000000"
};

document.getElementById("emailLink").href = `mailto:${settings.email}`;
document.getElementById("whatsappLink").href = `https://wa.me/${settings.whatsapp.replace("+","")}`;

document.getElementById("year").textContent = new Date().getFullYear();

let artworks = JSON.parse(localStorage.getItem(ART_KEY)) || [];

function render() {
  artGrid.innerHTML = "";
  let visible = artworks.filter(a =>
    (filter.value === "all" || a.status === filter.value) &&
    a.title.toLowerCase().includes(search.value.toLowerCase())
  );

  emptyMessage.style.display = visible.length ? "none" : "block";

  visible.forEach(a => {
    const card = document.createElement("div");
    card.className = "art-card";
    card.innerHTML = `
      <img src="${a.image}">
      <h4>${a.title}</h4>
      <p>${a.description}</p>
      <p>${a.size} • ${a.price}</p>
      <button onclick="openModal('${a.id}')">Enquire</button>
    `;
    artGrid.appendChild(card);
  });
}

window.openModal = id => {
  const a = artworks.find(x => x.id === id);
  modalTitle.textContent = a.title;
  modalInfo.textContent = `${a.size} • ${a.price}`;
  enquiryMessage.value = "";
  modal.classList.remove("hidden");

  const text = `Hello, I would like to enquire about "${a.title}".`;
  emailBtn.href = `mailto:${settings.email}?subject=Artwork Enquiry&body=${encodeURIComponent(text)}`;
  waBtn.href = `https://wa.me/${settings.whatsapp.replace("+","")}?text=${encodeURIComponent(text)}`;
};

closeModal.onclick = () => modal.classList.add("hidden");

search.oninput = render;
filter.onchange = render;

render();
