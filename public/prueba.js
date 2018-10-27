var Horario =  function (hora1, hora2) {
        this.hora1 = hora1;
        this.hora2 = hora2;
 
        /****Métodos Principales****/
 
        this.sumatorioHorario = function(){
            var horaInicio      = this.mostrarHora(this.hora1);
            var horaFin         = this.mostrarHora(this.hora2);
            var minutosInicio   = this.mostrarHora(this.hora1);
            var minutosFin      = this.mostrarHora(this.hora2);
            if(horaInicio<horaFin){
                return this.mostrarRangoHoraFinMayor();
            }else if(horaInicio==horaFin){
                if(minutosInicio<=minutosFin){
                    return this.mostrarRangoHoraFinMayor();
                }
            }else{
                return this.mostrarRangoHoraFinMenor();
            }
        };
 
        /****Métodos Secundarios****/
 
        this.mostrarHora = function (hora){
            var division = hora.split(":");
            return parseInt(division[0]);
        };
        this.mostrarMinutos = function (hora){
            var division = hora.split(":");
            return parseInt(division[1]);
        };
        this.mostrarRangoHoraFinMayor = function(){
            var horaInicio  = this.returnHoraEnSegundos(this.hora1);
            var horaFin     = this.returnHoraEnSegundos(this.hora2);
            return  this.darFormatoHora(horaFin - horaInicio);
        };
        this.mostrarRangoHoraFinMenor = function(){
            var hora24      = this.returnHoraEnSegundos("24:00");
            var horaInicio  = this.returnHoraEnSegundos(this.hora1);
            var horaFin     = this.returnHoraEnSegundos(this.hora2);
            return  this.darFormatoHora(hora24 - horaInicio + horaFin);
        };
        this.mostrarConCero = function(num){
            if(num < 10) {
              return "0" + num;
            } else {
              return "" + num;
            }
        };
        this.returnHoraEnSegundos = function(hora){
            var division = hora.split(":");
            var horas    = division[0] * 3600;
            var minutos  = division[1] * 60;
            return parseInt(horas) + parseInt(minutos);
        };
        this.darFormatoHora = function(segundos){
            return [this.mostrarConCero(Math.floor(segundos/3600)%60),
                    this.mostrarConCero(Math.floor(segundos/60)%60),
                    ].join(":");
        };
    };


