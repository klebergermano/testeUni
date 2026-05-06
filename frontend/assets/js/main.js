//import loadComponent from "./loadComponent.js";

document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();

        const url = e.target.href;

        history.pushState(null, '', url);
        router();
    }
});

//---------------------------------------------------------------------
//
console.log('----------------')
console.log(window.location)
console.log('----------------')

const routes = {
    '/': '/pages/home.html',
    '/sobre': '/pages/sobre.html',
    '/contato': '/pages/contato.html'
};


async function router() {
    const path = window.location.pathname;

    const route = routes[path] || '/pages/404.html';

    loadComponent(route, '#app');
}


//---------------------------------------------------------------------



async function loadComponent(selector, file) {
    try {
        const res = await fetch(file);

        if (!res.ok) {
            throw new Error('Erro ao carregar: ' + file);
        }

        const html = await res.text();
        document.querySelector(selector).innerHTML = html;

    } catch (err) {
        console.error(err);
    }
}

loadComponent('#bg-header', './pages/components/header.html')