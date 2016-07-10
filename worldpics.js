






// global variables

var perPage = 3;

var radius = 5;


// -----------------------
//  flickr stuff
// -----------------------

var apiKey = "87d4ef71bdff0695666b4d895cb3b651";
   
// -----------------------
//  GOOGLE STUFF
// -----------------------

// starting location
var temp1 = 40.7067819;
var temp2 = -73.9236532;


// initiate map
function initMap() {

    // latitude and logitude
    var myLatLng = {lat: temp1, lng: temp2};


    //==========================================================
    //                          style map our way
    //==========================================================
    // style map our way
    var styles = [
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            { color: "#ffffff" }
          ]
        },{
          featureType: "road",
          elementType: "labels.text",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "road",
          elementType: "labels.icon",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "landscape",
          elementType: "all",
          stylers: [
            { color: "#f5f5f5"}
          ]
        },{
          featureType: "water",
          elementType: "all",
          stylers: [
            { color: "#9AD7DB" }
          ]
        },{
          featureType: "poi.park",
          elementType: "all",
          stylers: [
            { color: "#f5f5f5" }
          ]
        },{
          featureType: "landscape.man_made",
          elementType: "geometry",
          stylers: [
            { weight: "0.9" },
            { visibility: "off" }
          ]
        },{
          featureType: "poi",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];

    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});


    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(temp1, temp2),
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        disableDefaultUI: true
      };


      var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);


      //Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

    // end of styling map

    //==================================================
    //                  MARKER ON THE MAP
    //==================================================

    var imageFlag = 'pinbest.png';

    // so when you click it puts a pin there 
    // EVENT LISTENER - click on map
    // here!!!
    google.maps.event.addListener(map, 'click', function(eventFTW) {


      // perPage = 3;


       marker = new google.maps.Marker({
         position: eventFTW.latLng, 
         map: map,
         animation: google.maps.Animation.DROP,
         icon: imageFlag,
         optimized: false,
       });


      //get photos from location where I clicked

       loadPhotos(eventFTW.latLng.lat(),eventFTW.latLng.lng());



   


    }); // end map click listener


//=============================================================  
}//          END OF GOOGLE MAPS INITIATION FUNCTION
//=============================================================


//===============================================================
//                flickr function for GPS input
//===============================================================





function loadPhotos(aaa,bbb){  

  var apiurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&has_geo=1&lat="+aaa+"&lon="+bbb+"&radius=" + radius + "&api_key=" + apiKey  + "&extras=geo&per_page=" + perPage + "&format=json&nojsoncallback=1";  

  $.getJSON(apiurl,function(jsonFTW){  

    //console.log(jsonFTW);
    
    for (i=0; i<perPage; i++){ 
      var imageURL = "https://farm"+jsonFTW.photos.photo[i].farm+".staticflickr.com/"+jsonFTW.photos.photo[i].server+"/"+jsonFTW.photos.photo[i].id+"_"+jsonFTW.photos.photo[i].secret+"_b.jpg";
      
      var imageURLsmall = "https://farm"+jsonFTW.photos.photo[i].farm+".staticflickr.com/"+jsonFTW.photos.photo[i].server+"/"+jsonFTW.photos.photo[i].id+"_"+jsonFTW.photos.photo[i].secret+"_s.jpg";


      //console.log("lat = " + jsonFTW.photos.photo[i].latitude);
      //console.log("lon = " + jsonFTW.photos.photo[i].longitude);   

    $("#results").prepend('<a href="#" data-featherlight="'+ imageURL +'"><img class="flickrImage" title="'+jsonFTW.photos.photo[i].latitude+' and '+jsonFTW.photos.photo[i].longitude+'" src="'+imageURLsmall+'"/></a>');


    }    

  }); // end of .getJSON

} // end loadPhotos



$(document).ready(function() {

  // do nothing

});