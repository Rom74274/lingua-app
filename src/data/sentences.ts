// Sentences with blanks for cloze exercises
// {word} marks where the target word goes
// Each sentence has a French translation

interface SentenceTemplate {
  wordId: string;
  sentence: string;
  translation: string;
}

export const sentenceTemplates: SentenceTemplate[] = [
  // English - Housing
  { wordId: 'en-1', sentence: 'The {word} hasn\'t paid rent in two months.', translation: 'Le locataire n\'a pas payé le loyer depuis deux mois.' },
  { wordId: 'en-2', sentence: 'My {word} finally fixed the broken pipe.', translation: 'Mon propriétaire a enfin réparé le tuyau cassé.' },
  { wordId: 'en-3', sentence: 'We signed a one-year {word} for the apartment.', translation: 'Nous avons signé un bail d\'un an pour l\'appartement.' },
  { wordId: 'en-5', sentence: 'Is it allowed to {word} the apartment?', translation: 'Est-il permis de sous-louer l\'appartement ?' },
  { wordId: 'en-6', sentence: 'The {word} are included in the monthly rent.', translation: 'Les charges sont incluses dans le loyer mensuel.' },
  { wordId: 'en-8', sentence: 'I\'m looking for a {word} apartment.', translation: 'Je cherche un appartement meublé.' },
  { wordId: 'en-9', sentence: 'My {word} always leaves dishes in the sink.', translation: 'Mon colocataire laisse toujours la vaisselle dans l\'évier.' },
  { wordId: 'en-15', sentence: 'The plates are in the kitchen {word}.', translation: 'Les assiettes sont dans le placard de la cuisine.' },
  { wordId: 'en-19', sentence: 'As a {word}, you\'re responsible for repairs.', translation: 'En tant que propriétaire, vous êtes responsable des réparations.' },

  // English - Household
  { wordId: 'en-22', sentence: 'The kitchen {word} is dripping again.', translation: 'Le robinet de la cuisine goutte encore.' },
  { wordId: 'en-23', sentence: 'We need to call someone for the {word}.', translation: 'On doit appeler quelqu\'un pour la plomberie.' },
  { wordId: 'en-25', sentence: 'Could you grab some clean {word}?', translation: 'Tu pourrais prendre des serviettes propres ?' },
  { wordId: 'en-26', sentence: 'I need to do the {word} this weekend.', translation: 'Je dois faire la lessive ce week-end.' },
  { wordId: 'en-29', sentence: 'The {word} needs to be mowed.', translation: 'La pelouse doit être tondue.' },
  { wordId: 'en-31', sentence: 'We hired a {word} to fix the shelf.', translation: 'Nous avons engagé un bricoleur pour réparer l\'étagère.' },
  { wordId: 'en-34', sentence: 'Preheat the {word} to 180 degrees.', translation: 'Préchauffez le four à 180 degrés.' },

  // English - Cleaning
  { wordId: 'en-35', sentence: 'I need {word} the kitchen floor.', translation: 'Je dois laver le sol de la cuisine.' },
  { wordId: 'en-36', sentence: 'Don\'t forget {word} under the couch.', translation: 'N\'oublie pas d\'aspirer sous le canapé.' },
  { wordId: 'en-38', sentence: 'Please {word} your room before dinner.', translation: 'Range ta chambre avant le dîner s\'il te plaît.' },
  { wordId: 'en-40', sentence: '{word} is very important in a shared apartment.', translation: 'La propreté est très importante dans un appartement partagé.' },
  { wordId: 'en-43', sentence: 'Your desk is really {word} today.', translation: 'Ton bureau est vraiment en désordre aujourd\'hui.' },

  // English - Emotions
  { wordId: 'en-46', sentence: 'She looked {word} about the exam results.', translation: 'Elle avait l\'air inquiète des résultats de l\'examen.' },
  { wordId: 'en-47', sentence: 'I feel completely {word} by the workload.', translation: 'Je me sens complètement accablé par la charge de travail.' },
  { wordId: 'en-49', sentence: 'He\'s always so {word} in the morning.', translation: 'Il est toujours si joyeux le matin.' },
  { wordId: 'en-50', sentence: 'The neighbors were {word} by the noise.', translation: 'Les voisins étaient agacés par le bruit.' },
  { wordId: 'en-52', sentence: 'The child was {word} by the loud thunder.', translation: 'L\'enfant était effrayé par le tonnerre.' },
  { wordId: 'en-56', sentence: 'There was an {word} silence in the room.', translation: 'Il y avait un silence gênant dans la pièce.' },
  { wordId: 'en-57', sentence: 'He was {word} to find a solution.', translation: 'Il était désespéré de trouver une solution.' },

  // English - Psychology
  { wordId: 'en-75', sentence: 'Her description was very {word}.', translation: 'Sa description était très précise.' },
  { wordId: 'en-79', sentence: 'He tried to {word} his true feelings.', translation: 'Il a essayé de cacher ses vrais sentiments.' },
  { wordId: 'en-82', sentence: 'What can we {word} from these results?', translation: 'Que pouvons-nous déduire de ces résultats ?' },
  { wordId: 'en-84', sentence: 'The instructions were quite {word}.', translation: 'Les instructions étaient assez simples.' },
  { wordId: 'en-85', sentence: 'With age comes {word}.', translation: 'Avec l\'âge vient la sagesse.' },
  { wordId: 'en-90', sentence: 'Is this source {word}?', translation: 'Cette source est-elle fiable ?' },

  // English - Work
  { wordId: 'en-93', sentence: 'The company plans to {word} ten new employees.', translation: 'L\'entreprise prévoit d\'embaucher dix nouveaux employés.' },
  { wordId: 'en-94', sentence: 'He was {word} during the company restructuring.', translation: 'Il a été licencié lors de la restructuration de l\'entreprise.' },
  { wordId: 'en-99', sentence: 'She managed to {word} the board to approve the project.', translation: 'Elle a réussi à convaincre le conseil d\'approuver le projet.' },
  { wordId: 'en-101', sentence: 'The {word} rate has been rising steadily.', translation: 'Le taux de chômage augmente régulièrement.' },

  // English - Relationships
  { wordId: 'en-108', sentence: 'She introduced her {word} at the party.', translation: 'Elle a présenté son conjoint à la fête.' },
  { wordId: 'en-109', sentence: 'He would never {word} his best friend.', translation: 'Il ne trahirait jamais son meilleur ami.' },
  { wordId: 'en-111', sentence: 'You {word} a break after all that work.', translation: 'Tu mérites une pause après tout ce travail.' },

  // English - Adjectives
  { wordId: 'en-142', sentence: 'This is a very {word} car, it never breaks down.', translation: 'C\'est une voiture très fiable, elle ne tombe jamais en panne.' },
  { wordId: 'en-143', sentence: 'Is this room {word} for the meeting?', translation: 'Cette salle est-elle disponible pour la réunion ?' },
  { wordId: 'en-144', sentence: 'She was {word} to help with the project.', translation: 'Elle était disposée à aider pour le projet.' },
  { wordId: 'en-146', sentence: 'He speaks three {word} languages fluently.', translation: 'Il parle couramment trois langues étrangères.' },
  { wordId: 'en-148', sentence: 'The view from the top was {word}.', translation: 'La vue depuis le sommet était formidable.' },
  { wordId: 'en-150', sentence: 'He\'s too {word} to admit he was wrong.', translation: 'Il est trop têtu pour admettre qu\'il avait tort.' },
  { wordId: 'en-155', sentence: 'The bus stop is very {word}, just around the corner.', translation: 'L\'arrêt de bus est très pratique, juste au coin.' },
  { wordId: 'en-160', sentence: 'She gave a very {word} argument.', translation: 'Elle a donné un argument très convaincant.' },
  { wordId: 'en-161', sentence: 'Don\'t be so {word}, think about others too.', translation: 'Ne sois pas si égoïste, pense aussi aux autres.' },
  { wordId: 'en-166', sentence: 'The {word} businessman donated millions.', translation: 'L\'homme d\'affaires riche a donné des millions.' },

  // English - Verbs
  { wordId: 'en-180', sentence: 'She managed to {word} her fear of flying.', translation: 'Elle a réussi à surmonter sa peur de l\'avion.' },
  { wordId: 'en-185', sentence: 'You should {word} eating too much sugar.', translation: 'Tu devrais éviter de manger trop de sucre.' },
  { wordId: 'en-187', sentence: 'Let\'s {word} all the information first.', translation: 'Rassemblons d\'abord toutes les informations.' },
  { wordId: 'en-189', sentence: 'We need to {word} an agreement soon.', translation: 'Nous devons atteindre un accord bientôt.' },
  { wordId: 'en-195', sentence: 'I want to {word} how important this is.', translation: 'Je veux souligner à quel point c\'est important.' },
  { wordId: 'en-198', sentence: 'It\'s difficult to {word} the weather accurately.', translation: 'Il est difficile de prévoir la météo avec précision.' },
  { wordId: 'en-202', sentence: 'He always tries to {word} his promises.', translation: 'Il essaie toujours de remplir ses promesses.' },
  { wordId: 'en-204', sentence: 'This feature will {word} the user experience.', translation: 'Cette fonctionnalité va améliorer l\'expérience utilisateur.' },
  { wordId: 'en-214', sentence: '{word} the water before adding the pasta.', translation: 'Fais bouillir l\'eau avant d\'ajouter les pâtes.' },
  { wordId: 'en-221', sentence: 'Don\'t {word} that away, we can recycle it.', translation: 'Ne jette pas ça, on peut le recycler.' },
  { wordId: 'en-227', sentence: 'The guests started to {word} about the food.', translation: 'Les invités ont commencé à se plaindre de la nourriture.' },
  { wordId: 'en-228', sentence: 'Can I {word} your pen for a minute?', translation: 'Je peux emprunter ton stylo une minute ?' },

  // English - Nouns
  { wordId: 'en-230', sentence: 'His {word} comes from years of hard work.', translation: 'Sa richesse vient d\'années de travail acharné.' },
  { wordId: 'en-232', sentence: 'The debt was a heavy {word} on the family.', translation: 'La dette était un lourd fardeau pour la famille.' },
  { wordId: 'en-235', sentence: 'They walked along the forest {word}.', translation: 'Ils ont marché le long du chemin forestier.' },
  { wordId: 'en-247', sentence: 'The {word} cheered when the team scored.', translation: 'La foule a acclamé quand l\'équipe a marqué.' },
  { wordId: 'en-250', sentence: 'There\'s a high {word} of rain tomorrow.', translation: 'Il y a une forte probabilité de pluie demain.' },
  { wordId: 'en-252', sentence: 'The {word} revealed interesting results.', translation: 'L\'enquête a révélé des résultats intéressants.' },
  { wordId: 'en-257', sentence: '{word} is important in any relationship.', translation: 'L\'équité est importante dans toute relation.' },
  { wordId: 'en-269', sentence: 'My daily {word} takes about 45 minutes.', translation: 'Mon trajet quotidien prend environ 45 minutes.' },

  // English - Expressions
  { wordId: 'en-113', sentence: 'I\'ll always {word}.', translation: 'Je veillerai toujours sur toi.' },
  { wordId: 'en-114', sentence: 'I promise I won\'t {word}.', translation: 'Je te promets que je ne te laisserai pas tomber.' },
  { wordId: 'en-117', sentence: 'We need to {word} what happened.', translation: 'On doit découvrir ce qui s\'est passé.' },
  { wordId: 'en-119', sentence: 'Let\'s {word} with the meeting.', translation: 'Continuons la réunion.' },
  { wordId: 'en-123', sentence: '{word}, we can\'t come to the party.', translation: 'Malheureusement, nous ne pouvons pas venir à la fête.' },
  { wordId: 'en-126', sentence: 'The answer is {word} what we expected.', translation: 'La réponse est au-delà de ce que nous attendions.' },

  // Spanish - Housing
  { wordId: 'es-1', sentence: 'El {word} vino a arreglar el grifo.', translation: 'Le plombier est venu réparer le robinet.' },
  { wordId: 'es-7', sentence: 'El {word} de la cocina está atascado.', translation: 'L\'évier de la cuisine est bouché.' },
  { wordId: 'es-8', sentence: 'Necesitamos un nuevo {word} de agua.', translation: 'Nous avons besoin d\'un nouveau chauffe-eau.' },
  { wordId: 'es-9', sentence: 'Guardé las cajas viejas en el {word}.', translation: 'J\'ai rangé les vieilles boîtes dans le sous-sol.' },
  { wordId: 'es-11', sentence: 'Hay una grieta en la {word} del salón.', translation: 'Il y a une fissure dans le mur du salon.' },
  { wordId: 'es-16', sentence: 'Necesito {word} la puerta del baño.', translation: 'Je dois réparer la porte de la salle de bain.' },
  { wordId: 'es-17', sentence: 'Me encanta mi {word}, es muy acogedor.', translation: 'J\'adore mon foyer, il est très accueillant.' },

  // Spanish - Cleaning
  { wordId: 'es-18', sentence: 'La {word} hace un ruido extraño.', translation: 'La machine à laver fait un bruit étrange.' },
  { wordId: 'es-19', sentence: 'Tengo que {word} las camisas para mañana.', translation: 'Je dois repasser les chemises pour demain.' },
  { wordId: 'es-22', sentence: 'No queda {word} en el baño.', translation: 'Il ne reste plus de savon dans la salle de bain.' },
  { wordId: 'es-23', sentence: 'Hay que {word} los platos después de lavarlos.', translation: 'Il faut rincer la vaisselle après l\'avoir lavée.' },
  { wordId: 'es-28', sentence: 'Necesito {word} la ropa antes del viernes.', translation: 'Je dois laver les vêtements avant vendredi.' },
  { wordId: 'es-34', sentence: 'Vamos a {word} toda la casa hoy.', translation: 'On va nettoyer toute la maison aujourd\'hui.' },
  { wordId: 'es-35', sentence: '¿Dónde está la {word}? Necesito barrer.', translation: 'Où est le balai ? J\'ai besoin de balayer.' },
  { wordId: 'es-37', sentence: 'Hay que {word} el suelo de la cocina.', translation: 'Il faut balayer le sol de la cuisine.' },

  // Spanish - Household
  { wordId: 'es-39', sentence: 'Guardé toda la ropa en el {word}.', translation: 'J\'ai rangé tous les vêtements dans l\'armoire.' },
  { wordId: 'es-40', sentence: 'Vamos a renovar la {word} este verano.', translation: 'On va rénover la cuisine cet été.' },
  { wordId: 'es-42', sentence: 'La {word} es muy cómoda para dormir.', translation: 'Le lit est très confortable pour dormir.' },
  { wordId: 'es-43', sentence: 'Pon los platos en la {word}.', translation: 'Mets les assiettes sur la table.' },

  // Spanish - Verbs
  { wordId: 'es-53', sentence: 'No olvides {word} la puerta con llave.', translation: 'N\'oublie pas de fermer la porte à clé.' },
  { wordId: 'es-54', sentence: 'No puedo {word} entradas para el concierto.', translation: 'Je n\'arrive pas à obtenir des billets pour le concert.' },
  { wordId: 'es-57', sentence: 'Necesito {word} la luz del salón.', translation: 'J\'ai besoin d\'allumer la lumière du salon.' },
  { wordId: 'es-63', sentence: 'Vamos a {word} a cenar esta noche.', translation: 'On va sortir dîner ce soir.' },
  { wordId: 'es-64', sentence: 'No puedo {word} dónde dejé las llaves.', translation: 'Je n\'arrive pas à me souvenir où j\'ai laissé les clés.' },
  { wordId: 'es-65', sentence: 'Hay que {word} las instrucciones del manual.', translation: 'Il faut suivre les instructions du manuel.' },
  { wordId: 'es-74', sentence: 'No debes {word} el vaso hasta el borde.', translation: 'Tu ne dois pas remplir le verre jusqu\'au bord.' },
  { wordId: 'es-75', sentence: 'Tenemos que {word} energía este invierno.', translation: 'Nous devons économiser de l\'énergie cet hiver.' },
  { wordId: 'es-80', sentence: 'Quiero {word} mi nivel de español.', translation: 'Je veux améliorer mon niveau d\'espagnol.' },

  // Spanish - Adjectives
  { wordId: 'es-85', sentence: 'La receta es muy {word} de preparar.', translation: 'La recette est très simple à préparer.' },
  { wordId: 'es-87', sentence: 'El refrigerador está completamente {word}.', translation: 'Le réfrigérateur est complètement vide.' },
  { wordId: 'es-90', sentence: 'El apartamento está muy {word} y ordenado.', translation: 'L\'appartement est très propre et rangé.' },
  { wordId: 'es-91', sentence: 'La cocina está muy {word} después de cocinar.', translation: 'La cuisine est très sale après avoir cuisiné.' },
  { wordId: 'es-92', sentence: 'El grifo está {word}, hay que cambiarlo.', translation: 'Le robinet est cassé, il faut le changer.' },
  { wordId: 'es-94', sentence: 'Esta película es muy {word}, me dormí.', translation: 'Ce film est très ennuyeux, je me suis endormi.' },

  // Spanish - Expressions
  { wordId: 'es-97', sentence: 'Tengo muchas {word} de viajar este verano.', translation: 'J\'ai très envie de voyager cet été.' },
  { wordId: 'es-101', sentence: 'Me da mucha {word} levantarme temprano.', translation: 'J\'ai beaucoup de flemme de me lever tôt.' },
  { wordId: 'es-110', sentence: '{word} tú cocinas, yo limpio.', translation: 'Pendant que tu cuisines, moi je nettoie.' },
  { wordId: 'es-112', sentence: '{word} llego tarde al trabajo los lunes.', translation: 'J\'arrive toujours en retard au travail le lundi.' },
  { wordId: 'es-115', sentence: 'Hay {word} ruido en esta calle.', translation: 'Il y a trop de bruit dans cette rue.' },
  { wordId: 'es-116', sentence: 'Tengo mucha {word}, vamos a comer.', translation: 'J\'ai très faim, allons manger.' },
];

export function getSentenceForWord(wordId: string): SentenceTemplate | undefined {
  return sentenceTemplates.find((s) => s.wordId === wordId);
}

export function getWordsWithSentences(): string[] {
  return sentenceTemplates.map((s) => s.wordId);
}
