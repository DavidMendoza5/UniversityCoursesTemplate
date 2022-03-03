const cart = document.querySelector('#carrito');
const courseList = document.querySelector('#lista-cursos');
const cartContainer = document.querySelector('#lista-carrito tbody');
const emptyCart = document.querySelector('#vaciar-carrito');
let courses = [];

function registerEventListeners() {
  courseList.addEventListener('click', addCourse);
  cart.addEventListener('click', deleteCourse);
  emptyCart.addEventListener('click', () => {
    clearCourseTableBodyHTML();
    courses = [];
  });
}

function deleteCourse(e) {
  if(e.target.classList.contains('borrar-curso')) {
    const courseId = e.target.getAttribute('data-id');
    courses = courses.filter((course) => course.id !== courseId);
    clearCourseTableBodyHTML();
    createCoursesCart();
  }
}

function addCourse(e) {
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')) {
    const course = e.target.parentElement.parentElement;
    readCourseInfo(course);
  }
}

function readCourseInfo(course) {
  const courseInfo = {
    img: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('span').textContent,
    id: course.querySelector('a').getAttribute('data-id'),
    amount: 1,
  };
  const exist = checkRepeatedCoursesInCart(courseInfo);

  if(exist) {
    courses.map((courseData) => {
      courseData.id === courseInfo.id ? courseData.amount++ : courseData;
    });
  } else {
    courses.push(courseInfo);
  }

  createCoursesCart();
}

function checkRepeatedCoursesInCart(courseInfo) {
  const exist = courses.some((course) => course.id === courseInfo.id);
  return exist;
}

function createCoursesCart() {
  clearCourseTableBodyHTML();

  courses.map((course) => {
    const row = document.createElement('tr');
    const { img, title, price, amount, id } = course;
    row.innerHTML = `
      <td>
        <img src="${img}" width="150">
      </td>
      <td>
        ${title}
      </td>
      <td>
        ${price}
      </td>
      <td>
        ${amount}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    `;

    cartContainer.appendChild(row);
  });
}

function clearCourseTableBodyHTML() {
  // Forma lenta de limpiar, ya que afecta el performance
  // cartContainer.innerHTML = '';

  // Forma óptima
  while(cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}

registerEventListeners();