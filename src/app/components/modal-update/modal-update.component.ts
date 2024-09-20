import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { postgrest } from '../../interfaces/postgrest';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostgrestService } from '../../services/postgrest.service';

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.scss'
})
export class ModalUpdateComponent implements OnInit, AfterViewInit {

  @Input() actor!: postgrest;

  actorForm!: FormGroup;

  constructor(private postgrest: PostgrestService) { }

  ngAfterViewInit(): void {
    console.log(this.actor, "input");

  }

  ngOnInit(): void {
    this.actorForm = new FormGroup({
      actorId: new FormControl(this.actor.actorId),
      firstName: new FormControl(this.actor.firstName),
      lastName: new FormControl(this.actor.lastName),
      lastUpdate: new FormControl({ value: this.actor.lastUpdate, disabled: true })
    });
  }

  actualizar() {
    if (this.actorForm.valid) {
      // Capturar los nuevos valores
      const date = new Date();
      const isoDate = date.toISOString().slice(0, 19);

      const updatedActor:postgrest = this.actorForm.value;
      updatedActor.lastUpdate = isoDate.toString();

      const {actorId, ...res} = updatedActor;

      this.postgrest.putActors(updatedActor.actorId, res).subscribe(res=>{
        console.log(res);
        
      })
      console.log('Nuevos valores actualizados:', updatedActor);
      console.log('despues de desestructurar:', res);
      // Aquí puedes hacer una llamada al servicio para enviar los nuevos datos al backend
    }
  }


}
