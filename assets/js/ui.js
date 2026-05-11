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

        // Representa as paralelas de 30, 60 e 90 UM conforme solicitado nas fontes [1, 3]
        const budgets = ;
        const datasets = budgets.map((budget, index) => ({
            label: `Orçamento ${budget} UM`,
            data: engine.calculateProductionMix(budget, code),
            borderColor: `rgba(44, 62, 80, ${0.3 + (index * 0.3)})`,
            borderWidth: 2,
            showLine: true,
            pointRadius: 5
        }));

        this.chart = new Chart(ctx, {
            type: 'scatter',
            data: { datasets },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Trigo (Toneladas)' }, min: 0, max: 50 },
                    y: { title: { display: true, text: 'Aço (Toneladas)' }, min: 0, max: 50 }
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
            <tr>
                <td>Cenário Atual (${active === 'A' ? 'Agrário' : 'Industrial'})</td>
                <td>${isoTotal} UM</td>
                <td class="cost-save">${tradeTotal} UM</td>
            </tr>
            <tr style="background: #eafaf1">
                <td colspan="3"><strong>Economia com Comércio: ${isoTotal - tradeTotal} UM</strong></td>
            </tr>
        `;
    }
};

window.ui = ui; // Garante visibilidade global
