import { Module, ActionContext } from 'vuex'
import { fetchRelease } from './api'
import { Release } from './model';
import { State as RootState } from '@/composition/store'

export interface State {
    release?: Release
}

function initialState(): State {
    return {
        release: undefined
    }
}

export const module: Module<State, RootState> = {
    namespaced: true,
    state: initialState(),
    getters: {
        title(state: State) {
            if(state.release) {
                return state.release.title
            }
            return ""
        }
    },
    mutations: {
        releaseUpdated(state: State, release: Release) {
            state.release = release
        },
        apiError(state: State) {
            state.release = undefined
        }
    },
    actions: {
        async fetchRelease(context: ActionContext<State, RootState>, id: number): Promise<Release> {
            try {
                if(id < 0) {
                    throw Error(`release id must be positive but was ${id}`)
                }
                const release = await fetchRelease(id)
                context.commit('releaseUpdated', release)
                return release
            } catch(error) {
                context.commit('apiError', error)
                return error
            }
        }
    }
}