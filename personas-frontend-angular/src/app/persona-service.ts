import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { DataService } from './data-service';

@Injectable()
export class PersonaService {

  personas: Persona[] = [];

  constructor( private dataService: DataService) {}

  // Se usa para modificar el valor del arreglo debido a la llamada asincrona
  setPersonas(personas: Persona[]){
    this.personas = personas;
  }

  agregarPersona(persona: Persona){
    console.log('persona a agregar:' + persona.nombre);
    this.dataService.agregarPersona(persona)
      .subscribe(
        (persona: any) => {
          // Recuperamos objeto Persona con el idPersona recien agregado
          console.log('se agrega al arreglo la persona recien insertada suscriber:' + persona.idPersona);
          this.personas.push(persona);
        }
      );
  }

  encontrarPersona(id: number){
    const persona: Persona = this.personas.find( persona => persona.idPersona == id)!;
    console.log('persona encontrada:' + persona.idPersona + ' ' + persona.nombre);
    return persona;
  }

  modificarPersona(id: number, persona: Persona) {
    console.log('persona a modificar:' + persona.idPersona);
    //SE ACTUALIZA EL OBJETO DE PERSONA DEL ARREGLO
    const personaModificadaLocal = this.personas.find(persona => persona.idPersona == id);
    personaModificadaLocal!.idPersona = persona.idPersona;
    personaModificadaLocal!.nombre = persona.nombre;
    //GUARDAR LA PERSONA EN LA BASE DE DATOS
    this.dataService.modificarPersona(id, persona);
  }

  eliminarPersona(id: number) {
    console.log('eliminar persona con id:' + id);
    const index = this.personas.findIndex( persona => persona.idPersona == id); //encontramos el indice en el arreglo
    this.personas.splice(index,1);
    this.dataService.eliminarPersona(id);
  }

  obtenerPersonas(){

    return this.dataService.cargarPersonas();
  }

}
