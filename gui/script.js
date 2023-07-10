//Display Container Element
const displayContainer = document.getElementById('displayContainer')


//Get All the Courses
async function getAllCourses(){
    const courses = await eel.getAllSCourses()()
    const edit = document.getElementById('edit-code')
    const add = document.getElementById('add-code')
    add.innerHTML = ""
    edit.innerHTML =""
    for(let i=0; i<courses.length; i++){
        const option = document.createElement('option')
        option.value = courses[i][0]
        option.innerText = courses[i][1]
        add.appendChild(option)
    }
    for(let i=0; i<courses.length; i++){
        const option = document.createElement('option')
        option.value = courses[i][0]
        option.innerText = courses[i][1]
        edit.appendChild(option)
    }
}

//Search result submit listener
document.getElementById('searchform').addEventListener('submit', (e)=>{
    e.preventDefault()
    const container = document.getElementById('resultscontainer')
    const value = document.getElementById('searchinput').value
    container.innerHTML = ''
    Show('searchModal')
    Hide('editModal')
    getResults(value)
})


//Will Calculate the Age base on DOB
function calculateAge(birthDate) {
    var today = new Date();
    var birthDate = new Date(birthDate);
  
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  

//Get the result for  the search
async function getResults(searchValue){
    const resultslrn = await eel.SearchById(searchValue)()
    const resultsname = await eel.SearchByName(searchValue)()
    const container = document.getElementById('resultscontainer')
    EraseValues()
    if(resultsname.length > 0){
        for(let i = 0; i < resultsname.length; i++){
            const div = document.createElement('div')
            div.classList.add('w-full','border-b-2', 'border-rose-700',  'p-4', 'cursor-pointer', 'hover:translate-x-5', 'hover:bg-rose-100','hover:text-rose-600' ,'duration-500', 'h-fit','w-full','bg-transparent', 'grid', 'items-center','gap-2', 'grid-cols-6') 
            div.id = `${resultsname[i][0]}-div` // Id of each row
            div.addEventListener('click', function(){
                Show('editModal')
                PutValues(resultsname[i])
                Hide('searchModal')
            })
            div.innerHTML =`
                <img src="${resultsname[i][4] === 'Male'? ('./public/Male.png'):('./public/Female.png')}" alt="profile" class="w-10 h-10 rounded-full cols-span-1">
                <div class="text-base font-semibold col-auto flex flex-row">${resultsname[i][1]}  ${resultsname[i][3]}</div>
                <p class="text-base font-semibold col-auto">${resultsname[i][7]}</p>
                <p class="text-base font-semibold col-auto">${resultsname[i][8]}</p>
            `
            container.appendChild(div)
        }
    }else if(resultslrn.length > 0){
        for(let i = 0; i < resultslrn.length; i++){
            const div = document.createElement('div')
            div.classList.add('w-full','border-b-2', 'border-rose-700',  'p-4', 'cursor-pointer', 'hover:translate-x-5', 'hover:bg-rose-100','hover:text-rose-600' ,'duration-500', 'h-fit','w-full','bg-transparent', 'grid', 'items-center','gap-2', 'grid-cols-6') 
            div.id = `${resultslrn[i][0]}-div` // Id of each row
            div.addEventListener('click', function(){
                Show('editModal')
                PutValues(resultslrn[i])
                Hide('searchModal')
            })
            div.innerHTML =`
                <img src="${resultslrn[i][4] === 'Male'? ('./public/Male.png'):('./public/Female.png')}" alt="profile" class="w-10 h-10 rounded-full cols-span-1">
                <div class="text-base font-semibold col-auto flex flex-row">${resultslrn[i][1]}  ${resultslrn[i][3]}</div>
                <p class="text-base font-semibold col-auto">${resultslrn[i][7]}</p>
                <p class="text-base font-semibold col-auto">${resultslrn[i][8]}</p>
            `
            container.appendChild(div)
        }
    }else{
        const div = document.createElement('div')
        div.classList.add('text-base','font-semibold','col-auto','text-center','flex', 'flex-row','w-full','justify-center')
        div.innerText = 'No results found'
        container.appendChild(div)
    }
}

//Will Put values to the edit modal
function PutValues(student){
    EraseValues()
    const lrn = document.getElementById('lrn-edit')
    const profile = document.getElementById('edit-profile')
    const fname = document.getElementById('edit-fname')
    const mname = document.getElementById('edit-mname')
    const lname = document.getElementById('edit-lname')
    const email = document.getElementById('edit-email')
    const dob = document.getElementById('edit-date')
    const gender = document.getElementById('edit-gender')
    const year = document.getElementById('edit-year')
    const code = document.getElementById('edit-code')
    lrn.innerText = student[0]
    fname.value = student[1]
    mname.value = student[2]
    lname.value = student[3]
    dob.value = student[5]
    email.value = student[6]
    gender.value = student[4]
    year.value = student[7]
    code.value = student[8]
    profile.src = gender.value === 'Male'? ('./public/Male.png'):('./public/Female.png')
}

//Will Erase values to the edit modal
function EraseValues(){
    const lrn = document.getElementById('lrn-edit')
    const fname = document.getElementById('edit-fname')
    const mname = document.getElementById('edit-mname')
    const lname = document.getElementById('edit-lname')
    const dob = document.getElementById('edit-date')
    const gender = document.getElementById('edit-gender')
    const year = document.getElementById('edit-year')
    const code = document.getElementById('edit-code')
    lrn.innerText = ""
    fname.value = ""
    mname.value = ""
    lname.value = ""
    dob.value = ""
    gender.value = ""
    year.value = ""
    code.value = ""
}

//Update Student 
async function Update(id,newInfo){
    const update = await eel.UpdateStudent(id, newInfo)
    if(update){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Student updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
          Hide("editModal")
          const profile = document.getElementById(`${id}-prof`)
          const Full = document.getElementById(`${id}-Full`)
          const gender = document.getElementById(`${id}-gender`)
          const age = document.getElementById(`${id}-age`)
          const agenumber = calculateAge(newInfo[4])
          const year  = document.getElementById(`${id}-year`)
          const course = document.getElementById(`${id}-course`)
          profile.src = newInfo[3] === 'Male'?('./public/Male.png'):('./public/Female.png')
          Full.innerHTML = `${newInfo[0]} ${newInfo[1]} ${newInfo[2]}`
          gender.innerHTML = newInfo[3]
          age.innerHTML = agenumber
          year.innerHTML = newInfo[6]
          course.innerHTML = newInfo[7]
    }else{
        Swal.fire({
            title: 'Error!',
            text: "Something went wrong Student is not updated",
            icon: 'error',
            confirmButtonText: 'Retry'
          })
    }
}

//Edit result submit listener
document.getElementById('editForm').addEventListener('submit', (e)=>{
    e.preventDefault()
    const lrn = document.getElementById('lrn-edit').innerText
    const fname = document.getElementById('edit-fname').value
    const mname = document.getElementById('edit-mname').value
    const lname = document.getElementById('edit-lname').value
    const dob = document.getElementById('edit-date').value
    const gender = document.getElementById('edit-gender').value
    const year = document.getElementById('edit-year').value
    const code = document.getElementById('edit-code').value
    const email = document.getElementById('edit-email').value
    const info = [fname,mname,lname,gender,dob,email,year,code]
    if(fname.length === 0 || mname.length === 0 || lname.length === 0 || dob.length === 0 ||gender.length === 0 ||email.length === 0  || year.length === 0 || code.length === 0){
        Swal.fire({
            title: 'Error!',
            text: "The input fields serve no purpose if they are left unfilled",
            icon: 'error',
            confirmButtonText: 'My Bad'
          })
    }else{
        Update(lrn,info)
    }
})


async function Add(student){
    const add = await eel.AddStudent(student)
    if(add){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Student Added successfully',
            showConfirmButton: false,
            timer: 1500
        })
        
        console.log(student)
        Hide("addModal")
        const email = document.getElementById('add-email')
        const fname = document.getElementById('add-fname')
        const mname = document.getElementById('add-mname')
        const lname = document.getElementById('add-lname')
        const dob = document.getElementById('add-date')
        const gender = document.getElementById('add-gender')
        const year = document.getElementById('add-year')
        const code = document.getElementById('add-code')
        email.value =""
        fname.value = ""
        mname.value = ""
        lname.value = ""
        dob.value = ""
        gender.value = ""
        year.value = ""
        code.value = ""
        setTimeout(function() {
            location.reload();
          }, 1500);

    }else{
        Swal.fire({
            title: 'Error!',
            text: "Something went wrong Student is not added",
            icon: 'error',
            confirmButtonText: 'Retry'
          })
    }
}

