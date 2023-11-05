import { Component, Input ,OnInit } from '@angular/core';
import {Observable} from 'rxjs'
import { InspectionApiService } from 'src/app/inspection-api.service';
@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  statusList$!:Observable<any[]>;
  inspectionTypesList$!:Observable<any[]>;

  constructor(private inspectionApiServices:InspectionApiService) { }

  @Input() inspection: any;

  id: number = 0;
  status: string = "";
  comentarios: string = "";
  selectedInspectionTypeId: number  = 0 ;


  ngOnInit():void {
    this.id = this.inspection.id;
    this.status = this.inspection.estado;
    this.comentarios = this.inspection.comentarios;
    this.selectedInspectionTypeId = this.inspection.inspectionTypeId
    this.statusList$ = this.inspectionApiServices.getEstadoList();
    this.inspectionList$ = this.inspectionApiServices.getInspectionList();
    this.inspectionTypesList$ = this.inspectionApiServices.getInspectionTypesList()

  }

  onSelectType(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedInspectionTypeId = +selectedValue;
  }



addInspections(){
  const inspectionData = {
    estado: this.status,
    comentarios: this.comentarios,
    inspectionTypeId: this.selectedInspectionTypeId
  };

  this.inspectionApiServices.addInspection(inspectionData).subscribe(res => {
    var closeModalBtn = document.getElementById('add-edit-modal-close');
    if (closeModalBtn) {
      closeModalBtn.click();
    }
    var showAddSuccess = document.getElementById('add-success-alert')
    if (showAddSuccess) {
      showAddSuccess.style.display = "block";
    }
    setTimeout(function(){
      if (showAddSuccess) {
        showAddSuccess.style.display = "none";
      }
    }, 4000);

  })
}
updateInspection(){
  const inspectionData = {
    id:this.id,
    estado: this.status,
    comentarios: this.comentarios,
    inspectionTypeId: this.selectedInspectionTypeId
  };
  const id:number = this.id
  this.inspectionApiServices.updateInspections(id,inspectionData).subscribe(res => {
    var closeModalBtn = document.getElementById('add-edit-modal-close');
    if (closeModalBtn) {
      closeModalBtn.click();
    }
    var showUpdateSuccess = document.getElementById('update-success-alert')
    if (showUpdateSuccess) {
      showUpdateSuccess.style.display = "block";
    }
    setTimeout(function(){
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "none";
      }
    }, 4000);

  })
}



}
