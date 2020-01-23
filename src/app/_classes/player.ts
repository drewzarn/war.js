import { Card } from './card';

export class Player {
    private cards: Card[];
    private name: string;

    constructor(name: string) {
        this.name = name;
        this.cards = [];
    }

    public get Name(): string {
        return this.name;
    }
    
    public AddCard(card: Card) {
        this.cards.push(card);
    }

    public PlayCard(): Card {
        return this.cards.shift()
    }

    public get CardCount(): number {
        return this.cards.length;
    }

    public get Cards(): number {
        return this.cards;
    }
}
