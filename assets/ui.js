// Função auxiliar para mostrar/esconder mensagens
function showFeedback(elementId, isSuccess, message) {
    const el = document.getElementById(elementId);
    el.innerText = message;
    el.className = isSuccess ? "feedback success" : "feedback error";
}

// Troca de Telas
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Fluxo: Escolheu País
function handleCountryChoice(choice) {
    const data = setPlayerCountry(choice); // Chama o engine.js
    
    document.getElementById('p1-title').innerText = data.name;
    document.getElementById('p1-desc').innerText = data.desc;
    document.getElementById('cost-wheat').innerText = data.wCost;
    document.getElementById('cost-steel').innerText = data.sCost;
    
    showScreen('screen-phase1');
}

// Fluxo: Verifica Fase 1
function handleCheckPhase1() {
    const w10 = parseInt(document.getElementById('input-10-wheat').value);
    const s8 = parseInt(document.getElementById('input-8-steel').value);
    
    if (validatePhase1(w10, s8)) {
        showFeedback('feedback-p1', true, "Correto! Agora vamos traçar o gráfico.");
        document.getElementById('phase1-chart-challenge').style.display = "block";
    } else {
        showFeedback('feedback-p1', false, "Ops! Revise seus cálculos de multiplicação.");
    }
}

// Fluxo: Verifica Gráfico
function handleCheckChart() {
    const maxW = parseFloat(document.getElementById('input-max-wheat').value);
    const maxS = parseFloat(document.getElementById('input-max-steel').value);
    
    if (validateChart(maxW, maxS, 60)) {
        showFeedback('feedback-p1-chart', true, "Perfeito! Você encontrou os limites da sua fronteira. Avançando...");
        setTimeout(setupPhase2UI, 2000);
    } else {
        showFeedback('feedback-p1-chart', false, "Incorreto. Divida os 60 UM pelo custo unitário de cada bem.");
    }
}

// Prepara Tela da Fase 2
function setupPhase2UI() {
    document.getElementById('p2-trade-desc').innerText = ecoData[currentCountry].tradeDesc;
    
    if(currentCountry === 'A') {
        document.getElementById('p2-question-1').innerHTML = `Produzir 10 Ton de trigo? <input type="number" id="trade-q1"> UM`;
        document.getElementById('p2-question-2').innerHTML = `Importar 8 Ton de aço (preço País B)? <input type="number" id="trade-q2"> UM`;
    } else {
        document.getElementById('p2-question-1').innerHTML = `Importar 10 Ton de trigo (preço País A)? <input type="number" id="trade-q1"> UM`;
        document.getElementById('p2-question-2').innerHTML = `Produzir 8 Ton de aço? <input type="number" id="trade-q2"> UM`;
    }
    
    showScreen('screen-phase2');
}

// Fluxo: Verifica Fase 2
function handleCheckPhase2() {
    const q1 = parseInt(document.getElementById('trade-q1').value);
    const q2 = parseInt(document.getElementById('trade-q2').value);
    const correctCosts = getPhase2Costs();

    if (q1 === correctCosts.q1 && q2 === correctCosts.q2) {
        showFeedback('feedback-p2', true, "Exato! O comércio mudou seus custos totais.");
        setupFinalTableUI();
    } else {
        showFeedback('feedback-p2', false, "Erro. Lembre-se do custo de produção do outro país!");
    }
}

// Prepara Tabela Final
function setupFinalTableUI() {
    document.getElementById('phase2-table-challenge').style.display = "block";
    document.getElementById('table-my-country').innerText = currentCountry;
    document.getElementById('table-other-country').innerText = otherCountry;

    const botData = getBotTableData();
    document.getElementById('table-m1-other').innerText = botData.m1;
    document.getElementById('table-m2-other').innerText = botData.m2;
}

// Fluxo: Verifica Tabela Final
function handleCheckTable() {
    const myM1 = parseInt(document.getElementById('table-m1-me').value);
    const myM2 = parseInt(document.getElementById('table-m2-me').value);
    const totalM1 = parseInt(document.getElementById('table-m1-total').value);
    const totalM2 = parseInt(document.getElementById('table-m2-total').value);
    
    const otherM1 = parseInt(document.getElementById('table-m1-other').innerText);
    const otherM2 = parseInt(document.getElementById('table-m2-other').innerText);

    if (validateFinalTable(myM1, myM2, totalM1, totalM2, otherM1, otherM2)) {
        showFeedback('feedback-table', true, "Parabéns! Você provou a Teoria das Vantagens Comparativas!");
    } else {
        showFeedback('feedback-table', false, "Ainda há erros nas somas da tabela. Revise seus cálculos.");
    }
}
