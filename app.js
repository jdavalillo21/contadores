const app = new Vue({
    el: '#app',
    data: {
      contadores: [],
      newContador: null,
      newContador2:null,
      bloqueado:false,
      suma: 0,
      totalContadores: 0
    },
    mounted() {
      if (localStorage.getItem('contadores')) {
        try {
          this.contadores = JSON.parse(localStorage.getItem('contadores'));
          if(parseInt(this.contadores.length) >= 20){
            this.bloqueado=true;
          }
          
          this.totalContadores = this.sumar(this.suma);
          
        } catch(e) {
          //localStorage.removeItem('contadores');
        }
      }
    },
    methods: {
      addContador() {
        // ensure they actually typed something
        if (!this.newContador) {
          alert('El nombre no puede estar vacío');
          return;
        }
        this.newContador2={value: this.newContador, label: 0}


        if(this.contadores.length < 20){
          this.contadores.push(this.newContador2);
          this.newContador = '';
          this.saveContadores();

          if(parseInt(this.contadores.length) >= 20){
            this.bloqueado=true;
          }

        }else{
          alert('No puede agregar más de 20 contadores');
        }
      },
      removeContador(x) {
        this.contadores.splice(x, 1);
        this.saveContadores();
        this.totalContadores = this.sumar(this.suma);

        if(parseInt(this.contadores.length) < 20){
          this.bloqueado=false;
        }


      },
      saveContadores() {
        const parsed = JSON.stringify(this.contadores);
        localStorage.setItem('contadores', parsed);
        this.ordenar();
      },
      mas(n){
        if(parseInt(this.contadores[n].label) >= 0 && parseInt(this.contadores[n].label) < 20){
          this.contadores[n].label=this.contadores[n].label+1;
          this.saveContadores();
          this.totalContadores = this.sumar(this.suma);
        }
      
      },
      menos(n){
        if(parseInt(this.contadores[n].label) > 0 && parseInt(this.contadores[n].label) <= 20){
          this.contadores[n].label=this.contadores[n].label-1;
          this.saveContadores();
          this.totalContadores = this.sumar(this.suma);
        }
      },
      sumar(sum){
        for(var i=0; i<this.contadores.length; i++){
          sum = sum + this.contadores[i].label;
        }

        return sum;
      },
      ordenar(){

      }
    }
  });