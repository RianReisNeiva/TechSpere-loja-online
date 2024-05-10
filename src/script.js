const galeria = document.getElementById("galery");
const carrinho = document.getElementById("carrinho");
const abrirCarrinho = document.getElementById("abrir");
const fecharCarrinho = document.getElementById("fechar");
const todosItens = document.getElementById("Todos-os-Desejos");
var contagemDeItensCarrinho = document.getElementById("contagem-de-item");
let contagem = 0;
let totalCarrinho = document.getElementById("total-carrinho");
const totalComprar = document.getElementById("total-comprar");
const painelComprar = document.getElementById("painel-comprar");
const cardComprar = document.getElementById("card-comprar")
const itensComprar = document.getElementById("itens-comprar");
const comprarBtn = document.getElementById("comprar");
const cancelar = document.getElementById("cancelar");
const painelEmail = document.getElementById("container-email");
const perfil = document.getElementById("perfil");
const salvarEmail = document.getElementById("salvar-email");
const email = document.getElementById("email");
const close = document.querySelector(".close");
const finalizar = document.getElementById("finalizar");
var emailCapturado;

let cart = [];



// Recuperar o e-mail salvo no localStorage ao carregar a página
window.addEventListener('load', function() {
    const emailSalvo = localStorage.getItem('emailCapturado');
    if (emailSalvo) {
        emailCapturado = emailSalvo;
        email.value = emailSalvo; // Atualizar o campo de e-mail no formulário
    }
});

abrirCarrinho.addEventListener("click", function () {
    atualizarCarrinho();
    carrinho.style.display = 'block';
});

fecharCarrinho.addEventListener("click", function () {
    carrinho.style.display = 'none';
    atualizarCarrinho();
});
 
 galeria.addEventListener("click", function(event) {
let parentButton = event.target.closest(".add-carrinho");

 if(parentButton){
   const nome = parentButton.getAttribute("data-name");
   const preco = parseFloat(parentButton.getAttribute("data-preco"));   
   const descricao = parentButton.getAttribute("data-descricao");
   const imagem = parentButton.getAttribute("data-imagem")
   
   addCarrinho(nome, preco, descricao, imagem);
   }
});

//função para adicionar no carrinho
function addCarrinho(nome, preco, descricao, imagem) {

    const existeItem = cart.find(item => item.nome === nome);
    if(existeItem) {
        existeItem.quantidade +=1;
    }else{
    cart.push({
        nome,
        preco,
        descricao, 
        imagem, 
        quantidade: 1,
    });
    }
    
    atualizarCarrinho();
    contagemDeItensCarrinho.style.display = "block";
    contagem++;
    contagemDeItensCarrinho.textContent = contagem;
}

//Atualizar carrinho
function atualizarCarrinho() {
    todosItens.innerHTML = "";
      let total = 0;
      itensComprar.innerHTML="";      
      
    cart.forEach(item => {
    const produtoCarrinho = document.createElement("div");
    produtoCarrinho.classList.add("produto-carrinho")
    
    produtoCarrinho.innerHTML = `
      <img class = "imgCarro" src = "${item.imagem}">
      <div class="descricao-carrinho">
                <h5>${item.descricao}</h5>
                <div class="preco-quantidade">
                    <button class="mais" data-nome ="${item.nome}">+</button>
                    <h5 class="quantidade">${item.quantidade}</h5>
                    <button class="menos" data-nome ="${item.nome}">-</button>
                    </div>
                    <h4>R$</h4>
                    <h4 class="preco-produto">${(item.quantidade * item.preco).toFixed(3)}</h4>      
            </div> 
    `
    
    const divComprar = document.createElement("div");
    divComprar.classList.add("itens-lista");    
    divComprar.innerHTML= `
             <div class= "lista">
             <p>Produto: ${item.nome}</p>
             <p>Quantidade: ${item.quantidade}</p>
             <p>valor: R$${(item.quantidade * item.preco).toFixed(3)}</p>
             <\div>
    `
     todosItens.appendChild(produtoCarrinho);
     total += item.preco * item.quantidade;
 
     itensComprar.appendChild(divComprar);     
    });
    
    totalCarrinho.textContent = total.toFixed(3);
    totalComprar.textContent = "Total: R$" + totalCarrinho.textContent;
    
    if(contagem == 0) {
        contagemDeItensCarrinho.style.display = "none";
    }    
}

