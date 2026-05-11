const engine = {
    data: {
        A: { name: "País A", desc: "Economia Agrária, recursos naturais abundantes.", wheatCost: 2, steelCost: 6 },
        B: { name: "País B", desc: "Economia Industrial, alta sofisticação tecnológica.", wheatCost: 3, steelCost: 4 }
    },
    activeCountry: null,

    calculateProductionMix(budget, countryCode) {
        const country = this.data[countryCode];
        // Retorna os pontos para a linha paralela: (Budget/WheatCost, 0) e (0, Budget/SteelCost)
        return [
            { x: budget / country.wheatCost, y: 0 },
            { x: 0, y: budget / country.steelCost }
        ];
    },

    runTradeSimulation() {
        const targetWheat = 10;
        const targetSteel = 8;

        // Mundo 1: Produção Isolada (Baseado nos exercícios [5, 6])
        const costA_Iso = (targetWheat * this.data.A.wheatCost) + (targetSteel * this.data.A.steelCost);
        const costB_Iso = (targetWheat * this.data.B.wheatCost) + (targetSteel * this.data.B.steelCost);

        // Mundo 2: Especialização e Comércio (Preço de Custo [2, 4])
        // A produz apenas trigo (20T), B produz apenas aço (16T)
        const costA_Trade = (targetWheat * this.data.A.wheatCost) + (targetSteel * this.data.B.steelCost);
        const costB_Trade = (targetWheat * this.data.A.wheatCost) + (targetSteel * this.data.B.steelCost);

        ui.updateComparisonTable(costA_Iso, costA_Trade, costB_Iso, costB_Trade);
    }
};
