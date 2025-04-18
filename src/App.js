import React, { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function CheeseEfficiencyCalculator() {
  const [data, setData] = useState({
    milk: "",
    cheese: "",
    waste: "",
    cost: "",
    price: "",
    energy: "",
    water: "",
    quality: "",
    shelf: "",
    training: ""
  });
  const [score, setScore] = useState(null);
  const [advice, setAdvice] = useState("");
  const [kpiData, setKpiData] = useState([]);
  const [actions, setActions] = useState([]);

  function calculateEfficiency() {
    const milk = parseFloat(data.milk);
    const cheese = parseFloat(data.cheese);
    const cost = parseFloat(data.cost);
    const price = parseFloat(data.price);
    const waste = parseFloat(data.waste);
    const energy = parseFloat(data.energy);
    const water = parseFloat(data.water);
    const quality = parseFloat(data.quality);
    const shelf = parseFloat(data.shelf);
    const training = parseFloat(data.training);

    let total = 0;
    let count = 0;
    let kpis = [];
    let suggestions = [];

    if (milk && cheese) {
      const yieldRatio = cheese / milk;
      const val = Math.min(yieldRatio * 10, 10);
      total += val; count++;
      kpis.push({ subject: "Resa", A: val });
      if (val < 6) suggestions.push("Migliorare la resa latte/formaggio.");
    }

    if (cost && price && price > 0) {
      const margin = (price - cost) / price;
      const val = Math.min(margin * 10, 10);
      total += val; count++;
      kpis.push({ subject: "Margine", A: val });
      if (val < 6) suggestions.push("Ottimizzare i costi di produzione o aumentare il prezzo medio.");
    }

    if (waste >= 0) {
      const wasteScore = 10 - waste * 2;
      const val = Math.max(Math.min(wasteScore, 10), 0);
      total += val; count++;
      kpis.push({ subject: "Scarti", A: val });
      if (val < 6) suggestions.push("Ridurre gli scarti nella produzione.");
    }

    if (energy > 0) {
      const energyScore = 10 - energy / 5;
      const val = Math.max(Math.min(energyScore, 10), 0);
      total += val; count++;
      kpis.push({ subject: "Energia", A: val });
      if (val < 6) suggestions.push("Efficientare l'uso dell'energia.");
    }

    if (water > 0) {
      const waterScore = 10 - water / 10;
      const val = Math.max(Math.min(waterScore, 10), 0);
      total += val; count++;
      kpis.push({ subject: "Acqua", A: val });
      if (val < 6) suggestions.push("Ridurre il consumo idrico.");
    }

    if (quality >= 0) {
      const val = Math.min(quality, 10);
      total += val; count++;
      kpis.push({ subject: "Qualità", A: val });
      if (val < 6) suggestions.push("Migliorare il controllo qualità.");
    }

    if (shelf > 0) {
      const val = Math.min(shelf / 10, 10);
      total += val; count++;
      kpis.push({ subject: "Shelf-life", A: val });
      if (val < 6) suggestions.push("Prolungare la conservabilità dei prodotti.");
    }

    if (training >= 0) {
      const val = Math.min(training, 10);
      total += val; count++;
      kpis.push({ subject: "Formazione", A: val });
      if (val < 6) suggestions.push("Aumentare la formazione del personale.");
    }

    const finalScore = Math.round(total / count);
    setScore(finalScore);
    setKpiData(kpis);
    setActions(suggestions);

    let recommendation = "";
    if (finalScore >= 8) {
      recommendation = "Ottimo livello di efficienza! Continua a monitorare i KPI e investi in innovazione per mantenere il vantaggio.";
    } else if (finalScore >= 5) {
      recommendation = "Livello medio. Puoi migliorare lavorando sulla riduzione degli sprechi, sull'ottimizzazione dei costi e sulla formazione del personale.";
    } else {
      recommendation = "Efficienza bassa. È consigliato rivedere i processi produttivi, controllare gli scarti e valutare interventi mirati su energia e qualità.";
    }

    setAdvice(recommendation);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold">Calcolatore Efficienza Caseificio</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="border p-2" type="number" placeholder="Litri di latte" onChange={e => setData({...data, milk: e.target.value})} />
        <input className="border p-2" type="number" placeholder="Kg di formaggio" onChange={e => setData({...data, cheese: e.target.value})} />
        <input className="border p-2" type="number" placeholder="Scarti %" onChange={e => setData({...data, waste: e.target.value})} />
        <input className="border p-2" type="number" placeholder="Costo €/kg" onChange={e => setData({...data, cost: e.target.value})} />
        <input className="border p-2" type="number" placeholder="Prezzo €/kg" onChange={e => setData({...data, price: e.target.value})} />
        <input className="border p-2" type="number" placeholder="Energia (kWh/kg)" onChange={e => setData({...data, energy: e.target.value})} />
        <input className="border p-2" type="number" placeholder="Acqua (l/kg)" onChange={e => setData({...data, water: e.target.value})} />
        <input className="border p-2" type="number" placeholder="Controlli Qualità superati %" onChange={e => setData({...data, quality: e.target.value})} />
        <input className="border p-2" type="number" placeholder="Shelf-life (giorni)" onChange={e => setData({...data, shelf: e.target.value})} />
        <input className="border p-2" type="number" placeholder="Ore formazione/10" onChange={e => setData({...data, training: e.target.value})} />
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={calculateEfficiency}>Calcola Efficienza</button>

      {score !== null && (
        <div className="mt-6">
          <p className="text-xl font-semibold">Efficienza del caseificio: <span className="text-green-600">{score}/10</span></p>
          <p className="mt-2 text-gray-700">{advice}</p>

          {kpiData.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Radar KPI</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={kpiData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 10]} />
                  <Radar name="Efficienza" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}

          {actions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Azioni Consigliate</h3>
              <ul className="list-disc list-inside text-gray-700">
                {actions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
