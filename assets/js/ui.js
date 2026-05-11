function escolherPais(id) {
    game.player = DB[id];
    game.npc = id === 'A' ? DB.B : DB.A;
    game.m1_npc_total = calcularCustoM1(game.npc.trigo, game.npc.aco);

    document.getElementById('selection-screen').classList.add('hidden');
    document.getElementById('world1-screen').classList.remove('hidden');
    document.getElementById('country-title').innerText = `Você é o ${game.player.nome}`;
    document.getElementById('status-msg').innerText = "Simule a produção isolada (Mundo 1).";
}

function validarMundo1() {
    const t = parseInt(document.getElementById('input-trigo-m1').value);
    const a = parseInt(document.getElementById('input-aco-m1').value);
    const corretoT = 10 * game.player.trigo;
    const corretoA = 8 * game.player.aco;

    if (t === corretoT && a === corretoA) {
        game.m1_player_total = t + a;
        document.getElementById('m1-feedback').innerText = `Correto! Seu custo total é ${game.m1_player_total} UM.`;
        setTimeout(() => transicaoMundo2(), 1500);
    } else {
        document.getElementById('m1-feedback').innerText = `Erro. Lembre-se: Trigo custa ${game.player.trigo} UM e Aço ${game.player.aco} UM.`;
    }
}

function transicaoMundo2() {
    document.getElementById('world1-screen').classList.add('hidden');
    document.getElementById('world2-screen').classList.remove('hidden');
    const msg = game.player.aco > game.npc.aco ? 
        `NPC (${game.npc.nome}): "Eu produzo aço por apenas ${game.npc.aco} UM. Vamos negociar?"` :
        `NPC (${game.npc.nome}): "Seu trigo custa ${game.player.trigo} UM, o meu custa ${game.npc.trigo} UM. Me venda seu trigo!"`;
    
    document.getElementById('npc-chat').innerText = msg;
    document.getElementById('btn-trade').classList.remove('hidden');
}

function realizarTroca() {
    processarLogicaComercio();
    document.getElementById('world2-screen').classList.add('hidden');
    document.getElementById('dashboard-screen').classList.remove('hidden');
    
    document.getElementById('m1-player').innerText = game.m1_player_total;
    document.getElementById('m1-npc').innerText = game.m1_npc_total;
    document.getElementById('m2-player').innerText = game.m2_player_total;
    document.getElementById('m2-npc').innerText = game.m2_npc_total;
    
    const economia = game.m1_player_total - game.m2_player_total;
    document.getElementById('conclusion').innerText = `Ao comercializar com base na Vantagem Comparativa, você economizou ${economia} UM!`;
}
