const modalFlex = document.getElementById('staticModal')
const selectContainer = document.getElementById('select-Container')
const courses = [ ['BSCS', 'BS in Computer Science'], ['BSIT', 'BS in Information Technology'], ['BSECE', 'BS in Electronics and Communications Engineering'], ['BSMATH', 'BS in Mathematics'], ['BSSTAT', 'BS in Statistics'], ['BSA', 'BS in Accountancy'], ['BSMGT', 'BS in Management'], ['BSHRM', 'BS in Human Resource Management'], ['BSMKTG', 'BS in Marketing'], ['BSEngSE', 'BS in Software Engineering'], ['BSEngSysE', 'BS in Systems Engineering'], ['BSChE', 'BS in Chemical Engineering'], ['BSEngEnvE', 'BS in Environmental Engineering'], ['BSBio', 'BS in Biology'], ['BSPhysics', 'BS in Physics'], ['BSEngEE', 'BS in Electrical Engineering'], ['BSAcc', 'BS in Accounting'], ['BSN', 'BS in Nursing'], ['BSEngME', 'BS in Mechanical Engineering'], ['BSAE', 'BS in Aerospace Engineering'], ['BSCE', 'BS in Civil Engineering'], ['BSEngIndE', 'BS in Industrial Engineering'], ['BSArch', 'BS in Architecture'], ['BSEngGeo', 'BS in Geology'], ['BSChem', 'BS in Chemistry'], ['BSPharm', 'BS in Pharmacy'], ['BSPT', 'BS in Physical Therapy'], ['BSEngBioMedE', 'BS in Biomedical Engineering'], ['BSCompEng', 'BS in Computer Engineering'], ['BSMathEd', 'BS in Mathematics Education'], ['BSEngMatE', 'BS in Materials Engineering'], ['BSBioTech', 'BS in Biotechnology'], ['BSME', 'BS in Mechatronics Engineering'], ['BSITM', 'BS in Information Technology Management'], ['BSFin', 'BS in Finance'], ['BSOpsMgt', 'BS in Operations Management'], ['BSIB', 'BS in International Business'], ['BSMicroBio', 'BS in Microbiology'], ['BSChE2', 'BS in Chemical Engineering'], ['BSAgri', 'BS in Agriculture'], ['BSFoodSci', 'BS in Food Science'], ['BSForestry', 'BS in Forestry'] ];
async function GetAllStudent(){
    const students = await eel.getAllStudents()()
    students.map(student =>(
        Row(student[0],student[1],student[3],student[4],student[7],student[6])
    ))
}


function Row(lrn,fname,lname,gender,course,year){
    const container = document.getElementById('rowContainer')
    const tr = document.createElement("tr");
    tr.classList.add('border-b', 'transition', 'duration-300', 'ease-in-out', 'hover:bg-teal-700', 'dark:border-teal-500', 'dark:hover:bg-teal-600');
    tr.id = `${lrn}-tr`
    tr.innerHTML = `
    <td class="whitespace-nowrap px-6 py-4 font-medium" id="${lrn}-lrn">${lrn}</td>
    <td class="whitespace-nowrap px-6 py-4">
    <img class="w-10 h-10 border-4 border-teal-700 rounded-full" src="./public/${gender}.png"/ id="${lrn}-profile">
    </td>
    <td class="whitespace-nowrap px-6 py-4" id="${lrn}-full">${fname} ${lname}</td>
    <td class="whitespace-nowrap px-6 py-4" id="${lrn}-course">${course}</td>
    <td class="whitespace-nowrap px-6 py-4" id="${lrn}-year">${year}</td>
    <td class="whitespace-nowrap px-6 py-4" >
        <div onclick="ModalEdit(${lrn})" class="p-2 border-2 border-teal-500 w-16 rounded-md text-center transition-transform hover:z-50 cursor-pointer hover:animate-bounce hover:bg-teal-400 ">
            Edit
        </div>
    </td>
    <td class="whitespace-nowrap px-6 py-4">
        <div onclick="DeleteStudent(${lrn})"  class="p-2 border-2 text-rose-500 border-rose-500 w-16 rounded-md text-center transition-transform hover:z-50 cursor-pointer hover:animate-bounce hover:bg-rose-400 ">
            Delete
        </div>
    </td>
    `
    container.appendChild(tr)
}


