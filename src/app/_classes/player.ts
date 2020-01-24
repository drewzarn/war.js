import { Card } from './card';

export class Player {
    private cards: Card[];
    private playedCard: Card;
    private name: string;
    public WarMonger: boolean;

    constructor(name: string) {
        this.name = name;
        this.cards = [];
        this.WarMonger = false;
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

    public get CardCount(): number {
        return this.cards.length;
    }

    public get Cards(): Card[] {
        return this.cards;
    }
}
