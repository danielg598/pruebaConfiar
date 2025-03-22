import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MySqlService } from '../services/my-sql.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';
import { ModalUpdateComponent } from '../components/modal-update/modal-update.component';
import { OverlayService } from '../services/overlay.service';

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

  constructor(private mySqlService: MySqlService, private overlay: OverlayService) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.loadMySqlData();
  }

  // Cargar datos desde MySQL
  loadMySqlData() {
    this.mySqlService.getCities().subscribe(res => {
      this.data = res;
      console.log('Datos recibidos:', res);

      this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
      this.loadPage();
    });
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

  // Abrir modal para actualizar
  modalUpdate(row: any) {
    this.actor = row;
    this.overlay.openOverlay(this.update);
  }

  // Actualizar un autor
  // onUpdate(row: any) {
  //   this.mySqlService.updateCity(row.id, row).subscribe({
  //     next: (response) => {
  //       console.log('Autor actualizado correctamente', response);
  //       this.loadMySqlData(); // Recargar datos después de actualizar
  //     },
  //     error: (error) => {
  //       console.error('Error al actualizar el autor:', error);
  //     }
  //   });
  // }

  // Eliminar un autor
  // onDelete(row: any) {
  //   const id = row.id; // Suponiendo que el ID es la clave primaria

  //   this.mySqlService.deleteCity(id).subscribe({
  //     next: (response) => {
  //       console.log('Autor eliminado correctamente', response);

  //       // Eliminar del array localmente
  //       this.data = this.data.filter(autor => autor.id !== id);
  //       this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
  //       this.loadPage();
  //     },
  //     error: (error) => {
  //       console.error('Error al eliminar el autor:', error);
  //     }
  //   });
  // }

  // Agregar un nuevo autor
  // addNewCity(newCity: any) {
  //   this.mySqlService.addCity(newCity).subscribe({
  //     next: (response:any) => {
  //       console.log('Autor agregado correctamente', response);
  //       this.loadMySqlData(); // Recargar datos después de agregar
  //     },
  //     error: (error:any) => {
  //       console.error('Error al agregar el autor:', error);
  //     }
  //   });
  // }

  // Obtener las claves del objeto para iterar en la tabla
  arrayKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
