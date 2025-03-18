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
          { joueur1: "Anthony", joueur2: "Gilles", score: "11-6, 11-5", joue: false },
          { joueur1: "Paolo", joueur2: "Gilles", score: "11-9, 8-11, 6-11", joue: true }
        ]
      },
      {
        nom: "Poule Panée",
        participants: ["David", "Pierre-Yves", "Riad", "Quentin"],
        matchs: [
          { joueur1: "Riad", joueur2: "Quentin", score: "4-11, 3-11", joue: true },
          { joueur1: "David", joueur2: "Pierre-Yves", score: "11-6, 11-8", joue: true },
          { joueur1: "David", joueur2: "Riad", score: "", joue: false },
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
          { joueur1: "Aurélien", joueur2: "Yann", score: "", joue: false }
        ]
      },
      {
        nom: "Poule aux oeufs d'or",
        participants: ["Emilie", "Benjamin", "Séverine", "Mehdi"],
        matchs: [
          { joueur1: "Séverine", joueur2: "Mehdi", score: "3-11, 5-11", joue: true },
          { joueur1: "Benjamin", joueur2: "Séverine", score: "11-2, 11-5", joue: true },
          { joueur1: "Benjamin", joueur2: "Mehdi", score: "11-1, 11-2", joue: true },
          { joueur1: "Emilie", joueur2: "Séverine", score: "", joue: false },
          { joueur1: "Emilie", joueur2: "Benjamin", score: "7-11, 8-11", joue: true },
          { joueur1: "Emilie", joueur2: "Mehdi", score: "11-6, 11-9", joue: true }
        ]
      }
    ]
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
    
    return {
      vainqueur: setsJoueur1 > setsJoueur2 ? 1 : 2,
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

  // Fonction pour rendre une poule (résultats ou classement)
  const renderPoule = (poule, pouleIndex) => {
    if (activeTab === 'resultats') {
      return (
        <div key={pouleIndex} className="bg-white rounded-lg shadow-md overflow-hidden h-full">
          <div className="bg-purple-600 text-white p-3">
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
          <div className="bg-purple-600 text-white p-3">
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
      <header className="bg-purple-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">{tournoi.nom}</h1>
      </header>
      
      <div className="flex border-b border-gray-200 bg-white">
        <button
          className={`py-4 px-6 font-medium ${activeTab === 'resultats' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-purple-500'}`}
          onClick={() => setActiveTab('resultats')}
        >
          Résultats
        </button>
        <button
          className={`py-4 px-6 font-medium ${activeTab === 'classements' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-purple-500'}`}
          onClick={() => setActiveTab('classements')}
        >
          Classements
        </button>
      </div>
      
      <main className="flex-grow p-4">
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
      </main>
      
      <footer className="bg-gray-200 p-4 text-center text-gray-600 text-sm">
        <p>© 2025 Super Mega Tournoi de Mini Ping Pong Remedee</p>
      </footer>
    </div>
  );
};

export default TournoiPingPong;