export default function ({ store, redirect }) {

        if(store.state.userData.session.Level != 0){
            return redirect('/login')
        }
      
    
  }