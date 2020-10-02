/*db.collection("notes").add({
    title: "Hello 321",
    date: new Date().getTime(),
    content: "Lorem ipsum dolor sit amet"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});*/

let theNotes = document.getElementsByClassName("notes")[0];

var selectedIndex = 1;
var i = 1;
db.collection("notes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id}`);
        console.log(doc.data());
        theNotes.innerHTML +=   "<div class='aNote' id='n"+i+"'>"+
                                "<span class='nTitle'>"+doc.data().title+"</span>"+
                                "<span class='nDate'>today</span>"+
                                "<span class='nContent'>"+doc.data().content+"...</span>"+
                                "<div class='clrBth fltLft'></div>"+
                                "</div>";
        
        if (i == selectedIndex) {
            document.getElementById("theNoteTitle").innerHTML = doc.data().title;
            document.getElementById("theNoteContent").innerHTML = doc.data().content;
        }
        i++;
    });
    document.getElementById("n"+selectedIndex).classList.add("active");
});