

import * as api from '@/discogs/api'
import axios from 'axios'
import { mockStore } from '../helpers/store'
import { axiosSuccess, expectAxiosGet } from '../helpers/axios'
import { storeOptions, RootState } from '@/composition/store'

const MAGIC_DATA = {}

const context = {
    baseURL: "https://api.discogs.com"
}

describe('Release Api', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        axios.get = axiosSuccess(MAGIC_DATA)
    });
    
    it('correctly gets a release', () => {
        const data = api.fetchRelease(1)
        expect(data).resolves.toBe(MAGIC_DATA)
    })

    it('correctly calls the enpdpoint', () => {
        const data = api.fetchRelease(1)
        expectAxiosGet(axios, "/releases/1", context)
    })
})

describe('Release Store Actions', () => {
    let store
    beforeEach(() => {
        jest.resetAllMocks()
        axios.get = axiosSuccess(MAGIC_DATA)
        store = mockStore<RootState>(storeOptions, [], [
            {module: 'discogs', target: 'fetchReleaseSucceeded'}
        ])
        store.commit = jest.fn()
    });
    
    it('correctly gets a release', () => {
        store.dispatch('discogs/fetchRelease', 1)
        expectAxiosGet(axios, "/releases/1", context)
    })
    
    it('invokes a success mutation', async () => {
        await store.dispatch('discogs/fetchRelease', 1)
        expect(store.commit).toHaveBeenCalledWith("discogs/releaseUpdated", MAGIC_DATA, undefined)
    })

    it('invokes a failure mutation on negative ids', async () => {
        await store.dispatch('discogs/fetchRelease', -1)
        expect(store.commit).toHaveBeenCalledWith(
            "discogs/apiError", new Error('release id must be positive but was -1'), undefined)
    })
})
    

describe('Mutations.releaseUpdated', () => {
    storeOptions.strict = false
    
    let store
    beforeEach(() => {
        jest.resetAllMocks()
        store = mockStore<RootState>(storeOptions, [], [])
    })

    it('sets the release', () => {
        store.commit('discogs/releaseUpdated', {})
        expect(store.state.discogs.release).toEqual({})
    })
})