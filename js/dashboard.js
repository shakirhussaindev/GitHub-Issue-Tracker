fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => res.json())
  .then((json) => {
    json.data.forEach((element) => {
      const cards = document.getElementById("cards");
      const card = document.createElement("div");
      const borderColor =
        element.status === "open" ? "border-green-500" : "border-purple-500";
      const imgStatus =
        element.status === "open"
          ? "../assets/Status-open.png"
          : "../assets/Status-closed.png";
      card.innerHTML = `
  <div  class="bg-white rounded-lg shadow border-t-4 ${borderColor}">
          <div class="p-5">
            <div class="flex justify-between items-center mb-3">
              <div>
                <img src="${imgStatus}" alt="">
              </div>
              <span class="px-3 py-1 text-xs rounded-full ${
                element.priority === "high"
                  ? "bg-red-100 text-red-600"
                  : element.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-200 text-gray-600"
              }"> ${element.priority}</span>
            </div>

            <h3 class="font-semibold text-gray-800 mb-2">
              ${element.title}
            </h3>

            <p class="text-sm text-gray-500 mb-4">
              ${element.description}
            </p>

            <div class="flex gap-2">
              <span
                class="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full flex items-center gap-0.5"
                ><img src="./assets/BugDroid.png" alt=""> BUG</span
              >
              <span
                class="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full flex items-center gap-0.5"
                ><img src="./assets/Lifebuoy.png" alt=""> HELP WANTED</span
              >
            </div>
          </div>

          <div class="border-t px-5 py-3 text-xs text-gray-500">
            #1 by john_doe <br />
            1/15/2024
          </div>
        </div>
  `;
      cards.appendChild(card);
    });
  });

//   allTab();
//   const allTab = () => {

// };

const allBtn = (document.getElementById("allBtn").onclick = (e) => {});
const openBtn = (document.getElementById("openBtn").onclick = (e) => {});
const closeBtn = (document.getElementById("closeBtn").onclick = (e) => {});