//Add Student submit listener
document.getElementById('addForm').addEventListener('submit', async (e)=>{
    e.preventDefault()
    const email = document.getElementById('add-email').value
    const fname = document.getElementById('add-fname').value
    const mname = document.getElementById('add-mname').value
    const lname = document.getElementById('add-lname').value
    const dob = document.getElementById('add-date').value
    const gender = document.getElementById('add-gender').value
    const year = document.getElementById('add-year').value
    const code = document.getElementById('add-code').value
    const info = [fname,mname,lname,gender,dob,email,year,code]
    if(fname.length === 0 || mname.length === 0 || lname.length === 0 || dob.length === 0 ||gender.length === 0 || year.length === 0 || code.length === 0){
        Swal.fire({
            title: 'Error!',
            text: "The input fields serve no purpose if they are left unfilled",
            icon: 'error',
            confirmButtonText: 'My Bad'
          })
    }else{
        Add(info)
    }
})

function onClickDel(){
    const lrn = document.getElementById('lrn-edit').innerText
    DeleteQuestion(lrn)
}


//Will Ask a question to the user if he is sure that he wants to Delete
function DeleteQuestion(lrn){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            Delete(lrn)
        }
      })
}


//Delete
async function Delete(lrn){
    const isDeleted = await  eel.DeleteStudent(lrn)()
    if(isDeleted){
        Swal.fire(
            'Deleted!',
            'Student has been deleted.',
            'success'
          )
          Hide('editModal')
          Hide(`${lrn}-div`)
    }else
        Swal.fire(
            'Not Deleted!',
            'Something went wrong',
            'error'
          )
    }
