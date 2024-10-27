import { Component } from '@angular/core';

@Component({
  selector: 'app-cifrado',
  templateUrl: './cifrado.component.html',
  styleUrls: ['./cifrado.component.css']
})
export class CifradoComponent {
  texto: string = '';
  desplazamiento: number | null = null;
  resultadoCifrado: string = '';
  textoCifradoInput: string = '';
  desplazamientoDescifrado: number | null = null;
  resultadoDescifrado: string = '';
  cifradoAnimado: boolean = false;
  yaCifrado: boolean = false;
  yaDescifrado: boolean = false;

  cifrarTexto() {
    if (!this.validarTexto(this.texto) || !this.validarRango(this.desplazamiento)) {
      return;
    }

    // Verificar si ya fue cifrado
    if (this.yaCifrado) {
      alert('El texto ya ha sido cifrado.');
      return;
    }

    this.cifradoAnimado = true;
    this.resultadoCifrado = '';
    this.yaCifrado = true; // Marcar como cifrado

    let currentText = '';
    const chars = this.texto.split('');

    chars.forEach((char, index) => {
      setTimeout(() => {
        currentText += this.cifrarLetra(char, this.desplazamiento!);
        this.resultadoCifrado = currentText;

        if (index === chars.length - 1) {
          this.cifradoAnimado = false;
        }
      }, index * 100); // intervalo de 100 ms por letra
    });
  }

  descifrarTexto() {
    if (!this.validarTexto(this.textoCifradoInput) || !this.validarRango(this.desplazamientoDescifrado)) {
      return;
    }

    // Verificar si ya fue descifrado
    if (this.yaDescifrado) {
      alert('El texto ya ha sido descifrado.');
      return;
    }

    this.resultadoDescifrado = this.descifrarCesar(this.textoCifradoInput, this.desplazamientoDescifrado!);
    this.yaDescifrado = true; // Marcar como descifrado
  }

  limpiarCifrado() {
    this.texto = '';
    this.desplazamiento = null;
    this.resultadoCifrado = '';
    this.cifradoAnimado = false;
    this.yaCifrado = false; // Resetear estado de cifrado
  }

  limpiarDescifrado() {
    this.textoCifradoInput = '';
    this.desplazamientoDescifrado = null;
    this.resultadoDescifrado = '';
    this.yaDescifrado = false; // Resetear estado de descifrado
  }

  cifrarLetra(char: string, desplazamiento: number): string {
    if (char.match(/[a-zA-Z]/)) {
      const base = char.charCodeAt(0) >= 97 ? 97 : 65; 
      return String.fromCharCode(((char.charCodeAt(0) - base + desplazamiento) % 26) + base);
    }
    return char;
  }

  descifrarCesar(texto: string, desplazamiento: number): string {
    return this.cifrarCesar(texto, -desplazamiento);
  }

  cifrarCesar(texto: string, desplazamiento: number): string {
    return texto.split('').map(char => this.cifrarLetra(char, desplazamiento)).join('');
  }

  validarTexto(texto: string): boolean {
    if (texto.trim() === '') {
      alert('El texto no puede estar vacío.');
      return false;
    }
    if (/[^a-zA-Z\s]/.test(texto)) {
      alert('El texto solo puede contener letras y espacios.');
      return false;
    }
    return true;
  }

  validarRango(desplazamiento: number | null): boolean {
    if (desplazamiento === null || !Number.isInteger(desplazamiento)) {
      alert('El desplazamiento debe ser un número entero.');
      return false;
    }
    return true;
  }

  validarDesplazamiento() {
    if (this.desplazamiento !== null && !Number.isInteger(this.desplazamiento)) {
      alert('El desplazamiento debe ser un número entero.');
      this.desplazamiento = null;
    }
  }
}
