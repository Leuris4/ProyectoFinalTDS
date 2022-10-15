function Logout(){
    function deleteCookies() {
        document.cookie = "_id=; path=/";
        document.cookie = "_rol=; path=/";
        window.location.href="/";
    }
    return deleteCookies()
}

export default Logout;