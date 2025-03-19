import React, { useState } from 'react';

const TournoiPingPong = () => {
  const [activeTab, setActiveTab] = useState('resultats');
  
  // Définition des données du tournoi
  const tournoi = {
    nom: "Super Mega Tournoi de Mini Ping Pong Remedee",
    poules: [
      {
        nom: "Poule Mouillée",
        participants: ["Paolo", "Anthony", "Michael", "Gilles"],
        matchs: [
          { joueur1: "Paolo", joueur2: "Anthony", score: "12-10, 11-3", joue: true },
          { joueur1: "Gilles", joueur2: "Michael", score: "11-9, 11-6", joue: true },
          { joueur1: "Michael", joueur2: "Paolo", score: "7-11, 8-11", joue: true },
          { joueur1: "Michael", joueur2: "Anthony", score: "11-3, 11-8", joue: true },
          { joueur1: "Anthony", joueur2: "Gilles", score: "6-11, 5-11", joue: true },
          { joueur1: "Paolo", joueur2: "Gilles", score: "11-9, 8-11, 6-11", joue: true }
        ]
      },
      {
        nom: "Poule Panée",
        participants: ["David", "Pierre-Yves", "Riad", "Quentin"],
        matchs: [
          { joueur1: "Riad", joueur2: "Quentin", score: "4-11, 3-11", joue: true },
          { joueur1: "David", joueur2: "Pierre-Yves", score: "11-6, 11-8", joue: true },
          { joueur1: "David", joueur2: "Riad", score: "11-2, 11-7", joue: true },
          { joueur1: "Pierre-Yves", joueur2: "Quentin", score: "4-11, 8-11", joue: true },
          { joueur1: "David", joueur2: "Quentin", score: "11-8, 8-11, 11-7", joue: true },
          { joueur1: "Pierre-Yves", joueur2: "Riad", score: "11-8, 11-7", joue: true }
        ]
      },
      {
        nom: "Poule au pot",
        participants: ["Jay", "Aurélien", "Yann", "Edoh"],
        matchs: [
          { joueur1: "Jay", joueur2: "Aurélien", score: "3-11, 7-11", joue: true },
          { joueur1: "Yann", joueur2: "Edoh", score: "10-12, 6-11", joue: true },
          { joueur1: "Aurélien", joueur2: "Edoh", score: "11-6, 11-9", joue: true },
          { joueur1: "Jay", joueur2: "Yann", score: "3-11, 7-11", joue: true },
          { joueur1: "Jay", joueur2: "Edoh", score: "5-11, 10-12", joue: true },
          { joueur1: "Aurélien", joueur2: "Yann", score: "5-11, 8-11", joue: true }
        ]
      },
      {
        nom: "Poule aux oeufs d'or",
        participants: ["Emilie", "Benjamin", "Séverine", "Mehdi"],
        matchs: [
          { joueur1: "Séverine", joueur2: "Mehdi", score: "3-11, 5-11", joue: true },
          { joueur1: "Benjamin", joueur2: "Séverine", score: "11-2, 11-5", joue: true },
          { joueur1: "Benjamin", joueur2: "Mehdi", score: "11-1, 11-2", joue: true },
          { joueur1: "Emilie", joueur2: "Séverine", score: "11-5, 11-3", joue: true },
          { joueur1: "Emilie", joueur2: "Benjamin", score: "7-11, 8-11", joue: true },
          { joueur1: "Emilie", joueur2: "Mehdi", score: "11-6, 11-9", joue: true }
        ]
      }
    ],
    tableauPrincipal: {
      nom: "Tableau Principal",
      quarts: [
        { id: "Q1", joueur1: "Gilles", joueur2: "Quentin", score: "", joue: false },
        { id: "Q2", joueur1: "Yann", joueur2: "Emilie", score: "", joue: false },
        { id: "Q3", joueur1: "David", joueur2: "Paolo", score: "", joue: false },
        { id: "Q4", joueur1: "Benjamin", joueur2: "Aurélien", score: "", joue: false }
      ],
      demis: [
        { id: "D1", joueur1: "Gagnant Q1", joueur2: "Gagnant Q2", score: "", joue: false },
        { id: "D2", joueur1: "Gagnant Q3", joueur2: "Gagnant Q4", score: "", joue: false }
      ],
      finale: { id: "F", joueur1: "Gagnant D1", joueur2: "Gagnant D2", score: "", joue: false }
    },
    tableauConsolante: {
      nom: "Tableau Consolante",
      quarts: [
        { id: "QC1", joueur1: "Michael", joueur2: "Riad", score: "", joue: false },
        { id: "QC2", joueur1: "Edoh", joueur2: "Séverine", score: "", joue: false },
        { id: "QC3", joueur1: "Pierre-Yves", joueur2: "Anthony", score: "", joue: false },
        { id: "QC4", joueur1: "Mehdi", joueur2: "Jay", score: "", joue: false }
      ],
      demis: [
        { id: "DC1", joueur1: "Gagnant QC1", joueur2: "Gagnant QC2", score: "", joue: false },
        { id: "DC2", joueur1: "Gagnant QC3", joueur2: "Gagnant QC4", score: "", joue: false }
      ],
      finale: { id: "FC", joueur1: "Gagnant DC1", joueur2: "Gagnant DC2", score: "", joue: false }
    }
  };

  // Fonction pour calculer les résultats des matchs
  const calculerResultatMatch = (score) => {
    if (!score) return null;
    
    const sets = score.split(', ');
    let setsJoueur1 = 0;
    let setsJoueur2 = 0;
    let pointsJoueur1 = 0;
    let pointsJoueur2 = 0;
    
    sets.forEach(set => {
      const [score1, score2] = set.split('-').map(Number);
      if (score1 > score2) {
        setsJoueur1++;
      } else {
        setsJoueur2++;
      }
      pointsJoueur1 += score1;
      pointsJoueur2 += score2;
    });
    
    // Déterminer le vainqueur
    let vainqueur = null;
    
    // Pour les tableaux finaux, il faut 3 sets gagnants
    if (sets.length >= 3) {
      if (setsJoueur1 >= 3) {
        vainqueur = 1;
      } else if (setsJoueur2 >= 3) {
        vainqueur = 2;
      } else {
        // Si personne n'a encore 3 sets, le plus grand nombre de sets gagne
        vainqueur = setsJoueur1 > setsJoueur2 ? 1 : 2;
      }
    } else {
      // Pour les matchs de poule, le plus grand nombre de sets gagne
      vainqueur = setsJoueur1 > setsJoueur2 ? 1 : 2;
    }
    
    return {
      vainqueur,
      setsJoueur1,
      setsJoueur2,
      pointsJoueur1,
      pointsJoueur2
    };
  };

  // Fonction pour calculer le classement d'une poule
  const calculerClassement = (poule) => {
    const joueurs = {};
    
    // Initialiser les statistiques pour chaque joueur
    poule.participants.forEach(joueur => {
      joueurs[joueur] = {
        nom: joueur,
        matchsJoues: 0,
        victoires: 0,
        defaites: 0,
        points: 0,
        setsGagnes: 0,
        setsPerdus: 0,
        pointsMarques: 0,
        pointsEncaisses: 0
      };
    });
    
    // Calculer les statistiques à partir des matchs
    poule.matchs.forEach(match => {
      // Ne prendre en compte que les matchs joués
      if (!match.joue) return;
      
      const { joueur1, joueur2, score } = match;
      const resultat = calculerResultatMatch(score);
      if (!resultat) return;
      
      // Mettre à jour les statistiques des joueurs
      if (resultat.vainqueur === 1) {
        // Le joueur 1 a gagné
        joueurs[joueur1].matchsJoues++;
        joueurs[joueur1].victoires++;
        joueurs[joueur1].points += 2;
        joueurs[joueur1].setsGagnes += resultat.setsJoueur1;
        joueurs[joueur1].setsPerdus += resultat.setsJoueur2;
        joueurs[joueur1].pointsMarques += resultat.pointsJoueur1;
        joueurs[joueur1].pointsEncaisses += resultat.pointsJoueur2;
        
        joueurs[joueur2].matchsJoues++;
        joueurs[joueur2].defaites++;
        joueurs[joueur2].points += 0;
        joueurs[joueur2].setsGagnes += resultat.setsJoueur2;
        joueurs[joueur2].setsPerdus += resultat.setsJoueur1;
        joueurs[joueur2].pointsMarques += resultat.pointsJoueur2;
        joueurs[joueur2].pointsEncaisses += resultat.pointsJoueur1;
      } else {
        // Le joueur 2 a gagné
        joueurs[joueur2].matchsJoues++;
        joueurs[joueur2].victoires++;
        joueurs[joueur2].points += 2;
        joueurs[joueur2].setsGagnes += resultat.setsJoueur2;
        joueurs[joueur2].setsPerdus += resultat.setsJoueur1;
        joueurs[joueur2].pointsMarques += resultat.pointsJoueur2;
        joueurs[joueur2].pointsEncaisses += resultat.pointsJoueur1;
        
        joueurs[joueur1].matchsJoues++;
        joueurs[joueur1].defaites++;
        joueurs[joueur1].points += 0;
        joueurs[joueur1].setsGagnes += resultat.setsJoueur1;
        joueurs[joueur1].setsPerdus += resultat.setsJoueur2;
        joueurs[joueur1].pointsMarques += resultat.pointsJoueur1;
        joueurs[joueur1].pointsEncaisses += resultat.pointsJoueur2;
      }
    });
    
    // Convertir l'objet en tableau pour le tri
    const classement = Object.values(joueurs);
    
    // Trier selon les critères spécifiés
    classement.sort((a, b) => {
      // 1. Par nombre de points
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      
      // 2. Par set average (différence entre sets gagnés et perdus)
      const setAverageA = a.setsGagnes - a.setsPerdus;
      const setAverageB = b.setsGagnes - b.setsPerdus;
      if (setAverageB !== setAverageA) {
        return setAverageB - setAverageA;
      }
      
      // 3. Par point average (différence entre points marqués et encaissés)
      const pointAverageA = a.pointsMarques - a.pointsEncaisses;
      const pointAverageB = b.pointsMarques - b.pointsEncaisses;
      return pointAverageB - pointAverageA;
    });
    
    return classement;
  };

  // Fonction pour mettre à jour un match avec un score
  const updateMatch = (type, phase, index, score) => {
    if (type === 'principal') {
      if (phase === 'quart') {
        tournoi.tableauPrincipal.quarts[index].score = score;
        tournoi.tableauPrincipal.quarts[index].joue = true;
      } else if (phase === 'demi') {
        tournoi.tableauPrincipal.demis[index].score = score;
        tournoi.tableauPrincipal.demis[index].joue = true;
      } else if (phase === 'finale') {
        tournoi.tableauPrincipal.finale.score = score;
        tournoi.tableauPrincipal.finale.joue = true;
      }
    } else if (type === 'consolante') {
      if (phase === 'quart') {
        tournoi.tableauConsolante.quarts[index].score = score;
        tournoi.tableauConsolante.quarts[index].joue = true;
      } else if (phase === 'demi') {
        tournoi.tableauConsolante.demis[index].score = score;
        tournoi.tableauConsolante.demis[index].joue = true;
      } else if (phase === 'finale') {
        tournoi.tableauConsolante.finale.score = score;
        tournoi.tableauConsolante.finale.joue = true;
      }
    }
  };

  // Fonction pour rendre un tableau éliminatoire (principal ou consolante)
  const renderTableau = (tableau) => {
    // Fonction pour afficher les scores dans un format de cases
    const renderScores = (match, joueurIndex) => {
      if (!match.joue) {
        // Afficher des cases vides pour les scores
        return (
          <div className="flex">
            <div className="w-6 h-6 border border-gray-300 mx-0.5 text-center"></div>
            <div className="w-6 h-6 border border-gray-300 mx-0.5 text-center"></div>
            <div className="w-6 h-6 border border-gray-300 mx-0.5 text-center"></div>
            <div className="w-6 h-6 border border-gray-300 mx-0.5 text-center"></div>
            <div className="w-6 h-6 border border-gray-300 mx-0.5 text-center"></div>
          </div>
        );
      } else {
        // Traiter les scores des matchs joués
        const setScores = match.score.split(', ');
        const scoreCells = [];
        
        // Ajouter les scores réels
        for (let i = 0; i < setScores.length; i++) {
          const [score1, score2] = setScores[i].split('-').map(Number);
          const score = joueurIndex === 0 ? score1 : score2;
          const otherScore = joueurIndex === 0 ? score2 : score1;
          
          // Mettre en gras le score gagnant du set
          const isWinningSet = score > otherScore;
          
          scoreCells.push(
            <div key={`set-${i}`} className={`w-6 h-6 border border-gray-300 mx-0.5 text-center ${isWinningSet ? 'font-bold' : ''}`}>
              {score}
            </div>
          );
        }
        
        // Ajouter des cellules vides pour compléter jusqu'à 5 sets max
        const remainingSets = 5 - setScores.length;
        for (let i = 0; i < remainingSets; i++) {
          scoreCells.push(
            <div key={`empty-set-${i}`} className="w-6 h-6 border border-gray-300 mx-0.5 text-center"></div>
          );
        }
        
        return <div className="flex">{scoreCells}</div>;
      }
    };

    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-8">{tableau.nom}</h2>
        
        {/* Structure du tableau avec flexbox */}
        <div className="flex justify-center">
          <div className="flex w-full h-full">
            {/* Colonne 1: Quarts de finale */}
            <div className="w-1/3 flex flex-col justify-around space-y-4">
              {tableau.quarts.map((match, index) => (
                <div key={match.id} className="border border-gray-200 rounded overflow-hidden shadow-sm mx-2">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className={`py-2 px-3 text-sm ${match.joue && calculerResultatMatch(match.score)?.vainqueur === 1 ? 'font-bold text-green-600' : ''}`}>{match.joueur1}</td>
                        <td className="py-2 pr-3 text-right" style={{ minWidth: '180px' }}>
                          {renderScores(match, 0)}
                        </td>
                      </tr>
                      <tr>
                        <td className={`py-2 px-3 text-sm ${match.joue && calculerResultatMatch(match.score)?.vainqueur === 2 ? 'font-bold text-green-600' : ''}`}>{match.joueur2}</td>
                        <td className="py-2 pr-3 text-right" style={{ minWidth: '180px' }}>
                          {renderScores(match, 1)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            
            {/* Colonne 2: Demi-finales */}
            <div className="w-1/3 flex flex-col justify-around">
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="border border-gray-200 rounded overflow-hidden shadow-sm w-4/5">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className={`py-2 px-3 text-sm ${tableau.demis[0].joue && calculerResultatMatch(tableau.demis[0].score)?.vainqueur === 1 ? 'font-bold text-green-600' : ''}`}>{tableau.demis[0].joueur1}</td>
                        <td className="py-2 pr-3 text-right" style={{ minWidth: '180px' }}>
                          {renderScores(tableau.demis[0], 0)}
                        </td>
                      </tr>
                      <tr>
                        <td className={`py-2 px-3 text-sm ${tableau.demis[0].joue && calculerResultatMatch(tableau.demis[0].score)?.vainqueur === 2 ? 'font-bold text-green-600' : ''}`}>{tableau.demis[0].joueur2}</td>
                        <td className="py-2 pr-3 text-right" style={{ minWidth: '180px' }}>
                          {renderScores(tableau.demis[0], 1)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="border border-gray-200 rounded overflow-hidden shadow-sm w-4/5">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className={`py-2 px-3 text-sm ${tableau.demis[1].joue && calculerResultatMatch(tableau.demis[1].score)?.vainqueur === 1 ? 'font-bold text-green-600' : ''}`}>{tableau.demis[1].joueur1}</td>
                        <td className="py-2 pr-3 text-right" style={{ minWidth: '180px' }}>
                          {renderScores(tableau.demis[1], 0)}
                        </td>
                      </tr>
                      <tr>
                        <td className={`py-2 px-3 text-sm ${tableau.demis[1].joue && calculerResultatMatch(tableau.demis[1].score)?.vainqueur === 2 ? 'font-bold text-green-600' : ''}`}>{tableau.demis[1].joueur2}</td>
                        <td className="py-2 pr-3 text-right" style={{ minWidth: '180px' }}>
                          {renderScores(tableau.demis[1], 1)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Colonne 3: Finale */}
            <div className="w-1/3 flex flex-col justify-center items-center">
              <div className="border border-gray-200 rounded overflow-hidden shadow-md w-4/5">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className={`py-2 px-3 text-sm ${tableau.finale.joue && calculerResultatMatch(tableau.finale.score)?.vainqueur === 1 ? 'font-bold text-green-600' : ''}`}>{tableau.finale.joueur1}</td>
                      <td className="py-2 pr-3 text-right" style={{ minWidth: '180px' }}>
                        {renderScores(tableau.finale, 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className={`py-2 px-3 text-sm ${tableau.finale.joue && calculerResultatMatch(tableau.finale.score)?.vainqueur === 2 ? 'font-bold text-green-600' : ''}`}>{tableau.finale.joueur2}</td>
                      <td className="py-2 pr-3 text-right" style={{ minWidth: '180px' }}>
                        {renderScores(tableau.finale, 1)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour rendre une poule (résultats ou classement)
  const renderPoule = (poule, pouleIndex) => {
    if (activeTab === 'resultats') {
      return (
        <div key={pouleIndex} className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <div className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">{poule.nom}</h2>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">Matchs joués</h3>
            
            {poule.matchs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur 1</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur 2</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {poule.matchs.map((match, matchIndex) => {
                      // Vérifier si le match a été joué
                      if (match.joue && match.score) {
                        const resultat = calculerResultatMatch(match.score);
                        
                        return (
                          <tr key={matchIndex}>
                            <td className={`px-6 py-4 whitespace-nowrap ${resultat && resultat.vainqueur === 1 ? 'font-bold text-green-600' : ''}`}>{match.joueur1}</td>
                            <td className={`px-6 py-4 whitespace-nowrap ${resultat && resultat.vainqueur === 2 ? 'font-bold text-green-600' : ''}`}>{match.joueur2}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{match.score}</td>
                          </tr>
                        );
                      } else {
                        // Afficher le match à jouer sans score ni mise en forme
                        return (
                          <tr key={matchIndex} className="bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">{match.joueur1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{match.joueur2}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500 italic">À jouer</td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 italic">Aucun match joué dans cette poule</p>
            )}
          </div>
        </div>
      );
    } else {
      const classement = calculerClassement(poule);
      
      return (
        <div key={pouleIndex} className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <div className="bg-blue-600 text-white p-3">
            <h2 className="text-xl font-semibold">{poule.nom}</h2>
          </div>
          
          <div className="p-4">
            <h3 className="text-lg font-medium mb-3">Classement</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rang</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joueur</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">J</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">V</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sets</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points JE</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delta Pts</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classement.map((joueur, index) => (
                    <tr key={index} className={index === 0 || index === 1 ? "bg-green-50" : ""}>
                      <td className="px-3 py-4 whitespace-nowrap font-bold">{index + 1}</td>
                      <td className="px-3 py-4 whitespace-nowrap font-medium">{joueur.nom}</td>
                      <td className="px-3 py-4 whitespace-nowrap">{joueur.matchsJoues}</td>
                      <td className="px-3 py-4 whitespace-nowrap">{joueur.victoires}</td>
                      <td className="px-3 py-4 whitespace-nowrap">{joueur.defaites}</td>
                      <td className="px-3 py-4 whitespace-nowrap font-bold">{joueur.points}</td>
                      <td className="px-3 py-4 whitespace-nowrap">{joueur.setsGagnes}-{joueur.setsPerdus}</td>
                      <td className="px-3 py-4 whitespace-nowrap">{joueur.pointsMarques}-{joueur.pointsEncaisses}</td>
                      <td className="px-3 py-4 whitespace-nowrap font-medium">{joueur.pointsMarques - joueur.pointsEncaisses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">{tournoi.nom}</h1>
      </header>
      
      <div className="flex border-b border-gray-200 bg-white">
        <button
          className={`py-4 px-6 font-medium ${activeTab === 'resultats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setActiveTab('resultats')}
        >
          Résultats
        </button>
        <button
          className={`py-4 px-6 font-medium ${activeTab === 'classements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setActiveTab('classements')}
        >
          Classements
        </button>
        <button
          className={`py-4 px-6 font-medium ${activeTab === 'principal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setActiveTab('principal')}
        >
          Tableau Principal
        </button>
        <button
          className={`py-4 px-6 font-medium ${activeTab === 'consolante' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setActiveTab('consolante')}
        >
          Consolante
        </button>
      </div>
      
      <main className="flex-grow p-4">
        {activeTab === 'resultats' || activeTab === 'classements' ? (
          <div className="grid grid-cols-2 gap-6" style={{ gridTemplateRows: 'auto auto' }}>
            {/* Placement explicite des poules en grille 2x2 */}
            <div style={{ gridColumn: '1', gridRow: '1' }}>
              {renderPoule(tournoi.poules[0], 0)} {/* Poule Mouillée - position 1 ligne 1 col */}
            </div>
            <div style={{ gridColumn: '2', gridRow: '1' }}>
              {renderPoule(tournoi.poules[1], 1)} {/* Poule Panée - position 1 ligne 2 col */}
            </div>
            <div style={{ gridColumn: '1', gridRow: '2' }}>
              {renderPoule(tournoi.poules[2], 2)} {/* Poule au pot - position 2 ligne 1 col */}
            </div>
            <div style={{ gridColumn: '2', gridRow: '2' }}>
              {renderPoule(tournoi.poules[3], 3)} {/* Poule aux oeufs d'or - position 2 ligne 2 col */}
            </div>
          </div>
        ) : activeTab === 'principal' ? (
          renderTableau(tournoi.tableauPrincipal)
        ) : (
          renderTableau(tournoi.tableauConsolante)
        )}
      </main>
      
      <footer className="bg-gray-200 p-4 text-center text-gray-600 text-sm">
        <p>© 2025 Super Mega Tournoi de Mini Ping Pong Remedee</p>
      </footer>
    </div>
  );
};

export default TournoiPingPong;