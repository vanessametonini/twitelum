
export const Types = {
  CARREGA: "tweets/CARREGA",
  ADICIONA: "tweets/ADICIONA",
  REMOVE: "tweets/REMOVE"
}

//nos thunks vc criar um objeto que armazenam funções que retornam funções, também chamadas de Creators
export const TweetsThunksActions = {

  carrega: () => ({
    action: Types.CARREGA,
    payload: {
      
    }
  }),

  adiciona: (tweet) => ({
    action: Types.ADICIONA,
    payload: {
      tweet
    }
  }),

  remove: (id) => ({
    action: Types.REMOVE,
    payload: {
      id
    }
  }),

}

const initialState = {
  data: [],
  loading: false,
  error: false
};

export default function tweetsReducer(state = initialState, action = {}) {

  switch(action.type) {
    case Types.CARREGA:
      state = action.tweets;
      return state;

    case Types.ADICIONA:
        state = [action.newTweet, ...state];
        return state;

    case Types.REMOVE:
        state = state.filter( (tweet) => tweet._id !== action.tweetId );
        return state;

    default:
        return state;

  }
  
}
