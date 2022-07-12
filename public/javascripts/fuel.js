for (item of fuel) {
  let mark = L.marker([item.lat, item.long]);
  item.name
    ? (info = `<b>Tên cửa hàng: ${item.name}</b>`)
    : (info = `<b>Tên cửa hàng: Cây Xăng</b>`);
  var icon = mark.options.icon;
  icon.options.iconSize = [40, 50];
  icon.options.shadowSize = [40, 50];
  mark.setIcon(icon);

  mark.bindPopup(info).openPopup().addTo(map);
}

let arrLocation = yourLocation.split(',')
let mark = L.marker([arrLocation[0], arrLocation[1]]);
info = `<b>Your Location</b>`;
var icon = mark.options.icon;
icon.options.iconSize = [40, 50];
icon.options.shadowSize = [40, 50];
mark.setIcon(icon);

mark.bindPopup(info).openPopup().addTo(map);


function handleDragStart(e) {
  this.style.opacity = "0.5";
}

function handleDragEnd(e) {
  this.style.opacity = "1";
  this.classList.remove("form-routing");
  this.style.top = `${e.pageY - 100}px`;
  this.style.left = `${e.pageX - 100}px`;
}

let element = document.getElementById("fuel-list");

element.addEventListener("dragstart", handleDragStart);
element.addEventListener("dragend", handleDragEnd);