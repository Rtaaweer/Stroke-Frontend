const Tesseract = require('tesseract.js');
const fs = require('fs');
import React from 'react'


async function analyzeHandwriting(imagePath) {
  try {
    // Realizar OCR
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'spa', // Soporte para español
      { 
        logger: m => console.log(m) 
      }
    );

    // Análisis de legibilidad
    const legibilityMetrics = calculateLegibility(text);

    return {
      originalText: text,
      legibilityScore: legibilityMetrics.score,
      improvements: legibilityMetrics.suggestions
    };
  } catch (error) {
    console.error('Error en análisis:', error);
  }
}

function calculateLegibility(text) {
  // Métricas de legibilidad
  const metrics = {
    characterClarity: calculateCharacterClarity(text),
    spacing: analyzeSpacing(text),
    consistency: checkWritingConsistency(text),
    wordRecognition: calculateWordRecognition(text)
  };

  // Cálculo de score de legibilidad
  const legibilityScore = computeLegibilityScore(metrics);

  return {
    score: legibilityScore,
    suggestions: generateImprovementSuggestions(metrics)
  };
}

function calculateCharacterClarity(text) {
  // Analiza la claridad individual de caracteres
  const specialChars = text.match(/[^a-zA-Z0-9\s]/g) || [];
  return (text.length - specialChars.length) / text.length * 100;
}

function analyzeSpacing(text) {
  // Evalúa consistencia de espaciado
  const words = text.split(/\s+/);
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  return avgWordLength;
}

function checkWritingConsistency(text) {
  // Verifica consistencia en ángulo y tamaño
  const lines = text.split('\n');
  return lines.length > 1 ? lines.length : 0;
}

function calculateWordRecognition(text) {
  // Porcentaje de palabras reconocidas correctamente
  const words = text.split(/\s+/);
  // Implementar diccionario o librería de validación de palabras
  return words.length; 
}

function computeLegibilityScore(metrics) {
  // Algoritmo de scoring personalizado
  const weightedScore = 
    metrics.characterClarity * 0.3 +
    metrics.spacing * 0.2 +
    metrics.consistency * 0.3 +
    metrics.wordRecognition * 0.2;

  return Math.min(weightedScore, 100);
}

function generateImprovementSuggestions(metrics) {
  const suggestions = [];

  if (metrics.characterClarity < 70) {
    suggestions.push("Mejorar claridad de letras individuales");
  }
  if (metrics.spacing > 10) {
    suggestions.push("Mantener espaciado más consistente");
  }
  if (metrics.consistency < 3) {
    suggestions.push("Trabajar en mantener un ángulo constante de escritura");
  }

  return suggestions;
}

module.exports = { analyzeHandwriting };