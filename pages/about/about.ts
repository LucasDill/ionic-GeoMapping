import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
//import {AngularFireDatabase, AngularFireList } from '@angularfire2/database';

declare var google;

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
//public hospital: AngularFireList<any>;

  constructor(public navCtrl: NavController) {
//this.hospital=DataBase.list('/Medical_Centers')
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 8,
      center: {lat: 48.424889, lng: -89.270721},
    
    });
    this.addMarker(this.map);

    this.directionsDisplay.setMap(this.map);
  }
  addMarker(map:any){
    let marker=new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: {lat:48.32545,lng:-89.265}
    });
    let content="<h4>Markers are here</h4>";
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

  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        var dist=response.routes[0].legs[0].distance.text;
        var time=response.routes[0].legs[0].duration.text;
        document.getElementById("display").innerText="Distance by Road to "+this.end +": "+dist+"\nTime By Road to "+this.end+": "+time;
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
AddHospitals(e)
{
  if(e._value==true)
  {
    //add markers 
  }
  else if(e._value==false)
{
  //remove markers
}
}
AddHealthService(e)
{
  if(e._value==true)
  {
    //add markers 
  }
  else if(e._value==false)
{
  //remove markers
}
}
AddHele(e)
{
  if(e._value==true)
  {
    //add markers 
  }
  else if(e._value==false)
{
  //remove markers
}
}
AddAirport(e)
{
  if(e._value==true)
  {
    //add markers 
  }
  else if(e._value==false)
{
  //remove markers
}
}
AddAmbBase(e)
{
  if(e._value==true)
  {
    //add markers 
  }
  else if(e._value==false)
{
  //remove markers
}
}
AddORNGE(e)
{
  if(e._value==true)
  {
    //add markers 
  }
  else if(e._value==false)
{
  //remove markers
}
}
}