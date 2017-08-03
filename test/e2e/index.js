import IndexPage from './page-model';

fixture `Index page`
    .page('http://localhost:4000');

const page = new IndexPage();

test('test render City', async t => {
    await t.expect(page.counter.innerHTML).contains('div')
        .click(page.increment)
        .expect(page.counter.innerText).contains('1')
        .click(page.desrement)
        .expect(page.counter.innerText).contains('0');
});
