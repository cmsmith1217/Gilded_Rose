// - All items have a SellIn value which denotes the number of days we have to sell the item
// - All items have a Quality value which denotes how valuable the item is
// - At the end of each day our system lowers both values for every item

// Pretty simple, right? Well this is where it gets interesting:

// - Once the sell by date has passed, Quality degrades twice as fast
// - The Quality of an item is never negative
// - "Aged Brie" actually increases in Quality the older it gets
// - The Quality of an item is never more than 50
// - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
// - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
// Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// Quality drops to 0 after the concert

// We have recently signed a supplier of conjured items. This requires an update to our system:

// - "Conjured" items degrade in Quality twice as fast as normal items

// const appreciateItemIfNotAtMaxQuality = () => {
//   if (this.items[i].quality < 50) {
//     this.items[i].quality = this.items[i].quality + 1;
//   }
// }

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      
      const notBrie = (this.items[i].name != 'Aged Brie')
      const notTicket = (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert')
      const notLegendary = (this.items[i].name != 'Sulfuras, Hand of Ragnaros')

      const appreciateItemIfNotAtMaxQuality = () => {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
        }
      }

      const depreciateItem = () => {
        if (this.items[i].quality > 0) {
          this.items[i].quality = this.items[i].quality - 1;
        }
      }

      const depreciateItemIfExpired = () => {
        if ((this.items[i].sellIn <= 0) && (this.items[i].quality > 0)) {
          this.items[i].quality = this.items[i].quality - 1;
        }
      }

      const devalueTicketIfExpired = () => {
        if (this.items[i].sellIn <= 0) {
          this.items[i].quality = 0;
        }
      }

      const appreciateItemIfCheese = () => {
        if (this.items[i].name === 'Aged Brie') {
          appreciateItemIfNotAtMaxQuality();
        }
      }

      const appreciateItemIfTicket = () => {
        if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
          appreciateItemIfNotAtMaxQuality();
          if (this.items[i].sellIn < 11) {
            appreciateItemIfNotAtMaxQuality();
          }
          if (this.items[i].sellIn < 6) {
            appreciateItemIfNotAtMaxQuality();
          }
        }
      }

      const decrementSellIn = () => {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }


      if (notLegendary) {
        if (notBrie && notTicket) {
          depreciateItem();
          depreciateItemIfExpired();
        } else {
          appreciateItemIfCheese();
          appreciateItemIfTicket();
          devalueTicketIfExpired();
        }
        decrementSellIn();
      }
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
