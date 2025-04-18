import React, { useState } from "react";

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

    if (milk && cheese) {
      const yieldRatio = cheese / milk;
      total += Math.min(yieldRatio * 10, 10);
      count++;
    }

    if (cost && price && price > 0) {
      const margin = (price - cost) / price;
      total += Math.min(margin * 10, 10);
      count++;
    }

    if (waste >= 0) {
      const wasteScore = 10 - waste * 2;
      total += Math.max(Math.min(wasteScore, 10), 0);
      count++;
    }

    if (energy > 0) {
      const energyScore = 10 - energy / 5;
      total += Math.max(Math.min(energyScore, 10), 0);
      count++;
    }

    if (water > 0) {
      const waterScore = 10 - water / 10;
      total += Math.max(Math.min(waterScore, 10), 0);
      count++;
    }

    if (quality >= 0) {
      total += Math.min(quality, 10);
      count++;
    }

    if (shelf > 0) {
      const shelfScore = Math.min(shelf / 10, 10);
      total += shelfScore;
      count++;
    }

    if (training >= 0) {
      total += Math.min(training, 10);
      count++;
    }

    const finalScore = Math.round(total / count);
    setScore(finalScore);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow space-y-4">
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
        <div className="mt-4 text-xl font-semibold">
          Efficienza del caseificio: <span className="text-green-600">{score}/10</span>
        </div>
      )}
    </div>
  );
}
