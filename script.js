const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

const apiUrl = 'https://rickandmortyapi.com/api/location';
let currentPage = 1;
const pageSize = 10;
let locationData;

async function fetchData(page) {
  try {
    const response = await fetch(`${apiUrl}?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    locationData = await response.json();
    if (locationData.results && locationData.results.length > 0) {
      displayLocations(locationData.results);
      createPaginationControls(locationData.info.pages);
    } else {
      throw new Error('Empty or invalid data returned from the API');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Error fetching data');
  }
}

window.addEventListener("load", () => {
  fetchData(currentPage);
});

let searchButton = document.getElementById("buttoned");
searchButton.onclick = function() {
  search(locationData.results);
};

function search(data) {
  let inputName = document.getElementById("searchbar").value;
  let locationDisplayArea = document.querySelector(".locationDisplayArea");
  locationDisplayArea.innerHTML = '';
  for (let j = 0; j < data.length; j++) {
    if (inputName == data[j].name) {
      creation([data[j]]);
      break;
    }
  }
}

function displayLocations(data) {
  let locationDisplayArea = document.querySelector(".locationDisplayArea");
  locationDisplayArea.innerHTML = '';
  creation(data);
}

function createPaginationControls(totalPages) {
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      fetchData(currentPage);
    });
    paginationContainer.appendChild(pageButton);
  }
}

function creation(data) {
  let locationDisplayArea = document.querySelector(".locationDisplayArea");
  for (let i = 0; i < data.length; i++) {
    let locationDiv = document.createElement("div");
    
    let locationName = document.createElement("h2");
    let locationType = document.createElement("p");
    let locationDimension = document.createElement("p");
    

    
    locationName.textContent = data[i].name;
    locationType.textContent = `TYPE: ${data[i].type}`;
    locationDimension.textContent = `DIMENSION: ${data[i].dimension}`;
    

    
    locationDiv.appendChild(locationName);
    locationDiv.appendChild(locationType);
    locationDiv.appendChild(locationDimension);
    

    locationDisplayArea.appendChild(locationDiv);

    locationDiv.classList.add("locationDivTag");
    
    locationName.classList.add("locationNameTag");
    locationType.classList.add("locationPTag");
    locationDimension.classList.add("locationPTag");
    
  }
}
