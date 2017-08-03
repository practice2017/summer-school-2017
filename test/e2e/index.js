import IndexPage from './page-model';
import { Selector } from 'testcafe';

fixture `Index page`
    .page('http://localhost:4000');

const page = new IndexPage();

test('test render City', async t => {
    await t.click(page.addCityBtn)
        .expect(Selector('.city-card__name').innerText).eql('Perm')
});
