import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import {Student} from './estudiante.js';

import {dataStudent} from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('info')!; 
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const inputInf:HTMLInputElement = <HTMLInputElement> document.getElementById("search-box_inf")!;
const inputSup:HTMLInputElement = <HTMLInputElement> document.getElementById("search-box_sup")!;
const btnfilterByCredit: HTMLElement = document.getElementById("button-filterByCred")!;
btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredit.onclick = () => applyFilterByCredits();
renderCoursesInTable(dataCourses);
renderInformationInTable(dataStudent);
totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderInformationInTable(students: Student[]):void{
  console.log("desplegar información personal");
  let etiquetas: string[] = ["Código", "Cédula","Edad","Dirección","Teléfono"];
  let estudiante: Student = students[0];
  etiquetas.forEach((fila)=>{
    let trElement = document.createElement("tr");
    let valor;
    switch(fila){
      case "Código":
        valor=estudiante.codigo;
        break;
      case "Cédula":
        valor=estudiante.cedula;
        break;
      case "Edad": 
        valor = estudiante.edad; 
        break;
      case "Dirección":
        valor=estudiante.direccion;
        break;
      case "Teléfono":
        valor=estudiante.telefono;
        break;
    }
    trElement.innerHTML = `<td>${fila}</td>
                          <td>${valor}</td>`;
    studentTbody.appendChild(trElement);
  });
  

}

function applyFilterByCredits(){
  let inferior = inputInf.value; 
  let superior = inputSup.value;
  inferior = (inferior==null)? '':inferior;
  superior = (superior==null)? '':superior;
  clearCoursesInTable(); 
  let coursesFiltered: Course[] = searchCourseByCredits(inferior,superior,dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;  
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(inferior:string, superior:string, courses: Course[]){
  
  if (inferior==''||superior==''){
    return dataCourses
  }else{
    let inferiorNum = Number(inferior);
    let superiorNum = Number(superior);
    var coursesFilteredCre: Course[]=[];
    courses.forEach(function(value){
      if (value.credits>=inferiorNum && value.credits<=superiorNum){
        coursesFilteredCre.push(value)
      }
    })
    return coursesFilteredCre;
  }
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}