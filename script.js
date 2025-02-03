// create the main variables:
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteList = document.getElementById("noteList");

// returns notes from Local Storage:
let notes = JSON.parse(localStorage.getItem("notes")) || [];


// View the notes when we reload the page:
function displayNotes() {
    notes.forEach(note => addNoteToDOM(note));
}

// Call the function to display notes
displayNotes();

//add a new note:
addNoteBtn.addEventListener("click", function(){
    const noteText = noteInput.value.trim();
    if (noteText && noteText.length <= 400) { // Character limit
        notes.push(noteText);
        localStorage.setItem("notes", JSON.stringify(notes));
        addNoteToDOM(noteText);
        noteInput.value = "";
    } else if (noteText.length > 400) {
        alert("Note exceeds character limit of 400!"); // Notify user if input is too long
    } else {
        alert("Please enter a note!"); // Notify user if input is empty
    }
});


// Allow adding notes with Enter key
noteInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addNoteBtn.click(); // Trigger click event of the button
    }
});

//add note to DOM:
function addNoteToDOM(note){
    const li = document.createElement("li");
    li.className = "note-item";
    li.textContent = note;


//delete Btn:
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-item";
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function(){
        if (confirm("Are you sure you want to delete this note?")) { // Confirmation dialog
        

        notes = notes.filter(n => n !== note);
        localStorage.setItem("notes", JSON.stringify(notes));
        li.remove();}
    };

    li.appendChild(deleteBtn);
    noteList.appendChild(li);
   
}

// Clear all notes functionality (take help from chat GPT)
clearNotesBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to clear all notes?")) { // Confirmation dialog
        notes = [];
        localStorage.setItem("notes", JSON.stringify(notes));
        noteList.innerHTML = ""; // Clear the displayed list
        alert("All notes have been cleared."); // Notify user
    }
 });
