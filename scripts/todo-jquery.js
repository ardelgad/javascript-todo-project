// Happy coding!

// Asociar un event 'submit' al formulario. Vamos a añadir un hijo con toda la estrctura HTML necesaria

$('form').submit((e) => {
    e.preventDefault();

    // sabemos que se ha disparado el evento submit y podemos recoger el valor del input

    //utilixamos la clase FormData para pasarle el formulario
    const formData = new FormData(e.target);

    //Obtenemos un objeto que nos da un método .get para obtener el valor de un campo del formulario. 
    const value = formData.get('addTodo');

    console.log(`valor del input ${value}`);

    const newTodo = `
    <label class="list-item">
        <div class="list-item__container">
            <span>${value}</span>
        </div>
    <button class="button button-text">Remove</button>
    </label>
    `;

    // RETO: Usad Jquery para añadir este HTML como hijo de id="todos"
    // JQuery : mirar 'append'
    $("#todos").append(newTodo);

    // BONUS: Limpiadme el input donde hemos la tarea. Mirar método .val()
    //seleccionado por el atributo name
    $('[name="addTodo"]').val('');
})

// Todo lo que se cree dinámicamente en el contenedor id=todos; asóciale este evento
//burbujeame hasta el label, que es el contenedor de del todo doble clicado
$('#todos').on('dblclick', 'label', (e) => {
    // en e.currentTarget tenemos el contenedor del 'todo'
    const todo = e.currentTarget;

    //Desde este elemento del DOM buscame el 1er spam y cambiale la clase '.list-item__done'
    $(todo).find('div').toggleClass('list-item__done');
});

// Cada vez que se crea un todo, asociar el evento click al boton
$('#todos').on('click', 'span.button', (e) => {
    // Desde el botón pulsado, buscame su padre y elíminalo del DOM
    $(e.target).parent().remove();
})

//Gestionar 'Hide completed'
$('#hide-completed').change(e => {
    // acceder al valor del checkbox
    const mustHideCompleted = e.currentTarget.checked;
    console.log("debo ocultar?", mustHideCompleted);

    // Método JQuery que se llama 'filter'
    // Desde todos los elementos del DOM que tiene la clase .list-item; filtramos todos aquellos que cumplan la condición de la función de callback

    // Todos los .list-item que tengan un hijo del tipo de span y que tenga la clase list-item__done; ocúltamelos

    if (mustHideCompleted) {
        $('.list-item').filter(function (index, elem) {
            return $(elem).find("div").hasClass("list-item__done");
        }).hide();
    }

    // Reto: Cuando mustHideCompleted vale false , mostradme todos los todos (hay que eliminar )
   else{
    $('.list-item').show();
   }

/*  Es lo mismo pero si le pones localStorage luego cuando se cargue no estará oculto
   $('.list-item').filter(function (index, elem) {
    return $(elem).find("div").hasClass("list-item__done");
}).toggle(); */
})

$('#filter-todo').keyup(e => {
    const testToFilter = e.target.value;

    const textToFilter = e.target.value;

    // Utilizamos el find de JQuery para mostrar .show() todo los elementos .list-item que cumplan con la condición que el texto de su <span> sea una subcadena (includes) del texto de 'textToFilter'

    // PISTA: usar el método .text() que da el contenido textual de un nodo y luego usar el includes

    $('.list-item').filter(function (index, elem) {
        return $(elem).text().includes(textToFilter);
    }).show();

       // Utilizamos el find de JQuery para ocultar .hide() todo los elementos .list-item que NO cumplan con la condición que el texto de su <span> sea una subcadena (includes) del texto de 'textToFilter' 
    
    $('.list-item').filter(function (index, elem) {
        return !$(elem).text().includes(textToFilter);
    }).hide();
})