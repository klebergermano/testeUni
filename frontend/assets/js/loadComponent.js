async function loadComponent(selector, filepath) {

    const res = await fetch(filepath)

    try {

        if (!res.ok) {
            throw new Error('Erro ao carregar: ' + filepath);

        }

        const html = await res.text();
        document.querySelector(selector).innerHTML = html

    } catch (err) {
        console.error(err);
    }


}



export default loadComponent