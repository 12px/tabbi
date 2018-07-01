<template>
  <div class="editor" @keyup.escape="finish">

    <b-field v-if="!link">
      <b-input placeholder="Board Name" v-model="self.name"
        @keyup.native.enter="finish"></b-input>
      <div class="control" @click="finish">
        <button class="button is-primary">
          <icon name="check"></icon>
        </button>
      </div>
    </b-field>

    <div v-if="link">
      <b-field>
        <b-input placeholder="Link Name" v-model="link.name" 
          @keyup.native.enter="finish"></b-input>
      </b-field>

      <b-field>
        <b-input placeholder="Link URL" v-model="link.link" 
          @keyup.native.enter="finish"></b-input>
      </b-field>

      <b-field>
        <b-select v-model="lBoard">
          <option value="0">Change Board</option>
          <option v-for="brd in $store.state.boards" :value="brd.id">
            {{ brd.name }}
          </option>
        </b-select>
      </b-field>

      <b-field>
        <b-input placeholder="Add Tag" v-model="lTag" expanded 
          @keyup.native.enter="addTag"></b-input>

        <div class="control">
          <button class="button" @click="addTag">
            <icon name="check"></icon>
          </button>
        </div>
      </b-field>

      <b-taglist>
        <b-tag v-for="(tag, i) in link.tags" :key="i">
          <strong>#{{ tag }}</strong>
          <span @click="remTag(i)">
            <icon class="opt" name="times" scale="0.65"></icon>
          </span>
        </b-tag>
      </b-taglist>

      <b-field grouped position="is-centered">
        <button class="button is-inverted is-primary" @click="finish">
          Confirm
        </button>
      </b-field>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['board', 'item'],
    data() { return {
      lTag: '',
      lBoard: '0'
    } },
    computed: {
      self() { return this.$store.state.boards[this.board] },
      link() { return this.self.links[this.item] }
    },
    methods: {
      finish()  { return this.$emit('finished') },
      remTag(i) { this.link.tags.splice(i, 1) },
      addTag()  { if (!this.lTag) return alert("No Tag Specified.")
                 this.link.tags.push(this.lTag)
                 this.lTag = '' }
    }
  }
</script>

<style lang="scss">
</style>