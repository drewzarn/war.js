export class PlayerCountStats {
    private counts: number[];
    
    constructor() {
        this.counts = [];
    }

    public AddCount(count: number) {
        this.counts.push(count);
    }

    public get Counts(): number[] {
        return this.counts;
    }
}
