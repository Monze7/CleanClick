function initMap() {
    // Check if Geolocation is supported by the browser
    if (navigator.geolocation) {
      // If supported, get current position
      navigator.geolocation.getCurrentPosition(function(position) {
        var myLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        // Create a map object and specify the DOM element for display
        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 18  // Set zoom level for approximately 100 meters view
        });
  
        // Create a marker for the user's current location
        var userMarker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Your Location'
        });
  
        // Add event listener for clicking on the map to place comment marker
        map.addListener('click', function(event) {
          placeCommentMarker(event.latLng, map);
        });
      }, function() {
        // Error handling if unable to retrieve user's location
        console.error("Error: The Geolocation service failed.");
      });
    } else {
      // Browser doesn't support Geolocation
      console.error("Error: Your browser doesn't support Geolocation.");
    }
}
  
function placeCommentMarker(location, map) {
    var commentMarker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Comment',
      icon: 'comment_icon.png' // Provide a custom icon for the comment marker
    });
  
    // Add event listener for clicking on the comment marker to display info window
    var infowindow = new google.maps.InfoWindow({
      content: '<div id="content">Your Comment</div>'
    });
  
    commentMarker.addListener('click', function() {
      infowindow.open(map, commentMarker);
    });
}
  
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var comment = document.getElementById('comment').value;
    var image = document.getElementById('image').files[0]; // Get the uploaded image file

    // Process the comment and image data as needed (e.g., send to server)
    console.log('Comment:', comment);
    console.log('Image:', image);
    // Here you can send the comment and image data to your backend server for storage
    // Example: sendCommentAndImageToServer(comment, image);
});
