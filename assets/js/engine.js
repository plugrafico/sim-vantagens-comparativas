const engine = {
    data: {
        A: { name: "País A", desc: "Economia agrária, muitos recursos naturais e baixa sofisticação tecnológica.", wheatCost: 2, steelCost: 6 },
        B: { name: "País B", desc: "Economia industrial, alta sofisticação tecnológica e produtividade elevada.", wheatCost: 3, steelCost: 4 }
    },
    activeCountry: null,

    // Calcula os pontos extremos da curva de possibilidades para orçamentos de 30, 60 e 90 UM [1, 3]
    calculateProductionMix(budget, countryCode) {
        const country = this.data[countryCode];
        return [
            { x: budget / country.wheatCost, y: 0 }, // Máximo de Trigo
            { x: 0, y: budget / country.steelCost }  // Máximo de Aço
        ];
    },

    runTradeSimulation() {
        const targetWheat = 10;
        const targetSteel = 8;

        // Mundo 1: Produção Isolada (Baseado nos custos de cada país) [1, 2]
        const costA_Iso = (targetWheat * this.data.A.wheatCost) + (targetSteel * this.data.A.steelCost); // 20 + 48 = 68
        const costB_Iso = (targetWheat * this.data.B.wheatCost) + (targetSteel * this.data.B.steelCost); // 30 + 32 = 62

        // Mundo 2: Especialização e Comércio (Preço de Custo) [3, 4]
        // Ambos agora obtêm o trigo a 2 UM (custo de A) e o aço a 4 UM (custo de B) [5, 6]
        const cost_Trade = (targetWheat * 2) + (targetSteel * 4); // 20 + 32 = 52

        ui.updateComparisonTable(costA_Iso, cost_Trade, costB_Iso, cost_Trade);
    }
};
