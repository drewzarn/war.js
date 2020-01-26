import { Card } from './card';

export class Player {
    private cards: Card[];
    private warChest: Card[];
    private playedCard: Card;
    private name: string;
    public WarMonger: boolean;
    public LastWinner: boolean;
    public Lost: boolean;

    constructor(name: string) {
        this.name = name;
        this.cards = [];
        this.warChest = [];
        this.WarMonger = false;
        this.LastWinner = false;
        this.Lost = false;
    }

    public get Name(): string {
        return this.name;
    }

    public AddCard(card: Card) {
        this.cards.push(card);
    }

    public PlayCard() {
        this.playedCard = this.cards.shift();
    }

    public get PlayedCard(): Card {
        return this.playedCard;
    }

    public TakeCard(): Card {
        let taken = this.playedCard;
        this.playedCard = null;
        return taken;
    }

    public AddCardToWarChest(card?: Card) {
        this.warChest.push(card ? card : this.cards.shift());
    }

    public EmptyWarChest() {
        let loot = [...this.warChest];
        this.warChest = [];
        return loot;
    }

    public get WarChest(): Card[] {
        return this.warChest;
    }

    public get CardCount(): number {
        return this.cards.length;
    }

    public get Cards(): Card[] {
        return this.cards;
    }
}
