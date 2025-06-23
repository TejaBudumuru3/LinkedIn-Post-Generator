export default  function LinkedinButton() {

    // const HandleLogin = () => {
    //     const res = axios.post("http://localhost:  ")
    // }
    return (
        <>
            <button onClick={() => window.location.href = 'http://localhost:3000/auth/linkedin'}>
                Login with LinkedIn
            </button>
       </>
            )
}