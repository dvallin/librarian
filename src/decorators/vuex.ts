import { createDecorator, VueDecorator } from 'vue-class-component'

export function Action (moduleName: string, actionName: string): VueDecorator {
    return createDecorator((options, key) => {
        if (!options.methods) {
            options.methods = {}
        }
        options.methods[key] = function (params: any) {
            return this.$store.dispatch(`${moduleName}/${actionName}`, params)
        }
    })
}