var theMarker1 = {};
var theMarker2 = {};
document
  .getElementById("choose-button-1")
  .addEventListener("click", function () {
    let body = document.getElementsByTagName("body")[0]
    body.style.cursor = "pointer"
    map.once("click", function (e) {
      if (theMarker1 != undefined) {
        map.removeLayer(theMarker1);
      }
      theMarker1 = L.marker(e.latlng).addTo(map);
      document
        .querySelector("#location")
        .setAttribute("value", `${e.latlng.lat}, ${e.latlng.lng}`);
    });
  });
// document
//   .getElementById("choose-button-2")
//   .addEventListener("click", function () {
//     map.once("click", function (e) {
//       if (theMarker2 != undefined) {
//         map.removeLayer(theMarker2);
//       }
//       theMarker2 = L.marker(e.latlng).addTo(map);
//       document
//         .querySelector("#destLocation")
//         .setAttribute("value", `${e.latlng.lat}, ${e.latlng.lng}`);
//     });
//   });

for (item of fuel) {
  let mark = L.marker([item.lat, item.long]);
  item.name
    ? (info = `<b>Tên cửa hàng: ${item.name}</b>`)
    : (info = `<b>Tên cửa hàng: Cây Xăng</b>`);
  var icon = mark.options.icon;
  icon.options.iconSize = [20, 30];
  icon.options.shadowSize = [20, 30];
  mark.setIcon(icon);

  mark.bindPopup(info).openPopup().addTo(map);
}

function handleDragStart(e) {
  this.style.opacity = "0.5";
}

function handleDragEnd(e) {
  this.style.opacity = "1";
  this.classList.remove("form-routing");
  this.style.top = `${e.pageY - 100}px`;
  this.style.left = `${e.pageX - 100}px`;
}

let element = document.getElementById("form-routing");

element.addEventListener("dragstart", handleDragStart);
element.addEventListener("dragend", handleDragEnd);

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(obj) {
  const {longitude, latitude} = obj.coords;
  document.getElementById("location").value = `${latitude},${longitude}`
  let mark = L.marker([latitude, longitude]);
  map.setView([latitude,longitude])
  var icon = mark.options.icon;
  icon.options.iconSize = [40, 50];
  icon.options.shadowSize = [40, 50];
  info = `<b>Your location</b>`
  mark.setIcon(icon);

  mark.bindPopup(info).openPopup().addTo(map);
}

// for (item of node) {
//   let mark = L.marker([item.lat, item.long]);
//   info = `<b>Tên location: ${item.id}</b>`
//   var icon = mark.options.icon;
//   icon.options.iconSize = [40, 50];
//   icon.options.shadowSize = [40, 50];
//   mark.setIcon(icon);

//   mark.bindPopup(info).openPopup().addTo(map);
// }

for (item of index) {
  let mark = L.marker([item.lat, item.long]);
  info = `<b>Tên index: ${item.id}</b>`
  var icon = mark.options.icon;
  icon.options.iconSize = [40, 50];
  icon.options.shadowSize = [40, 50];
  mark.setIcon(icon);

  mark.bindPopup(info).openPopup().addTo(map);
}
