import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = {lat: 51.047118,lng:-114.201098};
  end = {lat: 48.424889,lng: -89.270721};
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 48.424889, lng: -89.270721}
    });
   // this.addMarker(this.map);

    this.directionsDisplay.setMap(this.map);
  }
  addMarker(map:any,latling){
    let marker=new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: latling
    });
    let content="<h4>Information!</h4>";
    this.addInfoWindow(marker,content);
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
 
 mapClicked($event) {
  google.maps.event.addListener(this.map, 'click', function(event) {
  placeMarker(this.map, event.latLng);
});
   function placeMarker(map, location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() +
    '<br>Longitude: ' + location.lng()
  });
  infowindow.open(map,marker);
}
   // var distance= google.maps.geometry.spherical.computeDistanceBetween(start,end);
   // distance=distance/1000;
   // var dist=distance.toFixed(2)
   // document.getElementById("Dist").innerText="Straight Line Distance: "+dist+" Km";
   // console.log(distance)
   
   //let geocoder= new google.maps.Geocoder;
  // let latlng={lat:this.markers.Marklat,lng: this.markers.Marklng};
  // geocoder.geocode({'location':latlng}, (results, status)=> {
     //console.log(results);
   //  if(results[0].formatted_address!=null)
   //  {
    //  document.getElementById("address").innerText=(results[0].formatted_address);
   //  }
   //  else{
      // document.getElementById("address").innerText="No Adress Available";
  //   }
     
   //})
   //this.calcRoute(start,end);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}