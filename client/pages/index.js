import buildClient from "../api/build-client"

const index = ({currentUser}) => {
    console.log(currentUser)
    return currentUser ? <h1>Landing page</h1> : <h1>You are signout out</h1>
}

index.getInitialProps = async (context) => {
    console.log('Landing page')
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser');
    return data;
}

export default index