let prev;

//Display Table of Students
function DisplayStudent(student){

    const age = calculateAge(student[5])
    const div = document.createElement('div')
    div.classList.add('w-full', 'lg:w-4/6', 'grid', 'grid-cols-7', 'bg-white', 'cursor-pointer', ',items-center', 'p-1', 'text-rose-600', 'hover:shadow-2xl', 'hover:shadow-rose-200', 'my-2', 'hover:ml-20', 'hover:bg-rose-100', 'duration-500')
    div.id = `${student[0]}-div`
    div.innerHTML = `
    <div class="col-span-1">
        <img id="${student[0]}-prof" class="h-10" src="${student[4] === 'Male'? ('./public/Male.png'):('./public/Female.png')}" />
    </div>
    <div id="${student[0]}-Full" class="col-span-2 font-semibold truncate">${student[1]} ${student[2]} ${student[3]}</div>
    <div id="${student[0]}-gender" class="col-span-1">${student[4]}</div>
    <div id="${student[0]}-age" class="col-span-1">${age}</div>
    <div id="${student[0]}-year" class="col-span-1">${student[7]}</div>
    <div id="${student[0]}-course" class="col-span-1">${student[8]}</div>
    `
    div.addEventListener('click', function(){
        Show('editModal')
        if(prev !== undefined){
            document.getElementById(prev).classList.remove('ml-20','bg-rose-100',  'border-2', 'border-rose-500','shadow-2xl', 'shadow-rose-500')
        }
        div.classList.add('ml-20','bg-rose-100',  'border-2', 'border-rose-500','shadow-2xl', 'shadow-rose-500')
        prev = div.id
        DataRefresh(student[0])
        Hide('searchModal')
    })
    displayContainer.appendChild(div)
}

//Will Refresh the data
async function DataRefresh(lrn){
    const student = await eel.SearchById(lrn)()
    PutValues(student[0])
}

// Show ELement
function Show(id){
    getAllCourses()
    document.getElementById(id).classList.remove("hidden");
}
// Hide ELement
function Hide(id){
    document.getElementById(id).classList.add("hidden");
}

// Get All Students
async function GetAllStudents(){
    const students = await eel.getAllStudent()()
    students.map(student => (
        DisplayStudent(student)
    ))
}

GetAllStudents()
