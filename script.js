// När sidan laddas, kör denna funktion
window.onload = function() {
    
    // Hämta referensen till input-fältet där användaren skriver ny todo
    var todoInput = document.getElementById('todoInput'); 
    
    // Hämta referensen till knappen som lägger till en ny todo
    var addTodoBtn = document.getElementById('addTodoBtn'); 
    
    // Hämta referensen till listan där alla todo-objekt kommer att visas
    var todoList = document.getElementById('todoList');  

    // När sidan laddas, hämta sparade todos från Local Storage (eller tom lista om inga finns)
    var savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Loopa igenom alla sparade todos och lägg till dem på sidan (DOM)
    savedTodos.forEach(function(todo) {
        // Lägg till varje todo i listan, inklusive om de är avbockade eller inte
        addTodoToDOM(todo.text, todo.completed);
    });

    // När användaren klickar på knappen för att lägga till en ny todo
    addTodoBtn.onclick = function() {
        // Hämta och trimma texten från input-fältet (tar bort onödiga mellanrum)
        var newTodoText = todoInput.value.trim();

        // Om textfältet inte är tomt, lägg till den nya todo-uppgiften
        if (newTodoText !== '') {
            // Lägg till den nya todo-uppgiften på sidan (DOM)
            addTodoToDOM(newTodoText, false);

            // Spara den nya todo-uppgiften i Local Storage (med status att den inte är klar)
            saveTodoToLocalStorage(newTodoText, false);

            // Töm textfältet efter att todo-uppgiften har lagts till
            todoInput.value = '';  
        }
    };

    // Funktion för att lägga till en todo i DOM (på sidan)
    function addTodoToDOM(text, completed) {
        // Skapa ett nytt <li>-element som ska innehålla todo-objektet
        var li = document.createElement('li');

        // Skapa en checkbox för att markera todo-uppgiften som klar eller inte klar
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';  // Ange att input-typen är en checkbox
        checkbox.checked = completed;  // Sätt checkboxen som markerad om uppgiften är klar

        // Skapa ett <span>-element som ska innehålla texten för todo-uppgiften
        var span = document.createElement('span');
        span.textContent = text;  // Sätt texten i <span>-elementet till todo-texten

        // Om todo-uppgiften redan är klar, lägg till klassen 'completed' (för streck över texten)
        if (completed) {
            li.classList.add('completed');
        }

        // När checkboxen ändras (användaren klickar på den)
        checkbox.onchange = function() {
            // Växla klassen 'completed' för todo-uppgiften (för att lägga till/ta bort streck över texten)
            li.classList.toggle('completed');

            // Uppdatera Local Storage så att det reflekterar den nya statusen (klar/inte klar)
            updateTodoInLocalStorage(text, checkbox.checked);
        };

        // Lägg till checkboxen och texten (span) som barn till <li>-elementet
        li.appendChild(checkbox);
        li.appendChild(span);

        // Lägg till <li>-elementet i todo-listan (DOM)
        todoList.appendChild(li);
    }

    // Funktion för att spara en ny todo-uppgift i Local Storage
    function saveTodoToLocalStorage(text, completed) {
        // Hämta den nuvarande listan av todos från Local Storage (eller skapa en tom lista om ingen finns)
        var todos = JSON.parse(localStorage.getItem('todos')) || [];

        // Lägg till den nya todo-uppgiften till listan (med text och om den är klar)
        todos.push({ text: text, completed: completed });

        // Spara den uppdaterade listan i Local Storage
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Funktion för att uppdatera statusen (klar/inte klar) för en todo-uppgift i Local Storage
    function updateTodoInLocalStorage(text, completed) {
        // Hämta den nuvarande listan av todos från Local Storage
        var todos = JSON.parse(localStorage.getItem('todos')) || [];

        // Hitta den todo-uppgift som har samma text som den vi vill uppdatera
        var todo = todos.find(t => t.text === text);

        // Om vi hittar todo-uppgiften, uppdatera dess 'completed'-status
        if (todo) {
            todo.completed = completed;

            // Spara den uppdaterade listan i Local Storage
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }

    // Funktion för att tömma hela todo-listan (knappen för att rensa listan)
    clearListanBtn.onclick = function() {
        // Rensa alla todo-uppgifter från webbsidan (DOM)
        todoList.innerHTML = '';

        // Ta bort alla todo-uppgifter från Local Storage
        localStorage.removeItem('todos');
    };
}
