export const SidebarData = [
  // {
  //   title: "Home",
  //   path: "/",
  //   cName: 'bx bx-layer nav__logo-icon'
  // },
  {
    title: "Recipes",
    path: "/recipes",
    cName: 'bx bx-cake nav__icon nav__icon'
  },
  {
    title: "Add Recipe",
    path: "/recipes/new_recipe",
    cName: 'bx bx-book-add nav__icon'
  },
  {
    title: "My Recipes",
    path: "/recipes/my_recipes",
    cName: 'bx bx-restaurant nav__icon'
  },
  {
    title: "My Diets",
    path: "/diets/my_diets",
    cName: 'bx bx-layer-plus nav__icon'
  },
  {
    title: "Diets",
    path: "/diets",
    cName: 'bx bx-task nav__icon'
  },
  {
    title: "About",
    path: "/about",
    cName: 'bx bx-grid-alt nav__icon'
  },
];

export const setActive = () => {
  const linkColor = document.querySelectorAll('.nav__link')
  function colorLink() {
    if (linkColor) {
      linkColor.forEach(el => el.classList.remove('active'))
      this.classList.add('active')
    }
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink))
};

