let theNotes = document.getElementsByClassName("notes")[0];

for (i = 0; i < 10; i++) {
    theNotes.innerHTML +=   "<div class='aNote' id='n"+i+"'>"+
                            "<span class='nTitle'>Test</span>"+
                            "<span class='nDate'>today</span>"+
                            "<span class='nContent'>Lorem "+i+"...</span>"+
                            "<div class='clrBth fltLft'></div>"+
                            "</div>";
}




document.getElementById("n"+Math.floor(Math.random()*10)).classList.add("active");





var datestamp = new Date();
document.getElementById("theNoteDate").innerHTML =  datestamp.getDate()+". "+
                                                    datestamp.toLocaleString('default', { month: 'long' })+" "+
                                                    datestamp.getFullYear()+" - "+
                                                    datestamp.getHours()+":"+(datestamp.getMinutes() < 10 ? "0" : "")+datestamp.getMinutes()+":"+(datestamp.getSeconds() < 10 ? "0" : "")+datestamp.getSeconds();