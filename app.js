function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      counter: 0,
    };
  },
  watch: {},
  computed: {
    monsterBar() {
      return { width: this.monsterHealth + '%' };
    },
    playerBar() {
      return { width: this.playerHealth + '%' };
    },
    enableSpecialAttack() {
      return this.counter % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.counter++;
      const attackValue = randomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = randomValue(8, 16);
      this.playerHealth -= attackValue;
    },
    specialAttack() {
      this.counter++;
      const attackValue = randomValue(13, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.counter++;
      const healValue = randomValue(10, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
  },
}).mount('#game');
