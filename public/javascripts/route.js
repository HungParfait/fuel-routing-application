// const map = L.map('map').setView([21.024, 105.83], 15);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);


const depart = departLocation.split(',')
const dest = destLocation.split(',')
const departLatLng = [Number(depart[0]), Number(depart[1])]
const destLatLng = [Number(dest[0]), Number(dest[1])]
map.setView([(departLatLng[0]+destLatLng[0])/2,((departLatLng[1]+destLatLng[1])/2)])

const polyline_string = JSON.parse(line.st_asgeojson).coordinates
let polyline = []
for (let point of polyline_string) {
    let temp = []
    temp.push(point[1],point[0])
    polyline.push(temp)
}
var firstpolyline = new L.Polyline(polyline, {
    color: 'blue',
    weight: 7,
    opacity: 0.8
});
firstpolyline.addTo(map)


L.marker(departLatLng).addTo(map);
L.marker(destLatLng).addTo(map);


function handleDragStart(e) {
    this.style.opacity = "0.5";
  }
  
  function handleDragEnd(e) {
    this.style.opacity = "1";
    this.classList.remove("form-routing");
    this.style.top = `${e.pageY - 100}px`;
    this.style.left = `${e.pageX - 100}px`;
  }
  
  let element = document.getElementById("route-list");
  
  element.addEventListener("dragstart", handleDragStart);
  element.addEventListener("dragend", handleDragEnd);
  