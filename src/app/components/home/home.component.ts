import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isVisible = false;

  @HostListener('window:load')
  onWindowLoad() {
    // Activa el efecto de aparición cuando se carga la página
    this.isVisible = true;
  }

  ngOnInit(): void {}
}
