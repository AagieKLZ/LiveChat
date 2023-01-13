<script>
  const firstNames = ["Emily", "Michael", "Jacob", "Madison", "Isabella", "Matthew"];
const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis"];

function generateRandomName() {
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName} ${randomLastName}`;
}
  
  const ws = new WebSocket("ws://192.168.122.1:8080");
  let msglist = []
  let user = generateRandomName()
  let brr = false
  let connected = false

  ws.addEventListener("open", function open() {
    console.log("connected")
    connected = true
  });

  ws.addEventListener("message", function message(event) {
    if (connected){
      let received = JSON.parse(event.data)
    if (received.user == undefined && received.msg == "zumb"){
      brrrr()
    } else {
      msglist = JSON.parse(event.data)
    console.log(msglist)
    }
    }
    
    
  });
  let msg = ""
  
  $: msglist = msglist
  function sendMsg(){
    if (connected){
      let x = {user: user, msg: msg}
      ws.send(JSON.stringify(x))
      msg = ""
    }
    
  }

  function clearList(){
    if (connected){
      msglist = []
      ws.send(JSON.stringify({user: undefined, msg: "clear"}))
    } 
    
  }

  
  function zumb(){
    if (connected){
      ws.send(JSON.stringify({user: undefined, msg: "zumb"}))
    }
    
  }

  function brrrr(){
    brr = true;
    setTimeout(() => {
        brr = false;
    }, 2000);
  }
  
  
</script>

{#if connected}<span style="color: greenyellow; font-weight: bold;">Connected</span><br>{/if}
{#if !connected}<span style="color: red; font-weight: bold;">Not Connected</span><br>{/if}
<label for="username">Username: </label>
<input type="text" name="username" id="" bind:value={user} disabled={msglist.length > 0}>
<div class:zumb={brr} class="messages">
{#each msglist as msg}
<div class="msg" class:own={msg.user.toString() == user.toString()}>
  <div class="user">{msg.user.toString().charAt(0).toUpperCase()}</div>
  <div class="content">{msg.msg}</div>
</div>
{/each}
</div>
<form on:submit|preventDefault={sendMsg} class:zumb={brr}>
  <input type="text" autocomplete="off" bind:value={msg} name="msg" id="msgbox">
  <input type="submit" value="Send" disabled={!connected}>
</form>
<button on:click={clearList} class="clearbut">Clear</button>
<button on:click={zumb}>Zumb</button>

<style>
.msg{
  background-color: lightblue;
  color: black;
  border-radius: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  padding-right: 20px;
}

.clearbut{
  margin-top: 20px;
}
.user{
  border-radius: 100%;
  background-color: lightcoral;
  width: 50px;
  height: 50px;
  line-height: 50px;
  justify-self: self-start;
}

.own {
  flex-direction: row-reverse;
  background-color: lightgreen;
}
.content{
  padding-left: 20px;
}

.messages{
  height: 500px;
  background-color: lightgray;
  margin-bottom: 20px;
  max-height: 500px;
  overflow-y: scroll;
  padding: 5px;
  padding-top: 15px;
  border-radius: 25px;
}

@keyframes zumb{
  0% {
    transform: translateX(10px) translateY(10px);
  }
  10% {
    transform: translateX(-20px) translateY(-20px);
  }
  20%{
    transform: translateX(10px) translateY(10px);
  }
  30%{
    transform: translateX(-10px) translateY(-10px);
  }
  40% {
    transform: translateX(10px) translateY(10px);
  }
  50% {
    transform: translateX(-20px) translateY(-20px);
  }
  60%{
    transform: translateX(10px) translateY(10px);
  }
  70%{
    transform: translateX(-10px) translateY(-10px);
  }
  80% {
    transform: translateX(10px) translateY(10px);
  }
  90% {
    transform: translateX(-20px) translateY(-20px);
  }
  100%{
    transform: translateX(10px) translateY(10px);
  }
}

.zumb{
  animation: zumb 0.5s linear;
}
</style>
