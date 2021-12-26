<template>
  <v-app id="inspire">
    <v-app-bar
      app
    >
      <v-toolbar-title>Zipmend</v-toolbar-title>
    </v-app-bar>

<router-view/>


    <v-footer
      app
      color="light"
      class="white--text"
      dark
    >
      <span class="pr-1"><a href="https://www.linkedin.com/in/ilkinur-keremli/">Keremli Ilkinur</a></span>
      <v-spacer></v-spacer>
      <span> All Right Reserved &copy; 2022</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
    }),
  }
</script>
<style>
  a {
    text-decoration: none;
    color: #fff!important;
  }
  p {
    color: #000!important;
  }
  .v-toolbar__title{
    color: #000;
    font-weight: 700;
    /* height: 59px;
    margin-left: 409px;
    margin-top: 6px;
    margin-bottom: 30px; */
  }
</style>