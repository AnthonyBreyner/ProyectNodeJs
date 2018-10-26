var mostar=document.querySelector('#mostar')

function traer(){
   const myHeaders = new Headers();
  myHeaders.append('authorization', `Bearer ${localStorage.token}`)
  fetch('/api/user', {
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
   
    mostrar.innerHTML+=`
      <tr>
        <td scope="row" class="id" style="display:none">${datos[i][j]._id}</td>
        <td scope="row">${j}</td>
        <td scope="row">${datos[i][j].signupDate}</td>
        <td scope="row" id="email"><input type="text" class="email" value="${datos[i][j].email}"></input></td>
        <td scope="row" id="address"><input type="text" class="address" value="${datos[i][j].address}" ></input></td>
        <td scope="row" id="mobile"><input type="text" class="mobile" value="${datos[i][j].mobile}" ></input></td>
        <td scope="row" id="password"><input type="text" class="password" value="${datos[i][j].password}"></input></td>
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
  /*
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
             headers: myHeaders,
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
            headers: myHeaders,
                success: function (response){
                    console.log(response);
                    alert("Elminado");
                    traer();
                }
        })
    })*/
}




