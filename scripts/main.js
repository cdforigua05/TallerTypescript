import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('info');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var inputInf = document.getElementById("search-box_inf");
var inputSup = document.getElementById("search-box_sup");
var btnfilterByCredit = document.getElementById("button-filterByCred");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredit.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderInformationInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderInformationInTable(students) {
    console.log("desplegar información personal");
    var etiquetas = ["Código", "Cédula", "Edad", "Dirección", "Teléfono"];
    var estudiante = students[0];
    etiquetas.forEach(function (fila) {
        var trElement = document.createElement("tr");
        var valor;
        switch (fila) {
            case "Código":
                valor = estudiante.codigo;
                break;
            case "Cédula":
                valor = estudiante.cedula;
                break;
            case "Edad":
                valor = estudiante.edad;
                break;
            case "Dirección":
                valor = estudiante.direccion;
                break;
            case "Teléfono":
                valor = estudiante.telefono;
                break;
        }
        trElement.innerHTML = "<td>" + fila + "</td>\n                          <td>" + valor + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByCredits() {
    var inferior = inputInf.value;
    var superior = inputSup.value;
    inferior = (inferior == null) ? '' : inferior;
    superior = (superior == null) ? '' : superior;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(inferior, superior, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(inferior, superior, courses) {
    if (inferior == '' || superior == '') {
        return dataCourses;
    }
    else {
        var inferiorNum_1 = Number(inferior);
        var superiorNum_1 = Number(superior);
        var coursesFilteredCre = [];
        courses.forEach(function (value) {
            if (value.credits >= inferiorNum_1 && value.credits <= superiorNum_1) {
                coursesFilteredCre.push(value);
            }
        });
        return coursesFilteredCre;
    }
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
