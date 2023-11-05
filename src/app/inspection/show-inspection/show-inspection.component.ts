import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';
import { InspectionComponent } from '../inspection.component';
import { log } from 'console';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypeList$!:Observable<any[]>;
  inspectionTypesList: any=[];

  //Map to display data associate with foreing keys

  inspectionsTypesMap:Map<number,string> = new Map()

  constructor( private inspectionApiServices:InspectionApiService) { }

  ngOnInit() {
    this.inspectionList$ = this.inspectionApiServices.getInspectionList();
    this.inspectionTypeList$ = this.inspectionApiServices.getInspectionTypesList();
    this.refreshInspectionTypesMap();
    console.log(this.inspectionTypesList);
    console.log(this.inspectionsTypesMap);
  }
  

  // Varaibles (properties)

  modaltitle:string = '';
  activeAddEditInspectionComponent:boolean= false;
  inspection:any;

  modalEdit(item:any){
    this.inspection = item
    this.modaltitle = " Edit Inspection"
    this.activeAddEditInspectionComponent = true;
  }

  delete(item:any){
    if (confirm(`esta seguro que quiere eliminar la inspections ${item.id}`)) {
      this.inspectionApiServices.deleteInspection(item.id).subscribe(res =>{
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        var showDeleteSuccess = document.getElementById('delete-success-alert')
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function(){
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = "none";
          }
        }, 4000);
        this.inspectionList$ = this.inspectionApiServices.getInspectionList()
    
      })
      
    }
  }

  modalAdd(){
    this.inspection = {
      id:0,
      estado:null,
      comentarios:null,
      inspectionTypeId:null
    }
    this.modaltitle = "Add Inspection"
    this.activeAddEditInspectionComponent = true;
   
  }

  modalClose(){
    this.activeAddEditInspectionComponent = false;
    this.inspectionList$ = this.inspectionApiServices.getInspectionList();
  }

  refreshInspectionTypesMap(){
    this.inspectionApiServices.getInspectionTypesList().subscribe(data => {    
      this.inspectionTypesList = data;

      for (let i = 0; i < data.length; i++) {       
          this.inspectionsTypesMap.set(this.inspectionTypesList[i].id,this.inspectionTypesList[i].inspectionName)
        
      }
    })
  }




}
