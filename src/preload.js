document.addEventListener("DOMContentLoaded", function () {
    showsection("settings")
    showcontrol('spam-control')
    showextentions('server-get-status')

    document.getElementById('drop-slot').checked = true
    
    document.getElementById('use-proxy-file').checked = true
    document.getElementById('use-proxy-file').dispatchEvent(new Event('change'));
});