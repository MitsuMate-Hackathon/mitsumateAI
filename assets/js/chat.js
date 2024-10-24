let audio1 = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3"
  );
  function chatOpen() {
    document.getElementById("chat-open").style.display = "none";
    document.getElementById("chat-open-text").style.display = "none";
    document.getElementById("chat-close").style.display = "block";
    document.getElementById("chat-window2").style.display = "block";
  
    audio1.load();
    audio1.play();
  }
  function chatClose() {
    document.getElementById("chat-open").style.display = "block";
    document.getElementById("chat-open-text").style.display = "block";
    document.getElementById("chat-close").style.display = "none";
    document.getElementById("chat-window2").style.display = "none";
  
    audio1.load();
    audio1.play();
  }
  function openConversation() {
    document.getElementById("chat-window2").style.display = "block";
    document.getElementById("chat-window1").style.display = "none";
  
    audio1.load();
    audio1.play();
  }
  
  const data = {
    messages: [
      {
        role: "system",
        content: "Nama anda adalah MitsuMate virtual assistance untuk membantu pelanggan untuk memilih mobil keluaran Mitsubishi yang ingin dibeli sesuai dengan kebutuhan pelanggan, jawaban anda singkat padat dan jelas dengan nada yang casual"
      },
      {
        role: "user",
        content: "Hallo..."
      }
    ]
  };
  
  //Gets the text from the input box(user)
  function userResponse() {
    console.log("response");
    let userText = document.getElementById("textInput").value;
  
    if (userText == "") {
      alert("Please type something!");
    } else {
      document.getElementById("messageBox").innerHTML += `<div class="first-chat">
        <p>${userText}</p>
        <div class="arrow"></div>
      </div>`;
      let audio3 = new Audio(
        "https://prodigits.co.uk/content/ringtones/tone/2020/alert/preview/4331e9c25345461.mp3"
      );
      audio3.load();
      audio3.play();
  
      document.getElementById("textInput").value = "";
      var objDiv = document.getElementById("messageBox");
      objDiv.scrollTop = objDiv.scrollHeight;
  
      setTimeout(() => {
        // adminResponse(userText);
        postData('https://rndazureopenai-eastus.openai.azure.com/openai/deployments/gpt-4o-hackathon/chat/completions?api-version=2024-02-15-preview', userText);
      }, 1000);
    }
  }
  
  
  
  // Fungsi untuk melakukan POST request dengan data JSON
  async function postData(url = '', userText) {
  
    const length = data.messages.length;
    console.log("Panjang JSON messages:", length);
  
    if (length > 2) {
      data.messages.push(
        {
          role: "user",
          content: userText
        }
      );
      console.log("Panjang");
    } else {
      data.messages[1].content = userText;
      console.log("Pendek");
    }
  
    const response = await fetch(url, {
      method: 'POST', // Metode HTTP POST
      headers: {
        'Content-Type': 'application/json', // Mengirim dalam format JSON
        'api-key': 'c1ad3aeffabd4f89bf5cfd57d3abbc9d'
      },
      body: JSON.stringify(data), // Mengubah objek JavaScript menjadi JSON string
    });
  
    // Parsing hasil response sebagai JSON
    const jsonResponse = await response.json();
  
    data.messages.push(
      {
        role: "assistant",
        content: jsonResponse.choices[0].message.content
      }
    );
  
    // Menampilkan hasil response
    console.log(jsonResponse);
    document.getElementById(
      "messageBox"
    ).innerHTML += `<div class="second-chat">
        <div class="circle" id="circle-mar"></div>
        <p>${jsonResponse.choices[0].message.content}</p>
        <div class="arrow"></div>
      </div>`;
    let audio3 = new Audio(
      "https://downloadwap.com/content2/mp3-ringtones/tone/2020/alert/preview/56de9c2d5169679.mp3"
    );
    audio3.load();
    audio3.play();
  
    var objDiv = document.getElementById("messageBox");
    objDiv.scrollTop = objDiv.scrollHeight;
  
  }
  
  
  //press enter on keyboard and send message
  addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
  
      const e = document.getElementById("textInput");
      if (e === document.activeElement) {
        userResponse();
      }
    }
  });