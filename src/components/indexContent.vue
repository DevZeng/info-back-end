<style scoped>
  .welcome-borad {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .jumbotron {
    border-radius: 4px;
    background-color: #eee;
    padding-left: 60px;
    padding-right: 60px;
    width: 60%;
    height: 300px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    margin: 0;
    font-size: 60px;
  }
  p {
    margin-top: 20px;
    margin-bottom: 0;
    font-size: 48px;
  }
</style>

<template>
  <section class="welcome-borad"> 
    <div class="jumbotron">
      <h1>欢迎来到</h1>
      <p>信息后台管理系统</p>
    </div>
  </section>
</template>

<script>
export default {
  
}
</script>
