import fs from 'node:fs';
import assert from 'node:assert/strict';

const filters = ['*', '.system', '.mobile', '.ai'].map(filter => ({
    dataset: { filter },
    classList: { toggle() {} },
    addEventListener(event, handler) { this.click = handler; },
}));
const categories = [['system'], ['mobile'], ['ai'], ['ai', 'system']];
const items = categories.map(category => ({
    classList: { contains: value => category.includes(value) },
}));
globalThis.document = {
    querySelectorAll: selector => selector.includes('filter') ? filters : items,
};
const source = fs.readFileSync(new URL('../assets/js/portfolio.js', import.meta.url), 'utf8');
const module = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
module.init();
for (const button of filters) {
    button.click();
    items.forEach((item, index) => {
        assert.equal(item.hidden, button.dataset.filter !== '*' &&
            !categories[index].includes(button.dataset.filter.slice(1)));
    });
}
console.log('All portfolio filters passed, including projects in multiple categories.');
