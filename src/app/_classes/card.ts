export class Card {
    public suit: Suit.Suit;
    private value: number;

    constructor(Suit: Suit.Suit, Value: number) {
        this.suit = Suit;
        this.value = Value;
    }

    public get Suit(): string {
        return Suit.Suit[this.suit];
    }

    public get Value(): number {
        return this.value;
    }

    public get DisplayNumber(): string {
        switch (this.value) {
            case 14:
                return 'A';
                break;
            case 13:
                return 'K';
                break;
            case 12:
                return 'Q';
                break;
            case 11:
                return 'J';
                break;
            default:
                return this.value.toString();
                break;
        }
    }
}

export module Suit {
    export enum Suit {
        Clubs,
        Diamonds,
        Hearts,
        Spades
    }
}