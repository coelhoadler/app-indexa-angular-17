import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { ContactComponent } from './components/contact/contact.component';
import schedule from './agenda.json';
import { FormsModule } from '@angular/forms';

interface Contact {
  id: number,
  nome: string,
  telefone: string,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    FormsModule, 
    ContainerComponent, 
    HeaderComponent, 
    SeparatorComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public letters = 'abcdefghijklmnopqrstuvwxyz';
  public contacts: Contact[] = schedule;
  public searchText = '';
  
  ngOnInit() {
    console.log('>>> full schedule', schedule);
  }

  filterContactsByText(): Contact[] {
    if (!this.searchText) {
      return this.contacts;
    }

    return this.contacts.filter(contact =>
      this.removerAcentos(contact.nome).toLowerCase().includes(this.removerAcentos(this.searchText).toLowerCase())
    )
  }
  
  filterContactsByStartLetter(letter: string): Contact[] {
    return this.filterContactsByText().filter((contact: Contact) => {
      return this.removerAcentos(contact.nome).toLowerCase().startsWith(this.removerAcentos(letter).toLowerCase());
    });
  }

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

}
