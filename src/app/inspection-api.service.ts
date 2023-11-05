import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  readonly inspectionAPIUrl = "https://localhost:7124/api/"

  constructor( private http:HttpClient) { }

  getInspectionList():Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl + 'inspections');
  }

  addInspection(data: { estado: string; comentarios: string; inspectionTypeId: number }) {
    console.log(data);
    return this.http.post(this.inspectionAPIUrl + 'inspections', data);
}


  updateInspections(id:number| string, data:any){
    return this.http.put(this.inspectionAPIUrl + `inspections/${id}`, data )
  }

  deleteInspection(id:number|string){
    return this.http.delete(this.inspectionAPIUrl + `inspections/${id}` )
  }


  //InspectionTypes

  getInspectionTypesList():Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl + 'inspectiontypes');
  }

  addInspectionTypes(data:any){
    return this.http.post(this.inspectionAPIUrl + 'inspectiontypes', data)
  }

  updateInspectionsTypes(id:number| string, data:any){
    return this.http.put(this.inspectionAPIUrl + `inspectiontypes/${id}`, data )
  }

  deleteInspectionTypes(id:number|string){
    return this.http.delete(this.inspectionAPIUrl + `inspectiontypes/${id}` )
  }


  //estados

  getEstadoList():Observable<any[]>{
    return this.http.get<any>(this.inspectionAPIUrl + 'estados');
  }

  addEstado(data:any){
    return this.http.post(this.inspectionAPIUrl + 'estados', data)
  }

  updateEstado(id:number| string, data:any){
    return this.http.put(this.inspectionAPIUrl + `estados/${id}`, data )
  }

  deleteEstado(id:number|string){
    return this.http.delete(this.inspectionAPIUrl + `estados/${id}` )
  }


}
