<template>
  <div id="app">
    <header>
      {{ title }}
    </header>
    <section>
      {{ release }}
    </section>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { Action } from '@/decorators/vuex'
import { RouteParam } from '@/decorators/route'
import { State } from '@/discogs/store'
import Component from 'vue-class-component'
import { Release } from '@/discogs/model'

function parseInt(value?: string) {
  return value ? Number.parseFloat(value) : 249504
}

@Component({
  computed: {
    ...mapGetters('discogs', ['title']),
    ...mapState('discogs', {
      release: (state: State) => state.release
    })
  }
})
export default class App extends Vue {
  @Action('discogs', 'fetchRelease') fetchRelease: (id: number) => Promise<Release>
  @RouteParam('id', parseInt) id: number

  mounted() {
    this.fetchRelease(this.id)
  }
}
</script>

<style>
</style>
