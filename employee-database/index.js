(async function () {
  const response = await fetch("./data.json");
  const data = await response.json();
  let employees = data;
  let employeeList = document.createElement("ul");
  let employeeDetail = document.querySelector(".employee_details--container");
  let emptitle = document.querySelector(".employee_name--title");
  let selectedId = employees[0].id;
  let selectedEmployee = employees[0];

  let addEmployeeBtn = document.querySelector(".add-employee");
  let modal = document.querySelector(".modal");
  const modalForm = document.querySelector(".modal-body");
  const form = document.getElementById("form");
  let modalBtn = document.querySelector(".modal_button");

  addEmployeeBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  modal.addEventListener("click", (e) => {
    if (e.target.className === "modal") modal.style.display = "none";
  });

  document.querySelector(".dob").max = `${
    new Date().getFullYear() - 18
  }-${new Date().toISOString().slice(5, 10)}`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(modalForm);
    const formObj = {};
    formData.forEach((value, key) => {
      formObj[key] = value;
    });
    let age = new Date().getFullYear() - parseInt(formObj.dob.slice(0, 4), 10);
    let gid = parseInt(Math.random() * 10000);
    formObj["id"] = gid;
    formObj["age"] = age;

    formObj["image"] = "https://via.placeholder.com/150";
    employees.push(formObj);
    modal.style.display = "none";
    renderEmployee();
    form.reset();
  });

  function renderEmployee() {
    employeeList.innerHTML = "";
    employees.forEach((item) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `
        <span class="employee-name">${item.name}</span>
        <button class="remove-button">Remove</button>
      `;
      listItem.setAttribute("id", `${item.id}`);
      listItem.classList.add("each_employee");
      employeeList.appendChild(listItem);

      if (selectedId === item.id) {
        listItem.classList.add("selected");
        selectedEmployee = item;
        viewEmployeeDetail(selectedEmployee);
      } else {
        listItem.classList.remove("selected");
      }
    });
    emptitle.appendChild(employeeList);
  }

  function viewEmployeeDetail(emp) {
    employeeDetail.innerHTML = ` <img
        src=${emp.image}
        alt="imp-image"
        class="employee-image"
      />
      <span class="employee__details">${emp.name}</span>
      <span class="employee__details">${emp.contact_number}</span>
      <span class="employee__details">${emp.dob}</span>
      <span class="employee__details">${emp.email}</span>
      <span class="employee__details">${emp.salary}</span>`;
  }

  function removeEmployee(id) {
    employees = employees.filter((item, ind) => {
      if (selectedId === parseInt(id)) {
        selectedId = employees[ind + 1].id;
      }
      return item.id !== parseInt(id);
    });
    renderEmployee();
  }

  employeeList.addEventListener("click", (event) => {
    let id = parseInt(event.target.id);
    if (event.target.tagName === "LI" && id !== selectedId) {
      selectedId = id;
      renderEmployee();
    }
    if (event.target.tagName === "BUTTON") {
      const listItem = event.target.closest("li");
      // console.log(event.target.parentNode.id, event.target.parentElement.id);
      if (listItem) {
        removeEmployee(listItem.id);
      }
    }
  });

  renderEmployee();
})();
