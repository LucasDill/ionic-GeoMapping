import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles:[`
  agm-map {
    height: 50%;
  }
  `]
})
export class HomePage {
// google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 48.425185;
  lng: number = -89.269674;
  constructor(public navCtrl: NavController) {

  }

clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
    m.lat=$event.coords.lat;
    m.lng=$event.coords.lng;
  }
  
  markers: marker[] = [
	  
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	draggable: boolean;
}
