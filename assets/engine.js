// DADOS DA SIMULAÇÃO (Extraídos do PDF)
const ecoData = {
    'A': {
        name: 'País A',
        desc: 'Economia agrária, muitos recursos naturais, população jovem e baixa sofisticação tecnológica.',
        wCost: 2, sCost: 6,
        tradeDesc: 'Você percebe que o País B produz aço a um custo menor. Você não mais produz aço e continua produzindo trigo.',
        produce: 'trigo', import: 'aço'
    },
    'B': {
        name: 'País B',
        desc: 'Economia industrial, poucos recursos naturais, população mais idosa, alta sofisticação tecnológica.',
        wCost: 3, sCost: 4,
        tradeDesc: 'Você percebe que o País A produz trigo a um custo menor. Você não mais produz trigo e continua produzindo aço.',
        produce: 'aço', import: 'trigo'
    }
};

let currentCountry = '';
let otherCountry = '';

// Define quem o aluno é
function setPlayerCountry(choice) {
    currentCountry = choice;
    otherCountry = choice === 'A' ? 'B' : 'A';
    return ecoData[currentCountry];
}

// Verifica respostas da Fase 1 (Autarquia)
function validatePhase1(w10, s8) {
    const correctW = 10 * ecoData[currentCountry].wCost;
    const correctS = 8 * ecoData[currentCountry].sCost;
    return (w10 === correctW && s8 === correctS);
}

// Verifica limites do Gráfico
function validateChart(maxW, maxS, umBudget = 60) {
    const correctMaxW = umBudget / ecoData[currentCountry].wCost;
    const correctMaxS = umBudget / ecoData[currentCountry].sCost;
    return (maxW === correctMaxW && maxS === correctMaxS);
}

// Retorna os custos corretos da Fase 2
function getPhase2Costs() {
    let q1, q2;
    if(currentCountry === 'A') {
        q1 = 10 * ecoData['A'].wCost; // Produz trigo
        q2 = 8 * ecoData['B'].sCost;  // Importa aço
    } else {
        q1 = 10 * ecoData['A'].wCost; // Importa trigo
        q2 = 8 * ecoData['B'].sCost;  // Produz aço
    }
    return { q1, q2 };
}

// Calcula os dados da tabela para o Bot
function getBotTableData() {
    const otherM1 = (10 * ecoData[otherCountry].wCost) + (8 * ecoData[otherCountry].sCost);
    const otherM2 = (10 * ecoData['A'].wCost) + (8 * ecoData['B'].sCost);
    return { m1: otherM1, m2: otherM2 };
}

// Valida a Tabela Final
function validateFinalTable(myM1, myM2, totalM1, totalM2, otherM1, otherM2) {
    const correctMyM1 = (10 * ecoData[currentCountry].wCost) + (8 * ecoData[currentCountry].sCost);
    const correctMyM2 = (10 * ecoData['A'].wCost) + (8 * ecoData['B'].sCost); 
    
    return (
        myM1 === correctMyM1 && 
        myM2 === correctMyM2 && 
        totalM1 === (correctMyM1 + otherM1) && 
        totalM2 === (correctMyM2 + otherM2)
    );
}
