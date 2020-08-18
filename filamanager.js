// ==UserScript==
// @name ControleDeFila
// @namespace intra
// @include https://intranet.kinghost.com.br:56001/gerencia.queue.php
// @version 2.0.2
// @grant none
// ==/UserScript==

// Este Script está atualizado para o Modo Seven
// By Pedro Flores/2020

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function(){ //realizar quando a página carregar

//Variáveis
var corDeFundoCritico="#FF7F50";
var corDeFundoRazoavel="#F0E68C";
var corDeFundoNice="#BDECB6";
var corDeFundoFila="#00BFFF";
var segundos=59; //Definir aqui tempo p/ autoreload
var tempoEmMilisegundos=segundos*1000; //Cálculo p/ Tempo autoreload
var totalDisponiveisFila4000=$("tbody").eq(1).find("[color='orange']").length; //Retorna numero Analistas Disponiveis
var totalDisponiveisFila4500=$("tbody").eq(2).find("[color='orange']").length; //Retorna numero Analistas Disponiveis KingClass
var totalDisponiveisFila4600=$("tbody").eq(3).find("[color='orange']").length; //Retorna numero Analistas Disponiveis Emails
let fila1 = 1;
let fila2 = 2;
let fila3 = 3;
let corAtend = "#9e44ff";  //cor Atendimento
let corPausa = "#ff0000";  //cor Pausa
let corPausaP = "#00ddff";  //cor Pausa Pessoal
let corPausaS = "#498cff";  //cor Pausa Supervisão
let corPausaA = "#03c474";  //cor Pausa Almoço
let tempoAtendimento = 20; //tempo de atendimento
let tempoPausa = 5; //tempo de Pausa
let tmpAtenM7 = 7; //tempo de atendimento Modo Seven
let tmpPausaM7 = 2; //tempo de Pausa Modo Seven
let isM7 = false;

//Necessário para extrair os dados de tempo de espera de cada fila
let checkQ = $("body").text().split("Suporte N1");

//Operação necessária para extrair dados
var fila = $("body").text().split("4999")[0].split(". SIP/ASTERISK");
fila.shift() //apaga primeiro elemento do array pois é desnecessario
// Fim da extração de dados

var totalFila= fila.length; //Quantos clientes estão ligando agora?


// Função que compara se uma fila está mais disponível que outra e sugere mover analistas
function alertaHelp(totalFila1, totalFila2, filaBoa, filaRuim){
if(checkQ[1].includes("wait: ") || checkQ[3].includes("wait: ")){
if(totalFila1 <= 2 && totalFila2 >= 3){
document.getElementById(filaBoa).style.color = 'red';
document.getElementById(filaBoa).style.fontSize = 'large';
document.getElementById(filaBoa).innerHTML += `Considerar mover analista para a fila ${filaRuim}!`;
}
}
}

//Função p/ trocar Backgr de uma fila
function trocaFundo(fila, total, corBom, corMedio, corRuim, isM7 = false){

if(total<=50&&total>2){
$(`table:eq(${fila})`).attr("style","background-color:"+corBom); //Muda cor do fundo
if(isM7){
$(`table:eq(${fila})`).css("border-style", "dashed");
$(`table:eq(${fila})`).css("border-color", "red");
}
}
if(total<=2&&total>0){
$(`table:eq(${fila})`).attr("style","background-color:"+corMedio); //Muda cor do fundo
if(isM7){
$(`table:eq(${fila})`).css("border-style", "dashed");
$(`table:eq(${fila})`).css("border-color", "red");
}
}
if(total==0){
$(`table:eq(${fila})`).attr("style","background-color:"+corRuim); //Muda cor do fundo
if(isM7){
$(`table:eq(${fila})`).css("border-style", "dashed");
$(`table:eq(${fila})`).css("border-color", "red");
}
}
//if(totalFila>=2 && total>1){ //Se tiver 2 clientes na fila e agentes disponíveis
//$("body").attr("style","background-color:"+corDeFundoFila); //Muda cor do fundo
//}
//if(totalFila>=6){ //Se tiver mais de 6 clientes na fila
//$("body").attr("style","background-color:"+corDeFundoFila); //Muda cor do fundo
//}
}

function grifaTempo(fila, tmpA, tmpP, corBgAt, corBgPausa){
//Grifar atendimentos superiores à "tmpA" minutos de atendimento
$(`table:eq(${fila})`).find("tr").each(function(){
if($(this).find("td:first").text()=="In use" && $(this).find("td:eq(6)").text() || ''){
let tempoEmMinutosAtendimento=$(this).find("td:eq(6)").text().split(" ")[3].split(":")[0];
if(tempoEmMinutosAtendimento>=tmpA){
$(this).find("td:eq(6)").attr("bgcolor",corBgAt)
}
}else{ //Grifar pausas superiores à "tmpP" minutos
if($(this).find("td:first").text()=="em pausa" && $(this).find("td:eq(6)").text().includes('Pausa Outros')){
let tempoEmMinutosPausa=$(this).find("td:eq(6)").text().split(" ")[4].split(":")[0];
if(tempoEmMinutosPausa>=tmpP){
$(this).find("td:eq(6)").attr("bgcolor",corBgPausa)
}
}else{
if($(this).find("td:first").text()=="em pausa" && $(this).find("td:eq(6)").text().includes('Pausa Pessoal')){
let tempoEmMinutosPausa=$(this).find("td:eq(6)").text().split(" ")[4].split(":")[0];
if(tempoEmMinutosPausa>=1){
$(this).find("td:eq(6)").attr("bgcolor",corPausaP)
}
}else{
if($(this).find("td:first").text()=="em pausa" && $(this).find("td:eq(6)").text().includes('Pausa Supervisao')){
let tempoEmMinutosPausa=$(this).find("td:eq(6)").text().split(" ")[4].split(":")[0];
if(tempoEmMinutosPausa>=1){
$(this).find("td:eq(6)").attr("bgcolor",corPausaS)
}
}else{
if($(this).find("td:first").text()=="em pausa" && $(this).find("td:eq(6)").text().includes('Pausa Almoço')){
let tempoEmMinutosPausa=$(this).find("td:eq(6)").text().split(" ")[4].split(":")[0];
if(tempoEmMinutosPausa>=1){
$(this).find("td:eq(6)").attr("bgcolor",corPausaA)
}
}
}  //else
}
}

}
})
}

///////////////////////  Aplica Modo Seven na 4000  //////////////////////////////////////
function m7SuporteGeral(){
//Verifica Modo Seven 4000
if(checkQ[1].includes("wait: ")){
var sevenGeral = $("body").text().split("Suporte N1")[1].split("wait: ")[1].split(":")[0];
console.log(sevenGeral, "A");
if(sevenGeral >=7){
isM7 = true;
localStorage.setItem("controle1", "ativo"); //variavel de controle do tempo de duração do M7
document.getElementById("4000").style.color = 'red';
document.getElementById("4000").style.fontSize = 'large';
document.getElementById("4000").innerHTML += ' Modo Seven Ativado!';
document.getElementsByTagName('title')[0].innerHTML = "<< M7 Ativado! >>";


trocaFundo(fila1, totalDisponiveisFila4000, corDeFundoNice, corDeFundoRazoavel, corDeFundoCritico, isM7);

grifaTempo(fila1, tmpAtenM7, tmpPausaM7, corAtend, corPausa);

}else {
  let controle = localStorage.getItem("controle1");
  let controleF = localStorage.getItem("filaZerou");
  if(controle == "ativo" && controleF != "sim"){
  document.getElementById("4000").style.color = 'red';
  document.getElementById("4000").style.fontSize = 'large';
  document.getElementById("4000").innerHTML += ' Modo Seven Ativado!';
  document.getElementsByTagName('title')[0].innerHTML = "<< M7 Ativado! >>";
  isM7 = true;


  trocaFundo(fila1, totalDisponiveisFila4000, corDeFundoNice, corDeFundoRazoavel, corDeFundoCritico, isM7);

  grifaTempo(fila1, tmpAtenM7, tmpPausaM7, corAtend, corPausa);
  }else { localStorage.removeItem("controle1"); localStorage.removeItem("filaZerou");}
}
} else { localStorage.setItem("filaZerou", "sim");}
}

///////////////////////  Aplica Modo Seven na 4500  //////////////////////////////////////
function m7KingClass(){
//Verifica Modo Seven 4500
if(checkQ[2].includes("wait: ")){
var sevenKingClass = $("body").text().split("Suporte N1")[2].split("wait: ", 2)[1].split(":")[0];
console.log(sevenKingClass, "B");
if(sevenKingClass >=7){
document.getElementById("4500").style.color = 'red';
document.getElementById("4500").style.fontSize = 'large';
document.getElementById("4500").innerHTML += ' Modo Seven Ativado!';
document.getElementsByTagName('title')[0].innerHTML = "<< M7 Ativado! >>";
isM7 = true;


trocaFundo(fila2, totalDisponiveisFila4500, corDeFundoNice, corDeFundoRazoavel, corDeFundoCritico, isM7);

grifaTempo(fila2, tmpAtenM7, tmpPausaM7, corAtend, corPausa);

}
}
}

///////////////////////  Aplica Modo Seven na 4600  //////////////////////////////////////
function m7Emails(){
//Verifica Modo Seven 4600
if(checkQ[3].includes("wait: ")){
var sevenEmails = $("body").text().split("Suporte N1")[3].split("wait: ", 2)[1].split(":")[0];
console.log(sevenEmails, "C");
if(sevenEmails >=7){
isM7 = true;
localStorage.setItem("controle2", "ativo");  //variavel de controle do tempo de duração do M7
document.getElementById("4600").style.color = 'red';
document.getElementById("4600").style.fontSize = 'large';
document.getElementById("4600").innerHTML += ' Modo Seven Ativado!';
document.getElementsByTagName('title')[0].innerHTML = "<< M7 Ativado! >>";


trocaFundo(fila3, totalDisponiveisFila4600, corDeFundoNice, corDeFundoRazoavel, corDeFundoCritico, isM7);

grifaTempo(fila3, tmpAtenM7, tmpPausaM7, corAtend, corPausa);

}else {
  let controle = localStorage.getItem("controle2");
  let controleF = localStorage.getItem("fila2Zerou");
  if(controle == "ativo" && controleF != "sim"){
  document.getElementById("4600").style.color = 'red';
  document.getElementById("4600").style.fontSize = 'large';
  document.getElementById("4600").innerHTML += ' Modo Seven Ativado!';
  document.getElementsByTagName('title')[0].innerHTML = "<< M7 Ativado! >>";
  isM7 = true;


  trocaFundo(fila3, totalDisponiveisFila4600, corDeFundoNice, corDeFundoRazoavel, corDeFundoCritico, isM7);

  grifaTempo(fila3, tmpAtenM7, tmpPausaM7, corAtend, corPausa);
  }else { localStorage.removeItem("controle2"); localStorage.removeItem("fila2Zerou");}
}
} else { localStorage.setItem("fila2Zerou", "sim");}
}

alertaHelp(totalDisponiveisFila4000, totalDisponiveisFila4600, "4600", "4000");

alertaHelp(totalDisponiveisFila4600, totalDisponiveisFila4000, "4000", "4600");

trocaFundo(fila1, totalDisponiveisFila4000, corDeFundoNice, corDeFundoRazoavel, corDeFundoCritico);

trocaFundo(fila2, totalDisponiveisFila4500, corDeFundoNice, corDeFundoRazoavel, corDeFundoCritico);

trocaFundo(fila3, totalDisponiveisFila4600, corDeFundoNice, corDeFundoRazoavel, corDeFundoCritico);


grifaTempo(fila1, tempoAtendimento, tempoPausa, corAtend, corPausa);

grifaTempo(fila2, tempoAtendimento, tempoPausa, corAtend, corPausa);

grifaTempo(fila3, tempoAtendimento, tempoPausa, corAtend, corPausa);


m7SuporteGeral();

m7KingClass()

m7Emails();


var loop= setInterval(function(){//Início Função Autoreload
document.location.reload();
},tempoEmMilisegundos) // Fim loop
}) //Fim Document Ready