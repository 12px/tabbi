<template>
  <div class="field has-addons toggle-tool">
    <span class="control max-links">
      <button class="button is-rounded is-small is-light">
        <span>Show 0</span>
      </button>
    </span>
    <span class="control board-cols">
      <button class="button is-rounded is-small is-light">
        <span class="icon"><icon name="th"></icon></span>
      </button>
    </span>
    <span class="control trash">
      <button class="button is-rounded is-small is-light">
        <span class="icon"><icon name="trash"></icon></span>
        <span>0</span>
      </button>
    </span>
  </div>
</template>

<script></script>

<style>
  .toggle-tool .icon {
    font-size: 0.65em;
  }
  .toggle-tool .trash .icon {
    font-size: .5em;
    margin-right: .75em !important;
  }

  .toggle-tool {
    justify-content: flex-end!important;
  }

  @media screen and (max-width: 768px) {
    .toggle-tool {
      justify-content: center!important;
    }
  }
</style>