export default class Fighter {
    constructor() {
        this.hp = 200;
    }
    
    attack(spell, opponent) {
        const damage = this.damage(this.spells[spell]);
        const shield = this.shield(this.spells[spell], opponent);
        const rand = Math.floor(Math.random() * 5) + 1
        const finalDamage = {
            1: (damage - shield) * 0.8,
            2: (damage - shield) * 0.9,
            3: (damage - shield),
            4: (damage - shield) * 1.1,
            5: (damage - shield) * 1.2,
        }
        
        opponent.hp = opponent.hp - Math.round(finalDamage[rand]);
    }

    damage(spell) {
        const multiplicator = this.strenght / 10;
        
        return (spell * multiplicator);
    }

    shield(spell, opponent) {
        const multiplicator = opponent.defence / 20;

        return spell * multiplicator;
    }

}


export class Arthur extends Fighter {
    constructor() {
        super();

        this.strenght = 25;
        this.defence = 15;
        this.spells = {
            'BDF': 20,
        }
    }
}

export class Enzo extends Fighter {
    constructor() {
        super();

        this.strenght = 20;
        this.defence = 30;
        this.spells = {
            'RASENGAN': 20,
        }
    }
}
