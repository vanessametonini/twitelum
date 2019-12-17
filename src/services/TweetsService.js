const TWEETS_URL = `https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('token')}`;

const urlReplacer = urlPart => TWEETS_URL.replace('tweets?', urlPart);

export const TweetsService = {
    adicionar: tweet => fetch(
        TWEETS_URL,
        {
          method: 'POST',
          body: JSON.stringify({conteudo: tweet})
        }
      ).then(r => r.json()),
    deletar: tweetId => fetch(urlReplacer(`tweets/${tweetId}?`), {method: 'DELETE'}).then(r => r.json()),
    listar: () => fetch(TWEETS_URL).then(r => r.json()),
    like: tweetId => fetch(urlReplacer(`tweets/${tweetId}/like?`),{method: 'POST'}).then(r => r.json())
}
