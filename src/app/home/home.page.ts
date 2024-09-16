import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point'; // Impor Point
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'; // Impor PictureMarkerSymbol

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private latitude: number | any;
  private longitude: number | any;

  constructor() {}

  public async ngOnInit() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      console.log('Latitude:', this.latitude);
      console.log('Longitude:', this.longitude);

      // Buat instance peta
      const map = new Map({
        basemap: "topo-vector"
      });

      const view = new MapView({
        container: "container",
        map: map,
        zoom: 14, // Adjust zoom level as needed
        center: [this.longitude, this.latitude] // Longitude, Latitude
      });

      // Gunakan class Point dari ArcGIS API
      const point = new Point({
        longitude: this.longitude,
        latitude: this.latitude
      });

      // Definisikan PictureMarkerSymbol dengan gambar rumah
      const markerSymbol = new PictureMarkerSymbol({
        url: 'assets/download.png', // Path relatif ke gambar
        width: '32px', // Lebar simbol
        height: '32px' // Tinggi simbol
      });

      const pointGraphic = new Graphic({
        geometry: point,  // Menggunakan class Point sebagai geometri
        symbol: markerSymbol
      });

      // Tambahkan marker ke peta
      view.graphics.add(pointGraphic);
    } catch (error) {
      console.error("Error getting location or adding marker:", error);
    }
  }
}
