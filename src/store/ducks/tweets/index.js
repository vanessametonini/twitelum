import { TweetsService } from "../../../services/TweetsService";

export const Types = {
  CARREGA_INICIO: "tweets/CARREGA_INICIO",
  CARREGA_SUCESSO: "tweets/CARREGA_SUCESSO",
  ADICIONA_SUCESSO: "tweets/ADICIONA_SUCESSO",
  REMOVE_SUCESSO: "tweets/REMOVE_SUCESSO"
}

//nos thunks vc criar um objeto que armazenam funções que retornam funções, também chamadas de Creators
export const TweetsThunksActions = {

  carrega: () => dispatch => {

    dispatch({type: Types.CARREGA_INICIO})

    TweetsService
    .listar()
      .then(tweetsAPI => dispatch({type: Types.CARREGA_SUCESSO, payload: tweetsAPI}))

  },

  adiciona: (tweet) => dispatch => {
     return TweetsService
            .adicionar(tweet)
            .then(
              tweetDaAPI => {
                dispatch({type: Types.ADICIONA_SUCESSO, newTweet: tweetDaAPI })
                return Promise.resolve()
            })
  },

  deleta: (tweetId) => dispatch => {
    return TweetsService
            .deletar(tweetId)
            .then(
              () => {
                dispatch({type: Types.REMOVE_SUCESSO, tweetId})
                return Promise.resolve()
            })
  },

}

const initialState = {
  data: [],
  loading: false,
  error: false
};

export default function tweetsReducer(state = initialState, action = {}) {

  switch(action.type) {

    case Types.CARREGA_INICIO:
      return { ...state, loading: true };

    case Types.CARREGA_SUCESSO:
      return { ...state, loading: false, data: action.payload};
      
    case Types.ADICIONA_SUCESSO:
        return {...state, data: [action.newTweet, ...state.data], loading: false};

    case Types.REMOVE_SUCESSO:
      return {...state
              , data: state.data.filter( (tweet) => tweet._id !== action.tweetId )
              , loading: false};

    default:
        return state;

  }
  
}
