const Estadio = {
  name: { type: String, required: true },
  capacity: { type: Number, required: true }
};

const Entrenador = {
  name: { type: String, required: true },
  birth_year: { type: Date, required:true  },
  nationality: { type: String, required: true }
};

const Jugador = {
  name: { type: String, required: true },
  position: { type: String, required: true },
  number: { type: Number, required: true },
  goals: { type: Number, required: true }
};

const Equipo = {    
    team: { type: String, required: true },
    league: { type: String, required: true },
    stadium: Estadio,
    coach: Entrenador,
    badge_url: { type: String, required: true },
    players: [Jugador]
      
};



  module.exports = Equipo;