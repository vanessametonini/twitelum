const initialState = [];

export default function rootReducer(state = initialState, action = {}) {

  switch(action.type) {
    case "CARREGA_TWEETS":
      state = action.tweets;
      return state;

    case "ADICIONA_TWEET":
        state = [action.newTweet, ...state];
        return state;

    case "REMOVE_TWEET":
        state = state.filter( (tweet) => tweet._id !== action.tweetId );
        return state;

    default:
        return state;

  }
  
}
