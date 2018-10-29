var mostar = document.querySelector('#mostar')

function traer() {
    /*const myHeaders = new Headers();
    alert(localStorage.userid);
    myHeaders.append('authorization', `Bearer ${localStorage.token}`)
        fetch('/api/houruser', {
            method: 'POST',
            data: {
                userid: localStorage.userid
            },
            headers: myHeaders
        })
        .then(res => res.json())
        .then(datos => {
            console.log(localStorage.userid)
            //console.log(datos)
            tabla(datos)
        })*/
    $.ajax({
        url: '/api/houruser',
        method: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('authorization', `Bearer ` + localStorage.token);
        },
        data: {
            userid: localStorage.userid
        },
        success: function(datos) {
            tabla(datos)
        }
    })
}

function tabla(datos) {
    console.log(datos)
    mostrar.innerHTML = ''
    for (let i in datos) {
        for (let j in datos[i]) {
            if (datos[i][j].horapref == 1) {
                var pref = "success";
            } else {
                pref = "danger";
            }
            //Hora entradra
            if ((datos[i][j].entrytime.substr(6, 2) == "PM") || (datos[i][j].entrytime.substr(5, 2) == "PM")) {
                var horafinal = datos[i][j].entrytime.substr(0, 2);
                var suma1 = parseInt(horafinal) + 12;
                if (horafinal.substr(1, 1) == ":") {
                    horafinal = horafinal.substr(0, 1);
                    suma1 = parseInt(horafinal) + 12;
                }
            } else {
                horafinal = datos[i][j].entrytime.substr(0, 2);
                suma1 = horafinal;
                if (horafinal.substr(1, 1) == ":") {
                    suma1 = horafinal.substr(0, 1);
                }
            }
            var mints = datos[i][j].entrytime.substr(2, 2)
            if (mints.substr(0, 1) == ":") {
                mints = datos[i][j].entrytime.substr(3, 2)
            }
            //Fin hora entrada
            //Hora Salida   
            if ((datos[i][j].departuretime.substr(6, 2) == "PM") || (datos[i][j].departuretime.substr(5, 2) == "PM")) {
                var horafinal = datos[i][j].departuretime.substr(0, 2);
                var suma2 = parseInt(horafinal) + 12;
                if (horafinal.substr(1, 1) == ":") {
                    horafinal = horafinal.substr(0, 1);
                    suma2 = parseInt(horafinal) + 12;
                }
            } else {
                horafinal = datos[i][j].departuretime.substr(0, 2);
                suma2 = horafinal;
                if (horafinal.substr(1, 1) == ":") {
                    suma2 = horafinal.substr(0, 1);
                }
            }
            var mintsf = datos[i][j].departuretime.substr(2, 2)
            if (mintsf.substr(0, 1) == ":") {
                mintsf = datos[i][j].departuretime.substr(3, 2)
            }
            //Fin Hora salida
            var sumatorioHorario = new Horario(suma1 + ":" + mints, suma2 + ":" + mintsf);
            var sumatorio = sumatorioHorario.sumatorioHorario();
            var horastra = sumatorio.substr(0, 2);

            mostrar.innerHTML += `
      <tr class="${pref}">
        <td scope="row" class="id" style="display:none">${datos[i][j]._id}</td>
        <td scope="row">${j}</td>
        <td scope="row">${datos[i][j].currenttime}</td>
        <td scope="row" id="entrytime"><input type="text" class="entrytime" value="${datos[i][j].entrytime}"></input></td>
        <td scope="row" id="currenttime"><input type="text" class="departuretime" value="${datos[i][j].departuretime}" ></input></td>
        <td scope="row" id="resultado">${horastra}h</td>
        <td scope="row" ><input type="text" class="description" value="${datos[i][j].description}"></input></td>
        <td>
        <a class="edit-row">
        Edit
        </a></td>
        <td>
        <a href="#" class="delete-row">
        Delete
        </a></td>
      </tr>
    `
        }
    }
}
$('table').on('click', '.edit-row', function(e) {
    $('.description').prop('disabled', false);
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    let entrytime = row.find('.entrytime').val();
    let departuretime = row.find('.departuretime').val();
    let description = row.find('.description').val();
    $.ajax({
        url: '/api/hour/' + id,
        method: 'PUT',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('authorization', `Bearer ` + localStorage.token);
        },
        data: {
            entrytime: entrytime,
            departuretime: departuretime,
            description: description
        },
        success: function(response) {
            console.log(response);
        }
    })
})
$('table').on('click', '.delete-row', function(e) {
    let row = $(this).closest('tr');
    let id = row.find('.id').text();
    $.ajax({
        url: '/api/hour/' + id,
        method: 'delete',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('authorization', `Bearer ` + localStorage.token);
        },
        success: function(response) {
            console.log(response);
            alert("Elminado");
            traer();
        }
    })
})