import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MySqlService } from '../services/my-sql.service';
import { PostgrestService } from '../services/postgrest.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';
import { ModalUpdateComponent } from '../components/modal-update/modal-update.component';
import { OverlayService } from '../services/overlay.service';
import { postgrest } from '../interfaces/postgrest';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PortalModule,
    ModalUpdateComponent
  ],
  providers: [HttpClientModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent implements OnInit, AfterViewInit {
  @ViewChild('update') update: any;

  actor: any;

  data: any[] = [];
  headers: string[] = ["id", "nombre", "apellido", "fecha"];
  paginatedData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private postgrest: PostgrestService, private mySql: MySqlService, private overlay: OverlayService) {

  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    this.postgrestFuntion();



  }

  // Cargar la página actual
  loadPage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  // Cambiar a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage();
    }
  }

  // Cambiar a la página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage();
    }
  }

  modalUpdate(row: any) {
    const date = new Date();
    const isoDate = date.toISOString().slice(0, 19);
    this.actor = row;
    console.log(isoDate);
    console.log(this.actor);
    this.overlay.openOverlay(this.update);

  }

  onUpdate(row: any) {
    console.log(row);

    const date = new Date();
    const isoDate = date.toISOString().slice(0, 19);  // Esto genera el formato 'YYYY-MM-DDTHH:mm:ss'

    console.log(isoDate);

  }

  // Emitir el objeto completo para eliminar
  onDelete(row: postgrest) {
    const actorDelete = row.actorId;

    this.postgrest.deleteActors(actorDelete).subscribe({
      next: (response) => {
        console.log('Actor deleted successfully', response);
        // Aquí puedes hacer algo después de la eliminación, como actualizar la lista de actores.

        // Elimina el actor del array localmente
        this.data = this.data.filter(actor => actor.actorId !== actorDelete);

        // Recalcular el total de páginas y cargar la nueva página
        this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
        this.loadPage();
      },
      error: (error) => {
        console.error('Error occurred while deleting actor:', error);
      }
    });
  }


  arrayKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  postgrestFuntion() {
    this.postgrest.getActors().subscribe(res => {
      this.data = res;
      console.log(res);

      this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
      this.loadPage();

    })
  }

}
