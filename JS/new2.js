
//  function debounce
 
function debounce(func,delay=3000){
  let timer;
  return (args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this,args);
    }, delay);
  };
}

let debounceTimer;
function search() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    let searchQuery = document.getElementById("srch").value;
    window.parent.location = `index.html?q=${searchQuery}`;
  }, 3000);
}

function reset(){
  window.location.href = 'index.html';
}

function checkbox(){
  var dict = {}
  var markedCheckBox = document.querySelectorAll('input[type="checkbox"]:checked.filter');
  for (let i=0;i<markedCheckBox.length;i+=1){
    if (!(markedCheckBox[i].name in dict)){
      dict[markedCheckBox[i].name] = [];
      dict[markedCheckBox[i].name].push(markedCheckBox[i].id)
    }
    else if (markedCheckBox[i].name in dict){
      dict[markedCheckBox[i].name].push(markedCheckBox[i].id);
    }
  }
  var keys = Object.keys(dict) || [];
  var facetQuery = [];
  for (let i = 0; i<keys.length; i += 1){
    for (let j = 0;j < dict[keys[i]].length;j += 1){
      var stri = "";
          stri += (keys[i]);
          stri += ":\\";
          stri +='"';
          stri += (dict[keys[i]][j]);
          stri += "\\";
          stri += '"';
          facetQuery.push(String(stri))
    
    }
  }
  window.location.href = `index.html?facets=${facetQuery}`
}


const check = debounce(() => checkbox());
function prev(){
  const queryString = new URL(window.location.href)
  pageNumber = queryString.searchParams.get('page')
  queryString.searchParams.delete('page')
          if (pageNumber != null){
            queryString.searchParams.delete('page')
            var pageValue = parseInt(pageNumber) - 1
            queryString.searchParams.append('page',pageValue.toString())
            window.location.href = queryString
          }
}
//pagination to go to next page
function next(){
  const queryString = new URL(window.location.href)
          pageNumber = queryString.searchParams.get('page')
          if(pageNumber==null){
            pageValue=2  
            queryString.searchParams.append('page',pageValue.toString())
            window.location.href = queryString
            }
          else if(!(pageNumber == null)){
            queryString.searchParams.delete('page')
            var pageValue = parseInt(pageNumber) + 1
            queryString.searchParams.append('page',pageValue.toString())
            window.location.href=queryString
          }
        }

window.onload = function()
{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let prod_query = urlParams.get('q');
  let facets = urlParams.get('facets');
  let pageNo = urlParams.get('page');
  let decoded = decodeURIComponent(facets);
  let count = urlParams.get('count');
    if (count === null){
      count = 20;
    }
  const facetArray = decoded.split(",")
    const decodedFacetArray = [];
    function safeTraverse(obj, paths = []) {
      let val = obj;
      let idx = 0;
  
      while (idx < paths.length) {
          if (!val) {
              return null;
          }
          val = val[paths[idx]];
          idx++;
      }
      return val === 0 ? '0' : val;
    }
    for (let i = 0;i < facetArray.length;i += 1){
      let newq = facetArray[i].replaceAll('\\\"','\"');
      decodedFacetArray.push(newq)
    }
    if (decodedFacetArray[0] === "null"){
      decodedFacetArray.pop()
    }
   
var myHeaders=new Headers();
myHeaders.append("Accept", "*/*");
myHeaders.append("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "ajs_user_id=sivanv@unbxd.com; _ga=GA1.2.44711214.1628009891; fs_cid=1.0; fs_uid=#BCTWS#5827173059792896:5552003249360896:::#89e388a9#/1687244231; intercom-device-id-uksd1f47=65dacc19-cc8f-4a38-9280-d7f1930483b8; ajs_user_id=sivanv@unbxd.com; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; _gid=GA1.2.1181530657.1679289145; _un_sso_uid=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJleHBpcnkiOiIyMDIzLTAzLTI4IDA0OjE4OjMwIFVUQyIsImVtYWlsIjoic2l2YW52QHVuYnhkLmNvbSIsInJlZ2lvbnMiOnsidXMiOnsicmVmX3VzZXJfaWQiOjcwMjUxfSwic2ciOnsicmVmX3VzZXJfaWQiOjM4OX0sInVrIjp7InJlZl91c2VyX2lkIjoyNTl9LCJhdSI6eyJyZWZfdXNlcl9pZCI6MjYyfSwidXNfZ2NwIjp7InJlZl91c2VyX2lkIjoyNjZ9fX0.HjcmYCYF2_Jni6WGoGkMqdirdsjGZI15EiDlCNJRp50; _un_csrf=eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpdmFudkB1bmJ4ZC5jb20iLCJleHBpcnkiOiIyMDIzLTAzLTMxIDA0OjE4OjMwIFVUQyIsInVzZXJfaWQiOiI1ZDA5ZGUyOWIxZDI1MDAwMjNiOTc1MmIiLCJ0aW1lc3RhbXAiOiIyMDIzLTAzLTIxVDA0OjE4OjMwLjc4OVoifQ.afdTOWa8_r12If2N-9ZkK7Wd0ydjQRvm0vM280rMN_w; mp_4d8b093383efd0132a7afde806127f49_mixpanel=%7B%22distinct_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22%24device_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22mp_lib%22%3A%20%22Segment%3A%20web%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; connect.sid=s%3ArfsVqhM8NaF8eDe-O0xZ-GCC-BxSNgO7.AeW2wRDrJUNK891rbKv15DAcFiiWaXHoqv5O0fWxj80; ajs_group_id=8542a739d0b398ee28a5b32c351e45e1; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; intercom-session-uksd1f47=TkJHUVZxN3pPMVJySWk4RGtkWHhZcXltNFd5Y0JkRHhFMngwYUJrdGd1N2FjRngrUURPbEthanQ1MmpGdWMweC0takNYY29GaHhrd0lidTRsUWNEU3NXUT09--831f39c58176f7b8a7d643f6e9eb71ccc544b2a6; JSESSIONID=o5s6-GZRx9jj4DTZ430OHTjfwx3OftI7RsDWLOyh");
myHeaders.append("Origin", "https://pim.unbxd.io");
myHeaders.append("Referer", "https://pim.unbxd.io/catalogueView/");
myHeaders.append("Sec-Fetch-Dest", "empty");
myHeaders.append("Sec-Fetch-Mode", "cors");
myHeaders.append("Sec-Fetch-Site", "same-origin");
myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
myHeaders.append("X-Requested-With", "XMLHttpRequest");
myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"");
myHeaders.append("sec-ch-ua-mobile", "?0");
myHeaders.append("sec-ch-ua-platform", "\"macOS\"");


var raw = JSON.stringify({
  "page": pageNo,
  "count":20,
  "facet_filters": decodedFacetArray,
  "search_str": prod_query
});
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };


                                
const defaultImageUrl = 'default image.png';
// Get the prodcard container element
const prodcardContainer = document.getElementById("prodcard-container");


