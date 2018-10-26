var mostar=document.querySelector('#mostar')

function traer(){
  const myHeaders = new Headers();
  myHeaders.append('authorization', `Bearer ${localStorage.token}`)
  alert(myHeaders)
  fetch('/api/hour', {
    method: 'GET',
    headers: myHeaders
  })
    .then(res => res.json())
    .then(datos => {
       //console.log(datos)
       tabla(datos)
    })
}

function tabla(datos){
  console.log(datos)
  mostrar.innerHTML = ''
  for(let i in datos){
    for(let j in datos[i]){
    if(datos[i][j].horapref == 1) {var pref="success";} else {pref="danger";}
   
    mostrar.innerHTML+=`
      <tr class="${pref}">
        <td scope="row" class="id" style="display:none">${datos[i][j]._id}</td>
        <td scope="row">${j}</td>
        <td scope="row">${datos[i][j].currenttime}</td>
        <td scope="row" id="entrytime"><input type="text" class="entrytime" value="${datos[i][j].entrytime}"></input></td>
        <td scope="row" id="currenttime"><input type="text" class="departuretime" value="${datos[i][j].departuretime}" ></input></td>
        <td scope="row" id="resultado">h</td>
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

 $('table').on('click', '.edit-row', function(e){
        $('.description').prop('disabled', false); 

        let row =$(this).closest('tr');
        let id = row.find('.id').text();
        let entrytime = row.find('.entrytime').val();
        let departuretime = row.find('.departuretime').val();
        let description=row.find('.description').val();
        $.ajax({
            url:'/api/hour/' + id, 
            method: 'PUT',
             beforeSend: function ( xhr ) {
                xhr.setRequestHeader('authorization', `Bearer `+ localStorage.token);
                },
            data:{
                entrytime:entrytime,
                departuretime:departuretime,
                description:description
            },
                success: function (response){
                    console.log(response);
                }
        })
    })

 $('table').on('click', '.delete-row', function(e){
        let row =$(this).closest('tr');
        let id = row.find('.id').text();
        $.ajax({
            url:'/api/hour/' + id, 
            method: 'delete',
            beforeSend: function ( xhr ) {
                xhr.setRequestHeader('authorization', `Bearer `+ localStorage.token);
                },
                success: function (response){
                    console.log(response);
                    alert("Elminado");
                    traer();
                }
        })
    })




