// Initialization
var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
window.router = new Navigo(root, useHash, hash);

let $app = document.getElementById('app');

window.router.on('/login', function() {
    $app.innerHTML='<login-screen></login-screen>'
}).resolve();

window.router.on('/register', function() {
    $app.innerHTML='<register-screen></register-screen>'
}).resolve();

// window.router.notFound(function(){
//     $app.innerHTML = 'Không tìm thấy trang này!'
// });