async function ModalEdit(lrn){
    const studentInfo = await eel.getStudentInfo(lrn)()
    console.log(studentInfo, "Student info: " )
    const del = document.getElementById('del-button')
    del.addEventListener("click", function() {
        DeleteStudent(lrn);
      });
    const modal = document.getElementById("addStudentModal")
    modal.classList.add('hidden')
    modal.classList.remove("flex")
    const profile = document.getElementById("profile-pic")
    studentInfo[4] === "Male" ? (profile.src = "./public/Male.png"):(profile.src = "./public/Female.png")
    modalFlex.classList.add('flex')
    modalFlex.classList.remove("hidden")
    const select = document.createElement("select")
    select.id = "edit-course-input"
    select.classList.add("bg-slate-900", "p-2", "text-center", "w-36")
    for (let i = 0; i < courses.length; i++){
        const option = document.createElement("option")
        option.value = courses[i][0]
        option.innerText = courses[i][0]
        select.appendChild(option)
    }
    selectContainer.appendChild(select)
    setEditInputValue(studentInfo)
}

function setEditInputValue(studentInfo){
    document.getElementById("edit-lrn-input").value = studentInfo[0]
    document.getElementById("edit-fname-input").value = studentInfo[1]
    document.getElementById("edit-lname-input").value = studentInfo[3]
    document.getElementById("edit-mname-input").value = studentInfo[2]
    document.getElementById("edit-age-input").value = studentInfo[5]
    document.getElementById("edit-gender-input").value = studentInfo[4];
    document.getElementById("edit-year-input").value = studentInfo[6];
    document.getElementById("edit-course-input").value = studentInfo[8]
    
}


function UpdateStudent(){
   const lrn = document.getElementById("edit-lrn-input").value
   const fname =  document.getElementById("edit-fname-input").value
   const lname = document.getElementById("edit-lname-input").value
   const mname =  document.getElementById("edit-mname-input").value 
   const age = document.getElementById("edit-age-input").value
   const gender = document.getElementById("edit-gender-input").value
   const year = document.getElementById("edit-year-input").value 
   const courseCode = document.getElementById("edit-course-input").value 
   let course;
   for(let i = 0; i < courses.length; i++) {
        if(courses[i][0] === courseCode){
            course = courses[i][1]
        }
   }
   if(fname.length === 0 || mname.length === 0 || lname.length === 0 || age.length === 0){
        swal("Nope!", "Don't leave any inputs empty", "error");
   }else{
    swal("Good job!", "Student Info Updated Successfully", "success");
    const studInfo = [fname,mname,lname,gender,age,course,year,courseCode]
    Update(lrn,studInfo)
    UpdateDisplay(lrn,fname,lname,gender,course,year);
    CloseAdd('staticModal')
   }
}

function UpdateDisplay(lrn,fname,lname,gender,course,year){
    document.getElementById(`${lrn}-full`).innerText = `${fname} ${lname}`
    const profile = document.getElementById(`${lrn}-profile`)
    gender === 'Male' ? (profile.src = "./public/Male.png"):(profile.src = "./public/Female.png")
    document.getElementById(`${lrn}-course`).innerText = `${course}`
    document.getElementById(`${lrn}-year`).innerText = `${year}`
    modalFlex.classList.remove('flex')
    modalFlex.classList.add("hidden")
    DeleteSelect("edit-course-input")
}

function AddStudentModal(){
    if(document.getElementById('add-course-input')){
        DeleteSelect("add-course-input")
    }
    modalFlex.classList.remove('flex')
    modalFlex.classList.add("hidden")
    const modal = document.getElementById("addStudentModal")
    modal.classList.add('flex')
    modal.classList.remove("hidden")
    const selectContainer2 = document.getElementById('select-Container2')
    const select = document.createElement("select")
    select.id = "add-course-input"
    select.classList.add("bg-slate-900", "p-2",'ml-4', "text-center", "w-32")
    for (let i = 0; i < courses.length; i++){
        const option = document.createElement("option")
        option.value = courses[i][0]
        option.innerText = courses[i][0]
        select.appendChild(option)
    }
    selectContainer2.appendChild(select)
    if(document.getElementById('edit-course-input')){
        DeleteSelect("edit-course-input")
    }
}

