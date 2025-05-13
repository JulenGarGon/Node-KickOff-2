import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipo } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposFavoritosService {
  http = inject(HttpClient)
  urlServidor = 'https://node-kickoff.onrender.com'
  constructor() { 

  }

  getEquiposFavoritos() {
    return this.http.get<{ data: Equipo[] }>(this.urlServidor + '/api/equipos');
  }
  addEquipoFavorito(equipo: any) {
    return this.http.post(this.urlServidor + '/api/equipos', equipo);
  }  
  deleteEquipoFavorito(id: string) {
    return this.http.delete(this.urlServidor + '/api/equipos/' + id);
  }
  
  
}
