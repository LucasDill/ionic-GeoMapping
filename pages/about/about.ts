import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase, AngularFireList } from '@angular/fire/database';

declare var google;
var gmarkers, gmarkers2,gmarkers3, gmarkers4;
gmarkers = [];
gmarkers2 = [];
gmarkers3 = [];
gmarkers4 = [];

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

var icon2 = {
    url: 'https://www.pinclipart.com/picdir/middle/150-1503142_greek-mythology-medusa-symbol-clipart.png', // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
   
};

for (var i = 0; i < data.length; i++){
   console.log(data[i].bHospital)
if(data[i].bHospital == true && data[i].bRegionalStrokeCentre == false){
  let marker1=new google.maps.Marker({
     
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {lat:data[i].lat,lng:data[i].lng},
      icon: icon

    });

    let content= "<b>Name:</b> "+data[i].name + "<br>"+"<b>Address:</b> " + data[i].address;
    this.addInfoWindow(marker1,content);

    gmarkers.push(marker1);
    
}
else if(data[i].bRegionalStrokeCentre == true){
  let markerTB=new google.maps.Marker({
     
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {lat:data[i].lat,lng:data[i].lng},
      icon: icon2

    });

    let content="<b>Name:</b> " + data[i].name + "<br>"+"<b>Address:</b> " + data[i].address;
    this.addInfoWindow(markerTB,content);

    gmarkers.push(markerTB);

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
AddTele(e)
{
  if(e._value==true)
  {
    //add markers 
this.DataBase.list('/Medical_Centers/').valueChanges().subscribe(
      data =>{
        this.items = data

var icon = {
    url: 'https://www.freeiconspng.com/uploads/letter-t-icon-png-18.png', // url
    scaledSize: new google.maps.Size(25, 25), // scaled size
   
};


for (var i = 0; i < data.length; i++){
if(data[i].bTelestroke == true){
  let marker2=new google.maps.Marker({
     
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {lat:data[i].lat,lng:data[i].lng},
      icon: icon

    });

    let content="<b>Name:</b> " +data[i].name + "<br>" +"<b>Address:</b> "+ data[i].address;
    this.addInfoWindow(marker2,content);

    gmarkers2.push(marker2);
    
}

      }
      }
    )
  


  }
  
  else if(e._value==false)
{
  //remove markers


    for(var i=0; i<gmarkers2.length; i++)
        gmarkers2[i].setMap(null);
    
}
}
AddHealthService(e)
{
  if(e._value==true)
  {
    //add markers 
this.DataBase.list('/Medical_Centers/').valueChanges().subscribe(
      data =>{
        this.items = data

var icon = {
    url: 'https://f-scope.net/images/health-services-png-1.png', // url
    scaledSize: new google.maps.Size(25, 25), // scaled size
   
};


for (var i = 0; i < data.length; i++){
if(data[i].bHealthServices == true){
  let marker3=new google.maps.Marker({
     
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {lat:data[i].lat,lng:data[i].lng},
      icon: icon

    });

    let content="<b>Name:</b> "+ data[i].name + "<br>"+"<b>Address:</b> " + data[i].address;
    this.addInfoWindow(marker3,content);

    gmarkers3.push(marker3);
    
}

      }
      }
    )
  


  }
  
  else if(e._value==false)
{
  //remove markers


    for(var i=0; i<gmarkers3.length; i++)
        gmarkers3[i].setMap(null);
    
}
}

AddHele(e)
{
  {
  if(e._value==true)
  {
    //add markers 
this.DataBase.list('/Landing Sites/').valueChanges().subscribe(
      data =>{
        this.items = data

var icon = {
    url: 'https://cdn0.iconfinder.com/data/icons/medical-line-vol-2/56/helipad__landing__helicopter__emergency__fly-512.png', // url
    scaledSize: new google.maps.Size(25, 25), // scaled size
   
};

for (var i = 0; i < data.length; i++){
if(data[i].type == "Helipad"){
  let marker4=new google.maps.Marker({
     
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: {lat:data[i].lat,lng:data[i].lng},//parsefloat is temporary need to fix write to database 
      icon: icon
    });

    let content= "<b>Site Name:</b> "+data[i].siteName + "<br>" +"<b>Address:</b> " +data[i].Address+"<br>"+"<b>Identifier:</b> "+data[i].ident;
    this.addInfoWindow(marker4,content);

    gmarkers4.push(marker4);
    
}
        }
      }
    )
  }
  else if(e._value==false)
    {
  //remove markers


    for(var i=0; i<gmarkers4.length; i++)
        gmarkers4[i].setMap(null);
    
    }
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
