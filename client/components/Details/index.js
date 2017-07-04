// import style from './style.scss';

export default {
  methods: {
    // increment() {
    //   this.$store.commit('INCREMENT')
    // },
    // decrement() {
    //   this.$store.commit('DECREMENT')
    // },
    // incrementAsync() {
    //   this.$store.dispatch('incrementAsync')
    // }
  },
  render(h) {
    return (
      <div>
          <h1>
              {this.$store.state.city}
          </h1>
        <div>
          {this.$store.state.count}
        </div>
      </div>
    )
  }
};
