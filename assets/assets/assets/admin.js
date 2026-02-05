const ART_KEY = "et_artworks";
const SETTINGS_KEY = "et_settings";

let artworks = JSON.parse(localStorage.getItem(ART_KEY)) || [];

const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");

dropzone.onclick = () => fileInput.click();

dropzone.ondragover = e => {
  e.preventDefault();
  dropzone.style.opacity = 0.6;
};

dropzone.ondragleave = () => dropzone.style.opacity = 1;

dropzone.ondrop = e => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  dropzone.style.opacity = 1;
};

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({
    email: email.value,
    whatsapp: whatsapp.value
  }));
  alert("Settings saved");
}

function addArtwork() {
  const file = fileInput.files[0];
  if (!file) return alert("Please upload an image");

  const reader = new FileReader();
  reader.onload = () => {
    artworks.push({
      id: crypto.randomUUID(),
      title: title.value,
      description: description.value,
      size: size.value,
      price: price.value,
      status: status.value,
      image: reader.result
    });
    localStorage.setItem(ART_KEY, JSON.stringify(artworks));
    location.reload();
  };
  reader.readAsDataURL(file);
}

const adminList = document.getElementById("adminList");
artworks.forEach(a => {
  const div = document.createElement("div");
  div.innerHTML = `
    <p><b>${a.title}</b> (${a.status})
    <button onclick="deleteArt('${a.id}')">Delete</button></p>
  `;
  adminList.appendChild(div);
});

window.deleteArt = id => {
  artworks = artworks.filter(a => a.id !== id);
  localStorage.setItem(ART_KEY, JSON.stringify(artworks));
  location.reload();
};
