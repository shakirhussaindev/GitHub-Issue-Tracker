const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const cardsContainer = document.getElementById("cards");

// 1. Data Store
let allIssues = [];

// 8. Loading spinner
const spinnerShow = (status)=>{
  const spinner = document.getElementById("spinner")
  if(status === true){
    spinner.classList.remove('hidden')
  }else{
    spinner.classList.add("hidden");
  }
}

// 2. Data fetch

  spinnerShow(true)
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
   .then((res) => res.json())
    .then((json) => {
      allIssues = json.data;
      displayCards(allIssues);
    });


function getLabelsHTML(labels) {
  return labels
    .map((lbl) => {
      let icon = "";
      let style = "";

      if (lbl === "bug") {
        icon = "./assets/BugDroid.png";
        style = "bg-red-100 text-red-600 border border-red-200";
      } else if (lbl === "help wanted") {
        icon = "./assets/Lifebuoy.png";
        style = "bg-yellow-100 text-yellow-600 border border-yellow-200";
      } else if (lbl === "enhancement") {
        icon = "./assets/enhancement.png";
        style = "bg-green-100 text-green-600 border border-green-200";
      } else if (lbl === "documentation") {
        style = "bg-[#9bb7ff56] text-[#6d96fc] border border-[#9bb7ff91]";
        icon = "./assets/doc.png";
      } else if (lbl === "good first issue") {
        style = "bg-[#fdad0052] text-[#fd8700] border border-[#fdad0073]";
      }

      return `
      <span class="text-xs px-2 py-1 rounded-full flex items-center gap-1 ${style}">
        ${icon ? `<img src="${icon}" class="w-3 h-3">` : ""}
        ${lbl}
      </span>
    `;
    })
    .join("");
}



// 3. Making cards and showing data in the cards
const displayCards = (data) => {
  cardsContainer.innerHTML = "";
  spinnerShow(true)

  data.forEach((data) => {
    const card = document.createElement("div");

    card.innerHTML = `
     <div  class="bg-white rounded-lg shadow border-t-4 ${data.status === "open" ? "border-green-500" : "border-purple-500"}">
          <div class="p-5">
            <div class="flex justify-between items-center mb-3">
              <div>
                <img src="${data.status === "open" ? "../assets/Status-open.png" : "../assets/Status-closed.png"}" alt="">
              </div>
              <span class="px-3 py-1 text-sm rounded-full ${
                data.priority === "high"
                  ? "bg-red-100 text-red-600"
                  : data.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-200 text-gray-600"
              }"> ${data.priority}</span>
            </div>

            <h3 class="font-semibold text-gray-800 mb-2">
              ${data.title}
            </h3>

            <p class="text-sm text-gray-500 mb-4">
              ${data.description}
            </p>

            <div class="flex gap-2">
              ${getLabelsHTML(data.labels)}
              
            </div>
          </div>

          <div class="border-t px-5 py-3 text-xs text-gray-500">#${data.id} by <span class="font-semibold">${data.author}</span>
          <br/>
            ${data.createdAt}
          </div>
        </div> `;
    // Modal show
    card.addEventListener("click", () => showModal(data));
    cardsContainer.append(card);
  });
  spinnerShow(false)
};

// 4. Button Active
const activeBtn = (id) => {
  const button = [allBtn, openBtn, closeBtn];
  button.forEach((btn) => {
    if (btn === id) {
      btn.classList.remove("btn-soft");
      btn.classList.add("btn-primary");
    } else {
      btn.classList.add("btn-soft");
      btn.classList.remove("btn-primary");
    }
  });
};

// 5. Issues filtered
const filteredIssue = (status) => {
  let issues = document.getElementById("issues");

  if (status === "all") {
    displayCards(allIssues);
    issues.innerText = `${allIssues.length} issues`;
  } else {
    const filtered = allIssues.filter((i) => i.status === status);
    displayCards(filtered);

    issues.innerText = `${filtered.length < 10 ? "0" + filtered.length : filtered.length} issues`;
  }
};

// 6. Modal create
const showModal = (data) => {
  const modal = document.createElement("div");
  modal.className = `z-50 fixed inset-0 bg-black/20 flex justify-center items-center shadow `;
  let statusData = data.status === "open" ? data.status + "ed" : data.status;
  modal.innerHTML = `
  <div class="bg-white rounded-lg p-6 w-4/14">
        <h2 class="text-lg font-semibold">${data.title}</h2>
        <div class="py-3 flex gap-3">
        <span class="py-0.5 px-2 rounded-lg ${data.status === "open" ? "text-green-500 bg-green-500/20" : "text-purple-500 bg-purple-500/20"}">${statusData}
        </span>
        <span> • </span>
        <span class="text-gray-500">${statusData} by <span class="font-semibold"> ${data.author}</span></span>
        <span> • </span>
       <span class="text-gray-500"> ${new Date(data.createdAt).toLocaleDateString()}</span>
        </div>
        <div class="flex gap-2 pb-3">
              ${getLabelsHTML(data.labels)}
            </div>
          <p class="text-gray-500 pb-3">${data.description}</p>  
          <div class="bg-gray-100 rounded-lg p-6 flex justify-between items-center mb-3">
        <div>
          <p class="text-gray-500">Assignee:</p>
          <p class="text-gray-500 font-semibold">${data.author}</p>
        </div>
        <div>
        <p class="text-gray-500">Priority:</p>
          <span class="px-3 py-1 text-sm rounded-full ${
            data.priority === "high"
              ? "bg-red-100 text-red-600"
              : data.priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-200 text-gray-600"
          }"> ${data.priority}</span>
          </div>

          
          </div>
         <div class="flex justify-end"><button id="closeModal" class="btn btn-primary">Close</button></div>
      </div>
  `;
  document.body.appendChild(modal);

  // Modal remove
   document.getElementById("closeModal").onclick = (e) => modal.remove();

};

// 7. Search issue
  document.getElementById("search-btn").addEventListener("click", () => {
    const searchInput = document.getElementById("searchInput");
    const searchValue = searchInput.value.trim().toLowerCase();
    const filtered = allIssues.filter(
      (i) =>
        i.title.toLowerCase().includes(searchValue) ||
        i.description.toLowerCase().includes(searchValue)
    );
    displayCards(filtered)
   });
