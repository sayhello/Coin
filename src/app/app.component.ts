import { Component } from '@angular/core';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  price;
  coin;
  perc;

  socket = null;
  chatinp = '';

  data;

  dataBag = [];
  diff;

  diffBag = [];

  percentageFlash;

  priceEnd;
  priceStart;

  //ETH
  ethereumCoin = {
    name: 'ETH',
    price: null,
    dataBag: [],
    difference: null,
    priceStart: null,
    priceEnd: null,
    differencePercentage: null
  };

   //BTC
   bitcoinCoin = {
    name: 'BTC',
    price: null,
    dataBag: [],
    difference: null,
    priceStart: null,
    priceEnd: null,
    differencePercentage: null
  }; 

  amount = 30;


  constructor() {

    this.socket = io.connect('http://socket.coincap.io');


    this.socket.on('trades', (tradeMsg) => {

      //console.log(tradeMsg);
      //this.price = tradeMsg.message.msg.price;
      //this.coin = tradeMsg.message.msg.long;

      // ETH
      if (tradeMsg.message.coin == this.ethereumCoin.name) {

        this.makeCoin(this.ethereumCoin, this.amount, tradeMsg);

        //this.ethereumCoin.price = tradeMsg.message.msg.price;

        // add to data bag
        //if(this.ethereumCoin.dataBag.length <= this.amount){
        //  this.ethereumCoin.dataBag.push(tradeMsg.message.msg.price);
        //}

        // calculate
        //if(this.ethereumCoin.dataBag.length == this.amount){
        //  this.ethereumCoin.difference = parseFloat(this.ethereumCoin.dataBag[this.amount-1]) - parseFloat(this.ethereumCoin.dataBag[0]);
        //  this.ethereumCoin.priceStart =  parseFloat(this.ethereumCoin.dataBag[0]);
        //  this.ethereumCoin.priceEnd =  parseFloat(this.ethereumCoin.dataBag[this.amount-1]);
        //  this.ethereumCoin.differencePercentage = (this.ethereumCoin.priceEnd-this.ethereumCoin.priceStart)/this.ethereumCoin.priceStart * 100
        //  this.ethereumCoin.dataBag.length = 0;
        // }

      }

      //BTC
      if (tradeMsg.message.coin == this.bitcoinCoin.name) {
        this.makeCoin(this.bitcoinCoin, this.amount, tradeMsg);
      }


      /*if (tradeMsg.message.coin == "ETH") {
        this.coin = tradeMsg.message.msg.long;
        this.price = tradeMsg.message.msg.price;
        
        if (this.dataBag.length <= 30) {
          this.dataBag.push(tradeMsg.message.msg.price);
          console.log(this.dataBag)
        }

        if (this.dataBag.length == 30) {

          console.log(parseFloat(this.dataBag[0]));
          console.log(parseFloat(this.dataBag[29]));

          this.diff = parseFloat(this.dataBag[29]) - parseFloat(this.dataBag[0]);
          

          console.log("-----")
          const anfang = parseFloat(this.dataBag[0]);
          const ende = parseFloat(this.dataBag[29]);

          console.log((ende-anfang)/anfang * 100);

          

          this.percentageFlash = (ende-anfang)/anfang * 100;

          this.priceEnd = parseFloat(this.dataBag[29]);
          this.priceStart = parseFloat(this.dataBag[0]);

          this.dataBag.length = 0;

        }


      }*/
    })

  }


  makeCoin(coin, amount, lifeData) {

    coin.price = lifeData.message.msg.price;

    // add to data bag
    if (coin.dataBag.length <= amount) {
      coin.dataBag.push(lifeData.message.msg.price);
    }

    if (coin.dataBag.length == amount) {
      coin.difference = parseFloat(coin.dataBag[amount - 1]) - parseFloat(coin.dataBag[0]);
      coin.priceStart = parseFloat(coin.dataBag[0]);
      coin.priceEnd = parseFloat(coin.dataBag[amount - 1]);
      coin.differencePercentage = (coin.priceEnd - coin.priceStart) / coin.priceStart * 100
      coin.dataBag.length = 0;
    }

  }


}
