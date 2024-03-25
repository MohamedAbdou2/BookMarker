
let siteNameInput  = document.getElementById("siteName");
let siteUrlInput  = document.getElementById("siteUrl");
let searchInput = document.getElementById("searchInput");
let addBtn = document.getElementById("addBtn");
let UpdateBtn = document.getElementById("updateBtn");
let sitesContainer = [];
let currentIndex = null;
if(localStorage.getItem("sites")!=null){
    sitesContainer = JSON.parse( localStorage.getItem("sites"));
    displaySites(sitesContainer);
}


function addSite(){
    if(validateSiteName()==true && validateSiteUrl()==true){
    let site = 
    {
        name:siteNameInput.value,
        url:siteUrlInput.value
    }
    
    sitesContainer.push(site);
    localStorage.setItem("sites",JSON.stringify(sitesContainer));
    displaySites(sitesContainer);

    clearForm();
    }else{
        alert("sitename and url not matched");
    }
}

function clearForm(){
    siteNameInput.value="";
    siteUrlInput.value="";
}



function displaySites(arr){
    let cartona = ``;
    for(let i=0;i<arr.length;i++){

        cartona+=`<tr class="bg-light">
        <td>${arr[i].name}</td>
        <td><a href="${arr[i].url}" class="btn btn-info btn-sm ">Visit</a></td>
        <td><button onclick = "setFormForUpdate(${i})" class="btn btn-warning btn-sm ">Update</button></td>
        <td><button onclick = "deleteSite(${i});"  class="btn btn-danger  btn-sm ">Delete</button></td> 
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

function searchSite(term){
    let matchedSites = [];
 for(let i=0;i<sitesContainer.length;i++){
   
    if(sitesContainer[i].name.toLowerCase().includes(term.toLowerCase())== true){
        matchedSites.push(sitesContainer[i]);
        }
 }
 displaySites(matchedSites);
}


function setFormForUpdate(i){
    currentIndex = i;
    addBtn.classList.replace("d-block","d-none");
    UpdateBtn.classList.replace("d-none","d-block");
    siteNameInput.value = sitesContainer[i].name;
    siteUrlInput.value = sitesContainer[i].url;
}

function updateSiteInTable(){
    if(currentIndex!=null){
    addBtn.classList.replace("d-none","d-block");
    UpdateBtn.classList.replace("d-block","d-none");
    sitesContainer[currentIndex].name = siteNameInput.value;
    sitesContainer[currentIndex].url = siteUrlInput.value ;
    localStorage.setItem("sites",JSON.stringify(sitesContainer));
    displaySites(sitesContainer);
    
    clearForm();
    currentIndex = null;
}
    
}



function deleteSite(siteIndex){
    sitesContainer.splice(siteIndex,1);
    localStorage.setItem("products",JSON.stringify(sitesContainer));
    displaySites(sitesContainer);
}


function validateSiteName(){
    let regex = /^[A-Z][a-z]{3,8}$/;
    return regex.test(siteNameInput.value); // Corrected to use siteNameInput.value
}

function validateSiteUrl(){
    let regex = /^(https?:\/\/)?[\w.-]+(\.[\w.-]+)+$/;
    return regex.test(siteUrlInput.value); // Corrected to use siteUrlInput.value
}
