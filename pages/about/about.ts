import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList } from '@angular/fire/database';

declare var google;
var gmarkers;
gmarkers = [];

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
public hospital: AngularFireList<any>;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  constructor(public navCtrl: NavController, public DataBase: AngularFireDatabase ) {
this.hospital=DataBase.list('/Medical_Centers')
this.getDataFromFirebase();
this.getData();



  }
  items;



  
  getDataFromFirebase(){
    this.DataBase.list('/Medical_Centers/').valueChanges().subscribe(
      data =>{
        console.log(data[3].lat)
        this.items = data
      }
    )
  }
  getData(){
    firebase.database().ref('/Medical_Centers/').once('value').then(function(data){
    console.log(JSON.stringify(data.val()));
    })
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

this.DataBase.list('/Medical_Centers/').valueChanges().subscribe(
      data =>{
        console.log(data[3].lat)
        this.items = data

var icon = {
    url: 'https://287x912zvqyps9a1m2sjek0l-wpengine.netdna-ssl.com/wp-content/uploads/2016/08/Hospital-Symbol.png', // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
   
};


for (var i = 0; i < data.length; i++){
if(data[i].bHospital = 'true'){
  let marker1=new google.maps.Marker({
     
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {lat:data[i].lat,lng:data[i].lng},
      icon: icon

    });

    let content= data[i].name + "<br>" + data[i].address;
    this.addInfoWindow(marker1,content);

    gmarkers.push(marker1);
    
}


      }
      }
    )
  


  }
  
  else if(e._value==false)
{
  //remove markers


    for(var i=0; i<gmarkers.length; i++)
        gmarkers[i].setMap(null);
    
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
