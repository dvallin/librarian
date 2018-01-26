import { createDecorator, VueDecorator } from 'vue-class-component'

export function RouteParam<T> (param: string, mapper: (v?: string) => T): VueDecorator {
    return createDecorator((options, key) => {
        if (!options.computed) {
            options.computed = {}
        }
        options.computed[key] = function () {
            return mapper(this.$route.params[param])
        } 
    })
}