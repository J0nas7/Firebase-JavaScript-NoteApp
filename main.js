/*var datestamp = new Date();
document.getElementById("theNoteDate").innerHTML =  datestamp.getDate()+". "+
                                                    datestamp.toLocaleString('default', { month: 'long' })+" "+
                                                    datestamp.getFullYear()+" - "+
                                                    (datestamp.getHours() < 10 ? "0" : "")+datestamp.getHours()+":"+(datestamp.getMinutes() < 10 ? "0" : "")+datestamp.getMinutes()+":"+(datestamp.getSeconds() < 10 ? "0" : "")+datestamp.getSeconds();*/



/*document.getElementById("noteListTrigger").addEventListener("click", () => {
    
});*/

let menuTrigger = document.getElementById("menuTrigger");
let noteList = document.getElementById("noteList");
menuTrigger.addEventListener("click", () => {
    menuTrigger.classList.toggle("triggered");
    noteList.classList.toggle("open");
});




