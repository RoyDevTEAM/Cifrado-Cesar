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

  private alfabeto: string = 'abcdefghijklmnñopqrstuvwxyz';

  cifrarTexto() {
    if (!this.validarTexto(this.texto) || !this.validarRango(this.desplazamiento)) {
      return;
    }

    if (this.yaCifrado) {
      alert('El texto ya ha sido cifrado.');
      return;
    }

    this.cifradoAnimado = true;
    this.resultadoCifrado = '';
    this.yaCifrado = true;

    let currentText = '';
    const chars = this.texto.split('');

    chars.forEach((char, index) => {
      setTimeout(() => {
        currentText += this.cifrarLetra(char, this.desplazamiento!);
        this.resultadoCifrado = currentText;

        if (index === chars.length - 1) {
          this.cifradoAnimado = false;
        }
      }, index * 100);
    });
  }

  descifrarTexto() {
    if (!this.validarTexto(this.textoCifradoInput) || !this.validarRango(this.desplazamientoDescifrado)) {
      return;
    }

    if (this.yaDescifrado) {
      alert('El texto ya ha sido descifrado.');
      return;
    }

    this.resultadoDescifrado = this.descifrarCesar(this.textoCifradoInput, this.desplazamientoDescifrado!);
    this.yaDescifrado = true;
  }

  limpiarCifrado() {
    this.texto = '';
    this.desplazamiento = null;
    this.resultadoCifrado = '';
    this.cifradoAnimado = false;
    this.yaCifrado = false;
  }

  limpiarDescifrado() {
    this.textoCifradoInput = '';
    this.desplazamientoDescifrado = null;
    this.resultadoDescifrado = '';
    this.yaDescifrado = false;
  }

  cifrarLetra(char: string, desplazamiento: number): string {
    const letraMinuscula = char.toLowerCase();

    if (this.alfabeto.includes(letraMinuscula)) {
      const baseIndex = this.alfabeto.indexOf(letraMinuscula);
      const nuevaPosicion = (baseIndex + desplazamiento + this.alfabeto.length) % this.alfabeto.length;
      const letraCifrada = this.alfabeto[nuevaPosicion];

      return char === char.toUpperCase() ? letraCifrada.toUpperCase() : letraCifrada;
    }

    return char;
  }

  descifrarCesar(texto: string, desplazamiento: number): string {
    return this.cifrarCesar(texto, -desplazamiento);
  }

  cifrarCesar(texto: string, desplazamiento: number): string {
    return texto
      .split('')
      .map(char => this.cifrarLetra(char, desplazamiento))
      .join('');
  }

  validarTexto(texto: string): boolean {
    if (!texto.trim()) {
      alert('El campo de texto no debe estar vacío.');
      return false;
    }
    return true;
  }

  validarRango(desplazamiento: number | null): boolean {
    if (desplazamiento === null) {
      alert('El campo de desplazamiento no debe estar vacío.');
      return false;
    }
    if (!Number.isInteger(desplazamiento)) {
      alert('El desplazamiento debe ser un número entero.');
      return false;
    }
    if (desplazamiento < 0 || desplazamiento >= this.alfabeto.length) {
      alert(`El desplazamiento debe estar entre 0 y ${this.alfabeto.length - 1}.`);
      return false;
    }
    return true;
  }

  copiarTexto(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      alert('Texto copiado al portapapeles');
    }).catch(err => {
      alert('Error al copiar el texto: ' + err);
    });
  }
      }
