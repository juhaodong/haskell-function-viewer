<template>
  <router-view />
</template>

<script setup>
//
</script>

<style>
.keyword {
  width: 100%;
  color: green;
}

a[href*="t:"] {
  color: #367aeb;
  font-weight: bold;
}

a[href*="v:"] {
  color: grey;
}

a {
  pointer-events: none;
  color: black;
  text-decoration: none;
}

.subs {
  margin-left: 24px;
}

</style>
