// Valores Contrato coleccion 
const addressContract = '0x2788603FF2ee085Bd8329eC9138Aa5d2FA325563';                   
const abi = [    {      "inputs": [],      "stateMutability": "nonpayable",      "type": "constructor"    },    {      "inputs": [],      "name": "balanceOwnerContrato",      "outputs": [        {          "internalType": "uint256",          "name": "",          "type": "uint256"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    },    {      "inputs": [],      "name": "contadorId",      "outputs": [        {          "internalType": "uint256",          "name": "",          "type": "uint256"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    },    {      "inputs": [],      "name": "precio",      "outputs": [        {          "internalType": "uint256",          "name": "",          "type": "uint256"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    },    {      "inputs": [        {          "internalType": "uint256",          "name": "_minimumBet",          "type": "uint256"        },        {          "internalType": "string",          "name": "_titulo",          "type": "string"        },        {          "internalType": "string",          "name": "_descripcion",          "type": "string"        },        {          "internalType": "string",          "name": "_teamOne",          "type": "string"        },        {          "internalType": "string",          "name": "_teamTwo",          "type": "string"        },        {          "internalType": "uint256",          "name": "_idTelegram",          "type": "uint256"        },        {          "internalType": "uint32",          "name": "_porcentajeOwner",          "type": "uint32"        }      ],      "name": "addBet",      "outputs": [],      "stateMutability": "payable",      "type": "function",      "payable": true    },    {      "inputs": [],      "name": "listadoAbiertasString",      "outputs": [        {          "internalType": "string",          "name": "",          "type": "string"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    },    {      "inputs": [        {          "internalType": "string",          "name": "_titulo",          "type": "string"        },        {          "internalType": "uint256",          "name": "_id",          "type": "uint256"        }      ],      "name": "getBet",      "outputs": [        {          "internalType": "uint256",          "name": "idBet",          "type": "uint256"        },        {          "internalType": "uint256",          "name": "minimumBet",          "type": "uint256"        },        {          "internalType": "string",          "name": "titulo",          "type": "string"        },        {          "internalType": "string",          "name": "descripcion",          "type": "string"        },        {          "internalType": "string",          "name": "teamOne",          "type": "string"        },        {          "internalType": "string",          "name": "teamTwo",          "type": "string"        },        {          "internalType": "string",          "name": "teamWin",          "type": "string"        },        {          "internalType": "uint256",          "name": "totalBetsOne",          "type": "uint256"        },        {          "internalType": "uint256",          "name": "totalBetsTwo",          "type": "uint256"        },        {          "internalType": "address",          "name": "_ownerBet",          "type": "address"        },        {          "internalType": "uint32",          "name": "porcentajeOwner",          "type": "uint32"        },        {          "internalType": "uint32",          "name": "estado",          "type": "uint32"        },        {          "internalType": "uint256",          "name": "idTelegram",          "type": "uint256"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    },    {      "inputs": [        {          "internalType": "uint256",          "name": "_idBet",          "type": "uint256"        },        {          "internalType": "address",          "name": "_address",          "type": "address"        }      ],      "name": "getBetPlayerInfo",      "outputs": [        {          "internalType": "uint256",          "name": "_amountBet",          "type": "uint256"        },        {          "internalType": "string",          "name": "_teamSelected",          "type": "string"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    },    {      "inputs": [        {          "internalType": "uint256",          "name": "_idBet",          "type": "uint256"        },        {          "internalType": "string",          "name": "_teamSelected",          "type": "string"        }      ],      "name": "bet",      "outputs": [],      "stateMutability": "payable",      "type": "function",      "payable": true    },    {      "inputs": [        {          "internalType": "uint256",          "name": "_idBet",          "type": "uint256"        }      ],      "name": "cerrarApuesta",      "outputs": [],      "stateMutability": "nonpayable",      "type": "function"    },    {      "inputs": [        {          "internalType": "uint256",          "name": "_idBet",          "type": "uint256"        },        {          "internalType": "string",          "name": "_teamWinner",          "type": "string"        }      ],      "name": "distributePrizes",      "outputs": [],      "stateMutability": "payable",      "type": "function",      "payable": true    },    {      "inputs": [],      "name": "getBalanceContrato",      "outputs": [        {          "internalType": "uint256",          "name": "",          "type": "uint256"        }      ],      "stateMutability": "view",      "type": "function",      "constant": true    },    {      "inputs": [],      "name": "retirarBalanceOwnerContrato",      "outputs": [        {          "internalType": "uint256",          "name": "",          "type": "uint256"        }      ],      "stateMutability": "nonpayable",      "type": "function"    },    {      "inputs": [        {          "internalType": "address payable",          "name": "_to",          "type": "address"        },        {          "internalType": "uint256",          "name": "_val",          "type": "uint256"        }      ],      "name": "sendViaCall",      "outputs": [],      "stateMutability": "payable",      "type": "function",      "payable": true    }  ];

const Toast = Swal.mixin({
/*   toast: true,
  position: 'botton-end',
  showConfirButton: false,
  timer: 2000,
  timerProgressBar: false */
  imageWidth: 425,
  imageHeight: 475,
  imageAlt: 'Custom image'
});


let web3;
let account;

function init() {
 var elementBtnFirma = document.getElementById('btnFirmarAlta'); 
 if(typeof(elementBtnFirma) != 'undefined' && elementBtnFirma != null){
    validarConnect(document.getElementById('btnFirmarAlta'));    
 }
 var elementBtnFirmaApu = document.getElementById('btnFirmarApuesta'); 
 if(typeof(elementBtnFirmaApu) != 'undefined' && elementBtnFirmaApu != null){
    validarConnect(document.getElementById('btnFirmarApuesta'));    
 }     
 var elementBtnFirmaCerrar = document.getElementById('btnFirmarCerrar'); 
 if(typeof(elementBtnFirmaCerrar) != 'undefined' && elementBtnFirmaCerrar != null){
    validarConnect(document.getElementById('btnFirmarCerrar'));    
 }
 var elementBtnFirmaDis = document.getElementById('btnFirmarDistribuir'); 
 if(typeof(elementBtnFirmaDis) != 'undefined' && elementBtnFirmaDis != null){
    validarConnect(document.getElementById('btnFirmarDistribuir'));    
 }
  //validarConnect(document.getElementById('btnConsultar'));
  validarConnect(document.getElementById('enableEthereumButton'));

  function validarConnect(boton){
    boton.addEventListener('click', () => {    
      if (typeof window.ethereum == 'undefined') {   
        const url = document.getElementById('url').value;
       // console.log('llamada:', url);
        Swal.fire({
          title: '¡ Metamask no instalado !',
          position: 'top',
          html: 'Para poder usar esta web necesita tener instalado ' +
          '<a target="_blank" href="https://metamask.app.link/dapp/grada7.ga/' + url + '">Metamask</a>',
        });
      } else {
        const valueAd = document.getElementById('accountSelected').textContent;    
        if (valueAd.length===0) {
            Toast.fire({        
              icon: 'info',
            title: 'Por favor, conecta Metamask a la red de test de Polygon (Mumbai)'
          })
        }
      }    
    });  
  }

  if (typeof window.ethereum !== 'undefined') {    
    const metamaskBtn = document.getElementById('enableEthereumButton');
    metamaskBtn.classList.remove('d-none');

    metamaskBtn.addEventListener('click', async() => {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      account = accounts[0];
     // console.log('3 account',account);

      metamaskBtn.classList.add('d-none');
      document.getElementById('accountSelected').innerHTML = account;
      document.getElementById('accountSelected').classList.add('border');
     // document.getElementById('addressGetBalance').value = account;

      Toast.fire({
          icon: 'success',
          title: 'Cuenta conectada',
          position: 'top',
          showConfirmButton: false,
          timer: 2000
      });

      detectChangeAccount();
      contract();

      //document.getElementById('login').style.display = 'none';
      //document.getElementById('main').classList.remove('d-none');
    });
  }  
}




function detectChangeAccount(){
  window.ethereum.on('accountsChanged', function(accounts) {
    account = accounts[0];
    document.getElementById('accountSelected').innerHTML = account;
   // document.getElementById('addressGetBalance').value = account;
    Toast.fire({
      icon: 'success',
      title: 'Cuenta conectada'
    });
  });
}

function contract() {
  web3 = new Web3(window.ethereum);
  varContract = new web3.eth.Contract(abi,addressContract);
  interact();
}

function infoErrorRed(_msg) {
  Toast.fire({
    icon: 'error',
    title: 'Error',
    text: _msg
   })
}

function funcionFirmarAlta() {
  const btnFirma = document.getElementById('btnFirmarAlta');
   btnFirma.addEventListener('click', () => {
      const addressValueOri = document.getElementById('accountSelected').textContent;
      //console.log('Ori:',addressValueOri);
      const tituloBet = document.getElementById('titulo').value;
     // console.log('Titulo:',tituloBet);
      const betMin = document.getElementById('betMin').value;
     // console.log('betMin:',betMin);
      const betMinParam = web3.utils.toWei(betMin, "ether");
     // console.log('betMinParam:',betMinParam);
      const descripcion = document.getElementById('desc').value;
      //console.log('descripcion:',descripcion);
      const equipoA = document.getElementById('eqA').value;
      //console.log('equipoA:',equipoA);
      const equipoB = document.getElementById('eqB').value;
      //console.log('equipoB:',equipoB);
      const porcentaje = document.getElementById('porcentaje').value;
      //console.log('porcentaje:',porcentaje);
      const idTelegram = document.getElementById('idTelegram').value;
      //console.log('idTelegram:',idTelegram);
      // const amountTransfer = web3.utils.toWei(amountString, 'ether');
      const amountToSend = web3.utils.toWei("0.1", "ether");
      //console.log('amountToSend:',amountToSend);
     try {
        varContract.methods.addBet(betMinParam, tituloBet,descripcion,equipoA,equipoB,idTelegram,porcentaje).send({ from: addressValueOri, to:addressContract, value: amountToSend}).then(res => {
        if (res.status) {
          Toast.fire({
            icon: 'success',
            title: '¡¡ ENHORABUENA, PORRA DADA DE ALTA !!'
           })
        } else {
           Toast.fire({
             icon: 'error',
             title: 'Lo sentimos, la transacción ha fallado',
             timer: 5000
          })
        }
      }).catch(e=>{
        console.log('Error Promise Firmar: ', e.message);
        infoErrorRed(e.message);
       }) 
     } catch (e) {
      console.log('Error: ', e);
    }      
  });
}

function funcionFirmarApuesta() {
  const btnFirmaApuesta = document.getElementById('btnFirmarApuesta');
  btnFirmaApuesta.addEventListener('click', () => {
     const addressValueOri = document.getElementById('accountSelected').textContent;     
     const idBet = document.getElementById('idBet').value;
     //console.log('idBet:',idBet);
     const eqWin = document.getElementById('eqWin').value;
     //console.log('eqWin:',eqWin);     
     const amount = document.getElementById('amount').value;
     //console.log('amount:',amount);     
     const amountToSend = web3.utils.toWei(amount, "ether");     
    try {
       varContract.methods.bet(idBet, eqWin).send({ from: addressValueOri, to:addressContract, value: amountToSend}).then(res => {
       if (res.status) {
         Toast.fire({
           icon: 'success',
           title: ' ¡¡ENHORABUENA, APUESTA REALIZADA!!'
          })
       } else {
          Toast.fire({
            icon: 'error',
            title: 'Lo sentimos, la transacción ha fallado',
            timer: 5000
         })
       }
     }).catch(e=>{
       console.log('Error Promise Firmar: ', e.message);
       infoErrorRed(e.message);
      }) 
    } catch (e) {
     console.log('Error: ', e);
   }
     
 });
}

function funcionFirmarCerrar() {
  const btnFirmaCerrar = document.getElementById('btnFirmarCerrar');
  btnFirmaCerrar.addEventListener('click', () => {
     const addressValueOri = document.getElementById('accountSelected').textContent;     
     const idBet = document.getElementById('idBet').value;
    // console.log('idBet:',idBet);     
    try {
       varContract.methods.cerrarApuesta(idBet).send({ from: addressValueOri, to:addressContract}).then(res => {
       if (res.status) {
         Toast.fire({
           icon: 'success',
           title: ' PORRA CERRADA '
          })
       } else {
          Toast.fire({
            icon: 'error',
            title: 'Lo sentimos, la transacción ha fallado',
            timer: 5000
         })
       }
     }).catch(e=>{
       console.log('Error Promise Firmar: ', e.message);
       infoErrorRed(e.message);
      }) 
    } catch (e) {
     console.log('Error: ', e);
   }
     
 });
}

function funcionFirmarDistribuir() {
  const btnFirmaDistribuir = document.getElementById('btnFirmarDistribuir');
  btnFirmaDistribuir.addEventListener('click', () => {
     const addressValueOri = document.getElementById('accountSelected').textContent;     
     const idBet = document.getElementById('idBet').value;
     const winner = document.getElementById('winner').value;
    // console.log('Distribui idBet :',idBet);     
    // console.log('Distribui winner:',winner);  
    // console.log('Distribui addressValueOri:',addressValueOri);  
    try {
       varContract.methods.distributePrizes(idBet, winner).send({ from: addressValueOri, to:addressContract}).then(res => {
       if (res.status) {
         Toast.fire({
           icon: 'success',
           title: ' APUESTA PAGADA, ¡¡ ENHORABUENA !!'
          })
       } else {
          Toast.fire({
            icon: 'error',
            title: 'Lo sentimos, la transacción ha fallado',
            timer: 5000
         })
       }
     }).catch(e=>{
       console.log('Error Promise Firmar: ', e.message);
       infoErrorRed(e.message);
      }) 
    } catch (e) {
     console.log('Error: ', e);
   }
     
 });
}

function interact() {
  
  var elementBtnFirma = document.getElementById('btnFirmarAlta'); 
  if(typeof(elementBtnFirma) != 'undefined' && elementBtnFirma != null){    
    funcionFirmarAlta();    
  }
  var elementBtnFirmaApu = document.getElementById('btnFirmarApuesta'); 
  if(typeof(elementBtnFirmaApu) != 'undefined' && elementBtnFirmaApu != null){    
    funcionFirmarApuesta();    
  }
  var elementBtnFirmaCerrar = document.getElementById('btnFirmarCerrar'); 
  if(typeof(elementBtnFirmaCerrar) != 'undefined' && elementBtnFirmaCerrar != null){
    funcionFirmarCerrar();      
  }
  var elementBtnFirmaDis = document.getElementById('btnFirmarDistribuir'); 
  if(typeof(elementBtnFirmaDis) != 'undefined' && elementBtnFirmaDis != null){
    funcionFirmarDistribuir();      
  }


}

window.onload = init();