//função do botão menos
todosItens.addEventListener("click", function (event) {
if(event.target.classList.contains("menos")){ 
const nome = event.target.getAttribute("data-nome");

    removeItem(nome);
}
    
});

function removeItem(nome){
    const index = cart.findIndex(item => item.nome === nome);

if(index !== -1){
    const item = cart[index];    
    if(item.quantidade > 1){
       item.quantidade -= 1;
       contagem--;
    contagemDeItensCarrinho.textContent = contagem;
       atualizarCarrinho();
       return;
    }
}
     cart.splice(index, 1);
     contagem--;
    contagemDeItensCarrinho.textContent = contagem;
     atualizarCarrinho();
}
//função botão Mais
todosItens.addEventListener("click", function (event) {
if(event.target.classList.contains("mais")){ 
const nome = event.target.getAttribute("data-nome")
    adicionaItem(nome);
}
});
function adicionaItem(nome) {
    const index = cart.findIndex(item => item.nome === nome);

if(index !== -1){
    const item = cart[index];    
    if(item.quantidade >= 1){
       item.quantidade += 1;
       contagem++;
    contagemDeItensCarrinho.textContent = contagem;
       atualizarCarrinho();
       return;
    }
}
}
comprarBtn.addEventListener('click', function () {
    if(contagem !== 0){
    painelComprar.style.display = 'flex';
    }else{
        Toastify({
  text: "Você não possuí nenhum item no carrinho",
  duration: 6000,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to left, #A751C6, #2a3338)",
  },
  onClick: function(){} // Callback after click
}).showToast();
    }
});

cancelar.addEventListener("click", function () {
    painelComprar.style.display = "none";
});

perfil.addEventListener("click", function () {
    painelEmail.style.display = "flex";
});

salvarEmail.addEventListener("click", function () {
    emailCapturado = email.value;
    localStorage.setItem('emailCapturado', emailCapturado);
    painelEmail.style.display = "none";      
});

close.addEventListener("click", function () {
    painelEmail.style.display = "none";   
});

finalizar.addEventListener("click", function () {
    if(email.value === ""){
        Toastify({
  text: "para Finalizar a compra, é necessário informar seu email no perfil",
  duration: 6000,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to left, #A751C6, #2a3338)",
  },
  onClick: function(){} // Callback after click
}).showToast();
       painelComprar.style.display = "none";
       carrinho.style.display = 'none';
        
    }else {
        // Calculando o total da compra
        const totalCompra = cart.reduce((total, item) => total + item.quantidade * item.preco, 0);

        // Construindo o corpo do e-mail com os itens e o total da compra
        const corpoEmail = cart.map(item => `${item.nome} - Quantidade: ${item.quantidade} - Preço: R$${(item.quantidade * item.preco).toFixed(3)}\n`).join(' ');
        const emailTotal = `Total da compra: R$${totalCompra.toFixed(3)}`;

        // Enviando o e-mail
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "organizesuastarefas@gmail.com",
            Password : "85B5D8C6E4BE0F9BA6E905248BCA1009FBBD",
            To : emailCapturado,
            From : "organizesuastarefas@gmail.com",
            Subject : "Recebemos o seu pedido",
            Body : `${corpoEmail}\n\n${emailTotal}`,
        }).then(
            message => {
                Toastify({
  text: "Pedido recebido com sucesso, verifique seu e-mail, para confirmar",
  duration: 6000,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to left, #A751C6, #2a3338)",
  },
  onClick: function(){} // Callback after click
}).showToast();
                // Limpar o carrinho, a lista de compras e redefinir a contagem
                cart = [];
                contagem = 0;
                contagemDeItensCarrinho.textContent = contagem;
                painelComprar.style.display = "none";
       carrinho.style.display = 'none';
                atualizarCarrinho();
            }
        );
    }
})
