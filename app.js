let numberIsValid = false;

const generatedLinkBtn = document.querySelector("#generated_link");

const textInput = document.querySelector("#msg");

const telInput = document.querySelector("#tel");
telInput.addEventListener("keyup", (ev) => {
  handleInput(ev);
});

const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  if (!numberIsValid) {
    Toastify({
      text: "⚠️Verifique o número de telefone e tente novamente",
      duration: 3000,
      newWindow: true,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        padding: "2rem",
        color: "#000000",
        background: "#ffffff",
      },
    }).showToast();
    return;
  }
  try {
    const generatedLink = generateLink(telInput.value, textInput.value);
    navigator.clipboard.writeText(generatedLink);
    generatedLinkBtn.innerText = generatedLink;
  } catch (err) {
    console.log(err);
  } finally {
    Toastify({
      text: "✅O link foi copiado para área de transferência",
      duration: 3000,
      newWindow: true,
      gravity: "bottom",
      position: "right",
      stopOnFocus: true,
      style: {
        padding: "2rem",
        color: "#000000",
        background: "#ffffff",
      },
    }).showToast();
  }
});

function handleInput(ev) {
  ev.preventDefault();

  let telInputValue = ev.target.value;
  if (telInputValue.length == 11) {
    let str = telInputValue;
    let regex = /[0-9]{2}[9]{1}[0-9]{8}/;
    if (!regex.test(str)) {
      ev.target.setAttribute("style", "border-color: rgb(220, 20, 60);");
      numberIsValid = false;
      return;
    }
    if (regex.test(str)) {
      numberIsValid = true;
      ev.target.setAttribute("style", "border-color: rgb(0, 0, 0);");
    }
  }
}

function generateLink(number, message) {
  let formattedMessage = message.replaceAll(" ", "+");
  if (message) return `https://wa.me/55${number}/?text=${formattedMessage}`;
  return `https://wa.me/55${number}/`;
}
