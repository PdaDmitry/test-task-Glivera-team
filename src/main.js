const body = document.querySelector('body');

const sidebarList = document.querySelector('.sidebar-list');
const sidebarButtons = document.querySelectorAll('.sidebar-btn');
const contents = document.querySelectorAll('.content');
console.log(sidebarButtons);

sidebarButtons.forEach(sidebarButton => {
  sidebarButton.addEventListener('click', () => {
    const targetContent = sidebarButton.getAttribute('data-content');
    // console.log(targetContent);

    contents.forEach(content => content.classList.remove('active'));

    document.getElementById(targetContent).classList.add('active');
  });
});
