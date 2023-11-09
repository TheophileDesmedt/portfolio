export const state = () => ({
    posts: '[]' //Array vide qui va contenir les posts
})

// state contient les informations de l'application

// export const getters = {
//     getterValue: state => {
//         return state.value
//     }
// }

export const mutations = {
    updatePosts: (state, posts) => {
        state.posts = posts
    }
}

// mutations contient les fonctions utilisées pour mettre à jour state
/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
    async getPosts({ state, commit }) {
      if (state.posts.length) return
      try {
        let posts = await fetch( `https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1`
        ).then(res => res.json())
        posts = posts
            .filter(el => el.status === "publish")
            .map(({ id, slug, title, excerpt, date, tags, content }) => ({
                id,
                slug,
                title,
                excerpt,
                date,
                tags,
                content
            }));
        commit("updatePosts", posts);
      } catch (err) {
        console.log(err)
      }
   }
}

// actions ne peut PAS modifier state, il faut passer par les mutations
// actions peut faire des appels d'API asynchrones, on utilise ça pour faire appelle à l'API wordpress puis on commit une mutation pour mettre à jour le state
// on commence par check si le posts array dans state a une longueur (donc si il y'a du contenu), ce qui signifierait qu'on a déjà appellé l'API