async function AddStudent(){
    let lrn = document.getElementById("add-lrn-input").value
    let isUnique = await eel.getStudentInfo(lrn)()
    let fname = document.getElementById("add-fname-input").value
    let mname = document.getElementById("add-mname-input").value
    let lname = document.getElementById("add-lname-input").value
    let gmail = document.getElementById("add-age-input").value
    const gender = document.getElementById("add-gender-input").value
    const year = document.getElementById("add-year-input").value
    const courseCode = document.getElementById("add-course-input").value
    let course;
    for(let i = 0; i < courses.length; i++) {
        if(courses[i][0] === courseCode){
            course = courses[i][1]
        }
   }
   if(lrn.length === 0 || fname.length === 0 || mname.length === 0 || lname.length === 0 || gmail.length === 0){
        swal("Nope!", "Don't leave any inputs empty", "error");
   }else if(lrn.length != 12){
        swal("Uh! OH!", "Lrn must be 12 digits ", "error");
   }else if(isUnique != null){
        swal("HMMMMMM...", "I'm pretty sure that lrn already exist", "error");
   }else if(year === "" || !year){
    swal("HMMMMMM...", "Don't leave any inputs empty", "error");
   }else{
    swal("Sweet!", "Student Added Successfully", "success");
    Add(lrn,fname,mname,lname,gender,gmail,course,year,courseCode)
    Row(lrn,fname,lname,gender,course,year)
    lrn = ""
    fname =""
    mname = ""
    lname = ""
    gmail = ""
    CloseAdd('addStudentModal')
   }
}


function CloseAdd(close){
    const closeE = document.getElementById(close)
    closeE.classList.remove("flex")
    closeE.classList.add("hidden")
    DeleteSelect("add-course-input")
}

function CloseEdit(close){
    const closeE = document.getElementById(close)
    closeE.classList.remove("flex")
    closeE.classList.add("hidden")
    DeleteSelect("edit-course-input")
}

function DeleteStudent(lrn){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Student's info!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            Delete(lrn)
          swal("Poof! Student has been deleted!", {
            icon: "success",
          });
          const rem = document.getElementById(`${lrn}-tr`)
          rem.remove()
          const modal = document.getElementById('staticModal')
          modal.classList.remove('flex')
          modal.classList.add('hidden')
        } else {
          swal("This Student's data is safe!");
        }
      });

}

async function Delete(lrn){
    await eel.deleteStudent(lrn)
}

async function Update(lrn, info){
    await eel.updateStudent(lrn, info)()
}

async function Add(lrn,fname,mname,lname,gender,gmail,year,course,coursecode){
    const info = [lrn,fname,mname,lname,gender,gmail,year,course,coursecode]
    await eel.add(info)
}


function DeleteSelect(del){
    document.getElementById(del).remove()
}


function Search(){
    const input = document.getElementById('search').value
    if(input.length > 0){
        const modal =   document.getElementById('searchModal')
        modal.classList.add('flex');
        modal.classList.remove('hidden');
        const isNumber = parseInt(input)
        if (typeof isNumber === 'number' && !isNaN(isNumber)) {
            const search = isNumber.toString();
            lrnSearchResults(search)
        }else{
            const search = input.toUpperCase()
            nameSearchResults(search)
        }
    }
}

async function lrnSearchResults(lrn){
    const results  = await eel.searchStudentbyLrn(lrn)()
    console.log(results)
    displaySearchResults(results)
}

async function nameSearchResults(name){
    const results  = await eel.searchStudentbyName(name)()
    console.log(results)
    displaySearchResults(results)
}

function displaySearchResults(results){
    console.log(results)
    const container = document.getElementById('search-content')
    RemoveChildren(container)
    if(results.length === 0){
        const p = document.createElement('p')
        p.innerHTML = 'No results found :('
        container.appendChild(p)
    }
    for (let i = 0; i < results.length; i++) {
        const div = document.createElement('div');
        div.classList.add('h-10','cursor-pointer', 'm-2', 'text-rose-600', 'w-3/6', 'bg-teal-100', 'hover:bg-teal-300', 'transition', 'duration-300', 'p-2', 'flex', 'justify-around');
        div.innerHTML = `
          <p>${results[i][1]} ${results[i][3]}</p>
          <p>-</p>
          <p>${results[i][0]}</p>
        `;
        div.addEventListener('click', () => {
         const modal =   document.getElementById('searchModal')
         modal.classList.add('hidden');
         modal.classList.remove('flex');
          ModalEdit(results[i][0]);
        });
        container.appendChild(div);
      }
}


function RemoveChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

GetAllStudent()

