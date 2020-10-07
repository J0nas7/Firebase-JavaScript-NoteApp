/*document.getElementById("noteListTrigger").addEventListener("click", () => {
    
});*/

let menuTrigger = document.getElementById("menuTrigger");
let noteList = document.getElementById("noteList");
menuTrigger.addEventListener("click", () => {
    menuTrigger.classList.toggle("triggered");
    noteList.classList.toggle("open");
});

function timestampToReadableDate(timestamp) {
    var datestamp = new Date();
    datestamp.setTime(timestamp);
    var returnDate =    datestamp.getDate()+". "+
                        datestamp.toLocaleString('default', { month: 'long' })+" "+
                        datestamp.getFullYear()+" - "+
                        (datestamp.getHours() < 10 ? "0" : "")+datestamp.getHours()+":"+(datestamp.getMinutes() < 10 ? "0" : "")+datestamp.getMinutes()+":"+(datestamp.getSeconds() < 10 ? "0" : "")+datestamp.getSeconds();
    return returnDate;
}

function timestampToShortDate(timestamp) {
    var datestamp = new Date();
    datestamp.setTime(timestamp);
    var returnDate =    (datestamp.getDate() < 10 ? "0" : "")+datestamp.getDate()+"."+
                        (datestamp.getMonth() < 10 ? "0" : "")+datestamp.getMonth()+"."+
                        datestamp.getFullYear().toString().slice(-2);
    return returnDate;
}