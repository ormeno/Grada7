// SPDX-License-Identifier: MIT 
pragma solidity 0.8.0;

//import "hardhat/console.sol";

contract WinLose {
   address owner;
   uint256 public precio;
   uint256 public balanceOwnerContrato;
   uint256 public contadorId;   
   uint256 private maxAbiertas;

   struct ListadoAbiertas {
     uint256 idBetLis;
     string tituloLis;
     string teamOneLis;
     string teamTwoLis;
     uint256 bote;
   }    
   ListadoAbiertas[] private listadoAbiertasReturn;

   uint256[] private identificadoresBets;
   mapping(string => uint256) private tituloBets;
   mapping(uint256 => Bet) bets;
   struct Bet {
        uint256 idBet;
        uint256 minimumBet;        
        string titulo;
        string descripcion;
        string teamOne;
        string teamTwo;
        string teamWin;
        uint256 totalBetsOne;
        uint256  totalBetsTwo;                
        address payable ownerBet;   
        uint32 porcentajeOwner;
        uint32 estado;
        uint256 idTelegram;
        address payable[] players;
        mapping(address => Player) playerInfo;
    }   
   // The address of the player and => the user info   
   struct Player {      
      uint256 amountBet;
      string teamSelected;
   }
 
   modifier precioFiltro(uint256 _precio){
        require(_precio == precio);
        _;
    }

    modifier onlyOwner {        
        require(msg.sender == owner);     
        _;
    }
   
  // _precio: si quiero q el dar de alta apuestas cueste
  constructor()  {
      owner = msg.sender;
      //precio=0;
      precio=100000000000000000; //0,1 ETH
      maxAbiertas=500;
      contadorId=0;
      balanceOwnerContrato=0;
      //minimumBet = 100000000000000;
    }


  function addBet(uint256 _minimumBet, string memory _titulo, string memory _descripcion, string memory _teamOne, string memory _teamTwo, 
                  uint256 _idTelegram, uint32 _porcentajeOwner) public precioFiltro(msg.value) payable {     
        require(listadoAbiertasReturn.length < maxAbiertas, "Se ha llegado al maximo de apuestas abiertas");   
        require(!checkNombreExists(_titulo), "Porra abierta con el mismo nombre");        
        require(_porcentajeOwner==0 || _porcentajeOwner==1 || _porcentajeOwner==2 || _porcentajeOwner==3, "Porcentaje no permitido");
        contadorId++;
        identificadoresBets.push(contadorId);
        tituloBets[_titulo] = contadorId;
        bets[contadorId].idBet = contadorId;        
        bets[contadorId].minimumBet = _minimumBet;        
        bets[contadorId].titulo = _titulo;
        bets[contadorId].descripcion = _descripcion;    
        bets[contadorId].teamOne = _teamOne;
        bets[contadorId].teamTwo = _teamTwo;        
        bets[contadorId].ownerBet = payable(msg.sender); 
        bets[contadorId].estado = 1; // Abierta
        bets[contadorId].idTelegram = _idTelegram;
        bets[contadorId].porcentajeOwner = _porcentajeOwner;
        // 
        balanceOwnerContrato = balanceOwnerContrato + msg.value;
        //                
        ListadoAbiertas memory new_listadoAbiertas = ListadoAbiertas(contadorId, _titulo, _teamOne,  _teamTwo,0);
        listadoAbiertasReturn.push(new_listadoAbiertas);
  }
  
  //function listadoAbiertas() public view returns (ListadoAbiertas[] memory) {
  //    return listadoAbiertasReturn;
  //}
     /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

  function listadoAbiertasString() public view returns (string memory) {
      string memory lisAbiertas;         
      for (uint256 i = 0; i < listadoAbiertasReturn.length; i++) {        
        uint256 bote = listadoAbiertasReturn[i].bote;        
        lisAbiertas = string(abi.encodePacked(lisAbiertas,listadoAbiertasReturn[i].tituloLis,"&",toString(bote),"?"));        
      }
      return lisAbiertas;
  }
  // Parametro _titulo para consultar abiertas. Si existe varias con el mismo titulo saca la última añadida q en caso de existir una abierta sera esta
  function getBet(string memory _titulo, uint256 _id) external view returns(uint256 idBet, uint256 minimumBet,  string memory titulo, string memory descripcion,
                                          string memory teamOne, string memory teamTwo, string memory teamWin,
                                          uint256 totalBetsOne, uint256  totalBetsTwo, address  _ownerBet, uint32 porcentajeOwner, uint32 estado, uint256 idTelegram) {
        if (_id == 0) {
          _id = tituloBets[_titulo];
        }                                    
        idBet = bets[_id].idBet;
        minimumBet = bets[_id].minimumBet;
        titulo =  bets[_id].titulo;
        descripcion =  bets[_id].descripcion;
        teamOne =  bets[_id].teamOne;
        teamTwo =  bets[_id].teamTwo;
        teamWin =  bets[_id].teamWin;
        totalBetsOne =  bets[_id].totalBetsOne;
        totalBetsTwo =  bets[_id].totalBetsTwo;
        _ownerBet = bets[_id].ownerBet;
        porcentajeOwner =  bets[_id].porcentajeOwner;
        estado =  bets[_id].estado;        
        idTelegram = bets[_id].idTelegram;
    }        

    //function getBetAddress(uint256 _idBet) external view returns(address payable[] memory players) {
    //    players = bets[_idBet].players;      
    //}

   function getBetPlayerInfo(uint256 _idBet, address _address) external view returns(uint256 _amountBet, string memory _teamSelected) {
        _amountBet = bets[_idBet].playerInfo[_address].amountBet;      
        _teamSelected = bets[_idBet].playerInfo[_address].teamSelected;      
    }


    function checkBetExists(uint256 _idBet) private view returns(bool){      
      for(uint256 i = 0; i < identificadoresBets.length; i++){
         if(identificadoresBets[i] == _idBet) return true;
      }
      return false;
    }

    function checkNombreExists(string memory _titulo) private view returns(bool){     
      for (uint256 i = 0; i < listadoAbiertasReturn.length; i++) {
        if (compareStrings(listadoAbiertasReturn[i].tituloLis,_titulo))  return true;
      }
      return false;
    }

    function checkPlayerExists(uint256 _idBet, address player) private view returns(bool){
      address payable[] memory playersBet = bets[_idBet].players;
      for(uint256 i = 0; i < playersBet.length; i++){
         if(playersBet[i] == player) return true;
      }
      return false;
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
      return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function bet(uint256 _idBet, string memory _teamSelected) public payable {
      // require de apuesta existe
      require(checkBetExists(_idBet), "Apuesta NO existe");
      Bet storage apuesta = bets[_idBet];
      // require de apuesta abierta
      require(apuesta.estado==1, "Apuesta NO Abierta");            
      //The first require is used to check if the player already exist
      require(!checkPlayerExists(_idBet, msg.sender), "La address ya ha apostado");
      //The second one is used to see if the value sended by the player is
      //Higher than the minimum value
      require(msg.value >= bets[_idBet].minimumBet,"Valor de la apuesta insuficiente");      
      // No mas de 1000 apostantes
      require( apuesta.players.length<1000,"No se permiten mas de apostantes");
      //We set the player informations : amount of the bet and selected team      
      // Equipo correcto dentro de la apuesta
      require( compareStrings(_teamSelected, apuesta.teamOne) || compareStrings(_teamSelected, apuesta.teamTwo),"Equipo no existente en la apuesta indicada");
      apuesta.players.push(payable(msg.sender));      
      apuesta.playerInfo[msg.sender].amountBet = msg.value;
      apuesta.playerInfo[msg.sender].teamSelected = _teamSelected;
      //apuesta.playerInfo(msg.sender) = playerInfo({amountBet: msg.value, teamSelected: _teamSelected});
      //at the end, we increment the stakes of the team selected with the player bet
      if ( compareStrings(_teamSelected, apuesta.teamOne) ){
          apuesta.totalBetsOne += msg.value;
      }
      else{
          apuesta.totalBetsTwo += msg.value;
      }      
      uint256 pos = indexOf(listadoAbiertasReturn,_idBet);
      listadoAbiertasReturn[pos].bote  += msg.value;
    }

    // AQUI. Falta modificador onlyOwner; comprobar formula 
   function cerrarApuesta (uint256 _idBet) public {
     // require de apuesta existe
      require(checkBetExists(_idBet), "Apuesta NO existe");
      Bet storage apuesta = bets[_idBet];
      // solo el propietario de la apuesta
      require(apuesta.ownerBet==msg.sender, "No propietario de la apuesta");
      // require de apuesta abierta
      require(apuesta.estado==1, "Apuesta NO Abierta");
      // borrar apuesta de listadoAbiertasReturn
      uint256 pos = indexOf(listadoAbiertasReturn,_idBet);
      //console.log("Pos:", pos);
      delete listadoAbiertasReturn[pos];
      for (uint256 i = pos; i < listadoAbiertasReturn.length - 1; i++) {
        listadoAbiertasReturn[i] = listadoAbiertasReturn[i + 1];
      }
      listadoAbiertasReturn.pop();
      apuesta.estado = 2; // Cerrada
   } 

   function indexOf(ListadoAbiertas[] memory arr, uint256 searchFor) private pure returns (uint256) {
    for (uint256 i = 0; i < arr.length; i++) {
      if (arr[i].idBetLis == searchFor) {
        return i;
      }
     }
    revert("Not Found");
    }

   function distributePrizes(uint256 _idBet, string memory _teamWinner) public payable {
      // require de apuesta existe
      require(checkBetExists(_idBet), "Apuesta NO existe");
      Bet storage apuesta = bets[_idBet];
      // solo el propietario de la apuesta
      require(apuesta.ownerBet==msg.sender, "No propietario de la apuesta");
      // require de apuesta cerrada
      require(apuesta.estado==2, "Apuesta NO Cerrada");
      // Equipo correcto dentro de la apuesta
      require( compareStrings(_teamWinner, apuesta.teamOne) || compareStrings(_teamWinner, apuesta.teamTwo),"Ganador indicado no existente en la apuesta");      
      address payable[1000] memory winners;
      //We have to create a temporary in memory array with fixed size
      //Let's choose 1000      
      uint256 count = 0; // This is the count for the array of winners
      uint256 LoserBet = 0; //This will take the value of all losers bet
      uint256 WinnerBet = 0; //This will take the value of all winners bet
      uint256 totalPagado = 0;
      uint256 ganancia = 0;
      address add;
      uint256 betInd;            
      address payable playerAddress;      
      //We loop through the player array to check who selected the winner team      
      address payable[] memory playersBet = apuesta.players;
      for(uint256 i = 0; i < playersBet.length; i++){
         playerAddress = playersBet[i];
         //If the player selected the winner team
         //We add his address to the winners array         
         if(compareStrings(apuesta.playerInfo[playerAddress].teamSelected,_teamWinner)){           
           winners[count] = playerAddress;           
           count++;
         }
      }                  
      //We define which bet sum is the Loser one and which one is the winner
      if (compareStrings(_teamWinner, apuesta.teamOne)){       
         LoserBet = apuesta.totalBetsTwo;
         WinnerBet = apuesta.totalBetsOne;
      }
      else{        
          LoserBet = apuesta.totalBetsOne;
          WinnerBet = apuesta.totalBetsTwo;
      }
      //We loop through the array of winners, to give ethers to the winners
      //console.log("555");
      for(uint256 j = 0; j < count; j++){
         // Check that the address in this fixed array is not empty
         //console.log("555-1:",j);
         if(winners[j] != address(0))
            //console.log("555-2");
            add = winners[j];
            betInd = apuesta.playerInfo[add].amountBet;            
            ganancia = (betInd*(10000+(LoserBet*10000/WinnerBet)))/10000;
            //console.log("ganancia1:", ganancia);
            if (apuesta.porcentajeOwner > 0) {        
              uint256 gananciaDescontada = (ganancia*apuesta.porcentajeOwner)/100;
              ganancia = ganancia - gananciaDescontada;
              //console.log("ganancia2:", ganancia);
            }                                                
            //Transfer the money to the user
            //winners[j].transfer(ganancia);
            totalPagado += ganancia;
            sendViaCall(winners[j], ganancia);                        
      }                        
      // pago al owner
      apuesta.estado = 3; // Pagada
      if (apuesta.porcentajeOwner > 0) {        
        //apuesta.ownerBet.transfer(WinnerBet + LoserBet - totalPagado); 
        sendViaCall(apuesta.ownerBet, WinnerBet + LoserBet - totalPagado);
        //console.log("pago owner:", WinnerBet + LoserBet - totalPagado);
      }
      
    }
     
    function getBalanceContrato() view public returns(uint256) {
        return address(this).balance;
    }    

    function retirarBalanceOwnerContrato() external onlyOwner returns(uint256) {                        
        uint256 retirado = balanceOwnerContrato;
        //payable(msg.sender).transfer(balanceOwnerContrato);  
        balanceOwnerContrato = 0;
        sendViaCall(payable(msg.sender), retirado);        
        return retirado;        
    }
    function sendViaCall(address payable _to, uint256 _val) public payable {
        string memory cadReturn;
        cadReturn = string(abi.encodePacked("Failed to send Ether to: ",_to));         
        (bool sent, bytes memory data) = _to.call{value: _val , gas: 2300}("");
        require(sent, cadReturn);
    }
}

