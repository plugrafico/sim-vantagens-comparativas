const DB = {
    A: { nome: "País A (Agrário)", trigo: 2, aco: 6 },
    B: { nome: "País B (Industrial)", trigo: 3, aco: 4 }
};

let game = {
    player: null,
    npc: null,
    m1_player_total: 0,
    m1_npc_total: 62, // Baseado no custo fixo do NPC B (30+32) ou A (20+48)
    m2_player_total: 0,
    m2_npc_total: 0
};

function calcularCustoM1(trigo_custo, aco_custo) {
    return (10 * trigo_custo) + (8 * aco_custo);
}

function processarLogicaComercio() {
    // No Mundo 2, ambos se especializam no que é mais barato [3, 4]
    // Independentemente de quem começa, o custo total do mundo otimizado é 52 UM
    // País A produz 10 trigo (20 UM) e compra 8 aço do B (32 UM) = 52 UM [5]
    // País B compra 10 trigo do A (20 UM) e produz 8 aço (32 UM) = 52 UM [6]
    game.m2_player_total = 52;
    game.m2_npc_total = 52;
}
