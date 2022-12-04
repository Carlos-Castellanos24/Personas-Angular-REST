import { PersonaService } from './../persona-service';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];

  constructor(private personaService: PersonaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.personaService.obtenerPersonas()
    .subscribe(
      (personasObtenidas: any) =>{
        //Cargamos los datos de personas obtenidas
        this.personas = personasObtenidas;
        this.personaService.setPersonas(this.personas);
        console.log("Personas obtenidas: " + this.personas);
      }
    );

  }

  irAgregar(){

    console.log("Nos vamos a agregar");
    this.router.navigate(["./personas/agregar"])
  }
}
