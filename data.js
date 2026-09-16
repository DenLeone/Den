/* ------------------------------------------------------------------
   Catalogo locale: saghe + film curati.
   Nessuna API, nessuna chiave: è la base dei consigli in "Scopri".
   Campi: t=titolo IT, o=titolo originale, y=anno, g=generi,
          d=regia, p=pitch, tg=tag umore
   ------------------------------------------------------------------ */
(function (root) {
  'use strict';

  const FRANCHISES = {
    mcu: { label: 'Marvel MCU', aliases: ['mcu', 'marvel cinematic universe', 'marvel'], titles: [
      'Iron Man', 'L\'incredibile Hulk', 'Iron Man 2', 'Thor', 'Captain America - Il primo Vendicatore', 'The Avengers',
      'Iron Man 3', 'Thor - The Dark World', 'Captain America - The Winter Soldier', 'Guardiani della Galassia', 'Avengers - Age of Ultron', 'Ant-Man',
      'Captain America - Civil War', 'Doctor Strange', 'Guardiani della Galassia Vol. 2', 'Spider-Man - Homecoming', 'Thor - Ragnarok', 'Black Panther', 'Avengers - Infinity War', 'Ant-Man and the Wasp', 'Captain Marvel', 'Avengers - Endgame', 'Spider-Man - Far From Home',
      'Black Widow', 'Shang-Chi e la leggenda dei Dieci Anelli', 'Eternals', 'Spider-Man - No Way Home', 'Doctor Strange nel Multiverso della Follia', 'Thor - Love and Thunder', 'Black Panther - Wakanda Forever',
      'Ant-Man and the Wasp - Quantumania', 'Guardiani della Galassia Vol. 3', 'The Marvels', 'Deadpool & Wolverine'
    ] },
    xmen: { label: 'X-Men', aliases: ['x men', 'xmen'], titles: [
      'X-Men', 'X2', 'X-Men - Conflitto finale', 'X-Men le origini - Wolverine', 'X-Men - L\'inizio', 'The Wolverine', 'X-Men - Giorni di un futuro passato', 'X-Men Apocalisse', 'Logan', 'Deadpool', 'Deadpool 2', 'Dark Phoenix', 'The New Mutants'
    ] },
    alien: { label: 'Alien', aliases: ['alien saga'], titles: [
      'Alien', 'Aliens - Scontro finale', 'Alien 3', 'Alien - La clonazione', 'Prometheus', 'Alien: Covenant', 'Alien: Romulus'
    ] },
    starwars: { label: 'Star Wars', aliases: ['guerre stellari'], titles: [
      'Star Wars - Una nuova speranza', 'L\'Impero colpisce ancora', 'Il ritorno dello Jedi', 'La minaccia fantasma', 'L\'attacco dei cloni', 'La vendetta dei Sith', 'Il risveglio della Forza', 'Rogue One', 'Gli ultimi Jedi', 'Solo: A Star Wars Story', 'L\'ascesa di Skywalker'
    ] },
    harrypotter: { label: 'Harry Potter', aliases: ['hp'], titles: [
      'Harry Potter e la pietra filosofale', 'Harry Potter e la camera dei segreti', 'Harry Potter e il prigioniero di Azkaban', 'Harry Potter e il calice di fuoco', 'Harry Potter e l\'ordine della fenice', 'Harry Potter e il principe mezzosangue', 'Harry Potter e i doni della morte - Parte 1', 'Harry Potter e i doni della morte - Parte 2'
    ] },
    animalifantastici: { label: 'Animali fantastici', aliases: ['fantastic beasts'], titles: [
      'Animali fantastici e dove trovarli', 'Animali fantastici - I crimini di Grindelwald', 'Animali fantastici - I segreti di Silente'
    ] },
    lotr: { label: 'Il Signore degli Anelli', aliases: ['signore degli anelli', 'lotr'], titles: [
      'Il Signore degli Anelli - La compagnia dell\'anello', 'Il Signore degli Anelli - Le due torri', 'Il Signore degli Anelli - Il ritorno del re'
    ] },
    hobbit: { label: 'Lo Hobbit', aliases: [], titles: [
      'Lo Hobbit - Un viaggio inaspettato', 'Lo Hobbit - La desolazione di Smaug', 'Lo Hobbit - La battaglia delle cinque armate'
    ] },
    johnwick: { label: 'John Wick', aliases: [], titles: [
      'John Wick', 'John Wick Capitolo 2', 'John Wick Capitolo 3 - Parabellum', 'John Wick Capitolo 4'
    ] },
    jurassic: { label: 'Jurassic Park', aliases: ['jurassic world'], titles: [
      'Jurassic Park', 'Il mondo perduto - Jurassic Park', 'Jurassic Park III', 'Jurassic World', 'Jurassic World - Il regno distrutto', 'Jurassic World - Il dominio'
    ] },
    fastfurious: { label: 'Fast & Furious', aliases: ['fast and furious'], titles: [
      'Fast and Furious', '2 Fast 2 Furious', 'Fast & Furious - Tokyo Drift', 'Fast & Furious', 'Fast & Furious 5', 'Fast & Furious 6', 'Fast & Furious 7', 'Fast & Furious 8', 'Fast & Furious 9', 'Fast X'
    ] },
    missionimpossible: { label: 'Mission: Impossible', aliases: ['mission impossible'], titles: [
      'Mission: Impossible', 'Mission: Impossible 2', 'Mission: Impossible III', 'Mission: Impossible - Protocollo Fantasma', 'Mission: Impossible - Rogue Nation', 'Mission: Impossible - Fallout', 'Mission: Impossible - Dead Reckoning Parte 1', 'Mission: Impossible - The Final Reckoning'
    ] },
    matrix: { label: 'Matrix', aliases: [], titles: [
      'Matrix', 'Matrix Reloaded', 'Matrix Revolutions', 'Matrix Resurrections'
    ] },
    terminator: { label: 'Terminator', aliases: [], titles: [
      'Terminator', 'Terminator 2 - Il giorno del giudizio', 'Terminator 3 - Le macchine ribelli', 'Terminator Salvation', 'Terminator Genisys', 'Terminator - Destino Oscuro'
    ] },
    rocky: { label: 'Rocky & Creed', aliases: ['rocky', 'creed'], titles: [
      'Rocky', 'Rocky II', 'Rocky III', 'Rocky IV', 'Rocky V', 'Rocky Balboa', 'Creed', 'Creed II', 'Creed III'
    ] },
    toystory: { label: 'Toy Story', aliases: [], titles: [
      'Toy Story', 'Toy Story 2', 'Toy Story 3', 'Toy Story 4'
    ] },
    piratidca: { label: 'Pirati dei Caraibi', aliases: ['pirates of the caribbean'], titles: [
      'La maledizione della prima luna', 'La maledizione del forziere fantasma', 'Ai confini del mondo', 'Oltre i confini del mare', 'La vendetta di Salazar'
    ] },
    batman: { label: 'Batman', aliases: ['dark knight'], titles: [
      'Batman Begins', 'Il cavaliere oscuro', 'Il cavaliere oscuro - Il ritorno', 'The Batman'
    ] },
    predator: { label: 'Predator', aliases: ['predators'], titles: [
      'Predator', 'Predator 2', 'Predators', 'The Predator', 'Prey', 'Predator: Badlands'
    ] },
    avp: { label: 'Alien vs Predator', aliases: ['avp'], titles: [
      'Alien vs. Predator', 'Aliens vs. Predator 2'
    ] },
    dceu: { label: 'DC Universe', aliases: ['dc', 'dceu', 'justice league'], titles: [
      'L\'uomo d\'acciaio', 'Batman v Superman - Dawn of Justice', 'Suicide Squad', 'Wonder Woman', 'Justice League', 'Aquaman', 'Shazam!', 'Birds of Prey', 'Wonder Woman 1984', 'Zack Snyder\'s Justice League', 'The Suicide Squad - Missione suicida', 'Black Adam', 'Shazam! Furia degli dei', 'The Flash', 'Blue Beetle', 'Aquaman e il regno perduto'
    ] },
    indianajones: { label: 'Indiana Jones', aliases: [], titles: [
      'I predatori dell\'arca perduta', 'Indiana Jones e il tempio maledetto', 'Indiana Jones e l\'ultima crociata', 'Indiana Jones e il regno del teschio di cristallo', 'Indiana Jones e il quadrante del destino'
    ] },
    bond: { label: 'James Bond 007', aliases: ['007', 'james bond'], titles: [
      'Agente 007 - Licenza di uccidere', 'Agente 007 - Dalla Russia con amore', 'Agente 007 - Missione Goldfinger', 'Agente 007 - Thunderball: Operazione tuono', 'Agente 007 - Si vive solo due volte', 'Agente 007 - Al servizio segreto di Sua Maestà', 'Agente 007 - Una cascata di diamanti', 'Agente 007 - Vivi e lascia morire', 'Agente 007 - L\'uomo dalla pistola d\'oro', 'La spia che mi amava', 'Moonraker - Operazione spazio', 'Solo per i tuoi occhi', 'Octopussy - Operazione piovra', '007 Bersaglio mobile', '007 Zona pericolo', '007 Vendetta privata', 'GoldenEye', 'Il domani non muore mai', 'Il mondo non basta', 'La morte può attendere', 'Casino Royale', 'Quantum of Solace', 'Skyfall', 'Spectre', 'No Time to Die'
    ] },
    spiderman: { label: 'Spider-Man (Raimi & Webb)', aliases: ['spiderman', 'uomo ragno'], titles: [
      'Spider-Man', 'Spider-Man 2', 'Spider-Man 3', 'The Amazing Spider-Man', 'The Amazing Spider-Man 2 - Il potere di Electro'
    ] },
    spiderverse: { label: 'Spider-Man Spider-Verse', aliases: ['spider verse'], titles: [
      'Spider-Man - Un nuovo universo', 'Spider-Man - Across the Spider-Verse'
    ] },
    hungergames: { label: 'Hunger Games', aliases: [], titles: [
      'Hunger Games', 'Hunger Games: La ragazza di fuoco', 'Hunger Games: Il canto della rivolta - Parte 1', 'Hunger Games: Il canto della rivolta - Parte 2', 'Hunger Games: La ballata dell\'usignolo e del serpente'
    ] },
    ritornofuturo: { label: 'Ritorno al futuro', aliases: ['back to the future'], titles: [
      'Ritorno al futuro', 'Ritorno al futuro - Parte II', 'Ritorno al futuro - Parte III'
    ] },
    padrino: { label: 'Il Padrino', aliases: ['godfather'], titles: [
      'Il padrino', 'Il padrino - Parte II', 'Il padrino - Parte III'
    ] },
    rambo: { label: 'Rambo', aliases: [], titles: [
      'Rambo', 'Rambo 2 - La vendetta', 'Rambo III', 'John Rambo', 'Rambo: Last Blood'
    ] },
    diehard: { label: 'Die Hard', aliases: ['trappola di cristallo'], titles: [
      'Trappola di cristallo', '58 minuti per morire - Die Harder', 'Die Hard - Duri a morire', 'Die Hard - Vivere o morire', 'Die Hard - Un buon giorno per morire'
    ] },
    madmax: { label: 'Mad Max', aliases: ['interceptor'], titles: [
      'Interceptor', 'Interceptor - Il guerriero della strada', 'Mad Max - Oltre la sfera del tuono', 'Mad Max: Fury Road', 'Furiosa: A Mad Max Saga'
    ] },
    scimmie: { label: 'Il pianeta delle scimmie', aliases: ['planet of the apes'], titles: [
      'L\'alba del pianeta delle scimmie', 'Apes Revolution - Il pianeta delle scimmie', 'The War - Il pianeta delle scimmie', 'Il regno del pianeta delle scimmie'
    ] },
    monsterverse: { label: 'Godzilla & Kong', aliases: ['monsterverse', 'godzilla', 'king kong'], titles: [
      'Godzilla', 'Kong: Skull Island', 'Godzilla II - King of the Monsters', 'Godzilla vs. Kong', 'Godzilla e Kong - Il nuovo impero'
    ] },
    transformers: { label: 'Transformers', aliases: [], titles: [
      'Transformers', 'Transformers - La vendetta del caduto', 'Transformers 3', 'Transformers 4 - L\'era dell\'estinzione', 'Transformers - L\'ultimo cavaliere', 'Bumblebee', 'Transformers - Il risveglio'
    ] },
    bourne: { label: 'Jason Bourne', aliases: ['bourne'], titles: [
      'The Bourne Identity', 'The Bourne Supremacy', 'The Bourne Ultimatum - Il ritorno dello sciacallo', 'The Bourne Legacy', 'Jason Bourne'
    ] },
    mib: { label: 'Men in Black', aliases: ['mib'], titles: [
      'Men in Black', 'Men in Black II', 'Men in Black 3', 'Men in Black: International'
    ] },
    ghostbusters: { label: 'Ghostbusters', aliases: ['acchiappafantasmi'], titles: [
      'Ghostbusters - Acchiappafantasmi', 'Ghostbusters II', 'Ghostbusters (2016)', 'Ghostbusters: Legacy', 'Ghostbusters: Minaccia glaciale'
    ] },
    oceans: { label: 'Ocean\'s', aliases: [], titles: [
      'Ocean\'s Eleven', 'Ocean\'s Twelve', 'Ocean\'s Thirteen', 'Ocean\'s 8'
    ] },
    jumanji: { label: 'Jumanji', aliases: [], titles: [
      'Jumanji', 'Jumanji - Benvenuti nella giungla', 'Jumanji - The Next Level'
    ] },
    narnia: { label: 'Le cronache di Narnia', aliases: ['narnia'], titles: [
      'Le cronache di Narnia - Il leone, la strega e l\'armadio', 'Le cronache di Narnia - Il principe Caspian', 'Le cronache di Narnia - Il viaggio del veliero'
    ] },
    twilight: { label: 'Twilight', aliases: [], titles: [
      'Twilight', 'The Twilight Saga: New Moon', 'The Twilight Saga: Eclipse', 'The Twilight Saga: Breaking Dawn - Parte 1', 'The Twilight Saga: Breaking Dawn - Parte 2'
    ] },
    scream: { label: 'Scream', aliases: [], titles: [
      'Scream', 'Scream 2', 'Scream 3', 'Scream 4', 'Scream (2022)', 'Scream VI'
    ] },
    conjuring: { label: 'The Conjuring', aliases: ['evocazione', 'annabelle'], titles: [
      'L\'evocazione - The Conjuring', 'The Conjuring - Il caso Enfield', 'The Conjuring - Per ordine del diavolo', 'Annabelle', 'Annabelle 2 - Creation', 'Annabelle 3'
    ] },
    shrek: { label: 'Shrek', aliases: [], titles: [
      'Shrek', 'Shrek 2', 'Shrek terzo', 'Shrek e vissero felici e contenti'
    ] },
    cattivissimo: { label: 'Cattivissimo me & Minions', aliases: ['minions', 'despicable me'], titles: [
      'Cattivissimo me', 'Cattivissimo me 2', 'Minions', 'Cattivissimo me 3', 'Minions - Come Gru diventa cattivissimo', 'Cattivissimo me 4'
    ] },
    eraglaciale: { label: 'L\'era glaciale', aliases: ['ice age'], titles: [
      'L\'era glaciale', 'L\'era glaciale 2 - Il disgelo', 'L\'era glaciale 3 - L\'alba dei dinosauri', 'L\'era glaciale 4 - Continenti alla deriva', 'L\'era glaciale - In rotta di collisione'
    ] },
    dragontrainer: { label: 'Dragon Trainer', aliases: ['how to train your dragon'], titles: [
      'Dragon Trainer', 'Dragon Trainer 2', 'Dragon Trainer - Il mondo nascosto'
    ] },
    kungfupanda: { label: 'Kung Fu Panda', aliases: [], titles: [
      'Kung Fu Panda', 'Kung Fu Panda 2', 'Kung Fu Panda 3', 'Kung Fu Panda 4'
    ] },
    sherlock: { label: 'Sherlock Holmes', aliases: [], titles: [
      'Sherlock Holmes', 'Sherlock Holmes - Gioco di ombre'
    ] },
    dune: { label: 'Dune', aliases: [], titles: [
      'Dune', 'Dune - Parte due'
    ] },
    knivesout: { label: 'Knives Out', aliases: ['cena con delitto'], titles: [
      'Cena con delitto - Knives Out', 'Glass Onion - Knives Out', 'Wake Up Dead Man - Knives Out'
    ] },
    avatar: { label: 'Avatar', aliases: [], titles: [
      'Avatar', 'Avatar - La via dell\'acqua', 'Avatar - Fuoco e cenere'
    ] },
    lentoolerta: { label: 'Cars', aliases: ['cars'], titles: [
      'Cars - Motori ruggenti', 'Cars 2', 'Cars 3'
    ] },
    incredibili: { label: 'Gli Incredibili', aliases: ['incredibles'], titles: [
      'Gli Incredibili - Una "normale" famiglia di supereroi', 'Gli Incredibili 2'
    ] }
  };

  /* Catalogo curato: la benzina dei consigli.
     g = generi, tg = umore/occasione */
  const CATALOG = [
    // ---- Pilastri / classici assoluti ----
    { t: 'Il padrino', o: 'The Godfather', y: 1972, g: ['Crime', 'Drammatico'], d: 'Francis Ford Coppola', p: 'Una famiglia mafiosa diventa il ritratto definitivo del potere americano.', tg: ['classico'] },
    { t: 'Il padrino - Parte II', o: 'The Godfather Part II', y: 1974, g: ['Crime', 'Drammatico'], d: 'Francis Ford Coppola', p: 'Ascesa e disfatta in parallelo: forse il miglior sequel mai girato.', tg: ['classico'] },
    { t: 'Quarto potere', o: 'Citizen Kane', y: 1941, g: ['Drammatico', 'Mistero'], d: 'Orson Welles', p: 'L\'uomo più ricco del mondo muore sussurrando una parola sola.', tg: ['classico'] },
    { t: 'Casablanca', o: 'Casablanca', y: 1942, g: ['Romantico', 'Drammatico'], d: 'Michael Curtiz', p: 'Amore e sacrificio in un bar del Marocco in guerra.', tg: ['classico', 'serata'] },
    { t: 'Le ali della libertà', o: 'The Shawshank Redemption', y: 1994, g: ['Drammatico'], d: 'Frank Darabont', p: 'Vent\'anni di prigione per dimostrare che la speranza è una cosa buona.', tg: ['classico', 'lacrime'] },
    { t: 'Pulp Fiction', o: 'Pulp Fiction', y: 1994, g: ['Crime', 'Drammatico'], d: 'Quentin Tarantino', p: 'Tre storie criminali montate a incastro che hanno riscritto gli anni \'90.', tg: ['classico'] },
    { t: 'Quei bravi ragazzi', o: 'Goodfellas', y: 1990, g: ['Crime', 'Drammatico'], d: 'Martin Scorsese', p: 'Trent\'anni dentro Cosa Nostra raccontati alla velocità della cocaina.', tg: ['classico'] },
    { t: 'Taxi Driver', o: 'Taxi Driver', y: 1976, g: ['Drammatico', 'Crime'], d: 'Martin Scorsese', p: 'Un tassista insonne decide di ripulire New York da solo.', tg: ['classico'] },
    { t: 'Toro scatenato', o: 'Raging Bull', y: 1980, g: ['Drammatico', 'Sportivo'], d: 'Martin Scorsese', p: 'Jake LaMotta distrugge tutto quello che ama, dentro e fuori dal ring.', tg: ['classico'] },
    { t: 'Il silenzio degli innocenti', o: 'The Silence of the Lambs', y: 1991, g: ['Thriller', 'Crime'], d: 'Jonathan Demme', p: 'Per prendere un serial killer bisogna chiedere aiuto a un altro serial killer.', tg: ['classico', 'adrenalina'] },
    { t: 'Se7en', o: 'Se7en', y: 1995, g: ['Thriller', 'Crime'], d: 'David Fincher', p: 'Sette peccati capitali, sette delitti, un finale che non si dimentica.', tg: ['adrenalina'] },
    { t: 'Fight Club', o: 'Fight Club', y: 1999, g: ['Drammatico', 'Thriller'], d: 'David Fincher', p: 'La prima regola è che non se ne parla.', tg: ['cervello'] },
    { t: 'Forrest Gump', o: 'Forrest Gump', y: 1994, g: ['Drammatico', 'Romantico'], d: 'Robert Zemeckis', p: 'Mezzo secolo di storia americana attraversato per caso e col cuore.', tg: ['classico', 'lacrime', 'serata'] },
    { t: 'Schindler\'s List', o: 'Schindler\'s List', y: 1993, g: ['Drammatico', 'Storico', 'Guerra'], d: 'Steven Spielberg', p: 'Un industriale tedesco compra vite umane una lista alla volta.', tg: ['classico', 'lacrime'] },
    { t: 'Apocalypse Now', o: 'Apocalypse Now', y: 1979, g: ['Guerra', 'Drammatico'], d: 'Francis Ford Coppola', p: 'Risalire un fiume vietnamita fino al cuore della follia.', tg: ['classico'] },
    { t: 'Full Metal Jacket', o: 'Full Metal Jacket', y: 1987, g: ['Guerra', 'Drammatico'], d: 'Stanley Kubrick', p: 'Come si fabbrica un soldato e cosa resta dell\'uomo dopo.', tg: ['classico'] },
    { t: 'Shining', o: 'The Shining', y: 1980, g: ['Horror', 'Thriller'], d: 'Stanley Kubrick', p: 'Un albergo vuoto, un inverno lungo, una famiglia che si sgretola.', tg: ['classico', 'paura'] },
    { t: '2001: Odissea nello spazio', o: '2001: A Space Odyssey', y: 1968, g: ['Fantascienza'], d: 'Stanley Kubrick', p: 'Dalla scimmia alle stelle, con un computer che non vuole morire.', tg: ['classico', 'cervello'] },
    { t: 'Arancia meccanica', o: 'A Clockwork Orange', y: 1971, g: ['Drammatico', 'Fantascienza'], d: 'Stanley Kubrick', p: 'Violenza, Beethoven e una cura peggiore del male.', tg: ['classico', 'cervello'] },
    { t: 'Blade Runner', o: 'Blade Runner', y: 1982, g: ['Fantascienza', 'Noir'], d: 'Ridley Scott', p: 'Cacciare replicanti in una Los Angeles che piove per sempre.', tg: ['classico', 'cervello'] },
    { t: 'Blade Runner 2049', o: 'Blade Runner 2049', y: 2017, g: ['Fantascienza', 'Drammatico'], d: 'Denis Villeneuve', p: 'Trent\'anni dopo, un nuovo blade runner scopre un segreto impossibile.', tg: ['cervello'] },
    { t: 'C\'era una volta il West', o: 'Once Upon a Time in the West', y: 1968, g: ['Western'], d: 'Sergio Leone', p: 'Leone e Morricone trasformano il western in opera lirica.', tg: ['classico'] },
    { t: 'Il buono, il brutto, il cattivo', o: 'Il buono, il brutto, il cattivo', y: 1966, g: ['Western', 'Avventura'], d: 'Sergio Leone', p: 'Tre uomini, una tomba piena d\'oro, un duello leggendario.', tg: ['classico'] },
    { t: 'C\'era una volta in America', o: 'Once Upon a Time in America', y: 1984, g: ['Crime', 'Drammatico'], d: 'Sergio Leone', p: 'Quattro ore di amicizia, tradimento e oppio lunghe una vita.', tg: ['classico'] },
    { t: 'Psyco', o: 'Psycho', y: 1960, g: ['Horror', 'Thriller'], d: 'Alfred Hitchcock', p: 'Non fare mai la doccia in un motel gestito da un ragazzo troppo gentile.', tg: ['classico', 'paura'] },
    { t: 'La finestra sul cortile', o: 'Rear Window', y: 1954, g: ['Thriller', 'Mistero'], d: 'Alfred Hitchcock', p: 'Un fotografo ingessato spia i vicini e vede un omicidio. Forse.', tg: ['classico'] },
    { t: 'Vertigo - La donna che visse due volte', o: 'Vertigo', y: 1958, g: ['Thriller', 'Mistero'], d: 'Alfred Hitchcock', p: 'L\'ossessione amorosa filmata come una spirale che non finisce.', tg: ['classico'] },

    // ---- Nolan & co. ----
    { t: 'Inception', o: 'Inception', y: 2010, g: ['Fantascienza', 'Azione'], d: 'Christopher Nolan', p: 'Rubare un\'idea entrando in un sogno dentro un sogno dentro un sogno.', tg: ['cervello', 'adrenalina'] },
    { t: 'Interstellar', o: 'Interstellar', y: 2014, g: ['Fantascienza', 'Drammatico'], d: 'Christopher Nolan', p: 'Attraversare un wormhole per salvare la Terra e tornare da tua figlia.', tg: ['cervello', 'lacrime', 'serata'] },
    { t: 'Memento', o: 'Memento', y: 2000, g: ['Thriller', 'Mistero'], d: 'Christopher Nolan', p: 'Un uomo senza memoria a breve termine indaga sull\'omicidio della moglie. Al contrario.', tg: ['cervello'] },
    { t: 'The Prestige', o: 'The Prestige', y: 2006, g: ['Mistero', 'Drammatico'], d: 'Christopher Nolan', p: 'Due illusionisti si distruggono a vicenda per un trucco impossibile.', tg: ['cervello'] },
    { t: 'Dunkirk', o: 'Dunkirk', y: 2017, g: ['Guerra', 'Thriller'], d: 'Christopher Nolan', p: 'Terra, mare e cielo: tre tempi diversi per una sola evacuazione.', tg: ['adrenalina'] },
    { t: 'Tenet', o: 'Tenet', y: 2020, g: ['Fantascienza', 'Azione'], d: 'Christopher Nolan', p: 'Una guerra combattuta con il tempo che scorre all\'indietro.', tg: ['cervello'] },
    { t: 'Oppenheimer', o: 'Oppenheimer', y: 2023, g: ['Biografico', 'Drammatico', 'Storico'], d: 'Christopher Nolan', p: 'L\'uomo che costruì la bomba e passò il resto della vita a pentirsene.', tg: ['cervello'] },

    // ---- Fincher, Villeneuve, Scorsese moderni ----
    { t: 'Zodiac', o: 'Zodiac', y: 2007, g: ['Thriller', 'Crime', 'Mistero'], d: 'David Fincher', p: 'L\'ossessione per un serial killer mai catturato divora tre uomini.', tg: ['cervello'] },
    { t: 'L\'amore bugiardo - Gone Girl', o: 'Gone Girl', y: 2014, g: ['Thriller', 'Mistero'], d: 'David Fincher', p: 'La moglie perfetta sparisce e il marito diventa il mostro d\'America.', tg: ['adrenalina', 'serata'] },
    { t: 'The Social Network', o: 'The Social Network', y: 2010, g: ['Drammatico', 'Biografico'], d: 'David Fincher', p: 'Come si fonda Facebook perdendo ogni amico che hai.', tg: ['cervello'] },
    { t: 'Arrival', o: 'Arrival', y: 2016, g: ['Fantascienza', 'Drammatico'], d: 'Denis Villeneuve', p: 'Dodici astronavi, una linguista, e un modo nuovo di vedere il tempo.', tg: ['cervello', 'lacrime'] },
    { t: 'Sicario', o: 'Sicario', y: 2015, g: ['Thriller', 'Crime'], d: 'Denis Villeneuve', p: 'Al confine col Messico le regole della guerra alla droga non esistono.', tg: ['adrenalina'] },
    { t: 'Prisoners', o: 'Prisoners', y: 2013, g: ['Thriller', 'Crime', 'Drammatico'], d: 'Denis Villeneuve', p: 'Due bambine scompaiono e un padre decide di farsi giustizia.', tg: ['adrenalina'] },
    { t: 'The Wolf of Wall Street', o: 'The Wolf of Wall Street', y: 2013, g: ['Biografico', 'Commedia', 'Crime'], d: 'Martin Scorsese', p: 'Tre ore di eccessi a Wall Street raccontate come una festa che non finisce.', tg: ['risate'] },
    { t: 'The Departed - Il bene e il male', o: 'The Departed', y: 2006, g: ['Crime', 'Thriller'], d: 'Martin Scorsese', p: 'Un poliziotto infiltrato tra i gangster, un gangster infiltrato in polizia.', tg: ['adrenalina'] },
    { t: 'Shutter Island', o: 'Shutter Island', y: 2010, g: ['Thriller', 'Mistero'], d: 'Martin Scorsese', p: 'Un manicomio criminale su un\'isola e una verità che non vuoi sapere.', tg: ['cervello'] },
    { t: 'The Irishman', o: 'The Irishman', y: 2019, g: ['Crime', 'Drammatico'], d: 'Martin Scorsese', p: 'Un sicario invecchia e fa i conti con tutto quello che ha tolto al mondo.', tg: ['classico'] },
    { t: 'Killers of the Flower Moon', o: 'Killers of the Flower Moon', y: 2023, g: ['Crime', 'Drammatico', 'Storico'], d: 'Martin Scorsese', p: 'Il petrolio degli Osage porta ricchezza e una catena di omicidi.', tg: [] },

    // ---- Tarantino ----
    { t: 'Le iene', o: 'Reservoir Dogs', y: 1992, g: ['Crime', 'Thriller'], d: 'Quentin Tarantino', p: 'Una rapina finita male raccontata solo da quello che succede dopo.', tg: ['classico'] },
    { t: 'Kill Bill: Volume 1', o: 'Kill Bill: Vol. 1', y: 2003, g: ['Azione', 'Thriller'], d: 'Quentin Tarantino', p: 'Una sposa si sveglia dal coma con una lista di nomi da cancellare.', tg: ['adrenalina'] },
    { t: 'Bastardi senza gloria', o: 'Inglourious Basterds', y: 2009, g: ['Guerra', 'Drammatico'], d: 'Quentin Tarantino', p: 'Un commando ebreo dà la caccia ai nazisti nella Francia occupata.', tg: ['adrenalina'] },
    { t: 'Django Unchained', o: 'Django Unchained', y: 2012, g: ['Western', 'Drammatico'], d: 'Quentin Tarantino', p: 'Uno schiavo liberato e un cacciatore di taglie vanno a riprendersi una moglie.', tg: ['adrenalina'] },
    { t: 'C\'era una volta a... Hollywood', o: 'Once Upon a Time in Hollywood', y: 2019, g: ['Commedia', 'Drammatico'], d: 'Quentin Tarantino', p: 'La Hollywood del \'69 vista da un attore in declino e dalla sua controfigura.', tg: ['serata'] },

    // ---- Fantascienza / grandi visioni ----
    { t: 'Dune', o: 'Dune', y: 2021, g: ['Fantascienza', 'Avventura'], d: 'Denis Villeneuve', p: 'Un pianeta desertico, una spezia che vale più dell\'oro, un ragazzo profetizzato.', tg: ['cervello'] },
    { t: 'Dune - Parte due', o: 'Dune: Part Two', y: 2024, g: ['Fantascienza', 'Avventura'], d: 'Denis Villeneuve', p: 'Paul abbraccia il destino che aveva cercato di evitare.', tg: ['adrenalina'] },
    { t: 'Gravity', o: 'Gravity', y: 2013, g: ['Fantascienza', 'Thriller'], d: 'Alfonso Cuarón', p: 'Novanta minuti per tornare a terra quando lo spazio ti stacca da tutto.', tg: ['adrenalina'] },
    { t: 'Sopravvissuto - The Martian', o: 'The Martian', y: 2015, g: ['Fantascienza', 'Avventura'], d: 'Ridley Scott', p: 'Rimasto solo su Marte, un botanico decide di coltivare patate.', tg: ['serata', 'risate'] },
    { t: 'Ex Machina', o: 'Ex Machina', y: 2014, g: ['Fantascienza', 'Thriller'], d: 'Alex Garland', p: 'Un test di Turing in una villa isolata che diventa un duello psicologico.', tg: ['cervello'] },
    { t: 'Her', o: 'Her', y: 2013, g: ['Romantico', 'Fantascienza', 'Drammatico'], d: 'Spike Jonze', p: 'Un uomo solo si innamora della voce del suo sistema operativo.', tg: ['serata', 'lacrime'] },
    { t: 'Everything Everywhere All at Once', o: 'Everything Everywhere All at Once', y: 2022, g: ['Fantascienza', 'Commedia', 'Azione'], d: 'Daniel Kwan, Daniel Scheinert', p: 'Una lavanderia, un controllo fiscale e infiniti universi da salvare.', tg: ['cervello', 'risate', 'lacrime'] },
    { t: 'Children of Men - Figli degli uomini', o: 'Children of Men', y: 2006, g: ['Fantascienza', 'Drammatico'], d: 'Alfonso Cuarón', p: 'Il mondo è sterile da 18 anni, poi una ragazza resta incinta.', tg: ['cervello'] },
    { t: 'Looper - In fuga dal passato', o: 'Looper', y: 2012, g: ['Fantascienza', 'Azione'], d: 'Rian Johnson', p: 'Un sicario del futuro deve uccidere sé stesso invecchiato.', tg: ['cervello'] },
    { t: 'Edge of Tomorrow - Senza domani', o: 'Edge of Tomorrow', y: 2014, g: ['Fantascienza', 'Azione'], d: 'Doug Liman', p: 'Muori, ricomincia, impara: un soldato bloccato nello stesso giorno di guerra.', tg: ['adrenalina'] },
    { t: 'District 9', o: 'District 9', y: 2009, g: ['Fantascienza', 'Azione'], d: 'Neill Blomkamp', p: 'Gli alieni sbarcano a Johannesburg e finiscono in un campo profughi.', tg: ['cervello'] },
    { t: 'Snowpiercer', o: 'Snowpiercer', y: 2013, g: ['Fantascienza', 'Azione'], d: 'Bong Joon-ho', p: 'L\'ultima umanità vive su un treno diviso in classi sociali.', tg: ['cervello'] },
    { t: 'Ready Player One', o: 'Ready Player One', y: 2018, g: ['Fantascienza', 'Avventura'], d: 'Steven Spielberg', p: 'Una caccia al tesoro dentro il videogioco che ha sostituito il mondo.', tg: ['serata'] },
    { t: 'Minority Report', o: 'Minority Report', y: 2002, g: ['Fantascienza', 'Thriller'], d: 'Steven Spielberg', p: 'La polizia arresta gli assassini prima che uccidano. Poi tocca a te.', tg: ['cervello'] },
    { t: 'E.T. l\'extra-terrestre', o: 'E.T. the Extra-Terrestrial', y: 1982, g: ['Fantascienza', 'Avventura'], d: 'Steven Spielberg', p: 'Un bambino nasconde un alieno in camera e gli insegna a telefonare a casa.', tg: ['classico', 'family', 'lacrime'] },
    { t: 'Lo squalo', o: 'Jaws', y: 1975, g: ['Thriller', 'Avventura'], d: 'Steven Spielberg', p: 'Due note di musica e non entri più in acqua.', tg: ['classico', 'paura'] },
    { t: 'Salvate il soldato Ryan', o: 'Saving Private Ryan', y: 1998, g: ['Guerra', 'Drammatico'], d: 'Steven Spielberg', p: 'Otto uomini rischiano tutto per riportare a casa un solo soldato.', tg: ['classico'] },
    { t: 'Il Grande Gatsby', o: 'The Great Gatsby', y: 2013, g: ['Drammatico', 'Romantico'], d: 'Baz Luhrmann', p: 'Feste sfrenate e un amore impossibile nell\'America del proibizionismo.', tg: ['serata'] },

    // ---- Drammi moderni premiati ----
    { t: 'Parasite', o: '기생충', y: 2019, g: ['Thriller', 'Drammatico'], d: 'Bong Joon-ho', p: 'Una famiglia povera si infiltra in una casa ricca. Poi tutto precipita.', tg: ['cervello'] },
    { t: 'Joker', o: 'Joker', y: 2019, g: ['Drammatico', 'Thriller'], d: 'Todd Phillips', p: 'Come una città crudele fabbrica il suo clown più pericoloso.', tg: ['cervello'] },
    { t: 'Whiplash', o: 'Whiplash', y: 2014, g: ['Drammatico', 'Musical'], d: 'Damien Chazelle', p: 'Un batterista e un insegnante che lo spinge fino a spezzarlo.', tg: ['adrenalina'] },
    { t: 'La La Land', o: 'La La Land', y: 2016, g: ['Musical', 'Romantico', 'Drammatico'], d: 'Damien Chazelle', p: 'Due sognatori a Los Angeles: o l\'amore o la carriera.', tg: ['serata', 'lacrime'] },
    { t: 'Moonlight', o: 'Moonlight', y: 2016, g: ['Drammatico'], d: 'Barry Jenkins', p: 'Tre età di un ragazzo di Miami che impara chi è.', tg: ['lacrime'] },
    { t: 'Nomadland', o: 'Nomadland', y: 2020, g: ['Drammatico'], d: 'Chloé Zhao', p: 'Una donna perde tutto e attraversa l\'America vivendo in un furgone.', tg: ['lacrime'] },
    { t: 'Il discorso del re', o: 'The King\'s Speech', y: 2010, g: ['Storico', 'Drammatico'], d: 'Tom Hooper', p: 'Un re balbuziente deve parlare alla nazione in guerra.', tg: ['serata'] },
    { t: 'Green Book', o: 'Green Book', y: 2018, g: ['Drammatico', 'Commedia', 'Biografico'], d: 'Peter Farrelly', p: 'Un buttafuori italoamericano accompagna in tour un pianista nero nel Sud segregato.', tg: ['serata', 'lacrime'] },
    { t: 'Il caso Spotlight', o: 'Spotlight', y: 2015, g: ['Drammatico', 'Biografico'], d: 'Tom McCarthy', p: 'Quattro giornalisti smontano un insabbiamento enorme, telefonata dopo telefonata.', tg: ['cervello'] },
    { t: '12 anni schiavo', o: '12 Years a Slave', y: 2013, g: ['Drammatico', 'Storico', 'Biografico'], d: 'Steve McQueen', p: 'Un uomo libero rapito e venduto come schiavo nel 1841.', tg: ['lacrime'] },
    { t: 'Il petroliere', o: 'There Will Be Blood', y: 2007, g: ['Drammatico'], d: 'Paul Thomas Anderson', p: 'Petrolio, religione e un uomo che si svuota mentre si arricchisce.', tg: ['classico'] },
    { t: 'Manchester by the Sea', o: 'Manchester by the Sea', y: 2016, g: ['Drammatico'], d: 'Kenneth Lonergan', p: 'Il dolore che non passa, raccontato senza una nota falsa.', tg: ['lacrime'] },
    { t: 'CODA - I segni del cuore', o: 'CODA', y: 2021, g: ['Drammatico', 'Musical'], d: 'Sian Heder', p: 'L\'unica udente di una famiglia sorda scopre di saper cantare.', tg: ['serata', 'lacrime'] },
    { t: 'The Revenant - Redivivo', o: 'The Revenant', y: 2015, g: ['Avventura', 'Drammatico', 'Western'], d: 'Alejandro G. Iñárritu', p: 'Sbranato da un orso e lasciato morire, striscia per duecento miglia per vendicarsi.', tg: ['adrenalina'] },
    { t: 'Birdman', o: 'Birdman', y: 2014, g: ['Drammatico', 'Commedia'], d: 'Alejandro G. Iñárritu', p: 'Un ex attore di supereroi tenta Broadway, in un unico piano sequenza.', tg: ['cervello'] },
    { t: 'Anatomia di una caduta', o: 'Anatomie d\'une chute', y: 2023, g: ['Drammatico', 'Thriller'], d: 'Justine Triet', p: 'Il marito cade dalla finestra: è stata lei? Il processo diventa autopsia di un matrimonio.', tg: ['cervello'] },
    { t: 'The Zone of Interest', o: 'The Zone of Interest', y: 2023, g: ['Drammatico', 'Storico'], d: 'Jonathan Glazer', p: 'La vita domestica di una famiglia perbene, subito dietro il muro di Auschwitz.', tg: ['cervello'] },
    { t: 'Povere creature!', o: 'Poor Things', y: 2023, g: ['Fantasy', 'Commedia', 'Drammatico'], d: 'Yorgos Lanthimos', p: 'Una donna riportata in vita scopre il mondo senza nessun freno imposto.', tg: ['cervello'] },

    // ---- Thriller / crime ----
    { t: 'I soliti sospetti', o: 'The Usual Suspects', y: 1995, g: ['Crime', 'Mistero', 'Thriller'], d: 'Bryan Singer', p: 'Chi è Keyser Söze? La risposta arriva negli ultimi trenta secondi.', tg: ['cervello'] },
    { t: 'Non è un paese per vecchi', o: 'No Country for Old Men', y: 2007, g: ['Thriller', 'Crime'], d: 'Joel ed Ethan Coen', p: 'Una valigetta di soldi e un killer che decide con una monetina.', tg: ['adrenalina'] },
    { t: 'Il grande Lebowski', o: 'The Big Lebowski', y: 1998, g: ['Commedia', 'Crime'], d: 'Joel ed Ethan Coen', p: 'Il tappeto sbagliato porta Drugo dentro un sequestro assurdo.', tg: ['risate'] },
    { t: 'Fargo', o: 'Fargo', y: 1996, g: ['Crime', 'Thriller', 'Commedia'], d: 'Joel ed Ethan Coen', p: 'Un sequestro finto nel Minnesota innevato finisce in tragedia vera.', tg: ['classico'] },
    { t: 'Heat - La sfida', o: 'Heat', y: 1995, g: ['Crime', 'Thriller'], d: 'Michael Mann', p: 'Un rapinatore e un poliziotto identici, separati solo dalla legge.', tg: ['adrenalina'] },
    { t: 'Drive', o: 'Drive', y: 2011, g: ['Thriller', 'Crime'], d: 'Nicolas Winding Refn', p: 'Uno stuntman fa l\'autista per rapine. Poi si innamora della vicina.', tg: ['adrenalina', 'serata'] },
    { t: 'Nightcrawler - Lo sciacallo', o: 'Nightcrawler', y: 2014, g: ['Thriller', 'Crime'], d: 'Dan Gilroy', p: 'Filmare cadaveri per il telegiornale diventa una carriera. E poi un\'ossessione.', tg: ['cervello'] },
    { t: 'Old Boy', o: '올드보이', y: 2003, g: ['Thriller', 'Mistero'], d: 'Park Chan-wook', p: 'Quindici anni rinchiuso senza sapere perché, cinque giorni per capirlo.', tg: ['cervello'] },
    { t: 'La città incantata', o: '千と千尋の神隠し', y: 2001, g: ['Animazione', 'Fantasy', 'Avventura'], d: 'Hayao Miyazaki', p: 'Una bambina finisce in un mondo di spiriti e deve riprendersi il suo nome.', tg: ['classico', 'family'] },
    { t: 'Città di Dio', o: 'Cidade de Deus', y: 2002, g: ['Crime', 'Drammatico'], d: 'Fernando Meirelles', p: 'Crescere in una favela di Rio dove la pistola arriva prima della scuola.', tg: ['adrenalina'] },
    { t: 'Le vite degli altri', o: 'Das Leben der Anderen', y: 2006, g: ['Drammatico', 'Thriller'], d: 'Florian Henckel von Donnersmarck', p: 'Un agente della Stasi si affeziona alle persone che deve spiare.', tg: ['lacrime'] },
    { t: 'Il labirinto del fauno', o: 'El laberinto del fauno', y: 2006, g: ['Fantasy', 'Drammatico', 'Guerra'], d: 'Guillermo del Toro', p: 'Una bambina nella Spagna franchista si rifugia in un mondo di mostri gentili.', tg: ['cervello'] },
    { t: 'La forma dell\'acqua', o: 'The Shape of Water', y: 2017, g: ['Fantasy', 'Romantico', 'Drammatico'], d: 'Guillermo del Toro', p: 'Una donna muta si innamora della creatura anfibia rinchiusa in laboratorio.', tg: ['serata'] },
    { t: 'Scarface', o: 'Scarface', y: 1983, g: ['Crime', 'Drammatico'], d: 'Brian De Palma', p: 'Da profugo cubano a re della cocaina di Miami, fino all\'ultimo proiettile.', tg: ['classico'] },
    { t: 'American Psycho', o: 'American Psycho', y: 2000, g: ['Thriller', 'Horror'], d: 'Mary Harron', p: 'Yuppie di giorno, qualcosa di molto peggio di notte.', tg: ['cervello'] },

    // ---- Azione / blockbuster ----
    { t: 'Mad Max: Fury Road', o: 'Mad Max: Fury Road', y: 2015, g: ['Azione', 'Avventura'], d: 'George Miller', p: 'Due ore di inseguimento nel deserto, praticamente senza dialoghi.', tg: ['adrenalina'] },
    { t: 'Il cavaliere oscuro', o: 'The Dark Knight', y: 2008, g: ['Azione', 'Crime', 'Drammatico'], d: 'Christopher Nolan', p: 'Il Joker non vuole soldi: vuole vedere Gotham bruciare.', tg: ['classico', 'adrenalina'] },
    { t: 'Gladiator - Il gladiatore', o: 'Gladiator', y: 2000, g: ['Azione', 'Drammatico', 'Storico'], d: 'Ridley Scott', p: 'Un generale tradito torna come schiavo per vendicarsi nell\'arena.', tg: ['classico', 'adrenalina'] },
    { t: 'Braveheart - Cuore impavido', o: 'Braveheart', y: 1995, g: ['Storico', 'Guerra', 'Drammatico'], d: 'Mel Gibson', p: 'William Wallace guida la Scozia contro l\'Inghilterra. Per la libertà.', tg: ['classico'] },
    { t: 'Il quinto elemento', o: 'The Fifth Element', y: 1997, g: ['Fantascienza', 'Azione', 'Avventura'], d: 'Luc Besson', p: 'Un tassista, una ragazza caduta dal cielo e l\'universo da salvare.', tg: ['serata', 'risate'] },
    { t: 'Léon', o: 'Léon', y: 1994, g: ['Azione', 'Crime', 'Drammatico'], d: 'Luc Besson', p: 'Un killer solitario adotta la bambina del piano di sotto.', tg: ['classico', 'lacrime'] },
    { t: 'Top Gun: Maverick', o: 'Top Gun: Maverick', y: 2022, g: ['Azione', 'Drammatico'], d: 'Joseph Kosinski', p: 'Trent\'anni dopo, Maverick addestra i figli di chi ha perso.', tg: ['adrenalina', 'serata'] },
    { t: 'Baby Driver - Il genio della fuga', o: 'Baby Driver', y: 2017, g: ['Azione', 'Crime'], d: 'Edgar Wright', p: 'Un autista per rapine guida a tempo di musica. Ogni sparo è sul beat.', tg: ['adrenalina', 'serata'] },
    { t: 'The Raid - Redenzione', o: 'Serbuan maut', y: 2011, g: ['Azione', 'Thriller'], d: 'Gareth Evans', p: 'Un blitz in un palazzo di trenta piani pieno di criminali. Si sale a mani nude.', tg: ['adrenalina'] },
    { t: 'Atomica bionda', o: 'Atomic Blonde', y: 2017, g: ['Azione', 'Thriller'], d: 'David Leitch', p: 'Una spia nella Berlino del 1989 e un piano sequenza sulle scale da manuale.', tg: ['adrenalina'] },
    { t: 'Speed', o: 'Speed', y: 1994, g: ['Azione', 'Thriller'], d: 'Jan de Bont', p: 'Un autobus che esplode se scende sotto i 50 all\'ora.', tg: ['classico', 'adrenalina'] },
    { t: 'Face/Off - Due facce di un assassino', o: 'Face/Off', y: 1997, g: ['Azione', 'Thriller'], d: 'John Woo', p: 'Poliziotto e criminale si scambiano letteralmente la faccia.', tg: ['adrenalina'] },
    { t: 'Sfida tra i ghiacci', o: 'The Grey', y: 2011, g: ['Avventura', 'Thriller'], d: 'Joe Carnahan', p: 'Sopravvissuti a un disastro aereo, braccati dai lupi in Alaska.', tg: ['adrenalina'] },
    { t: '300', o: '300', y: 2006, g: ['Azione', 'Guerra', 'Storico'], d: 'Zack Snyder', p: 'Trecento spartani contro un impero, girati come un fumetto in movimento.', tg: ['adrenalina'] },
    { t: 'Kingsman - Secret Service', o: 'Kingsman: The Secret Service', y: 2014, g: ['Azione', 'Commedia'], d: 'Matthew Vaughn', p: 'Una spia elegantissima recluta un ragazzo di strada. Le maniere contano.', tg: ['risate', 'adrenalina'] },

    // ---- Animazione ----
    { t: 'Il re leone', o: 'The Lion King', y: 1994, g: ['Animazione', 'Avventura', 'Drammatico'], d: 'Roger Allers, Rob Minkoff', p: 'Un cucciolo di leone in esilio deve riprendersi il suo regno.', tg: ['classico', 'family', 'lacrime'] },
    { t: 'Up', o: 'Up', y: 2009, g: ['Animazione', 'Avventura', 'Commedia'], d: 'Pete Docter', p: 'Una casa appesa a mille palloncini e i primi dieci minuti più strazianti della Pixar.', tg: ['family', 'lacrime'] },
    { t: 'WALL•E', o: 'WALL-E', y: 2008, g: ['Animazione', 'Fantascienza', 'Romantico'], d: 'Andrew Stanton', p: 'Un robot spazzino resta solo sulla Terra e si innamora.', tg: ['family', 'lacrime'] },
    { t: 'Inside Out', o: 'Inside Out', y: 2015, g: ['Animazione', 'Commedia', 'Drammatico'], d: 'Pete Docter', p: 'Le cinque emozioni che litigano nella testa di una bambina di undici anni.', tg: ['family', 'lacrime'] },
    { t: 'Inside Out 2', o: 'Inside Out 2', y: 2024, g: ['Animazione', 'Commedia'], d: 'Kelsey Mann', p: 'Arriva l\'adolescenza e con lei l\'Ansia, che prende il comando.', tg: ['family'] },
    { t: 'Ratatouille', o: 'Ratatouille', y: 2007, g: ['Animazione', 'Commedia'], d: 'Brad Bird', p: 'Un topo con il palato fine cucina nel miglior ristorante di Parigi.', tg: ['family', 'serata'] },
    { t: 'Coco', o: 'Coco', y: 2017, g: ['Animazione', 'Avventura', 'Musical'], d: 'Lee Unkrich', p: 'Un bambino attraversa il mondo dei morti per ritrovare la sua famiglia.', tg: ['family', 'lacrime'] },
    { t: 'Alla ricerca di Nemo', o: 'Finding Nemo', y: 2003, g: ['Animazione', 'Avventura'], d: 'Andrew Stanton', p: 'Un pesce pagliaccio timido attraversa l\'oceano per ritrovare suo figlio.', tg: ['family'] },
    { t: 'Il mio vicino Totoro', o: 'となりのトトロ', y: 1988, g: ['Animazione', 'Fantasy'], d: 'Hayao Miyazaki', p: 'Due sorelle in campagna incontrano lo spirito del bosco.', tg: ['family', 'classico'] },
    { t: 'Principessa Mononoke', o: 'もののけ姫', y: 1997, g: ['Animazione', 'Fantasy', 'Avventura'], d: 'Hayao Miyazaki', p: 'La guerra tra gli uomini e gli dèi della foresta, senza buoni né cattivi.', tg: ['classico'] },
    { t: 'Il castello errante di Howl', o: 'ハウルの動く城', y: 2004, g: ['Animazione', 'Fantasy', 'Romantico'], d: 'Hayao Miyazaki', p: 'Una ragazza trasformata in vecchia si rifugia in un castello che cammina.', tg: ['serata', 'family'] },
    { t: 'Il ragazzo e l\'airone', o: '君たちはどう生きるか', y: 2023, g: ['Animazione', 'Fantasy'], d: 'Hayao Miyazaki', p: 'Un ragazzo in lutto segue un airone parlante in un mondo sotterraneo.', tg: ['cervello'] },
    { t: 'Your Name.', o: '君の名は。', y: 2016, g: ['Animazione', 'Romantico', 'Fantasy'], d: 'Makoto Shinkai', p: 'Due adolescenti si scambiano i corpi. E poi scoprono perché.', tg: ['serata', 'lacrime'] },
    { t: 'Spider-Man - Un nuovo universo', o: 'Spider-Man: Into the Spider-Verse', y: 2018, g: ['Animazione', 'Azione', 'Avventura'], d: 'Bob Persichetti, Peter Ramsey', p: 'Miles Morales scopre che di Spider-Man ce n\'è più di uno.', tg: ['family', 'adrenalina'] },
    { t: 'Spider-Man - Across the Spider-Verse', o: 'Spider-Man: Across the Spider-Verse', y: 2023, g: ['Animazione', 'Azione', 'Avventura'], d: 'Joaquim Dos Santos', p: 'Un multiverso di Spider-Man contro un ragazzo che rifiuta il copione.', tg: ['adrenalina'] },
    { t: 'Klaus - I segreti del Natale', o: 'Klaus', y: 2019, g: ['Animazione', 'Commedia'], d: 'Sergio Pablos', p: 'Come nasce Babbo Natale in un paese dove nessuno si parla.', tg: ['family', 'serata'] },

    // ---- Commedie / feel good ----
    { t: 'Il favoloso mondo di Amélie', o: 'Le fabuleux destin d\'Amélie Poulain', y: 2001, g: ['Commedia', 'Romantico'], d: 'Jean-Pierre Jeunet', p: 'Una ragazza di Montmartre decide di aggiustare la vita degli altri.', tg: ['serata', 'classico'] },
    { t: 'Ricomincio da capo', o: 'Groundhog Day', y: 1993, g: ['Commedia', 'Romantico', 'Fantasy'], d: 'Harold Ramis', p: 'Lo stesso giorno all\'infinito finché non impari a essere una persona migliore.', tg: ['classico', 'risate', 'serata'] },
    { t: 'Il Grand Budapest Hotel', o: 'The Grand Budapest Hotel', y: 2014, g: ['Commedia', 'Avventura'], d: 'Wes Anderson', p: 'Un concierge leggendario, un quadro rubato e una simmetria perfetta.', tg: ['serata', 'risate'] },
    { t: 'Le avventure acquatiche di Steve Zissou', o: 'The Life Aquatic with Steve Zissou', y: 2004, g: ['Commedia', 'Avventura'], d: 'Wes Anderson', p: 'Un documentarista marino dà la caccia allo squalo che si è mangiato il socio.', tg: ['risate'] },
    { t: 'Little Miss Sunshine', o: 'Little Miss Sunshine', y: 2006, g: ['Commedia', 'Drammatico'], d: 'Jonathan Dayton, Valerie Faris', p: 'Una famiglia disastrata attraversa l\'America su un pulmino giallo.', tg: ['risate', 'serata'] },
    { t: 'Una notte da leoni', o: 'The Hangover', y: 2009, g: ['Commedia'], d: 'Todd Phillips', p: 'Svegliarsi a Las Vegas senza ricordare niente e senza lo sposo.', tg: ['risate'] },
    { t: 'Prova a prendermi', o: 'Catch Me If You Can', y: 2002, g: ['Crime', 'Drammatico', 'Biografico'], d: 'Steven Spielberg', p: 'Un ragazzo si finge pilota, medico e avvocato mentre l\'FBI lo insegue.', tg: ['serata', 'risate'] },
    { t: 'I sogni segreti di Walter Mitty', o: 'The Secret Life of Walter Mitty', y: 2013, g: ['Avventura', 'Commedia', 'Drammatico'], d: 'Ben Stiller', p: 'Un impiegato che sogna a occhi aperti parte davvero.', tg: ['serata'] },
    { t: 'Quasi amici', o: 'Intouchables', y: 2011, g: ['Commedia', 'Drammatico'], d: 'Olivier Nakache, Éric Toledano', p: 'Un aristocratico tetraplegico assume come badante un ragazzo di banlieue.', tg: ['serata', 'lacrime', 'risate'] },
    { t: 'School of Rock', o: 'School of Rock', y: 2003, g: ['Commedia', 'Musical'], d: 'Richard Linklater', p: 'Un rocker fallito si finge supplente e monta una band di bambini.', tg: ['risate', 'family'] },

    // ---- Romantici / serata ----
    { t: 'Eternal Sunshine of the Spotless Mind', o: 'Eternal Sunshine of the Spotless Mind', y: 2004, g: ['Romantico', 'Fantascienza', 'Drammatico'], d: 'Michel Gondry', p: 'Cancellare dalla memoria la persona amata e pentirsene mentre succede.', tg: ['serata', 'lacrime', 'cervello'] },
    { t: 'Prima dell\'alba', o: 'Before Sunrise', y: 1995, g: ['Romantico', 'Drammatico'], d: 'Richard Linklater', p: 'Due sconosciuti scendono dal treno a Vienna e camminano fino all\'alba.', tg: ['serata'] },
    { t: 'Prima del tramonto', o: 'Before Sunset', y: 2004, g: ['Romantico', 'Drammatico'], d: 'Richard Linklater', p: 'Nove anni dopo, un\'ora e mezza a Parigi per recuperare tutto.', tg: ['serata'] },
    { t: 'Notting Hill', o: 'Notting Hill', y: 1999, g: ['Romantico', 'Commedia'], d: 'Roger Michell', p: 'Un libraio qualunque e la donna più famosa del mondo.', tg: ['serata', 'classico'] },
    { t: 'Quando Harry ha incontrato Sally', o: 'When Harry Met Sally...', y: 1989, g: ['Romantico', 'Commedia'], d: 'Rob Reiner', p: 'Dodici anni per capire se uomo e donna possono essere solo amici.', tg: ['serata', 'classico', 'risate'] },
    { t: 'Chiamami col tuo nome', o: 'Call Me by Your Name', y: 2017, g: ['Romantico', 'Drammatico'], d: 'Luca Guadagnino', p: 'Un\'estate italiana del 1983 e un primo amore che brucia piano.', tg: ['serata', 'lacrime'] },
    { t: 'Past Lives', o: 'Past Lives', y: 2023, g: ['Romantico', 'Drammatico'], d: 'Celine Song', p: 'Due amici d\'infanzia si ritrovano a New York vent\'anni dopo.', tg: ['serata', 'lacrime'] },
    { t: 'Il diario di Bridget Jones', o: 'Bridget Jones\'s Diary', y: 2001, g: ['Romantico', 'Commedia'], d: 'Sharon Maguire', p: 'Trentenne londinese, due pretendenti e un diario impietoso.', tg: ['serata', 'risate'] },
    { t: 'Colazione da Tiffany', o: 'Breakfast at Tiffany\'s', y: 1961, g: ['Romantico', 'Commedia'], d: 'Blake Edwards', p: 'Holly Golightly, un gatto senza nome e New York all\'alba.', tg: ['classico', 'serata'] },

    // ---- Cinema italiano ----
    { t: 'La vita è bella', o: 'La vita è bella', y: 1997, g: ['Drammatico', 'Commedia', 'Guerra'], d: 'Roberto Benigni', p: 'Un padre trasforma il lager in un gioco per salvare il figlio.', tg: ['classico', 'lacrime'] },
    { t: 'Nuovo Cinema Paradiso', o: 'Nuovo Cinema Paradiso', y: 1988, g: ['Drammatico'], d: 'Giuseppe Tornatore', p: 'Un regista torna al paese e ricorda il proiezionista che gli ha insegnato tutto.', tg: ['classico', 'lacrime'] },
    { t: 'La grande bellezza', o: 'La grande bellezza', y: 2013, g: ['Drammatico'], d: 'Paolo Sorrentino', p: 'Roma di notte vista da un giornalista che ha smesso di scrivere.', tg: ['classico'] },
    { t: 'Perfetti sconosciuti', o: 'Perfetti sconosciuti', y: 2016, g: ['Commedia', 'Drammatico'], d: 'Paolo Genovese', p: 'Sette amici a cena mettono i telefoni sul tavolo. Pessima idea.', tg: ['serata', 'risate'] },
    { t: 'Il postino', o: 'Il postino', y: 1994, g: ['Drammatico', 'Romantico'], d: 'Michael Radford', p: 'Un postino impara la poesia da Pablo Neruda per conquistare una donna.', tg: ['lacrime', 'serata'] },
    { t: 'Gomorra', o: 'Gomorra', y: 2008, g: ['Crime', 'Drammatico'], d: 'Matteo Garrone', p: 'Cinque storie dentro il sistema camorristico, senza nessuna epica.', tg: [] },
    { t: 'Il traditore', o: 'Il traditore', y: 2019, g: ['Crime', 'Biografico', 'Drammatico'], d: 'Marco Bellocchio', p: 'Tommaso Buscetta decide di parlare e cambia la storia della mafia.', tg: [] },
    { t: 'Lo chiamavano Jeeg Robot', o: 'Lo chiamavano Jeeg Robot', y: 2015, g: ['Azione', 'Drammatico'], d: 'Gabriele Mainetti', p: 'Un ladruncolo di Tor Bella Monaca diventa un supereroe riluttante.', tg: ['adrenalina', 'serata'] },
    { t: 'Romanzo criminale', o: 'Romanzo criminale', y: 2005, g: ['Crime', 'Drammatico'], d: 'Michele Placido', p: 'La banda della Magliana si prende Roma negli anni di piombo.', tg: [] },
    { t: 'Smetto quando voglio', o: 'Smetto quando voglio', y: 2014, g: ['Commedia', 'Crime'], d: 'Sydney Sibilia', p: 'Ricercatori precari mettono su una banda per campare. Con metodo scientifico.', tg: ['risate', 'serata'] },
    { t: 'C\'è ancora domani', o: 'C\'è ancora domani', y: 2023, g: ['Drammatico', 'Storico'], d: 'Paola Cortellesi', p: 'Roma 1946: una donna resiste, in bianco e nero, fino al primo voto.', tg: ['lacrime'] },
    { t: 'Le otto montagne', o: 'Le otto montagne', y: 2022, g: ['Drammatico'], d: 'Felix van Groeningen, Charlotte Vandermeersch', p: 'Un\'amicizia lunga trent\'anni tra le Alpi.', tg: ['lacrime'] },
    { t: 'Il ragazzo invisibile', o: 'Il ragazzo invisibile', y: 2014, g: ['Fantasy', 'Avventura'], d: 'Gabriele Salvatores', p: 'Un tredicenne scopre di poter sparire. Il difficile viene dopo.', tg: ['family'] },
    { t: 'Benvenuti al Sud', o: 'Benvenuti al Sud', y: 2010, g: ['Commedia'], d: 'Luca Miniero', p: 'Un direttore postale brianzolo trasferito in Cilento contro la sua volontà.', tg: ['risate', 'serata'] },
    { t: 'Mediterraneo', o: 'Mediterraneo', y: 1991, g: ['Commedia', 'Drammatico', 'Guerra'], d: 'Gabriele Salvatores', p: 'Otto soldati italiani dimenticati su un\'isola greca in guerra.', tg: ['classico', 'serata'] },
    { t: 'La meglio gioventù', o: 'La meglio gioventù', y: 2003, g: ['Drammatico', 'Storico'], d: 'Marco Tullio Giordana', p: 'Quarant\'anni d\'Italia raccontati da due fratelli.', tg: ['lacrime'] },

    // ---- Horror / tensione ----
    { t: 'L\'esorcista', o: 'The Exorcist', y: 1973, g: ['Horror'], d: 'William Friedkin', p: 'Una bambina posseduta e due preti che non sono pronti.', tg: ['classico', 'paura'] },
    { t: 'Scappa - Get Out', o: 'Get Out', y: 2017, g: ['Horror', 'Thriller'], d: 'Jordan Peele', p: 'Un weekend dai suoceri bianchi che diventa un incubo perfettamente logico.', tg: ['cervello', 'paura'] },
    { t: 'Hereditary - Le radici del male', o: 'Hereditary', y: 2018, g: ['Horror', 'Drammatico'], d: 'Ari Aster', p: 'Un lutto familiare apre la porta a qualcosa di molto peggio.', tg: ['paura'] },
    { t: 'A Quiet Place - Un posto tranquillo', o: 'A Quiet Place', y: 2018, g: ['Horror', 'Fantascienza', 'Thriller'], d: 'John Krasinski', p: 'Fai rumore e muori: una famiglia sopravvive in silenzio assoluto.', tg: ['paura', 'adrenalina'] },
    { t: 'It', o: 'It', y: 2017, g: ['Horror'], d: 'Andy Muschietti', p: 'Sette ragazzini contro un clown che si nutre di paura.', tg: ['paura'] },
    { t: 'The Others', o: 'The Others', y: 2001, g: ['Horror', 'Mistero'], d: 'Alejandro Amenábar', p: 'Una madre, due bambini fotosensibili e una casa che non è vuota.', tg: ['paura', 'cervello'] },
    { t: 'Sinister', o: 'Sinister', y: 2012, g: ['Horror', 'Thriller'], d: 'Scott Derrickson', p: 'Uno scrittore trova vecchi filmini in soffitta. Meglio non guardarli.', tg: ['paura'] },
    { t: 'The Babadook', o: 'The Babadook', y: 2014, g: ['Horror', 'Drammatico'], d: 'Jennifer Kent', p: 'Un libro illustrato porta in casa qualcosa che assomiglia al dolore.', tg: ['paura'] },

    // ---- Biografici / sportivi ----
    { t: 'Bohemian Rhapsody', o: 'Bohemian Rhapsody', y: 2018, g: ['Biografico', 'Musical', 'Drammatico'], d: 'Bryan Singer', p: 'Freddie Mercury e i Queen fino al Live Aid.', tg: ['serata'] },
    { t: 'Rocketman', o: 'Rocketman', y: 2019, g: ['Biografico', 'Musical'], d: 'Dexter Fletcher', p: 'La vita di Elton John raccontata come un musical sfrenato.', tg: ['serata'] },
    { t: 'Il diritto di contare', o: 'Hidden Figures', y: 2016, g: ['Biografico', 'Drammatico', 'Storico'], d: 'Theodore Melfi', p: 'Tre matematiche afroamericane portano la NASA nello spazio.', tg: ['serata', 'family'] },
    { t: 'La teoria del tutto', o: 'The Theory of Everything', y: 2014, g: ['Biografico', 'Romantico', 'Drammatico'], d: 'James Marsh', p: 'Stephen Hawking, la SLA e un matrimonio che regge finché può.', tg: ['lacrime', 'serata'] },
    { t: 'The Imitation Game', o: 'The Imitation Game', y: 2014, g: ['Biografico', 'Thriller', 'Storico'], d: 'Morten Tyldum', p: 'Alan Turing decifra Enigma e il suo paese lo distrugge comunque.', tg: ['cervello', 'lacrime'] },
    { t: 'La ricerca della felicità', o: 'The Pursuit of Happyness', y: 2006, g: ['Biografico', 'Drammatico'], d: 'Gabriele Muccino', p: 'Un padre senza casa fa uno stage non pagato con il figlio al seguito.', tg: ['lacrime', 'serata'] },
    { t: 'Le regole del gioco - Moneyball', o: 'Moneyball', y: 2011, g: ['Biografico', 'Sportivo', 'Drammatico'], d: 'Bennett Miller', p: 'Vincere nel baseball con la statistica invece che con i soldi.', tg: ['cervello'] },
    { t: 'Le Mans \'66 - La grande sfida', o: 'Ford v Ferrari', y: 2019, g: ['Biografico', 'Sportivo', 'Azione'], d: 'James Mangold', p: 'Ford costruisce un\'auto per battere la Ferrari a Le Mans.', tg: ['adrenalina', 'serata'] },
    { t: 'Rush', o: 'Rush', y: 2013, g: ['Biografico', 'Sportivo', 'Drammatico'], d: 'Ron Howard', p: 'Niki Lauda contro James Hunt nella stagione di F1 del 1976.', tg: ['adrenalina'] },
    { t: 'Free Solo', o: 'Free Solo', y: 2018, g: ['Documentario', 'Sportivo'], d: 'Jimmy Chin, Elizabeth Chai Vasarhelyi', p: 'Scalare El Capitan senza corde. Vero, filmato, insostenibile.', tg: ['adrenalina'] },

    // ---- Recenti da recuperare ----
    { t: 'Sound of Metal', o: 'Sound of Metal', y: 2019, g: ['Drammatico', 'Musical'], d: 'Darius Marder', p: 'Un batterista perde l\'udito e deve imparare un\'altra vita.', tg: ['lacrime'] },
    { t: 'The Banshees of Inisherin', o: 'The Banshees of Inisherin', y: 2022, g: ['Commedia', 'Drammatico'], d: 'Martin McDonagh', p: 'Su un\'isola irlandese un amico smette di parlarti. Senza spiegazioni.', tg: ['cervello'] },
    { t: 'Tre manifesti a Ebbing, Missouri', o: 'Three Billboards Outside Ebbing, Missouri', y: 2017, g: ['Drammatico', 'Crime', 'Commedia'], d: 'Martin McDonagh', p: 'Una madre affitta tre cartelloni per svegliare la polizia.', tg: ['cervello'] },
    { t: 'Knives Out - Cena con delitto', o: 'Knives Out', y: 2019, g: ['Mistero', 'Commedia', 'Crime'], d: 'Rian Johnson', p: 'Un giallo classico con una famiglia orribile e un detective col cappello.', tg: ['serata', 'risate'] },
    { t: 'The Menu', o: 'The Menu', y: 2022, g: ['Thriller', 'Horror', 'Commedia'], d: 'Mark Mylod', p: 'Una cena degustazione su un\'isola privata. Lo chef ha altri piani.', tg: ['serata', 'cervello'] },
    { t: 'Tár', o: 'Tár', y: 2022, g: ['Drammatico', 'Musical'], d: 'Todd Field', p: 'Una direttrice d\'orchestra intoccabile inizia a sgretolarsi.', tg: ['cervello'] },
    { t: 'Aftersun', o: 'Aftersun', y: 2022, g: ['Drammatico'], d: 'Charlotte Wells', p: 'Una vacanza in Turchia ricordata vent\'anni dopo. Ti arriva alla fine.', tg: ['lacrime'] },
    { t: 'Sicario 2 - Soldado', o: 'Sicario: Day of the Soldado', y: 2018, g: ['Azione', 'Thriller', 'Crime'], d: 'Stefano Sollima', p: 'La guerra al cartello passa al livello successivo, senza regole.', tg: ['adrenalina'] },
    { t: 'Non ti muovere', o: 'Non ti muovere', y: 2004, g: ['Drammatico', 'Romantico'], d: 'Sergio Castellitto', p: 'Un chirurgo aspetta l\'esito dell\'operazione della figlia e confessa tutto.', tg: ['lacrime'] },
    { t: 'Gran Torino', o: 'Gran Torino', y: 2008, g: ['Drammatico'], d: 'Clint Eastwood', p: 'Un veterano scorbutico difende il vicino di casa che non sopporta.', tg: ['lacrime', 'serata'] },
    { t: 'Million Dollar Baby', o: 'Million Dollar Baby', y: 2004, g: ['Drammatico', 'Sportivo'], d: 'Clint Eastwood', p: 'Un allenatore stanco prende sotto la sua ala una pugile testarda.', tg: ['lacrime'] },
    { t: 'American Beauty', o: 'American Beauty', y: 1999, g: ['Drammatico'], d: 'Sam Mendes', p: 'La perfetta famiglia di periferia vista da chi sta per morire.', tg: ['classico'] },
    { t: '1917', o: '1917', y: 2019, g: ['Guerra', 'Drammatico'], d: 'Sam Mendes', p: 'Due soldati, un messaggio da consegnare, un finto piano sequenza.', tg: ['adrenalina'] },
    { t: 'Trainspotting', o: 'Trainspotting', y: 1996, g: ['Drammatico', 'Commedia'], d: 'Danny Boyle', p: 'Scegli la vita. Oppure l\'eroina, Edimburgo e gli amici sbagliati.', tg: ['classico'] },
    { t: '28 giorni dopo', o: '28 Days Later', y: 2002, g: ['Horror', 'Fantascienza'], d: 'Danny Boyle', p: 'Si sveglia dal coma e Londra è vuota. Non del tutto.', tg: ['paura', 'adrenalina'] },
    { t: 'The Millionaire', o: 'Slumdog Millionaire', y: 2008, g: ['Drammatico', 'Romantico'], d: 'Danny Boyle', p: 'Un ragazzo delle baraccopoli vince al quiz perché ha vissuto ogni domanda.', tg: ['serata', 'lacrime'] },
    { t: '127 ore', o: '127 Hours', y: 2010, g: ['Biografico', 'Avventura', 'Drammatico'], d: 'Danny Boyle', p: 'Un braccio bloccato sotto un masso e una decisione atroce.', tg: ['adrenalina'] },
    { t: 'Lucky Number Slevin', o: 'Lucky Number Slevin', y: 2006, g: ['Crime', 'Thriller', 'Mistero'], d: 'Paul McGuigan', p: 'Scambiato per un altro, finisce in mezzo a due boss. C\'è un piano.', tg: ['cervello'] },
    { t: 'Tsotsi', o: 'Tsotsi', y: 2005, g: ['Drammatico', 'Crime'], d: 'Gavin Hood', p: 'Un teppista di Johannesburg ruba un\'auto con dentro un neonato.', tg: ['lacrime'] },
    { t: 'The Truman Show', o: 'The Truman Show', y: 1998, g: ['Drammatico', 'Commedia', 'Fantascienza'], d: 'Peter Weir', p: 'La tua vita è un reality e sei l\'unico a non saperlo.', tg: ['classico', 'cervello', 'serata'] },
    { t: 'L\'attimo fuggente', o: 'Dead Poets Society', y: 1989, g: ['Drammatico'], d: 'Peter Weir', p: 'Un professore insegna a un collegio rigido a salire sui banchi.', tg: ['classico', 'lacrime'] },
    { t: 'Will Hunting - Genio ribelle', o: 'Good Will Hunting', y: 1997, g: ['Drammatico'], d: 'Gus Van Sant', p: 'Un genio matematico fa le pulizie al MIT e scappa da sé stesso.', tg: ['classico', 'lacrime'] },
    { t: 'A Beautiful Mind', o: 'A Beautiful Mind', y: 2001, g: ['Biografico', 'Drammatico'], d: 'Ron Howard', p: 'John Nash vince il Nobel convivendo con la schizofrenia.', tg: ['lacrime'] },
    { t: 'Il sesto senso', o: 'The Sixth Sense', y: 1999, g: ['Thriller', 'Mistero', 'Horror'], d: 'M. Night Shyamalan', p: 'Vedo la gente morta. E il finale lo ricordi per sempre.', tg: ['cervello', 'classico'] },
    { t: 'Unbreakable - Il predestinato', o: 'Unbreakable', y: 2000, g: ['Thriller', 'Drammatico'], d: 'M. Night Shyamalan', p: 'L\'unico sopravvissuto a un disastro non ha un graffio. Perché?', tg: ['cervello'] },
    { t: 'Donnie Darko', o: 'Donnie Darko', y: 2001, g: ['Fantascienza', 'Thriller', 'Drammatico'], d: 'Richard Kelly', p: 'Un coniglio gigante annuncia la fine del mondo tra 28 giorni.', tg: ['cervello'] },
    { t: 'Requiem for a Dream', o: 'Requiem for a Dream', y: 2000, g: ['Drammatico'], d: 'Darren Aronofsky', p: 'Quattro dipendenze che si stringono come un cappio. Durissimo.', tg: ['cervello'] },
    { t: 'Il cigno nero', o: 'Black Swan', y: 2010, g: ['Thriller', 'Drammatico'], d: 'Darren Aronofsky', p: 'Una ballerina si spinge alla perfezione e si perde per strada.', tg: ['cervello'] },
    { t: 'The Whale', o: 'The Whale', y: 2022, g: ['Drammatico'], d: 'Darren Aronofsky', p: 'Un uomo recluso prova a ricucire con la figlia in cinque giorni.', tg: ['lacrime'] },
    { t: 'Lagaan - C\'era una volta in India', o: 'Lagaan', y: 2001, g: ['Drammatico', 'Musical', 'Sportivo'], d: 'Ashutosh Gowariker', p: 'Un villaggio indiano sfida i colonizzatori inglesi a cricket per non pagare le tasse.', tg: ['serata'] },
    { t: 'Coco Avant Chanel', o: 'Coco avant Chanel', y: 2009, g: ['Biografico', 'Drammatico'], d: 'Anne Fontaine', p: 'Come una orfana diventa Coco Chanel.', tg: ['serata'] },
    { t: 'Il Gladiatore II', o: 'Gladiator II', y: 2024, g: ['Azione', 'Drammatico', 'Storico'], d: 'Ridley Scott', p: 'Vent\'anni dopo Massimo, l\'arena reclama un altro nome.', tg: ['adrenalina'] },
    { t: 'Wicked', o: 'Wicked', y: 2024, g: ['Musical', 'Fantasy'], d: 'Jon M. Chu', p: 'Come la strega dell\'Ovest è diventata cattiva. O forse no.', tg: ['serata'] },
    { t: 'Conclave', o: 'Conclave', y: 2024, g: ['Thriller', 'Drammatico'], d: 'Edward Berger', p: 'Muore il Papa e il conclave diventa un thriller politico a porte chiuse.', tg: ['cervello'] },
    { t: 'The Substance', o: 'The Substance', y: 2024, g: ['Horror', 'Fantascienza'], d: 'Coralie Fargeat', p: 'Una star in declino prova un siero che genera una versione migliore di lei.', tg: ['paura', 'cervello'] },
    { t: 'Niente di nuovo sul fronte occidentale', o: 'Im Westen nichts Neues', y: 2022, g: ['Guerra', 'Drammatico'], d: 'Edward Berger', p: 'La Grande Guerra dalla parte di chi ci è finito dentro a diciassette anni.', tg: [] },
    { t: 'Soul', o: 'Soul', y: 2020, g: ['Animazione', 'Fantasy', 'Commedia'], d: 'Pete Docter', p: 'Un insegnante di musica muore il giorno del concerto della vita.', tg: ['family', 'lacrime'] },
    { t: 'Flow - Un mondo da salvare', o: 'Straume', y: 2024, g: ['Animazione', 'Avventura'], d: 'Gints Zilbalodis', p: 'Un gatto e altri animali su una barca, senza una parola di dialogo.', tg: ['family'] },
    { t: 'Dieci giorni senza mamma', o: 'Dieci giorni senza mamma', y: 2019, g: ['Commedia'], d: 'Alessandro Genovesi', p: 'Papà resta solo con tre figli. Va come deve andare.', tg: ['risate', 'family'] }
  ];

  /* generi di riferimento per saga: danno senso a statistiche e consigli
     anche ai titoli che non stanno nel catalogo curato */
  const SAGA_GENRES = {
    mcu: ['Azione', 'Fantascienza'], xmen: ['Azione', 'Fantascienza'], alien: ['Fantascienza', 'Horror'],
    starwars: ['Fantascienza', 'Avventura'], harrypotter: ['Fantasy', 'Avventura'], animalifantastici: ['Fantasy', 'Avventura'],
    lotr: ['Fantasy', 'Avventura'], hobbit: ['Fantasy', 'Avventura'], johnwick: ['Azione', 'Thriller'],
    jurassic: ['Avventura', 'Fantascienza'], fastfurious: ['Azione', 'Crime'], missionimpossible: ['Azione', 'Thriller'],
    matrix: ['Fantascienza', 'Azione'], terminator: ['Fantascienza', 'Azione'], rocky: ['Drammatico', 'Sportivo'],
    toystory: ['Animazione', 'Avventura'], piratidca: ['Avventura', 'Fantasy'], batman: ['Azione', 'Crime'],
    predator: ['Fantascienza', 'Azione'], avp: ['Fantascienza', 'Horror'], dceu: ['Azione', 'Fantascienza'],
    indianajones: ['Avventura', 'Azione'], bond: ['Azione', 'Thriller'], spiderman: ['Azione', 'Avventura'],
    spiderverse: ['Animazione', 'Azione'], hungergames: ['Fantascienza', 'Avventura'], ritornofuturo: ['Fantascienza', 'Commedia'],
    padrino: ['Crime', 'Drammatico'], rambo: ['Azione', 'Guerra'], diehard: ['Azione', 'Thriller'],
    madmax: ['Azione', 'Fantascienza'], scimmie: ['Fantascienza', 'Avventura'], monsterverse: ['Azione', 'Fantascienza'],
    transformers: ['Azione', 'Fantascienza'], bourne: ['Azione', 'Thriller'], mib: ['Fantascienza', 'Commedia'],
    ghostbusters: ['Commedia', 'Fantasy'], oceans: ['Crime', 'Commedia'], jumanji: ['Avventura', 'Commedia'],
    narnia: ['Fantasy', 'Avventura'], twilight: ['Romantico', 'Fantasy'], scream: ['Horror', 'Mistero'],
    conjuring: ['Horror'], shrek: ['Animazione', 'Commedia'], cattivissimo: ['Animazione', 'Commedia'],
    eraglaciale: ['Animazione', 'Commedia'], dragontrainer: ['Animazione', 'Avventura'], kungfupanda: ['Animazione', 'Commedia'],
    sherlock: ['Mistero', 'Azione'], dune: ['Fantascienza', 'Avventura'], knivesout: ['Mistero', 'Commedia'],
    avatar: ['Fantascienza', 'Avventura'], lentoolerta: ['Animazione', 'Avventura'], incredibili: ['Animazione', 'Azione']
  };

  root.CINE_DATA = { FRANCHISES, CATALOG, SAGA_GENRES };
})(window);
