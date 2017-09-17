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
  ethereumCoin = {};


  constructor() {

    this.socket = io.connect('http://socket.coincap.io');


    /*this.socket.on('/coins', (globalMsg) => {
      console.log(globalMsg);
  })*/

    this.socket.on('trades', (tradeMsg) => {

      //console.log(tradeMsg);
      //this.price = tradeMsg.message.msg.price;
      //this.coin = tradeMsg.message.msg.long;
      if (tradeMsg.message.coin == "ETH") {
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


      }
    })

  }


  ethereumTrading(){

  }



}
