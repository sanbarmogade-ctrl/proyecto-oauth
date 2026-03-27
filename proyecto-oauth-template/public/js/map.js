async function loadMap() {
  const response = await fetch('/api/bikes/memory');
  const data = await response.json();

  const map = L.map('map').setView([data.center.lat, data.center.lng], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const list = document.getElementById('bike-list');

  data.bikes.forEach((bike) => {
    L.marker([bike.lat, bike.lng])
      .addTo(map)
      .bindPopup(`<strong>${bike.code}</strong><br>${bike.model} - ${bike.color}`);

    const item = document.createElement('li');
    item.textContent = `${bike.code} | ${bike.model} | ${bike.color} | (${bike.lat}, ${bike.lng})`;
    list.appendChild(item);
  });
}

loadMap().catch((error) => {
  console.error('No se pudo cargar el mapa:', error);
});
