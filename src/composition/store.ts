import { StoreOptions } from 'vuex'

import * as discogs from '@/discogs/store'

export interface State {
    discogs: discogs.State
}

export const storeOptions: StoreOptions<State> = { 
    modules: {
        discogs: discogs.module
    },
    strict: process.env.NODE_ENV !== 'production'
}