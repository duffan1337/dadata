var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
var token = "282d4740b459f7dcb85b0c96faa173c861e8e5ad";


//запрос на сервер
const getData=(query)=>{ 
    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: query})
    }
    

    fetch(url, options)
    .then(response => response.text())
    .then(result => mainShowFunction(result))   //вызов функции показа меню
    .catch(error => console.log("error", error));
    
}

function typeDescription(type) {
  let TYPES = {
    'INDIVIDUAL': 'Индивидуальный предприниматель',
    'LEGAL': 'Организация'
  }
  return TYPES[type];
}


 var input = document.getElementById("party")
 input.oninput = function() {
   
   getData(input.value)       //обновение значения из инпуте с последующим запросом на сервер
 };



 /* Когда пользователь нажимает на кнопку,
переключение между скрытием и отображением раскрывающегося содержимого */
party.onfocus=function() {
  document.getElementById("myDropdown").classList.toggle("show");
}

party.onblur=function(event) {
  if(event.target.id!=="party")
   document.getElementById("myDropdown").classList.remove("show");
 } 



const mainShowFunction=(data)=> {
  var objectData = eval('(' + data + ')');  //конвертация данных в объект
  console.log(objectData)
  var filter, ul, li, i;
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  li = document.getElementsByTagName("li");
  ul = document.getElementById("menu"); 
  let lengthOfArray= objectData.suggestions.length<5 ? objectData.suggestions.length : 5; //кол-во элементов выпадающего меню


  if(ul.children.length>0){                   //удаление неподходищих(старых элементов меню)
    while (ul.lastElementChild) {
      ul.removeChild(ul.lastElementChild);
    }
  }

  // добанвение нового элемента меню
  for (i = 0; i < lengthOfArray; i++) {
   let link = document.createElement('li')
   link.id=i.toString()
   link.classList.add('li-element')
   link.id = i.toString() 
   link.innerHTML= `<div>${objectData.suggestions[i].data.name.short_with_opf}</div>`
   link.innerHTML += `<span>${objectData.suggestions[i].data.inn} </span>`
   link.innerHTML += `<span>  ${objectData.suggestions[i].data.address.unrestricted_value}</span>`

   //обработчик на клик по элменту меню
   link.onclick = function() {
     //добавление типа организации
    let p = document.getElementById('type')
    p.innerHTML=typeDescription(objectData.suggestions[parseInt(link.id)].data.type)+` (${objectData.suggestions[parseInt(link.id)].data.type})`

    //добавление данных организации
    document.getElementById('name_short').value=objectData.suggestions[parseInt(link.id)].data.name.short_with_opf || ""
    document.getElementById('name_full').value=objectData.suggestions[parseInt(link.id)].data.name.full_with_opf || ""
    document.getElementById('inn_kpp').value=objectData.suggestions[parseInt(link.id)].data.inn + " / "+objectData.suggestions[i].data.kpp ||""
    document.getElementById('address').value=objectData.suggestions[parseInt(link.id)].data.address.unrestricted_value || ""

    //снятие фокуса
    document.getElementById("myDropdown").classList.remove("show");
   }

   ul.appendChild(link)
  }
}



