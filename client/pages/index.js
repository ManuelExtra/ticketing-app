import axios from "axios";

const index = ({currentUser}) => {
    console.log(currentUser)
    axios.get('/api/users/currentuser')
    return <h1>Landing page</h1>
}

index.getInitialProps = async () => {
    const response = await axios.get('/api/users/currentuser').catch(err => console.error(err));
    return response.data
}

export default index