// // Display blank cards with loading GIF until the API fetches the data
// let prodcard = document.getElementById("forma");
// for (let i = 0; i < 10; i++) {
//   prodcard.innerHTML += `
//   <div class="card">
//     <img class="card-img-top" src="loading.gif" alt="Loading...">
//     <div class="card-body">
//       <h4 class="card-title">Loading...</h4>
//       <p>UniqueId: </p>
//       <a href="#" class="btn btn-dark btn-see-details" disabled>See Details</a>
//     </div>
//   </div>
// `;
// }
// Get the prodcard container element
;

// Create a new div element for the prodcard
const prodcard = document.createElement("div");
prodcard.className = "prodcard";

// Set the innerHTML of the prodcard
for (let i = 0; i < 10; i++) {
prodcard.innerHTML += `
  <div class="card">
    <img class="card-img-top" src="loading.gif" alt="Loading...">
    <div class="card-body">
      <h4 class="card-title">Loading...</h4>
      <p>UniqueId: </p>
      <a href="#" class="btn btn-dark btn-see-details" disabled>See Details</a>
    </div>
  </div>
`;
}
// Append the prodcard to the prodcard container
prodcardContainer.appendChild(prodcard);
fetch("https://pim.unbxd.io/peppercorn/api/v2/catalogueView/6391b1448f93e67002742cef", requestOptions)
  .then(response => {
    response.json().then(data => {
      let products = data["response"]["products"];
      
      prodcard.innerHTML = ''; // Clear the blank cards

      for (let i = 0; i < products.length; i++) {
        prodcard.innerHTML += `<div class="card">
                                  <img class="card-img-top" src="loading.gif" alt="Loading...">
                                  <div class="card-body">
                                    <h4 class="card-title">${products[i]["productName"]}</h4>
                                    <p>UniqueId: ${products[i]["uniqueId"]}</p>
                                    <a href="pdp.html?ProductId=${products[i]["uniqueId"]}" class="btn btn-dark btn-see-details">See Details</a>
                                  </div>
                                </div>`;
                                
        if (products[i]["productImage"] === undefined) {
          document.querySelectorAll('.card-img-top')[i].setAttribute('src', defaultImageUrl);
        } else {
          const img = new Image();
          img.onload = function() {
            document.querySelectorAll('.card-img-top')[i].setAttribute('src', this.src);
          };
          img.onerror = function() {
            document.querySelectorAll('.card-img-top')[i].setAttribute('src', defaultImageUrl);
          };
          img.src = products[i]["productImage"];
        }
      }
    
// const PAGE_SIZE = 20;
// let currentPage = 1;
// let totalProducts = 0;
// let totalPages = 0;


// const defaultImageUrl = 'default image.png';

// function updateProductCards(products) {
//   let prodcard = document.getElementById("forma");
//   prodcard.innerHTML = ''; // Clear the card container

//   for (let i = 0; i < products.length; i++) {
//     prodcard.innerHTML += `<div class="card">
//                               <img class="card-img-top" src="loading.gif" alt="Loading...">
//                               <div class="card-body">
//                                 <h4 class="card-title">${products[i]["productName"]}</h4>
//                                 <p>UniqueId: ${products[i]["uniqueId"]}</p>
//                                 <a href="pdp.html?ProductId=${products[i]["uniqueId"]}" class="btn btn-dark btn-see-details">See Details</a>
//                               </div>
//                             </div>`;

//     if (products[i]["productImage"] === undefined) {
//       document.querySelectorAll('.card-img-top')[i].setAttribute('src', defaultImageUrl);
//     } else {
//       const img = new Image();
//       img.onload = function() {
//         document.querySelectorAll('.card-img-top')[i].setAttribute('src', this.src);
//       };
//       img.onerror = function() {
//         document.querySelectorAll('.card-img-top')[i].setAttribute('src', defaultImageUrl);
//       };
//       img.src = products[i]["productImage"];
//     }
//   }
// }

// function fetchProducts() {
//   let raw = JSON.stringify({
//     "page": currentPage,
//     "count": PAGE_SIZE,
//     "facet_filters": decodedFacetArray,
//     "search_str": prod_query
//   });

//   let requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   fetch("https://pim.unbxd.io/peppercorn/api/v2/catalogueView/6391b1448f93e67002742cef", requestOptions)
//     .then(response => {
//       response.json().then(data => {
//         let products = data["response"]["products"];
//         totalProducts = data["response"]["numberOfProducts"];
//         totalPages = Math.ceil(totalProducts / PAGE_SIZE);
//         updateProductCards(products);
//       });
//     })
//     // .catch(error => console.log('error', error));
// }

// function handleNextButtonClick() {
//   if (currentPage < totalPages) {
//     currentPage++;
//     fetchProducts();
//   }
// }

// function handlePrevButtonClick() {
//   if (currentPage > 1) {
//     currentPage--;
//     fetchProducts();
//   } else {
//     window.location.href = 'home.html';
//   }
// }

// document.getElementById('next-btn').addEventListener('click', handleNextButtonClick);
// document.getElementById('prev-btn').addEventListener('click', handlePrevButtonClick);

// Fetch products for the first time
// // fetchProducts()
// filters = data["response"]["facets"]
// for (let fieldId in filters) {
//              const displayName = filters[fieldId].displayName;
//              const values = filters[fieldId].values;
              sideBar = document.getElementsByClassName('sidebar')[0];
              console.log(data);
              facets = data["facets"] || "NULL";
              console.log(facets);
              keys = Object.keys(facets) || "NULL";
              console.log(keys);
              sideBar.innerHTML += '<hr class="horizontalbreak1">'
              for (ind in keys) {
                var fieldName = document.createElement("div");
        
                fieldName.innerHTML += `
                <p class="p"><b>${facets[keys[ind]]["displayName"]}</b></p>
                <form id = "category">
                `
                for (let ind2 = 0; ind2 < facets[keys[ind]]["values"].length; ind2 += 2) {
        
                    fieldName.innerHTML += `
                        <input type="checkbox" class="filter" name="`+facets[keys[ind]]["fieldId"]+`" id="`+facets[keys[ind]]["values"][ind2]+`" onchange=check()>
                        <label for="categorylabel"> ${facets[keys[ind]]["values"][ind2]}(${(facets[keys[ind]]["values"][ind2+1])})</label><br>
                    `
                }
                fieldName.innerHTML += '<hr class="horizontalbreak1">';
                fieldName.innerHTML += "</form>";
                sideBar.appendChild(fieldName);
              }
            // }
            numberOfProd=safeTraverse(data,["response","numberOfProducts"])
            console.log(numberOfProd);
            pagi = document.getElementsByClassName('pagi')[0];
            if(Number.isInteger(numberOfProd/count)===true){
              dataPages = Math.trunc((numberOfProd/count))
            }
            else{
              dataPages = Math.trunc((numberOfProd/count))+1
            }
            if (numberOfProd !== 0){
            pagi.innerHTML += `<button id="prev" class="btn btn-light prev" type="text" onclick=prev()>Prev</button>
            <div id="paginfo">
            Page `+pageNo+` Of `+dataPages+`
            </div>
            <button id="next" class="btn btn-light next" tyoe="text" onclick=next()>Next</button>`;
            if (pageNo == 1){
              document.getElementById('prev').disabled = true;
            }
            if (pageNo == dataPages){
              document.getElementById('next').disabled = true;
            }
            }
    if (decodedFacetArray.length > 0 || search_query.length > 0) {
  // If decodedFacetArray has elements or search_query is not an empty string, mark the checkboxes
  if (decodedFacetArray.length > 0 && decodedFacetArray[0] !== "") {
    var markedCheckBox1 = document.querySelectorAll('input[type="checkbox"].filter');
    for (var checked of markedCheckBox1) {
      checked.checked = true;
    }
  }

  // When Home is clicked, go back to the previous page
  document.getElementById("Home").addEventListener("click", function(event) {
    event.preventDefault();  // Prevent the default action of the link
    history.back();  // Go back to the previous page
  });
}
else {
  // If decodedFacetArray has no elements and search_query is an empty string, disable the Home button
  document.getElementById("Home").disabled = true;
}


    });

  })
}