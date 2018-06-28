<template>
  <div class="board">

    <div class="name columns is-mobile">
      <div class="column has-hint">
        <strong class="muted">{{ self.name }}</strong>
        <span class="hint hr muted">
          <icon class="opt" name="pencil-alt" scale="0.7"></icon>
        </span>
      </div>
      <div class="opt column none has-hint muted">
        <strong class="hint hl muted">
          <small>Open {{ self.links.length}}</small>
        </strong>
        <icon name="external-link-alt" scale="0.8"></icon>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered muted" v-if="!self.links.length">
        This board is empty.
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    props: ['self', 'id']
  }
</script>

<style lang="scss">
  .has-hint:not(:hover) > .hint { 
    opacity: 0; 
  }
  .hint.hl { 
    padding-right: 0.5em;
  }
  .hint.hr { 
    padding-left: 0.5em;
  }
  .name .column {
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: -0.5rem;
  }
</style>