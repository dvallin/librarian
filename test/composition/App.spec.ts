import App from '@/composition/App'
import {mount} from '@vue/test-utils'
import {mockRoute} from '../helpers/route'
import {mockStore, expectActionCalled} from '../helpers/store'
import { storeOptions } from '@/composition/store'

const DEFAULT_RELEASE = 249504

function createMocks(id?: number) {
    return {
        $route: mockRoute({ id }),
        $store: mockStore(storeOptions, [
            { module: 'discogs', target: 'fetchRelease'}
        ])
    }
}
describe('App', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('renders header', () => {
        const app = mount(App, { mocks: createMocks(42) })
        expect(app.find('#header').exists).toBeTruthy()
    })

    it('renders section', () => {
        const app = mount(App, { mocks: createMocks(42) })
        expect(app.find('#section').exists).toBeTruthy()
    })

    it('fetches release with route id', () => {
        const app = mount(App, { mocks: createMocks(42) })
        expectActionCalled(storeOptions, 'discogs', 'fetchRelease').toBe(42)
    })

    it('fetches default release if route id is missing', () => {
        const app = mount(App, { mocks: createMocks() })
        expectActionCalled(storeOptions, 'discogs', 'fetchRelease').toBe(DEFAULT_RELEASE)
    })
})