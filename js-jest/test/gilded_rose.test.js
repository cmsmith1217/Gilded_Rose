const { Item, Shop } = require("../src/gilded_rose.js");

describe("Gilded Rose Pin Down Tests", () => {
  test("Normal items should degrade in quality by 1 each day", () => {
    let normalItem = new Item("normal", 10, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(19); //check
  });

  test("Normal items should degrade in quality by 2 each day if the number of days until it should be sold is 0 or less", () => {
    let normalItem = new Item("normal", 0, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(18); //check
  })

  test("Item quality should never be negative", () => {
    let normalItem = new Item("normal", 5, 0); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(0); //check
  })

  test("Non-legendary item quality should never exceed 50", () => {
    let agedBrie = new Item("Aged Brie", 10, 50);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
  })

  test("Legendary items' quality should be 80 and never change", () => {
    let legendaryItem = new Item("Sulfuras, Hand of Ragnaros", 0, 80); //build
    const gildedRose = new Shop([legendaryItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(80); //check
  })

  test('Quality of "Aged Brie" should increase by 1 each day', () => {
    let agedBrie = new Item("Aged Brie", 10, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
  });

  test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(23);
  });

  test('Quality of "Backstage passes" becomes zero after the concert', () => {
    let backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();
    
    expect(items[0].quality).toBe(0);
  })

  test('SellIn of non-lengendary items should decrease by 1 each day', () => {
    let normalItem = new Item("normal", 5, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].sellIn).toBe(4); //check
  })

  test('SellIn of lengendary items should not change', () => {
    let legendaryItem = new Item("Sulfuras, Hand of Ragnaros", 0, 80); //build
    const gildedRose = new Shop([legendaryItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].sellIn).toBe(0); //check
  })


});
