function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      counterA: 0,
      counterH: 0,
      winner: '',
      loggedMessages: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
  },
  computed: {
    monsterBar() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.monsterHealth + '%' };
    },
    playerBar() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }
      return { width: this.playerHealth + '%' };
    },
    enableSpecialAttack() {
      return this.counterA < 3;
    },
    enableHealing() {
      return this.counterH < 2;
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.counterH = 0;
      this.counterA = 0;
      this.winner = '';
      this.loggedMessages = [];
    },
    attackMonster() {
      this.counterH++;
      this.counterA++;
      const attackValue = randomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.addLog('Player', 'attack', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = randomValue(8, 16);
      this.playerHealth -= attackValue;
      this.addLog('Monster', 'attack', attackValue);
    },
    specialAttack() {
      this.counterH++;
      this.counterA = 0;
      const attackValue = randomValue(13, 25);
      this.monsterHealth -= attackValue;
      this.addLog('Player', 'attack', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.counterA++;
      this.counterH = 0;
      const healValue = randomValue(10, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLog('Player', 'heal', healValue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'monster';
    },
    addLog(creature, action, value) {
      this.loggedMessages.unshift({
        creature: creature,
        action: action,
        value: value,
      });
    },
  },
}).mount('#game');
