const ui = {
    chart: null,

    selectCountry(code) {
        engine.activeCountry = code;
        document.getElementById('app').style.display = 'block';
        document.getElementById('country-name').innerText = engine.data[code].name;
        document.getElementById('country-desc').innerText = engine.data[code].desc;
        document.getElementById('cost-wheat').innerText = engine.data[code].wheatCost;
        document.getElementById('cost-steel').innerText = engine.data[code].steelCost;
        
        this.renderChart(code);
    },

    renderChart(code) {
        const ctx = document.getElementById('productionChart').getContext('2d');
        if (this.chart) this.chart.destroy();

        // Gera as 3 paralelas solicitadas nas fontes [1, 4]
        const datasets = .map((budget, index) => ({
            label: `Orçamento ${budget} UM`,
            data: engine.calculateProductionMix(budget, code),
            borderColor: `rgba(230, 126, 34, ${0.3 + (index * 0.3)})`,
            fill: false,
            showLine: true
        }));

        this.chart = new Chart(ctx, {
            type: 'scatter',
            data: { datasets },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Trigo (Ton)' }, min: 0, max: 50 },
                    y: { title: { display: true, text: 'Aço (Ton)' }, min: 0, max: 50 }
                }
            }
        });
    },

    updateComparisonTable(isoA, tradeA, isoB, tradeB) {
        const body = document.getElementById('comparison-body');
        const active = engine.activeCountry;
        
        const isoTotal = active === 'A' ? isoA : isoB;
        const tradeTotal = active === 'A' ? tradeA : tradeB;

        body.innerHTML = `
            <tr><td>Total de Produção (10T Trigo + 8T Aço)</td><td>${isoTotal} UM</td><td class="cost-save">${tradeTotal} UM</td></tr>
            <tr><td colspan="3"><strong>Economia Gerada: ${isoTotal - tradeTotal} UM</strong></td></tr>
        `;
    }
};
