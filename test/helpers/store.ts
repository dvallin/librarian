
import Vuex, { StoreOptions, Store, Action } from 'vuex';

export function getAction<S>(options: StoreOptions<S>, module: string, action: string): Action<any, S> {
    return options.modules[module].actions[action];
}

export function expectActionCalled<S>(options: StoreOptions<S>, module: string, action: string): jest.Matchers<void> {
    const foundAction = getAction(options, module, action)
    return expect((foundAction as jest.Mock<object>).mock.calls[0][1])
}

export interface VuexPath {
    module: string,
    target: string
}

export function mockStore<S>(options: StoreOptions<S>, actionMocks?: VuexPath[], mutationMocks?: VuexPath[]): Store<S> {
    for(const { module, target } of actionMocks) {
        options.modules[module].actions[target] = jest.fn()
    }
    for(const { module, target } of actionMocks) {
        options.modules[module].mutations[target] = jest.fn()
    }
    return new Vuex.Store(options)
}