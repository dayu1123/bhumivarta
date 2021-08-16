var map, newMarker, tempMarkerNumber;
let allMarkerTemp = []
tempMarkerNumber = 0
$(function(){
	// Initialize the map
	var map = L.map('map').setView([-6.200000, 106.816666], 11);
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    	maxZoom: 18
	}).addTo(map);
	newMarkerGroup = new L.LayerGroup();
	map.on('click', addMarker);
  function addMarker(e){
    var geojsonFeature = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [e.latlng.lat, e.latlng.lng]
      }
    }

    var marker;
    L.geoJson(geojsonFeature, {
        pointToLayer: function(feature, latlng){
          tempMarkerNumber += 1
          marker = L.marker(e.latlng, {
            title: "Resource Location",
            alt: "Resource Location",
            riseOnHover: true,
            draggable: true,
          }).bindPopup(
            `<div style="display: flex; justify-content: center; flex-direction: column;"><b style="margin-bottom: 2px;">You clicked marker: ${tempMarkerNumber}</b>${e.latlng}<br><input type='button' value='Delete this marker' class='marker-delete-button'/></div>`);
          marker.on("popupopen", onPopupOpen);
          return marker;
        }
    }).addTo(map);
  }
  function onPopupOpen() {

    var tempMarker = this;

    // To remove marker on click of delete button in the popup of marker
    $(".marker-delete-button:visible").click(function () {
        map.removeLayer(tempMarker);
    });
}
});