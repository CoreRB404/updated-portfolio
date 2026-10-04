export function init() {
    const filters = document.querySelectorAll('.portfolio__filter li');
    const items = document.querySelectorAll('.portfolio__gallery .mix');
    filters.forEach(button => {
        button.addEventListener('click', () => {
            filters.forEach(filter => filter.classList.toggle('active', filter === button));
            const category = button.dataset.filter;
            items.forEach(item => {
                item.hidden = category !== '*' && !item.classList.contains(category.slice(1));
            });
        });
    });
}
