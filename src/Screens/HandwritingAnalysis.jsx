import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Tesseract from 'tesseract.js';

const HandwritingAnalysis = ({ imageUrl }) => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeHandwriting = async () => {
    setIsAnalyzing(true);
    try {
      const languages = ['spa', 'eng']; // Español e Inglés
    
      const { data: { text } } = await Tesseract.recognize(
        imageUrl,
        languages.join('+'), // Reconocimiento en ambos idiomas
        { 
          logger: m => console.log(m),
          tessedit_char_whitelist: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789áéíóúÁÉÍÓÚ' 
        }
      );

      const legibilityMetrics = calculateLegibility(text);
      
      setAnalysisResult({
        originalText: text,
        legibilityScore: legibilityMetrics.score,
        improvements: legibilityMetrics.suggestions
      });

      Swal.fire({
        title: 'Análisis Completado',
        html: `Puntuación de legibilidad: ${legibilityMetrics.score}%`,
        icon: 'success'
      });

    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo analizar la imagen',
        icon: 'error'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  function calculateLegibility(text) {
    const metrics = {
      characterClarity: calculateCharacterClarity(text),
      spacing: analyzeSpacing(text),
      consistency: checkWritingConsistency(text),
      wordRecognition: calculateWordRecognition(text)
    };

    console.log('Claridad de caracteres:', metrics.characterClarity);
    console.log('Claridad de spacios:', metrics.spacing);
    console.log('Claridad de consistencia:', metrics.consistency);
    console.log('Claridad de reconocimiento de palabras:', metrics.wordRecognition);
    
    const legibilityScore = computeLegibilityScore(metrics);

    return {
      score: legibilityScore,
      suggestions: generateImprovementSuggestions(metrics)
    };
  }

  // Aquí irían las funciones de análisis que te proporcioné anteriormente
  function calculateCharacterClarity(text) { 
    const specialChars = text.match(/[^a-zA-Z0-9\s]/g) || [];
    return (text.length - specialChars.length) / text.length * 100;
  }

  function analyzeSpacing(text) {
    const words = text.split(/\s+/);
    return words.length;
  }

  function checkWritingConsistency(text) {
    const lines = text.split('\n');
    return lines.length > 1 ? lines.length : 0;
  }

  function calculateWordRecognition(text) {
    const words = text.split(/\s+/);
    return words.length;
  }

  function computeLegibilityScore(metrics) {
    const weightedScore = 
      metrics.characterClarity * 0.05 +
      metrics.spacing * 0.05 +
      metrics.consistency * 0.15 +
      metrics.wordRecognition * 0.75;

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

  return (
    <div>
      <button 
        onClick={analyzeHandwriting} 
        disabled={isAnalyzing}
        className="btn btn-primary"
      >
        {isAnalyzing ? 'Analizando...' : 'Analizar Escritura'}
      </button>

      {isAnalyzing && (
        <div className="text-center mt-3">
          <p>Procesando imagen...</p>
        </div>
      )}

      {analysisResult && (
        <div className="mt-4">
          <h3>Resultado del Análisis</h3>
          <p>Texto Reconocido: {analysisResult.originalText}</p>
          <p>Puntuación de Legibilidad: {analysisResult.legibilityScore}%</p>
          <h4>Sugerencias de Mejora:</h4>
          <ul>
            {analysisResult.improvements.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HandwritingAnalysis;