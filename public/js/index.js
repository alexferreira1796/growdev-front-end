const base = "https://app-growdev-teste.herokuapp.com";

window.addEventListener("load", () => {
  const api = axios.create({
    baseURL: base,
  });
  const id = location.search.slice(1).split("=")[1];

  // Listando todos os usuarios
  const element = document.querySelector(".list-users ul");
  if (element) {
    api
      .get("/users")
      .then((res) => res.data.data)
      .then((json) => createList(json))
      .catch((error) => {
        console.log(error.message);
      });
  }

  // Manipulando usuario
  const form = document.getElementById("form");
  if (form) {
    const h3 = form.querySelector("h3");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const type = document.querySelector(".type").value;
      // Cadastrando POST
      if (type === "cadastrar") {
        const objSaved = savedUser();
        if (objSaved) {
          h3.innerText = "Aguarde...";
          h3.classList.add("success");
          api
            .post("/user", objSaved)
            .then((res) => {
              if (res.status === 201) {
                return res.data.data;
              }
            })
            .then(() => {
              h3.innerText = "Usuário criado com sucesso!";
              h3.classList.remove("error");
              h3.classList.add("success");
            })
            .catch((error) => {
              const { msg } = error.response.data;
              h3.innerText = msg;
              h3.classList.remove("success");
              h3.classList.add("error");
            });
        }
      } else {
        // Editando PUT
        const objSaved = savedUser();
        if (objSaved) {
          h3.innerText = "Aguarde...";
          h3.classList.add("success");
          api
            .put(`/user/${id}`, objSaved)
            .then((res) => {
              if (res.status === 201) {
                return res.data.data;
              }
            })
            .then(() => {
              h3.innerText = "Usuário atualizado com sucesso!";
              h3.classList.remove("error");
              h3.classList.add("success");
            })
            .catch((error) => {
              const { msg } = error.response.data;
              h3.innerText = msg;
              h3.classList.remove("success");
              h3.classList.add("error");
            });
        }
      }
    });
  }

  // Buscando usuario para editar GET
  if (id) {
    const h3 = document.querySelector("#form h3");
    api
      .get(`/user/${id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.data.data;
        }
      })
      .then(({ name, email, cpf, age }) => {
        document.querySelector(".type").value = "update";
        document.querySelector(".name").value = name;
        document.querySelector(".email").value = email;
        document.querySelector(".document").value = cpf;
        document.querySelector(".age").value = age;
      })
      .catch((error) => {
        const { msg } = error.response.data;
        h3.innerText = msg;
        h3.classList.remove("success");
        h3.classList.add("error");
      });
  }
});

function createList(data) {
  const element = document.querySelector(".list-users ul");
  if (element) {
    let html = "";
    data.forEach(({ id, name }) => {
      html += `<li id="${id}">`;
      html += `<span>${name}</span>`;
      html += `<div class="icons">`;
      html += ` <a href="cadastrar.html?id=${id}"><span class="material-icons">edit</span></a>`;
      html += ` <a href="#" data-id="${id}" class="delete"><span class="material-icons">delete</span></a>`;
      html += "</div>";
      html += "</li>";
    });

    element.innerHTML = html;
    deleteUser(); // Chamando funcao para deletar usuario
  }
}

function savedUser() {
  const name = validElement(document.querySelector(".name"));
  const email = validElement(document.querySelector(".email"));
  const cpf = validElement(document.querySelector(".document"));
  const age = validElement(document.querySelector(".age"));

  if (name && email && cpf && age) {
    return {
      name,
      email,
      cpf,
      age: Number(age),
    };
  } else {
    return false;
  }
}

function validElement(el) {
  if (el.value == "") {
    el.classList.add("error");
    return false;
  } else {
    el.classList.remove("error");
    return el.value;
  }
}

// Deletendo usuario DELETE
function deleteUser() {
  const selectDelete = document.querySelectorAll(".delete");
  if (selectDelete) {
    selectDelete.forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-id");
        axios
          .delete(`${base}/user/${id}`)
          .then((res) => {
            if (res.status === 200) {
              document.getElementById(id).remove();
            }
          })
          .catch((error) => console.log(error.response));
      });
    });
  }
}
